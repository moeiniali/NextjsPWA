const {
 PHASE_DEVELOPMENT_SERVER,
 PHASE_PRODUCTION_BUILD,
} = require("next/constants");

/** @type {import("next").NextConfig} */
const nextConfig = {
 reactStrictMode: true,
};

module.exports = (phase) => {
 if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {

  const withPWA = require("@ducanh2912/next-pwa").default({
   workboxOptions: {
    // Workbox options go here...
    disableDevLogs: true
   },
   dest: "public",
   cacheOnFrontEndNav: true,
   aggressiveFrontEndNavCaching: true,
   reloadOnOnline: true,
   swcMinify: true,
   disable: false,
   register: true,
   scope: "/app",
   sw: "service-worker.js",
  });
  return withPWA(nextConfig);
 }
 return nextConfig;
};







