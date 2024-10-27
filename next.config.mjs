/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'airbnbnew.cybersoft.edu.vn',
              port: '',
              pathname: '/**',
          },
          {
              protocol: 'https',
              hostname: 'cdn3.ivivu.com',
              port: '',
              pathname: '/**',
          },
      ],
  },
};

export default nextConfig;
