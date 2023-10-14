import { createApp } from "@deroll/app";
import { toHex } from "viem";

const app = createApp({ url: "http://127.0.0.1:5004" });

app.addAdvanceHandler(async (data) => {
    console.log(JSON.stringify(data.metadata));
    app.createNotice({ payload: toHex("hello") });
    return "accept";
});

app.start().catch((e) => process.exit(1));
