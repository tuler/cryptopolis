"use client";
import {
    erc20PortalAddress,
    useReadErc20Allowance,
    useReadErc20Decimals,
    useReadErc20Symbol,
    useWriteErc20Approve,
    useReadErc20BalanceOf,
    useWriteErc20PortalDepositErc20Tokens,
    useSimulateErc20Approve,
    useSimulateErc20PortalDepositErc20Tokens,
    useSimulateTestTokenMint,
    useWriteTestTokenMint,
} from "@/hooks/contracts";
import {
    Anchor,
    Button,
    Center,
    Group,
    Input,
    Loader,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC } from "react";
import { TbArrowDown } from "react-icons/tb";
import { Address, formatUnits, parseUnits } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";
import {
    TransactionProgress,
    TransactionReadStageStatus,
    TransactionWriteStageStatus,
} from "./TransactionProgress";
import { useInspectBalance } from "@/hooks/game";
import { useDappAddress } from "@/hooks/cartesi";

type DepositProps = {
    address: Address;
    token: Address;
};

export const transactionButtonState = (
    simulate: TransactionReadStageStatus,
    execute: TransactionWriteStageStatus,
    wait: TransactionReadStageStatus,
    simulated: boolean,
    disableOnSuccess: boolean = true,
) => {
    const loading =
        simulate.status === "pending" ||
        execute.status === "pending" ||
        wait.status === "pending";

    const disabled =
        simulate.error != null ||
        (disableOnSuccess && wait.status === "success") ||
        !simulated;

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

export const Deposit: FC<DepositProps> = ({ address, token }) => {
    // on-chain application address, resolved from the application name
    const dapp = useDappAddress();

    // token metadata from the ERC-20 contract
    const { data: tokenSymbol } = useReadErc20Symbol({ address: token });
    const { data: tokenDecimals } = useReadErc20Decimals({ address: token });
    const symbol = tokenSymbol ?? "";
    const decimals = tokenDecimals ?? 18;

    // form for the amount
    const form = useForm({
        initialValues: { amount: "0" },
        validateInputOnChange: true,
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

    // query L1 balance from ERC-20 (poll every 3s)
    const { data: l1Balance, isLoading: l1BalanceLoading } =
        useReadErc20BalanceOf({
            address: token,
            args: [address],
            query: { refetchInterval: 3000 },
        });

    // query L2 balance from dapp inspect server
    const { balance: l2Balance, isLoading: l2BalanceLoading } =
        useInspectBalance(address, { refreshInterval: 3000 });

    // query allowance from ERC-20 (poll every 3s)
    const { data: allowance, isLoading: allowanceLoading } =
        useReadErc20Allowance({
            address: token,
            args: [address, erc20PortalAddress],
            query: { refetchInterval: 3000 },
        });

    // faucet: the TestToken's public mint(value) mints to msg.sender (the
    // connected user); 20000 tokens is enough to create one city
    const mintAmount = 20000n * 10n ** 18n;
    const mintSimulate = useSimulateTestTokenMint({
        address: token,
        args: [mintAmount],
        query: { enabled: address != undefined },
    });
    const mint = useWriteTestTokenMint();
    const mintWait = useWaitForTransactionReceipt({ hash: mint.data });
    const mintLoading = mint.isPending || mintWait.isLoading;

    // simulate approve transaction
    const approveSimulate = useSimulateErc20Approve({
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

    // simulate deposit transaction
    const depositSimulate = useSimulateErc20PortalDepositErc20Tokens({
        args: [token, dapp!, amount, "0x"],
        query: {
            enabled:
                dapp != undefined &&
                amount != undefined &&
                l1Balance != undefined &&
                allowance != undefined &&
                amount <= l1Balance &&
                amount <= allowance,
        },
    });
    const deposit = useWriteErc20PortalDepositErc20Tokens();
    const depositWait = useWaitForTransactionReceipt({ hash: deposit.data });

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
        transactionButtonState(
            approveSimulate,
            approve,
            approveWait,
            approveSimulate.isSuccess,
            false,
        );
    const { disabled: depositDisabled, loading: depositLoading } =
        transactionButtonState(
            depositSimulate,
            deposit,
            depositWait,
            depositSimulate.isSuccess,
            true,
        );

    return (
        <Stack align="stretch">
            <Paper bg="black" p={20}>
                <Stack gap={5}>
                    <Group gap={5} justify="space-between">
                        <Group gap={5}>
                            <Text>From: </Text>
                            <ConnectButton showBalance={false} />
                        </Group>
                        <Anchor
                            component="button"
                            type="button"
                            onClick={() =>
                                mintSimulate.data &&
                                mint.writeContract(mintSimulate.data.request)
                            }
                            c={
                                mintSimulate.data && !mintLoading
                                    ? undefined
                                    : "dimmed"
                            }
                        >
                            {mintLoading ? <Loader size={14} /> : "Get tokens"}
                        </Anchor>
                    </Group>
                    <Input placeholder="0" {...form.getInputProps("amount")} />
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
                simulate={approveSimulate}
                execute={approve}
                wait={approveWait}
            />
            <TransactionProgress
                simulate={depositSimulate}
                execute={deposit}
                wait={depositWait}
            />
            <SimpleGrid cols={2}>
                <Button
                    size="lg"
                    disabled={!needApproval || approveDisabled}
                    onClick={() =>
                        approveSimulate.data &&
                        approve.writeContract(approveSimulate.data.request)
                    }
                >
                    Approve
                </Button>
                <Button
                    size="lg"
                    disabled={!canDeposit || depositDisabled}
                    onClick={() =>
                        depositSimulate.data &&
                        deposit.writeContract(depositSimulate.data.request)
                    }
                >
                    Deposit
                </Button>
            </SimpleGrid>
        </Stack>
    );
};
