// @ts-check
import path from 'node:path';
import {  } from 'node:crypto';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { withSentryConfig } from '@sentry/nextjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' }
];

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  productionBrowserSourceMaps: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ]
  },
  compress: true
}

const sentryWebpackPluginOptions = {
  silent: false,
  include: '.',
  ignore: ['node_modules'],
  url: 'https://sentry.io/',
  org: 'otakimi',
  project: 'shaynlink',
  authToken: process.env.DNS_TOKEN,
  configFile: path.join(__dirname, 'sentry.properties')
}

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
