"use client";
import { Center, Paper, Skeleton, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { Address } from "viem";
import { Input, Button, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { abi, useRollupsServer } from "@/hooks/rollups";
import { Hex, encodeFunctionData, formatUnits } from "viem";
import { TbHomePlus } from "react-icons/tb";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { write } from "fs";

type LoadProps = {
    token: Address;
    dapp: Address;
    address: Address;
};



const dapp = "0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e";


export const Load: FC<LoadProps> = () => {

    // File path

    // Write data to the file
    // function handleClick(){
    //     // Save data to localStorage
    //     // localStorage.setItem('output.txt', data);
    //     // // const dataFromLocalStorage = localStorage.getItem('output.txt');
    //     console.log(data);
    //     const actions = data.split(',');
    //     // console.log(actions);
    //     if(actions.length > 0){
    //         for(let i = 0; i < actions.length-2; i+=3){
    //             let tool = parseInt(actions[i]);
    //             // console.log(tool);
    //             let x = parseInt(actions[i + 1]);
    //             // console.log(x);
    //             let y = parseInt(actions[i + 2]);
    //             // console.log(y);
    //             const input = encodeFunctionData({
    //                 abi,
    //                 functionName: "doTool",
    //                 args: [tool,x,y],
    //             });
    //             console.log(input);
    //             const { write, notices, loading } = useRollupsServer(dapp, input);
    //             if(write){
    //                 write;
    //             }
    //             else{
    //                 console.log('fail');
    //             }
    //         }
    //     }
    // }   
    const save = useForm({ initialValues: { actions: "" } });
    const data = save.values.actions;

    const input = encodeFunctionData({
        abi,
        functionName: "load",
        args: [data],
    });

    const { write, notices, loading } = useRollupsServer(dapp, input);


    return (
        <Stack>
            <Paper bg="black" p={20}>
                    <Group gap={5} p={5}>
                        <Text>Load NFT From: </Text>
                        <ConnectButton showBalance={false} />
                    </Group>
                        <Input placeholder="Hex String" {...save.getInputProps("actions")}/>

            </Paper>
            <Stack>
                <Button
                    leftSection={<TbHomePlus />}
                    onClick={() => {
                        write && write();
                        localStorage.setItem('output.txt', data);
                        console.log(localStorage.getItem('output.txt'));
                    }}
                    disabled={!write}
                >
                    Load City
                </Button>
            </Stack>
            
        </Stack>
    );
};
