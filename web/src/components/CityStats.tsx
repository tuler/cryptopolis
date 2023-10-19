"use client";
import { Badge, Group } from "@mantine/core";
import { FC } from "react";

type CityStatsProps = {
    population: number;
    totalFunds: number;
    cityTime: number;
};

// time unit in game engine
const CITYTIMES_PER_MONTH = 4;
const CITYTIMES_PER_YEAR = CITYTIMES_PER_MONTH * 12;

export const CityStats: FC<CityStatsProps> = ({
    population,
    totalFunds,
    cityTime,
}) => {
    let numberFormatter = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
    });
    let currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });
    const dateFormat = new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
    });

    const month =
        1 + Math.floor((cityTime % CITYTIMES_PER_YEAR) / CITYTIMES_PER_MONTH);
    const year = 1900 + Math.floor(cityTime / CITYTIMES_PER_YEAR);
    const date = new Date(Date.UTC(year, month, 1));

    return (
        <Group>
            <Badge variant="default" size="xl" leftSection="👨‍👧‍👦">
                {numberFormatter.format(population)}
            </Badge>
            <Badge variant="default" size="xl" leftSection="💰">
                {currencyFormatter.format(totalFunds)}
            </Badge>
            <Badge variant="default" size="xl" leftSection="📆">
                {dateFormat.format(date)}
            </Badge>
        </Group>
    );
};
