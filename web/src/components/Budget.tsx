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
import { FC, useState } from "react";

export const Budget: FC = () => {
    const [visible, setVisible] = useState(false);
    return(
        <Group>
            <Button
            bg={"blue"}
            onClick={() => { setVisible(!visible) }}
            >
                Budget
            </Button>
            {visible && (
                <> 
                <Paper pos={"fixed"} top={"30%"} left={"50%"} p={5} w={300}>
                    <Stack>
                        <Text ta={"center"} bg={"blue"} fw={"bold"}>
                            Budget
                        </Text>
                        <SimpleGrid cols={2}>
                            <Text>Tax Collected: $0</Text>
                            <Text>Cashflow: $0</Text>
                            <Text>Previous Funds: $0</Text>
                            <Text>Collected Funds: $0</Text>
                            <Paper bg={"black"} p={5}>
                                <Stack>
                                    <Text>
                                        Roads
                                    </Text>
                                    <Slider />
                                    <Text>100% of $0 = $0</Text>
                                </Stack>                        
                            </Paper>
                            <Paper bg={"black"} p={5}>
                                <Stack>
                                    <Text>
                                        Fire
                                    </Text>
                                    <Slider />
                                    <Text>100% of $0 = $0</Text>
                                </Stack>   
                            </Paper>
                            <Paper bg={"black"} p={5}>
                                <Stack>
                                    <Text>
                                        Roads
                                    </Text>
                                    <Slider />
                                    <Text>100% of $0 = $0</Text>
                                </Stack>                        
                            </Paper>
                            <Paper bg={"black"} p={5}>
                                <Stack>
                                    <Text>
                                        Fire
                                    </Text>
                                    <Slider />
                                    <Text>100% of $0 = $0</Text>
                                </Stack>   
                            </Paper>
                            <Button>
                                Confirm
                            </Button>
                            <Button
                            onClick={() => { setVisible(!visible) }}
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



