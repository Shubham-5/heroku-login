/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["id.heroku.com", "signup.heroku.com"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
