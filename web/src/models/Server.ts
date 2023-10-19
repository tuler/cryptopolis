import {
    inputBoxABI,
    useInputBoxAddInput,
    usePrepareInputBoxAddInput,
} from "@/hooks/contracts";
import { CompletionStatus, useInputNoticesQuery } from "@/hooks/graphql";
import { useEffect, useState } from "react";
import {
    Address,
    Hex,
    TransactionReceipt,
    decodeEventLog,
    parseAbi,
} from "viem";
import { useWaitForTransaction } from "wagmi";

// define application API (or ABI so to say)
export const abi = parseAbi([
    "function transfer(address to, uint256 amount)",
    "function start(uint32 seed)",
    "function doTool(uint8 tool, uint16 x, uint16 y)",
]);

export const inspectAbi = parseAbi([
    "function getMap(uint32 seed)",
    "function getUserMap(address)",
    "function balanceOf(address)",
]);

const useInputIndex = (receipt?: TransactionReceipt): bigint | undefined => {
    const [inputIndex, setInputIndex] = useState<bigint | undefined>();
    useEffect(() => {
        if (receipt) {
            const inputIndex = receipt.logs
                .map((log) => {
                    try {
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
    const [result, executeQuery] = useInputNoticesQuery({
        variables: { inputIndex: Number(inputIndex) },
        pause: !inputIndex,
    });

    console.log("InputIndex", inputIndex);
    useEffect(() => {
        const id = setTimeout(
            () => inputIndex && executeQuery({ requestPolicy: "network-only" }),
            5000
        );
        return () => clearTimeout(id);
    }, [result.fetching, executeQuery, inputIndex]);

    if (result.data?.input) {
        if (result.data.input.status == CompletionStatus.Accepted) {
            const notices = result.data.input.notices.edges
                .map((notice) => notice.node)
                .sort((a) => a.index)
                .map((n) => n.payload as Hex);
            return {
                write: execute.write,
                notices,
            };
        }
    }

    return {
        write: execute.write,
        notices: [],
    };
};
