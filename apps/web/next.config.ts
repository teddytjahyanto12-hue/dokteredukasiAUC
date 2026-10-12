import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pisahkan hasil verifikasi dari cache server yang dipakai PC lain.
  distDir: process.env.DEA_BUILD_DIR || ".next",
  outputFileTracingRoot: process.cwd(),
  experimental: {
    // Unggahan PDF materi dan bukti transfer lewat server action (lihat MAX_UPLOAD_MB).
    serverActions: { bodySizeLimit: "50mb" },
  },
};

export default nextConfig;
