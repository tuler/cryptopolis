import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import {
    erc20PortalAbi,
    erc20PortalAddress,
    inputBoxAbi,
    inputBoxAddress,
} from "@cartesi/viem/abi";
import { erc20Abi } from "viem";

// The devnet TestToken (TestFungibleToken) exposes a public `mint(uint256)` that
// mints to msg.sender — used by the "Get tokens" faucet link in the bridge.
const testTokenAbi = [
    {
        type: "function",
        name: "mint",
        stateMutability: "nonpayable",
        inputs: [{ name: "value", type: "uint256" }],
        outputs: [],
    },
] as const;

// Cartesi Rollups v2 contracts. ABIs and deterministic addresses come from
// @cartesi/viem; the InputBox and ERC20Portal are the only on-chain contracts
// the UI talks to (plus a generic ERC-20 for balance/allowance/approve).
export default defineConfig({
    out: "src/hooks/contracts.tsx",
    contracts: [
        {
            name: "erc20",
            abi: erc20Abi,
        },
        {
            name: "TestToken",
            abi: testTokenAbi,
        },
        {
            name: "InputBox",
            abi: inputBoxAbi,
            address: inputBoxAddress,
        },
        {
            name: "ERC20Portal",
            abi: erc20PortalAbi,
            address: erc20PortalAddress,
        },
    ],
    plugins: [react()],
});
