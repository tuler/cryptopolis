# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Cryptopolis is the open-source SimCity Classic engine (Micropolis) wrapped as a [Cartesi Rollups](https://docs.cartesi.io/cartesi-rollups/) application, with a Next.js web UI. The game's economy is backed by a real ERC-20 token bridged from Ethereum L1 into the rollup's L2 wallet. See [README.md](README.md) for the full economy design.

## Repository layout

A single [Bun](https://bun.sh) workspace at the repo root (`package.json` `workspaces` + one `bun.lock`) ties three packages together. `bun install` links them directly — there is no publish/link step:

- `micropolis/` — the C++ SimCity engine + a Node.js native addon (N-API) binding, the workspace package `micropolis`. Its `install` script compiles the addon with cmake-js.
- `dapp/` — the Cartesi Rollups backend (TypeScript). Depends on the local engine as `micropolis: file:../micropolis`, which Bun resolves to the workspace member and symlinks into `dapp/node_modules/micropolis`.
- `web/` — the game UI (Next.js 14 App Router).

## Toolchain

- **Package manager: Bun** (`bun@1.3.12`, pinned via the root `packageManager`). One `bun install` at the repo root installs every workspace. Don't use npm/yarn/pnpm for host installs. The Docker image build also uses Bun (build stage on `$BUILDPLATFORM`); it falls back to `npm` **only** to compile the `micropolis` native addon for riscv64 in a separate stage, since Bun ships no riscv64 binary (see [Dockerfile](Dockerfile)).
- **Node 20+** (Volta pins `24.17.0` at the root). The Cartesi image builds and runs on Node 24 (`cartesi/node:24.17.0-noble`).
- **Native build scripts** run during `bun install` only for packages listed in the root `trustedDependencies` (`micropolis`, `@tuler/node-libcmt`, `canvas`, `esbuild`).
- **Formatting: Prettier with `tabWidth: 4`** (each subproject has `.prettierrc.json`). Markdown is linted via `.markdownlint-cli2.yaml`.

## Build & run

### Install & build

One install at the repo root links the workspaces and compiles the native engine (the `micropolis` `install` script runs cmake-js, and Bun symlinks the result into `dapp/node_modules/micropolis`):

```shell
bun install        # installs all workspaces + builds the micropolis addon for the host
bun run build      # builds micropolis, dapp and web (single pkg: bun run --filter <pkg> build)
```

`web` does not depend on the other two at build time. `dapp`'s `build` runs `tsc` then esbuild; the esbuild bundle keeps `micropolis` and `@tuler/node-libcmt` external, so they are resolved from `node_modules` at runtime.

### Running the dapp (Cartesi Rollups backend)

The dapp does rollup I/O through [`@tuler/node-libcmt`](https://tuler.github.io/libcmt-node/) (`new Rollup()`), talking **directly to the Cartesi Machine** — there is no host-side rollup HTTP server process to run anymore. To run the full stack: `cartesi build` then `cartesi run`. The RISC-V image is built from the root [Dockerfile](Dockerfile) (cross-compiled via QEMU).

On non-RISC-V hosts the same addon links libcmt's **mock** IO driver, which reads inputs from files named in `CMT_INPUTS` (`reason:path`, comma-separated; `0` = EVM-ABI-encoded advance, `1` = inspect) and writes outputs next to them:

```shell
cd dapp && CMT_INPUTS="0:advance.bin,1:inspect.bin" bun run start
```

### Running the web UI

```shell
bun run dev      # web dev server on http://localhost:3000
```

The UI talks to the Cartesi node at `localhost:6751` (see `web/.env`: `NEXT_PUBLIC_CHAIN_ID=31337` anvil, `NEXT_PUBLIC_GRAPHQL_URL`, `NEXT_PUBLIC_INSPECT_URL`). Full local play-through (import anvil key, deposit 20000 tokens, create a city) is documented in the "Create a game" section of [README.md](README.md).

## Tests & lint

- **dapp / micropolis**: Vitest. From a package dir, `bun run test` runs the watcher; for one file/case use `bunx vitest run tests/clock.test.ts` or `bunx vitest run -t "case name"`. dapp tests live in `dapp/tests/` (note: not under `src/`). Run every suite from the root with `bun run test`.
- **web**: `bun run lint` (`next lint`). No unit-test suite.

## Code generation (web)

`src/hooks/contracts.tsx` is a **committed** generated file. Re-run after changing the contract set — never hand-edit the output.

- `bun run --filter web codegen` (or `bun run codegen` at the root) → `src/hooks/contracts.tsx` (wagmi v2 React hooks). Source: `wagmi.config.ts`, which pulls the Cartesi Rollups **v2** InputBox + ERC20Portal ABIs/addresses from `@cartesi/viem/abi` plus the viem `erc20Abi`.

## Architecture

### The application ABI is the protocol

The dapp exposes its API as a viem `parseAbi` of three functions — `transfer(address,uint256)`, `start(uint32 seed)`, `doTool(uint8 tool,uint16 x,uint16 y)` — plus inspect-only calls (`getMap`, `getUserMap`, `balanceOf`). The web client encodes inputs against an **identical copy** of this ABI. It is duplicated in [dapp/src/index.ts](dapp/src/index.ts) and [web/src/hooks/rollups.tsx](web/src/hooks/rollups.tsx); changing one means changing the other.

### dapp (Cartesi Rollups backend)

Rollup I/O is done with [`@tuler/node-libcmt`](https://tuler.github.io/libcmt-node/) (`new Rollup()` + `rollup.run({ advance, inspect })`), talking directly to the machine (no HTTP server). ERC-20 balances are still managed by `@deroll/wallet` (`createWallet`), which is transport-agnostic — its `handler` decodes portal deposits and its `transferERC20`/`erc20BalanceOf` keep the in-rollup ledger.

- **`advance(request)`** mutates state and returns `true`/`false` to accept/reject. The request carries `msgSender`/`blockNumber` (bigint) and a `payload` `Buffer`. ERC-20 deposits (detected with `isERC20Deposit`, i.e. `msgSender` is the ERC-20 portal) are forwarded to `wallet.handler` to credit balances; otherwise the payload is decoded via `decodeFunctionData` into `transfer` (move L2 ERC-20), `start` (create a city), or `doTool` (apply a building tool).
- **`inspect(request)`** is read-only and replies with `rollup.emitReport`. The inspect payload is the hex-encoded function data sent in the web client's URL path, so it is recovered with `hexToString(toHex(request.payload))` before decoding.
- **Outputs are synchronous**: `rollup.emitNotice` / `rollup.emitReport` (no `await`), each taking a hex string or bytes.
- **State is in-memory only**: `games: Record<Address, Game>`, one city per player address. There is no persistence layer.
- **Game state is broadcast as notices/reports**: map, population, totalFunds, cityTime — each a hex-encoded payload (see `createEnginePayloads` in `dapp/src/util.ts`). The 16-bit tile map is serialized as a hex string.
- **Real-time clock simulated from block numbers**: each game stores the block of its last input; on the next `doTool`, the engine runs `(blockΔ × TICKS_PER_BLOCK)` ticks (`TICKS_PER_BLOCK = 16`) to catch up before applying the tool.
- **Economy accounting** happens around the simulation: funds delta is settled between the in-game wallet (`0x..01`) and the people wallet (`0x..02`) using the hardcoded TestToken address.

### micropolis (engine binding)

C++ engine compiled to a `.node` native addon via **cmake-js** + **node-addon-api** (`CMakeLists.txt` globs `src/*.cpp`). The public JS surface is hand-declared in `micropolis/module.d.ts` (`Micropolis` class: `generateSomeCity`, `simTick`, `doTool`, `map`, `totalFunds`, `population`, `cityTime`, etc.). Built for the host for local dev, and for RISC-V (via the Dockerfile) for the Cartesi Machine.

### web (Next.js App Router)

- **Provider stack** (`app/layout.tsx`): `StyleProvider` (Mantine) → `InspectProvider` (SWR). Wallet UI is RainbowKit over **wagmi v2** (`providers/WalletProvider.tsx`, chains: cartesi/mainnet/sepolia).
- **Two wallet modes.** Normal RainbowKit connection, and a private-key mode used for the play route `/play/[privateKey]` (`PrivateKeyWalletProvider` / `PrivateKeyConnector`) so a city can be opened directly from a key in the URL.
- **Three I/O channels to the rollup** (Cartesi Rollups **v2**):
  1. *Inputs* — written to the Cartesi InputBox contract via generated wagmi hooks (`hooks/contracts.tsx`), then the input index is read from the tx receipt with `getInputsAdded` (`hooks/rollups.tsx`).
  2. *Notices* — read back over the node **JSON-RPC API** via `@cartesi/viem` (`waitForInput` then `listOutputs`, filtered to `Notice` outputs) in `hooks/rollups.tsx`; the client lives in `hooks/cartesi.ts`. The v1 GraphQL/Apollo path is gone.
  3. *Inspect* — read-only game state via **`POST {node}/inspect/{application}`** with the raw payload bytes as the body (the node forwards them verbatim to the machine), fetched with SWR (`hooks/inspect.tsx`, `hooks/game.tsx`).
- **Rendering**: the city map renders with **PixiJS** (`@pixi/react`), stats/charts with **D3**, and chrome with **Mantine**. `next.config.js` sets COOP to `same-origin-allow-popups` so smart-wallet popups work; full cross-origin isolation (COOP `same-origin` + COEP `require-corp`, for SharedArrayBuffer / an in-browser WASM machine) is not enabled — it conflicts with the wallet popups.
