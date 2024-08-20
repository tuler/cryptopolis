"use client";
import {
    Button,
    Center,
    Group,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { FC, useState } from "react";
import { abi } from "@/hooks/rollups";
import { Hex, encodeFunctionData, fromHex } from "viem";


export type QueryProps = {
    setVisible?: (input: boolean) => void;
    visible: boolean;
    x: number;
    y: number;
    populationDensity?: Hex;
    landValue?: Hex;
    crimeRate?: Hex;
    pollutionDensity?: Hex;
    growthRate?: Hex;

}

export const Query: FC<QueryProps> = ({
    setVisible,
    visible,
    x,
    y,
    populationDensity,
    landValue, 
    crimeRate, 
    pollutionDensity, 
    growthRate,
}) => {
    const index = Math.floor(x / 2) * 50 + Math.floor(y / 2);

    let popDens = 0;
    let landVal = 0;
    let crime = 0;
    let pollution = 0;
    let growth = 0;

    if (populationDensity) {
        const byteArray = fromHex(populationDensity, 'bytes');
        if (index >= 0 && index < byteArray.length) {
            popDens = byteArray[index];
        } else {
            console.warn(`Index out of bounds for populationDensity: ${index}`);
        }
    }

    if (landValue) {
        const byteArray = fromHex(landValue, 'bytes');
        if (index >= 0 && index < byteArray.length) {
            landVal = byteArray[index];
        } else {
            console.warn(`Index out of bounds for landValue: ${index}`);
        }
    }

    if (crimeRate) {
        const byteArray = fromHex(crimeRate, 'bytes');
        if (index >= 0 && index < byteArray.length) {
            crime = byteArray[index];
        } else {
            console.warn(`Index out of bounds for crimeRate: ${index}`);
        }
    }

    if (pollutionDensity) {
        const byteArray = fromHex(pollutionDensity, 'bytes');
        if (index >= 0 && index < byteArray.length) {
            pollution = byteArray[index];
        } else {
            console.warn(`Index out of bounds for pollutionDensity: ${index}`);
        }
    }

    if (growthRate) {
        const byteArray = fromHex(growthRate, 'bytes');
        if (index >= 0 && index < byteArray.length) {
            growth = byteArray[index];
        } else {
            console.warn(`Index out of bounds for growthRate: ${index}`);
        }
    }

    return(
        <Group>
            {visible && setVisible && (
                <> 
                <Paper pos={"fixed"} top={"30%"} left={"50%"} p={5} w={300}>
                    <Stack ta={"center"}>
                        <Text bg={"cyan"} fw={"bold"} c={"white"}>
                            Query
                        </Text>

                        <SimpleGrid cols={2} verticalSpacing={"xxs"}>
                            <Text fw={"bold"}>Zone</Text>
                            <Text fw={"bold"}>0</Text>
                            
                            <Text fw={"bold"}>Density</Text>
                            <Text fw={"bold"}>{popDens}</Text>

                            <Text fw={"bold"}>Value</Text>
                            <Text fw={"bold"}>{landVal}</Text>

                            <Text fw={"bold"}>Crime</Text>
                            <Text fw={"bold"}>{crime}</Text>

                            <Text fw={"bold"}>Pollution</Text>
                            <Text fw={"bold"}>{pollution}</Text>

                            <Text fw={"bold"}>Growth</Text>
                            <Text fw={"bold"}>{growth}</Text>
                            
                        </SimpleGrid>

                        <Button
                            onClick={() =>
                                setVisible(!visible)
                            }
                        >
                            Okay
                        </Button>
                    </Stack>
                </Paper>
                </>
            )}
        </Group>
    );
};
