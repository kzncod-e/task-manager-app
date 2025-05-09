/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Optional: Ignore ESLint during builds
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://pm-s3-bucket1.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
