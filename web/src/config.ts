import { Address } from "viem";

// Deployed Cryptopolis application name (Cartesi Rollups v2). The node's
// JSON-RPC API and inspect endpoint accept the application name, which is stable
// across rebuilds — unlike the address, which is derived from the machine
// template. The on-chain address (for InputBox / portal calls) is resolved from
// this name at runtime; see `useDappAddress` in hooks/cartesi.ts.
export const dappName = process.env.NEXT_PUBLIC_DAPP_NAME ?? "cryptopolis";

// ERC-20 token backing the game economy (the devnet TestFungibleToken).
export const tokenAddress = (process.env.NEXT_PUBLIC_TOKEN_ADDRESS ??
    "0x88A2120B7068E78692C8fd12E751d610B6377E4d") as Address;
