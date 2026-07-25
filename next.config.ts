import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error"] }
        : false,
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // 'unsafe-eval' serve solo in sviluppo (HMR di Turbopack).
              // In produzione non viene emesso: nessun eval()/new Function()
              // è usato nel codice applicativo.
              `script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com 'unsafe-inline'${
                isDev ? " 'unsafe-eval'" : ''
              }`,
              // 'unsafe-inline' su style-src è necessario: i componenti usano
              // l'attributo style={{...}} di React, che non supporta nonce.
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' https://www.google-analytics.com https://www.googletagmanager.com data:",
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
              "font-src 'self' data:",
              "frame-src 'none'",
              "frame-ancestors 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ],
      },
      {
        source: '/:path*.webp',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
};

export default nextConfig;
