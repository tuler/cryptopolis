# syntax=docker.io/docker/dockerfile:1

# This enforces that the packages downloaded from the repositories are the same
# for the defined date, no matter when the image is built.
ARG APT_UPDATE_SNAPSHOT=20260415T030400Z
ARG MACHINE_GUEST_TOOLS_VERSION=0.17.2
ARG MACHINE_GUEST_TOOLS_SHA256SUM=c077573dbcf0cdc146adf14b480bfe454ca63aa4d3e8408c5487f550a5b77a41

################################################################################
# riscv64 base stage
FROM --platform=linux/riscv64 cartesi/node:24.17.0-noble-slim AS base

ARG APT_UPDATE_SNAPSHOT
ARG DEBIAN_FRONTEND=noninteractive
RUN <<EOF
set -eu
apt-get update
apt-get install -y --no-install-recommends ca-certificates
apt-get update --snapshot=${APT_UPDATE_SNAPSHOT}
apt-get remove -y --purge ca-certificates
apt-get autoremove -y --purge
EOF

################################################################################
# engine stage: compile the micropolis native addon for riscv64.
#
# Unlike @tuler/node-libcmt (which ships prebuilt binaries), micropolis is
# compiled from C++ with cmake-js and has no prebuild, so it must be built on
# riscv64 — which rules out bun (no riscv64 build). We compile here and assemble
# a slim runtime copy: the addon plus its `bindings` loader, nothing else.
FROM --platform=linux/riscv64 cartesi/node:24.17.0-noble-slim AS engine-stage

ARG DEBIAN_FRONTEND=noninteractive
RUN <<EOF
set -eu
apt-get update
apt-get install -y --no-install-recommends cmake g++ make
rm -rf /var/lib/apt/lists/*
EOF

WORKDIR /opt/cartesi/engine
COPY micropolis/package.json micropolis/CMakeLists.txt micropolis/index.js micropolis/module.d.ts ./
COPY micropolis/src ./src
# `npm install` (no bun on riscv64) installs cmake-js/bindings/node-addon-api and
# runs the install script (cmake-js compile) → build/Release/MicropolisEngine.node
RUN npm install --omit=dev

RUN <<EOF
set -eu
mkdir -p /opt/micropolis/build/Release /opt/micropolis/node_modules
cp index.js package.json /opt/micropolis/
cp build/Release/MicropolisEngine.node /opt/micropolis/build/Release/
cp -R node_modules/bindings node_modules/file-uri-to-path /opt/micropolis/node_modules/
EOF

################################################################################
# build stage: build the dapp bundle with bun on the build platform.
#
# The platform here need not be riscv64: the bundle is platform-independent JS
# and externalizes the native addons, so nothing native is compiled. Running on
# $BUILDPLATFORM keeps the JS build fast (no emulation).
FROM --platform=$BUILDPLATFORM oven/bun:1 AS build-stage

WORKDIR /opt/cartesi/app
COPY . .

# --linker=hoisted lays node_modules out flat so the runtime addons can be copied
# as real directories. --ignore-scripts skips micropolis's host-arch cmake build
# (it is compiled for riscv64 in the engine stage and externalized from the
# bundle); esbuild still works since its binary comes from an optional dependency.
RUN bun install --frozen-lockfile --linker=hoisted --ignore-scripts
RUN bun run --filter my-dapp build

# Stage the runtime files: the JS bundle plus @tuler/node-libcmt's native addon
# and its node-gyp-build loader, which esbuild cannot inline and must be required
# at runtime. The flat layout keeps both as real dirs at the top level.
RUN <<EOF
set -eu
mkdir -p rootfs/node_modules/@tuler
cp dapp/dist/index.js rootfs/index.js
cp -RL node_modules/@tuler/node-libcmt rootfs/node_modules/@tuler/
cp -RL node_modules/node-gyp-build rootfs/node_modules/node-gyp-build
EOF

################################################################################
# runtime stage: produces final image that will be executed

# Here the image's platform MUST be linux/riscv64.
# Give preference to small base images, which lead to better start-up
# performance when loading the Cartesi Machine.
FROM base

ARG MACHINE_GUEST_TOOLS_VERSION
ARG MACHINE_GUEST_TOOLS_SHA256SUM
ADD --checksum=sha256:${MACHINE_GUEST_TOOLS_SHA256SUM} \
  https://github.com/cartesi/machine-guest-tools/releases/download/v${MACHINE_GUEST_TOOLS_VERSION}/machine-guest-tools_riscv64.deb \
  /tmp/machine-guest-tools_riscv64.deb

ARG DEBIAN_FRONTEND=noninteractive
RUN <<EOF
set -e
apt-get install -y --no-install-recommends \
  busybox-static \
  /tmp/machine-guest-tools_riscv64.deb

rm /tmp/machine-guest-tools_riscv64.deb
rm -rf /var/lib/apt/lists/* /var/log/* /var/cache/*
EOF

ENV PATH="/opt/cartesi/bin:${PATH}"

WORKDIR /opt/cartesi/dapp
COPY --from=build-stage /opt/cartesi/app/rootfs .
# micropolis is compiled for riscv64 in the engine stage; the bundle requires it
# at runtime (it is externalized from the esbuild bundle)
COPY --from=engine-stage /opt/micropolis ./node_modules/micropolis

ENTRYPOINT ["node"]
CMD ["index.js"]
