import { createCartesiPublicClient } from "@cartesi/viem";
import { useQuery } from "@tanstack/react-query";
import { Address, http } from "viem";
import { dappName } from "@/config";

const url = process.env.NEXT_PUBLIC_RPC_URL;
if (!url)
    throw new Error("NEXT_PUBLIC_RPC_URL environment variable is not defined");

// Cartesi Rollups v2 node client, talking to the node's JSON-RPC API
// (cartesi_listOutputs, cartesi_getInput, cartesi_waitForInput, ...).
export const cartesiClient = createCartesiPublicClient({
    transport: http(url),
});

// Resolve the on-chain application address from its (stable) name. Needed for
// the on-chain calls (InputBox.addInput, ERC20Portal deposits) that take an
// address; the node's read APIs use the name directly.
export const useDappAddress = (): Address | undefined => {
    const { data } = useQuery({
        queryKey: ["application-address", dappName],
        staleTime: Infinity,
        queryFn: async () => {
            const application = await cartesiClient.getApplication({
                application: dappName,
            });
            return application.applicationAddress;
        },
    });
    return data;
};
