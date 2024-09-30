// next.config.mjs

import withPWA from "next-pwa";

const nextConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Disable PWA in development
  // Other Next.js configurations can go here
});

export default nextConfig;
