import { useEffect, useState } from "react";
import {
    Address,
    Hex,
    TransactionReceipt,
    decodeEventLog,
    parseAbi,
} from "viem";
import { useWaitForTransaction } from "wagmi";
import {
    inputBoxABI,
    useInputBoxAddInput,
    usePrepareInputBoxAddInput,
} from "./contracts";
import { useQuery } from "@apollo/client";
import { CompletionStatus, InputNoticesDocument } from "./graphql/graphql";

// define application API (or ABI so to say)
export const abi = parseAbi([
    "function transfer(address to, uint256 amount)",
    "function start(uint32 seed)",
    "function doTool(uint8 tool, uint16 x, uint16 y)",
]);

/**
 * Hook to get the inputIndex from a transaction receipt
 * @param receipt transaction receipt
 * @returns inputIndex inside the transaction receipt
 */
const useInputIndex = (receipt?: TransactionReceipt): bigint | undefined => {
    const [inputIndex, setInputIndex] = useState<bigint | undefined>();
    useEffect(() => {
        // runs when receipt changes
        if (receipt) {
            // search for InputAdded event in receipt logs
            const inputIndex = receipt.logs
                .map((log) => {
                    try {
                        // decode the event
                        const decodedLog = decodeEventLog({
                            abi: inputBoxABI,
                            eventName: "InputAdded",
                            topics: log.topics,
                            data: log.data,
                        });
                        return decodedLog.args.inputIndex;
                    } catch (e: any) {
                        return undefined;
                    }
                })
                .filter((id): id is bigint => !!id)
                .at(0);

            // set inputIndex state variable
            setInputIndex(inputIndex);
        }
    }, [receipt]);
    return inputIndex;
};

export const useRollupsServer = (dapp: Address, input?: Hex) => {
    // prepare the transaction
    const prepare = usePrepareInputBoxAddInput({
        args: [dapp, input!],
        enabled: !!input,
    });

    // execute the transaction
    const execute = useInputBoxAddInput(prepare.config);

    // wait for the transaction to be mined
    const wait = useWaitForTransaction(execute.data);

    // get id of the input sent
    const inputIndex = useInputIndex(wait.data);

    // query for the input outputs (after transaction is mined)
    const query = useQuery(InputNoticesDocument, {
        variables: { inputIndex: Number(inputIndex) },
        skip: !inputIndex,
        pollInterval: 1000,
    });

    // state with notices, change when graphql query result change
    const [notices, setNotices] = useState<Hex[]>([]);
    const [queryLoading, setQueryLoading] = useState(false);
    useEffect(() => {
        if (inputIndex && query.data) {
            setQueryLoading(true);
            if (query.data.input.status == CompletionStatus.Accepted) {
                const payloads = query.data.input.notices.edges
                    .map((notice) => notice.node)
                    .sort((notice) => notice.index)
                    .map((notice) => notice.payload as Hex);
                setNotices(payloads);
                setQueryLoading(false);
            }
        }
    }, [inputIndex, query.data]);
    /*console.log(
        JSON.stringify({
            prepare: prepare.status,
            execute: execute.status,
            wait: wait.status,
            query: query.loading,
        })
    );*/

    return {
        write: execute.write,
        notices,
        loading: execute.isLoading || wait.isLoading || queryLoading,
    };
};
