import { TWorkerMess } from "../models/worker";
console.log("🐝 Worker: I'm a worker!");

const onmessage = (event: MessageEvent<TWorkerMess>) => {
    console.log("🐝 Worker: Message received from main script");
    const data = event.data;
    const result = data[0] + data[1];

    const workerResult = "Result: " + result;
    console.log("🐝 Worker: Posting message back to main script");
    postMessage(workerResult);
};

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
    });
});

addEventListener("message", onmessage);
