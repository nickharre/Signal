import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Signal",
  images: { unoptimized: true },
};
export default nextConfig;
