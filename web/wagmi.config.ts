import hardhatDeploy from "@sunodo/wagmi-plugin-hardhat-deploy";
import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";

export default defineConfig({
    out: "src/hooks/contracts.tsx",
    contracts: [
        {
            name: "erc20",
            abi: erc20Abi,
        },
    ],
    plugins: [
        hardhatDeploy({
            directory: "node_modules/@cartesi/rollups/export/abi",
        }),
        react(),
    ],
});
