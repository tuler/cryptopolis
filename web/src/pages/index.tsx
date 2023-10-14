import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    useEffect(() => {
        const machineWorker = new Worker(
            new URL("../workers/machine", import.meta.url)
        );

        machineWorker.onmessage = (event) => {
            console.log("🍏 Message received from worker: ", event.data);
        };

        machineWorker.onerror = (event) => {
            if (event instanceof Event) {
                console.log("🍎 Error message received from worker: ", event);
                return event;
            }

            console.log("🍎 Unexpected error: ", event);
            throw event;
        };

        machineWorker.postMessage([1, 2]);

        return () => {
            machineWorker.terminate();
        };
    }, []);

    return (
        <>
            <Head>
                <title>Cryptopolis</title>
                <meta name="description" content="Cryptopolis" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main} ${inter.className}`}></main>
        </>
    );
}
