# Cryptopolis

Cryptopolis brings back the original city simulator that started it all in 1989 to the crypto era. Build a city using the same game engine but with real economics.

SimCity was launched back in 1989 developed by the legendary game designer Will Write. In 2008, the engine C code was ported to C++ and released as free software under the GPL-3.0-or-later license, renamed to Micropolis for trademark reasons.

This project was developed for the [ETHOnline 2023](https://ethglobal.com/events/ethonline2023/) event and the first [Cartesi](https://cartesi.io/) Experiment Week. Here is the [slide deck](https://docs.google.com/presentation/d/1_Xq0s_CqR8bfzQD77MLC0m9lVUvZA1ueloEbXzcr1gU/edit?usp=sharing) of the presentation video below.

[![Cryptopolis presentation](https://img.youtube.com/vi/mrkqRfVU12s/0.jpg)](https://www.youtube.com/watch?v=mrkqRfVU12s)

For a throughtout retrospective of SimCity, especially for those under the age of 40, I recommend watching the following video.

[![SimCity 30 Year Later: A Retrospective](https://img.youtube.com/vi/TrScy1icWjI/0.jpg)](https://www.youtube.com/watch?v=YTrScy1icWjI)

## How it works

Cryptopolis uses the exact same C++ engine of [Micropolis](https://github.com/SimHacker/micropolis), the open source version of SimCity Classic.

The first step was to build the engine to the RISC-V target architecture, so it can run inside a [Cartesi Machine](https://docs.cartesi.io/cartesi-machine/). The code builds successfully unmodified. One small addition to the original code was minimalist [Node.js binding](https://github.com/nodejs/node-addon-api) for the engine, so it could be used by a Node.js application.

The second step was to developed a Node.js application that uses the engine to run the game simulation as a [Cartesi Rollups](https://docs.cartesi.io/cartesi-rollups/) application. That also includes implementing an integration of the game economy with a ERC-20 token bridged from Ethereum.

The third step was to implement a new Web UI for the game, using a myriad of libraries, like [React](https://reactjs.org/), [Next.js](https://nextjs.org), [viem](https://viem.sh), [wagmi](https://wagmi.sh), [Apollo Client](https://www.apollographql.com/docs/react/), [PixiJS](https://pixijs.com), [D3](https://d3js.org), [Mantine](https://mantine.dev), and others. The UI includes screens for bridging ERC-20 from Ethereum to power the game economy.

## Game Economy

The original game has a fairly complex simulation logic, but a quite simple economy. A game starts with a budget of say `$20,000`. The player then spends money to build zones, power plants, roads, and other structures. Existing infrastructure also requires resources to keep everything in good condition. Once an year the city collects taxes from the population.

The game economy is powered by a Ethereum ERC-20 token, any token, chosen by the application deployer. Preferrably a fixed supply token.

The first step to play the game is to bridge tokens from Ethereum into the L2 wallet of the game. Building a new city requires `20000` tokens. Currently a player can have only one city at a time.

When the player builds a new city, the application transfers `20000` tokens from his wallet to a special `in-game` wallet (`0x0000000000000000000000000000000000000001`), which matches the game simulations funds.

When the player make city expenses, like building new structures, or just paying for maintenance, funds are transferred from the `in-game` wallet to another special `people` wallet (`0x0000000000000000000000000000000000000002`). This is like the city hiring its people to do the work.

Once every "game year" taxes are collected, which now transfer funds from the `people` wallet to the `in-game` wallet.

In a nutshell, if the player does a good job he recovers the initial investment and make some profit. If the player does a bad job, he will lose money and eventually go bankrupt.

If the `people` wallet runs out of funds, the global economy is in trouble. The game will stop working and the player will not be able to play anymore. However the application deployer can be in control of a token supply and donate more token to the `people`, which can be seen as a World Bank providing humanitarian support.

## Subprojects

-   micropolis: the original C++ game engine + Node.js binding
-   dapp: a Cartesi Rollups application in TypeScript
-   web: the game UI as a Next.js application

## Building

This is a [Bun](https://bun.sh) monorepo with three workspaces — `micropolis`, `dapp` and `web`. A single install at the repository root links them together (the `dapp` consumes the local `micropolis` engine directly through the workspace — there is no publishing/linking step) and compiles the native C++ engine and its Node.js binding for the host machine:

```shell
bun install
```

To build all three workspaces explicitly:

```shell
bun run build
```

You can also build a single workspace, e.g. `bun run --filter web build`. A RISC-V build of the engine + dapp is produced by the Cartesi image build (see [Running the dapp](#running-the-dapp)), which cross-compiles through Docker and its RISC-V emulation via QEMU.

## Running

### Running the dapp

The dapp talks to the rollup through [`@tuler/node-libcmt`](https://tuler.github.io/libcmt-node/), the Node.js bindings for the Cartesi Machine guest rollup library. It communicates directly with the machine, so there is no separate host-side HTTP backend to run — the backend runs inside the Cartesi Machine:

```shell
cartesi build
cartesi run
```

On non-RISC-V hosts the same code links libcmt's *mock* IO driver, which feeds inputs from files via the `CMT_INPUTS` environment variable (reason `0` is an EVM-ABI encoded advance, `1` is an inspect query) and writes outputs next to those files. This is how the dapp is exercised on the host:

```shell
cd dapp
CMT_INPUTS="0:advance.bin,1:inspect.bin" bun run start
```

### Running the web UI

```shell
bun run dev
```

### Create a game

-   Go to http://localhost:3000/
-   Connect to Metamask wallet
-   Import anvil wallet to Metamask (private key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80)
-   Approve and deposit 20000 tokens
-   Go to http://localhost:3000/play/0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
-   Choose a map and create a game

## Future Improvements

1. The simulation is currently running only as a Cartesi Rollups application. That means the game is not playable in absolute real-time, because only when a new input is received the game advances its simulation clock and updates its state. In order to run the game in real time we need to run it inside the browser, using the WebAssembly build of the Cartesi Machine, which is still [unmerged](https://github.com/cartesi/machine-emulator/pull/132) at the time of this writing.

2. This is just a prototype, a lot of features are missing in the UI, and in how the player can interfere with the game simulation. For example, the engine supports changing the tax rate, which can help the city collect more funds but repel citizens.

## Thanks

Thanks to all the original coders for building these amazing toys.

Thanks to the awesome Cartesi community.

Made with ❤️ by [tuler](https://github.com/tuler/). Long live open source! 🙌
