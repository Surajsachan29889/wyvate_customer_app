/** @type {import('next').NextConfig} */
const nextConfig = {

    reactStrictMode : false,

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
          },
          {
            protocol: 'http',
            hostname: 'wyvatedev.s3.amazonaws.com',
          },
          {
            protocol: 'https',
            hostname: 'rukminim2.flixcart.com',
          },
          {
            protocol: 'https',
            hostname: 'dummyimage.com',
          },
       
        ],
       
      },

};

export default nextConfig;
