import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const isDevelopment = process.env.NODE_ENV === "development";
const repositoryName = process.env.GITHUB_PROJECT_NAME || "frontend-crypto";
const isRootRepo = repositoryName.endsWith(".github.io");

const shouldUseBasePath = isGithubPages && !isRootRepo && !isDevelopment;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: isGithubPages && !isDevelopment ? "export" : undefined,
  basePath: shouldUseBasePath ? `/${repositoryName}` : "",
  assetPrefix: shouldUseBasePath ? `/${repositoryName}` : "",
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
  async redirects() {
    if (!isGithubPages) {
      return [
        {
          source: "/",
          destination: "/home",
          permanent: false,
        },
      ];
    }
    return [];
  },
  async headers() {
    if (isGithubPages) {
      return [];
    }
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-Requested-With, Content-Type" },
        ],
      },
    ];
  },
};

export default nextConfig;

