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
    Select,
} from "@mantine/core";
import { FC, useState } from "react";


export type DisastersProps = {
    loading?: boolean,
    population: number,
    score: number,
    value: number,
    scoreDelta: string,
    populationDelta: string,
    category: number,
}

export const Evaluation: FC<DisastersProps> = ({
    loading,
    population,
    score,
    value,
    scoreDelta,
    populationDelta,
    category,
}) => {
    const [visible, setVisible] = useState(false);

    return(
        <Group>
            <Button
            bg={"green"}
            w={"100%"}
            onClick={() => setVisible(!visible)}
            disabled={loading}
            >
                Evaluation
            </Button>
            {visible && (
                <> 
                <Paper pos={"fixed"} top={"30%"} left={"50%"} p={5} w={300}>
                    <Stack ta={"center"} gap={5}>
                        <Text bg={"green"} fw={"bold"} c={"white"}>
                            Evaluation
                        </Text>

                        <Text c={"white"} fw={"bold"}>
                            Public opinion
                        </Text>

                        <Text>
                            Is the mayor doing a good job?
                        </Text>
                        <SimpleGrid cols={2} ta={"center"}>
                            <Text>
                                Yes: {0}
                            </Text>
                            <Text>
                                No: {0}
                            </Text>
                        </SimpleGrid>

                        <Text>
                            What are the worst problems?
                        </Text>
                        <Text>
                            Taxes
                        </Text>

                        <Text c={"white"} fw={"bold"}>
                            Statistics
                        </Text>
                        <Center>
                            <SimpleGrid cols={2} ta={"left"} verticalSpacing={"xxs"}>
                                <Text>Population:</Text>
                                <Text ta={"right"}>{population}</Text>

                                <Text>Net Migration:</Text>
                                <Text ta={"right"}>{populationDelta}</Text>

                                <Text>Assessed Value:</Text>
                                <Text ta={"right"}>{value}</Text>

                                <Text>Category:</Text>
                                <Text ta={"right"}>{category}</Text>

                                <Text>Game Level:</Text>
                                <Text ta={"right"}>{0}</Text>

                                <Text>Score:</Text>
                                <Text ta={"right"}>{score}</Text>

                                <Text>Annual change:</Text>
                                <Text ta={"right"}>{scoreDelta}</Text>
                            </SimpleGrid>
                        </Center>
                        
                        
                       

                        <Button
                        onClick={() => setVisible(!visible)}
                        disabled={loading}
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
