import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  rewrites() {
    const apiBaseUrl = process.env.API_BASE_URL || "https://liushushu-api-latest.onrender.com";
    return [
      {
        source: "/api/:path*",
        destination: `${apiBaseUrl}/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
