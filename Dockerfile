# syntax=docker.io/docker/dockerfile:1.4
FROM --platform=linux/riscv64 cartesi/node:20.8.0-jammy as build-stage

RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends cmake
rm -rf /var/lib/apt/lists/*
yarn global add yalc
EOF

WORKDIR /app
COPY ./browser-machine ./browser-machine
COPY ./node-micropolis ./node-micropolis

WORKDIR /app/node-micropolis
RUN <<EOF
yarn install
yarn build
yalc publish
EOF

WORKDIR /app/browser-machine
RUN <<EOF
yalc update
yarn install
yarn build
EOF

FROM --platform=linux/riscv64 cartesi/node:20.8.0-jammy-slim

LABEL io.sunodo.sdk_version=0.2.0
LABEL io.cartesi.rollups.ram_size=128Mi

ARG MACHINE_EMULATOR_TOOLS_VERSION=0.12.0
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends busybox-static=1:1.30.1-7ubuntu3 ca-certificates=20230311ubuntu0.22.04.1 curl=7.81.0-1ubuntu1.14
curl -fsSL https://github.com/cartesi/machine-emulator-tools/releases/download/v${MACHINE_EMULATOR_TOOLS_VERSION}/machine-emulator-tools-v${MACHINE_EMULATOR_TOOLS_VERSION}.tar.gz \
  | tar -C / --overwrite -xvzf -
rm -rf /var/lib/apt/lists/*
EOF

ENV PATH="/opt/cartesi/bin:${PATH}"

WORKDIR /app
COPY --from=build-stage /app/browser-machine/dist .

ENV ROLLUP_HTTP_SERVER_URL="http://127.0.0.1:5004"

ENTRYPOINT ["rollup-init"]
CMD ["node", "index.js"]
