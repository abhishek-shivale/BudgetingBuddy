/** @type {import('next').NextConfig} */


const nextConfig = {
    images : {
        dangerouslyAllowSVG: true,
        formats: ['image/avif', 'image/webp'],      
    },
    webpack(config) {
        config.module.rules.push({
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ['@svgr/webpack'],
        })
    
        return config
      },
};

export default nextConfig;
