import useSWR, { SWRResponse, SWRConfiguration } from "swr";
import { Hex, hexToBytes } from "viem";

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
    status?: InspectStatus;
    exception_payload?: string;
    reports: InspectReport[];
    metadata?: InspectMetadata;
}

type ReportResponse = {
    reports: Hex[];
};

export type UseInspect = SWRResponse<InspectResponse> & ReportResponse;

// Cartesi Rollups v2 inspect: POST <node>/inspect/<application> with the raw
// payload bytes as the request body (the node forwards them verbatim to the
// machine — it does not unwrap a JSON envelope or hex-decode a string).
const inspectFetcher = async ([endpoint, payload]: [
    string,
    Hex,
]): Promise<InspectResponse> => {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        // send the raw bytes (the ArrayBuffer, a clean BodyInit)
        body: hexToBytes(payload).buffer as ArrayBuffer,
    });
    return response.json();
};

export const useInspect = (
    application: string,
    payload?: Hex,
    options?: SWRConfiguration
): UseInspect => {
    const swr = useSWR<InspectResponse>(
        () => (payload ? [`${url}/${application}`, payload] : null),
        inspectFetcher,
        options
    );

    const response = swr.data;
    let reports: InspectReport[] = [];
    // accept reports when the inspect succeeded (status absent => tolerate)
    if (
        response?.reports &&
        (!response.status || response.status === InspectStatus.Accepted)
    ) {
        reports = response.reports;
    }

    return { ...swr, reports: reports.map((r) => r.payload) };
};
