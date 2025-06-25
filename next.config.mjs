/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: require.resolve('buffer/'),
      };
      config.plugins.push(
        new (require('webpack').ProvidePlugin)({
          Buffer: ['buffer', 'Buffer'],
        })
      );
    }
    return config;
  },
}

export default nextConfig