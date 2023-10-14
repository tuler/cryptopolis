/** @type {import('next').NextConfig} */
const nextConfig = {
    /*experimental: {
        nextScriptWorkers: true,
    },
    webpack(config) {
        config.output.webassemblyModuleFilename =
            "static/wasm/[modulehash].wasm";
        config.experiments = { asyncWebAssembly: true };
        return config;
    },*/
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Cross-Origin-Embedder-Policy",
                        value: "require-corp",
                    },
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
