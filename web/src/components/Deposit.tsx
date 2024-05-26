"use client";
import {
    erc20PortalAddress,
    // useErc20Allowance,
    useReadErc20Allowance,
    // useErc20Approve,
    useWriteErc20Approve,
    // useErc20BalanceOf,
    useReadErc20BalanceOf,
    // useErc20PortalDepositErc20Tokens,
    useWriteErc20PortalDepositErc20Tokens,
    // usePrepareErc20Approve,
    useSimulateErc20Approve,
    // usePrepareErc20PortalDepositErc20Tokens,
    useSimulateErc20PortalDepositErc20Tokens,
} from "@/hooks/contracts";
import {
    Button,
    Center,
    Group,
    Loader,
    NumberInput,
    Paper,
    SimpleGrid,
    Stack,
    Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC } from "react";
import { TbArrowDown } from "react-icons/tb";
import { Address, formatUnits, parseUnits } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";
import {
    TransactionProgress,
    TransactionStageStatus,
} from "./TransactionProgress";
import { useInspectBalance } from "@/hooks/game";

type DepositProps = {
    address: Address;
    dapp: Address;
    token: Address;
};

export const transactionButtonState = (
    prepare: TransactionStageStatus,
    execute: TransactionStageStatus,
    wait: TransactionStageStatus,
    disableOnSuccess: boolean = true,
) => {
    const loading =
        prepare.status === "pending" ||
        execute.status === "pending" ||
        wait.status === "pending";

    const disabled =
        prepare.error != null ||
        (disableOnSuccess && wait.status === "success");
    return { loading, disabled };
};

type BalanceProps = {
    label: string;
    decimals: number;
    symbol: string;
    value?: bigint;
    loading: boolean;
};
const Balance: FC<BalanceProps> = ({
    decimals,
    label,
    loading,
    symbol,
    value,
}) => (
    <Group gap={5}>
        <Text>{label}</Text>
        {value != undefined && <Text>{formatUnits(value, decimals)}</Text>}
        {value == undefined && !loading && <Text>&lt;unknown&gt;</Text>}
        {loading && <Loader size={16} />}
        <Text>{symbol}</Text>
    </Group>
);

export const Deposit: FC<DepositProps> = ({ address, dapp, token }) => {
    const symbol = "SIM"; // XXX: should actually come from querying token metadata
    const decimals = 18; // XXX: should actually come from querying token metadata

    // form for the amount
    const form = useForm({
        initialValues: { amount: "0" },
        validate: {
            amount: (value) =>
                isNaN(parseInt(value)) ? "Invalid amount" : null,
        },
        transformValues: (values) => {
            try {
                return { amount: parseUnits(values.amount, decimals) };
            } catch (e) {
                return { amount: 0n };
            }
        },
    });

    const { amount } = form.getTransformedValues();

    // query L1 balance from ERC-20
    const { data: l1Balance, isLoading: l1BalanceLoading } =
        useReadErc20BalanceOf({
            address: token,
            args: [address],
            // watch: true,
        });

    // query L2 balance from dapp inspect server
    const { balance: l2Balance, isLoading: l2BalanceLoading } =
        useInspectBalance(address, { refreshInterval: 3000 });

    // query allowance from ERC-20
    const { data: allowance, isLoading: allowanceLoading } =
        useReadErc20BalanceOf({
            address: token,
            // args: [address, erc20PortalAddress],
            args: [address],
            // watch: true,
        });

    // prepare approve transaction
    const approvePrepare = useSimulateErc20Approve({
        address: token,
        args: [erc20PortalAddress, amount],
        query: {
            enabled:
                amount != undefined &&
                allowance != undefined &&
                amount > allowance,
        },
    });
    const approve = useWriteErc20Approve();
    const approveWait = useWaitForTransactionReceipt({ hash: approve.data });

    // prepare deposit transaction
    const depositPrepare = useSimulateErc20PortalDepositErc20Tokens({
        args: [token, dapp, amount, "0x"],
        // address: token,
        // args: [erc20PortalAddress, amount],
        query: {
            enabled:
                amount != undefined &&
                l1Balance != undefined &&
                allowance != undefined &&
                amount <= l1Balance &&
                amount <= allowance,
        },
    });
    // const deposit = useWriteErc20PortalDepositErc20Tokens(depositPrepare.data);
    // const depositWait = useWaitForTransactionReceipt(deposit.data);
    const deposit = useWriteErc20PortalDepositErc20Tokens();
    const depositWait = useWaitForTransactionReceipt();

    // true if current allowance is less than the amount to deposit
    const needApproval =
        allowance != undefined && decimals != undefined && allowance < amount;

    const canDeposit =
        l1Balance != undefined &&
        allowance != undefined &&
        amount > 0 &&
        amount <= allowance &&
        amount <= l1Balance;

    const { disabled: approveDisabled, loading: approveLoading } =
        transactionButtonState(approvePrepare, approve, approveWait, false);
    const { disabled: depositDisabled, loading: depositLoading } =
        transactionButtonState(depositPrepare, deposit, depositWait, true);

    return (
        <Stack align="stretch">
            <Paper bg="black" p={20}>
                <Stack gap={5}>
                    <Group gap={5}>
                        <Text>From: </Text>
                        <ConnectButton showBalance={false} />
                    </Group>
                    <NumberInput
                        placeholder="0"
                        {...form.getInputProps("amount")}
                    />
                    <Group justify="space-between">
                        <Balance
                            label="Balance: "
                            decimals={decimals}
                            symbol={symbol}
                            loading={l1BalanceLoading}
                            value={l1Balance}
                        />
                        <Balance
                            label="Allowance: "
                            decimals={decimals}
                            symbol={symbol}
                            loading={allowanceLoading}
                            value={allowance}
                        />
                    </Group>
                </Stack>
            </Paper>
            <Center>
                <TbArrowDown size={30} />
            </Center>
            <Paper bg="black" p={30}>
                <Stack gap={0}>
                    <Group gap={5}>
                        <Text>To: </Text>
                        <ConnectButton
                            showBalance={false}
                            chainStatus="full"
                            accountStatus="address"
                        />
                        <Text fw={800}>@ 🏗️ Cryptopolis</Text>
                    </Group>
                    <Balance
                        label="Balance: "
                        decimals={decimals}
                        symbol={symbol}
                        value={l2Balance}
                        loading={l2BalanceLoading}
                    />
                </Stack>
            </Paper>
            <TransactionProgress
                prepare={approvePrepare}
                execute={approve}
                wait={approveWait}
            />
            <TransactionProgress
                prepare={depositPrepare}
                execute={deposit}
                wait={depositWait}
            />
            <SimpleGrid cols={2}>
                <Button
                    size="lg"
                    disabled={!needApproval || approveDisabled}
                    onClick={() =>
                        approvePrepare.data?.request &&
                        approve.writeContract(approvePrepare.data.request)
                    }
                >
                    Approve
                </Button>
                <Button
                    size="lg"
                    disabled={!canDeposit || depositDisabled}
                    onClick={() =>
                        depositPrepare.data?.request &&
                        deposit.writeContract(depositPrepare.data.request)
                    }
                >
                    Deposit
                </Button>
            </SimpleGrid>
        </Stack>
    );
};
