import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Unggahan PDF materi dan bukti transfer lewat server action (lihat MAX_UPLOAD_MB).
    serverActions: { bodySizeLimit: "50mb" },
  },
};

export default nextConfig;
