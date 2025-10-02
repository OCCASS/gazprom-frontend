import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            excalibur$: path.resolve(
                "./node_modules/excalibur/build/dist/excalibur.js"
            ),
        };
        return config;
    }
};

export default nextConfig;
