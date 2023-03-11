/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: false,
    images: {
        domains: ["loremflickr.com"]
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/",
                permanent: true
            }
        ];
    }
};

export default nextConfig;
