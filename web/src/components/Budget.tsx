import {
    Button,
    Center,
    Group,
    Input,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    Title,
    Slider,
} from "@mantine/core";
import { FC, useState, useEffect } from "react";
import { abi } from "@/hooks/rollups";
import { Hex, encodeFunctionData } from "viem";

export type BudgetProps = {
    previousFunds: number,
    cityTax: number,
    taxFund: number,
    roadPercent: number,
    roadFund: number,
    firePercent: number,
    fireFund: number,
    policePercent: number,
    policeFund: number, 
    loading?: boolean;
    setInput?: (input: Hex) => void;
    write?: () => void;
}

export const Budget: FC<BudgetProps> = ({
    previousFunds,
    cityTax,
    taxFund,
    roadPercent,
    roadFund,
    firePercent,
    fireFund,
    policePercent,
    policeFund,
    loading,
    setInput,
    write,
}) => {
    const [visible, setVisible] = useState(false);
    const [tax, setTax] = useState(cityTax);
    const [rp, setRP] = useState(roadPercent);
    const [fp, setFP] = useState(firePercent);
    const [pp, setPP] = useState(policePercent);

    function handleClick(){
        setVisible(!visible);
        setTax(cityTax);
        setRP(roadPercent);
        setFP(firePercent);
        setPP(policePercent);
    }

    if(visible){
        if (setInput) {
            // encode the input
            setInput(
                encodeFunctionData({
                    abi,
                    functionName: "doBudget",
                    args: [tax, rp,fp, pp],
                })
            );
        }
    }

    return(
        <Group>
            <Button
            bg={"blue"}
            onClick={handleClick}
            disabled={loading}
            >
                Budget
            </Button>
            {visible && (
                <> 
                <Paper pos={"fixed"} top={"30%"} left={"50%"} p={5} w={300}>
                    <Stack>
                        <Text ta={"center"} bg={"blue"} fw={"bold"} c={"white"}>
                            Budget
                        </Text>
                        <SimpleGrid cols={2}>
                            <Text>Tax Collected: ${taxFund}</Text>
                            <Text>Cashflow: ${taxFund}</Text>
                            <Text>Previous Funds: ${previousFunds}</Text>
                            <Text>Collected Funds: ${previousFunds + taxFund}</Text>
                            <Paper bg={"black"} p={5}>
                                <Stack>
                                    <Text>
                                        Roads
                                    </Text>
                                    <Slider value={rp} onChange={setRP}/>
                                    <Text>{rp}% of ${roadFund} = ${(roadPercent / 100) * roadFund}</Text>
                                </Stack>                        
                            </Paper>
                            <Paper bg={"black"} p={5}>
                                <Stack>
                                    <Text>
                                        Fire
                                    </Text>
                                    <Slider value={fp} onChange={setFP}/>
                                    <Text>{fp}% of ${fireFund} = ${(firePercent / 100) * fireFund}</Text>
                                </Stack>   
                            </Paper>
                            <Paper bg={"black"} p={5}>
                                <Stack>
                                    <Text>
                                        Police
                                    </Text>
                                    <Slider value={pp} onChange={setPP}/>
                                    <Text>{pp}% of ${policeFund} = ${(policePercent / 100) * policeFund}</Text>
                                </Stack>                        
                            </Paper>
                            <Paper bg={"black"} p={5}>
                                <Stack>
                                    <Text>
                                        Tax
                                    </Text>
                                    <Slider value={tax} onChange={setTax}/>
                                    <Text>Tax rate: {tax}%</Text>
                                </Stack>   
                            </Paper>
                            <Button
                                onClick={write}
                                loading={loading}
                            >
                                Confirm
                            </Button>
                            <Button
                                onClick={handleClick}
                                disabled={loading}
                            >
                                Okay
                            </Button>
                        </SimpleGrid>
                    </Stack>
                </Paper>

                </>
            )}
        </Group>
        
        
        
    );
};



