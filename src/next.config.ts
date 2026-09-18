import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma", "@google/generative-ai"],
  outputFileTracingExcludes: {
    "*": [
      "node_modules/.prisma/client/libquery_engine-*",
      "!node_modules/.prisma/client/libquery_engine-debian*",
      "node_modules/prisma/libquery_engine-*",
      "!node_modules/prisma/libquery_engine-debian*",
    ],
  },
};

export default nextConfig;