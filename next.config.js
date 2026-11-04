/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Dev only: lets devices on the LAN (the "Network" URL) load dev-server
  // assets; without this Next blocks them and pages render without JS.
  // Update the IP if your machine gets a different DHCP address.
  allowedDevOrigins: ["192.168.0.165", "192.168.50.29", "10.157.118.88"],
};

module.exports = nextConfig;
