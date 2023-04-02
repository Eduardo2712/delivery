/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: false,
    experimental: {
        appDir: true,
    },
    images: {
        domains: ["loremflickr.com", "via.placeholder.com"]
    },
};

export default nextConfig;
