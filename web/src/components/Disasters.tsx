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
import { abi } from "@/hooks/rollups";
import { Hex, encodeFunctionData } from "viem";


export type DisastersProps = {
    loading?: boolean;
    setInput?: (input: Hex) => void;
    write?: () => void;
}

export const Disasters: FC<DisastersProps> = ({
    loading,
    setInput,
    write,
}) => {
    const [visible, setVisible] = useState(false);
    const [disaster, setDisaster] = useState<string | null>(null);


    if(visible){
        if (setInput && disaster) {
            // encode the input
            let x = 0;
            if(disaster == "Fire") x = 0;
            else if(disaster == "Flood") x = 1;
            else if(disaster == "Meltdown") x = 2;
            setInput(
                encodeFunctionData({
                    abi,
                    functionName: "makeDisaster",
                    args: [x],
                })
            );
        }
    }

    return(
        <Group>
            <Button
            bg={"red"}
            c={"yellow"}
            w={"100%"}
            onClick={() => setVisible(!visible)}
            disabled={loading}
            >
                Disaster
            </Button>
            {visible && (
                <> 
                <Paper pos={"fixed"} top={"30%"} left={"50%"} p={5} w={300}>
                    <Stack ta={"center"}>
                        <Text bg={"red"} fw={"bold"} c={"yellow"}>
                            Disasters
                        </Text>

                        <Text c={"yellow"}>
                            What disater do you want to befall this game?
                        </Text>
                        <Select 
                        placeholder="None"
                        data={['Fire', 'Flood', 'Meltdown']}
                        clearable
                        onChange={setDisaster}
                        />

                        <SimpleGrid cols={2}>
                            <Button
                            onClick={write}
                            disabled={loading}
                            loading={loading}
                            >
                                Confirm
                            </Button>
                            <Button
                            onClick={() => setVisible(!visible)}
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
