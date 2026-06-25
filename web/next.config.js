/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    // `same-origin-allow-popups` (instead of `same-origin`) keeps
                    // the window.opener link to popups so smart-wallet flows
                    // (Base/Coinbase) work. Full cross-origin isolation (COOP
                    // `same-origin` + COEP `require-corp`, for SharedArrayBuffer /
                    // an in-browser WASM Cartesi Machine) isn't used yet and is
                    // incompatible with those wallet popups.
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin-allow-popups",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
