import useSWR, { Key, SWRResponse, SWRConfiguration } from "swr";
import { Hex } from "viem";

const url = process.env.NEXT_PUBLIC_INSPECT_URL;
if (!url)
    throw new Error(
        "NEXT_PUBLIC_INSPECT_URL environment variable is not defined"
    );

export enum InspectStatus {
    Accepted = "Accepted",
    Rejected = "Rejected",
    Exception = "Exception",
    MachineHalted = "MachineHalted",
    CycleLimitExceeded = "CycleLimitExceeded",
    TimeLimitExceeded = "TimeLimitExceeded",
}

export interface InspectReport {
    payload: Hex;
}

export interface InspectMetadata {
    active_epoch_index: number;
    current_input_index: number;
}

export interface InspectResponse {
    status: InspectStatus;
    exception_payload: string;
    reports: InspectReport[];
    metadata: InspectMetadata;
}

type ReportResponse = {
    reports: Hex[];
};

export type UseInspect = SWRResponse<InspectResponse> & ReportResponse;

export const useInspect = (
    key: Key,
    options?: SWRConfiguration
): UseInspect => {
    const swr = useSWR<InspectResponse>(
        () => (key ? `${url}${key}` : false),
        options
    );

    const response = swr.data;
    let reports: InspectReport[] = [];
    if (response && response.status == InspectStatus.Accepted) {
        reports = response.reports;
    }

    return { ...swr, reports: reports.map((r) => r.payload) };
};
