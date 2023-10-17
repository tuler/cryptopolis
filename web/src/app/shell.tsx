"use client";
import {
    AppShell,
    Burger,
    Button,
    Group,
    NavLink,
    Switch,
    Title,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { TbHome, TbMoonStars, TbPigMoney, TbSun } from "react-icons/tb";
import Link from "next/link";

const Shell: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [opened, { toggle }] = useDisclosure();
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: {
                    desktop: true,
                    mobile: !opened,
                },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Group justify="space-between" style={{ flex: 1 }}>
                        <Title>🏗️ 🏭 🏘️ 🏨 🏚️ 🏢 🏫 </Title>
                        <Group ml="xl" gap="md" visibleFrom="sm">
                            <Link href="/">
                                <Button
                                    variant="subtle"
                                    leftSection={<TbHome />}
                                >
                                    Home
                                </Button>
                            </Link>
                            <Button
                                variant="transaparent"
                                leftSection={<TbPigMoney />}
                                disabled
                            >
                                Deposit
                            </Button>
                            <ConnectButton />
                            <Switch
                                checked={colorScheme === "dark"}
                                onChange={() => toggleColorScheme()}
                                size="md"
                                onLabel={
                                    <TbSun color={theme.white} size="1rem" />
                                }
                                offLabel={
                                    <TbMoonStars
                                        color={theme.colors.gray[6]}
                                        size="1rem"
                                    />
                                }
                            />
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar py="md" px={4}>
                <NavLink label="Home" href="/" leftSection={<TbHome />} />
                <NavLink
                    disabled
                    label="Deposit"
                    href="/deposit"
                    leftSection={<TbPigMoney />}
                />
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
};
export default Shell;
