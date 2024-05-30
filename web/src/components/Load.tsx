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

type LoadProps = {
    token: Address;
    dapp: Address;
    address: Address;
};



const dapp = "0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e";


export const Load: FC<LoadProps> = () => {


    const mapValue = useForm({ initialValues: { hex: "0x0" } });

    // const input = encodeFunctionData({
    //     abi,
    //     functionName: "start",
    //     args: [mapSeed.values.seed],
    // });
    

    // const { write, notices, loading } = useRollupsServer(dapp,input);

    const data = mapValue.values.hex;


    const dataFromLocalStorage = localStorage.getItem('output.txt');

    

    // File path

    // Write data to the file
    function handleClick(){
        // Save data to localStorage
        localStorage.setItem('output.txt', data);

        console.log('Data has been written to localStorage with key "output.txt"');
    }   


    


    return (
        <Stack>
            <Paper bg="black" p={20}>
                    <Group gap={5} p={5}>
                        <Text>Load NFT From: </Text>
                        <ConnectButton showBalance={false} />
                    </Group>
                        <Input placeholder="" {...mapValue.getInputProps("hex")}/>

            </Paper>
            <Stack>
                <Button
                    leftSection={<TbHomePlus />}
                    onClick={handleClick}
                    // disabled={!write}
                >
                    Load City
                </Button>
            </Stack>
            
        </Stack>
    );
};
