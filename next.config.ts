import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
    output: 'export',
    sassOptions: {
        loadPaths: [path.join(process.cwd(), 'src')],
    },
};

export default nextConfig;
