import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/resume/:file*.pdf",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};
export default config;
