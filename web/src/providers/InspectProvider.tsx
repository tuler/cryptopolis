import { SWRConfig, SWRConfiguration } from "swr";

const fetcher = async <JSON = any,>(
    input: RequestInfo,
    init?: RequestInit,
): Promise<JSON> => {
    const res = await fetch(input, init);
    return res.json();
};

const swrConfig: SWRConfiguration = {
    fetcher: fetcher,
};

const InspectProvider = ({ children }: { children: React.ReactNode }) => {
    return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
};

export default InspectProvider;
