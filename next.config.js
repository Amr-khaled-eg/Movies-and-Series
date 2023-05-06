/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
module.exports = {
  images: {
    domains: ["image.tmdb.org"],

    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "image.tmdb.org",
    //     pathname: "/t/p/original/**",
    //     port: "",
    //   },
    // ],
  },
};
