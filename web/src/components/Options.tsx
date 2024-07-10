import {
    Paper,
    SimpleGrid,
    Stack,
} from "@mantine/core";
import { FC } from "react";
import { Hex } from "viem";
import { Budget } from "./Budget";
import { Disasters } from "./Disasters";
import { Evaluation } from "./Evalutation";
export type OptionsProps = {
    previousFunds: number;
    cityTax: number;
    taxFund: number;
    roadPercent: number;
    roadFund: number,
    firePercent: number,
    fireFund: number,
    policePercent: number,
    policeFund: number, 
    population: number,
    score: number,
    value: number,
    scoreDelta: string,
    populationDelta: string,
    category: number,
    loading?: boolean;
    setInput?: (input: Hex) => void;
    write?: () => void;
}

export const Options: FC<OptionsProps> = ({
    previousFunds,
    cityTax,
    taxFund,
    roadPercent,
    roadFund,
    firePercent,
    fireFund,
    policePercent,
    policeFund,
    population,
    score,
    value,
    scoreDelta,
    populationDelta,
    category,
    loading,
    setInput,
    write,
}) => {


    return(
        <Paper pos={"fixed"} top={"10%"} left={"90%"} p={5}>

                
            <Stack gap={5}>
                <Budget 
                previousFunds={previousFunds}
                cityTax={cityTax}
                taxFund={taxFund}
                roadPercent={roadPercent}
                roadFund={roadFund}
                firePercent={firePercent}
                fireFund={fireFund}
                policePercent={policePercent}
                policeFund={policeFund}
                loading={loading}
                setInput={setInput}
                write={write}
                />
                <Evaluation 
                loading={loading}
                population={population}
                score={score}
                value={value}
                scoreDelta={scoreDelta}
                populationDelta={populationDelta}
                category={category}
                />
                <Disasters
                loading={loading}
                setInput={setInput}
                write={write}
                />
            </Stack>    
        </Paper>
    );
};