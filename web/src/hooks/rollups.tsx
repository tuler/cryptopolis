import { Hex, parseAbi } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { getInputsAdded } from "@cartesi/viem";
import {
    useWriteInputBoxAddInput,
    useSimulateInputBoxAddInput,
} from "./contracts";
import { cartesiClient, useDappAddress } from "./cartesi";
import { dappName } from "@/config";

// define application API (or ABI so to say)
export const abi = parseAbi([
    "function transfer(address to, uint256 amount)",
    "function start(uint32 seed)",
    "function doTool(uint8 tool, uint16 x, uint16 y)",
]);

export const useRollupsServer = (input?: Hex) => {
    // the on-chain application address, resolved from the application name
    const dapp = useDappAddress();

    // prepare the transaction
    const prepare = useSimulateInputBoxAddInput({
        args: [dapp!, input!],
        query: {
            enabled: !!input && !!dapp,
        },
    });

    // execute the transaction
    const execute = useWriteInputBoxAddInput();

    // wait for the transaction to be mined
    const wait = useWaitForTransactionReceipt({ hash: execute.data });

    // get the index of the input sent, from the InputAdded event in the receipt
    const inputIndex = wait.data
        ? getInputsAdded(wait.data).at(0)?.index
        : undefined;

    // wait for the node to process the input (v2 JSON-RPC) and read back the
    // notices it produced (the game state payloads). Replaces the v1 GraphQL query.
    const query = useQuery({
        queryKey: ["notices", inputIndex?.toString()],
        enabled: inputIndex !== undefined,
        queryFn: async (): Promise<Hex[]> => {
            const processed = await cartesiClient.waitForInput({
                application: dappName,
                inputIndex: inputIndex!,
            });
            if (processed.status !== "ACCEPTED") {
                return [];
            }
            const { data: outputs } = await cartesiClient.listOutputs({
                application: dappName,
                inputIndex: inputIndex!,
            });
            return outputs
                .filter((output) => output.decodedData?.type === "Notice")
                .sort((a, b) => Number(a.index - b.index))
                .map((output) => (output.decodedData as { payload: Hex }).payload);
        },
    });

    const notices = query.data ?? [];

    return {
        writeContract: execute.writeContract,
        request: prepare.data?.request,
        notices,
        loading:
            execute.isPending ||
            wait.isLoading ||
            (inputIndex !== undefined && query.isPending),
    };
};
