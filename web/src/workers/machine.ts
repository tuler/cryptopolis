import { TWorkerMess } from "../models/worker";
console.log("🐝 Worker: I'm a worker!");

importScripts("/machine.js");
/* @ts-ignore */
createModule({
    locateFile: (path: string, scriptDirectory: string) => {
        console.log("🐝 Worker: locateFile", path, scriptDirectory);
        return `/${path}`;
    },
}).then((module: any) => {
    console.log("🐝 Worker: Module loaded", module);
    module.ready.then(() => {
        module._hello();
        module._load();

        // let browser know module is loaded
        postMessage("🐝 Worker: Module loaded");

        addEventListener("message", (event: MessageEvent<TWorkerMess>) => {
            console.log("🐝 Worker: Message received from main script");
            const data = event.data;
            const result = data[0] + data[1];

            const workerResult = "Result: " + result;
            console.log("🐝 Worker: Posting message back to main script");
            postMessage(workerResult);
        });
    });
});
