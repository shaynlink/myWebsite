// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'url';
import { withSentryConfig } from '@sentry/nextjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ];
  },
  compress: true
}

const sentryWebpackPluginOptions = {
  silent: false,
  url: process.env.NEXT_PUBLIC_SENTRY_DSN,
  org: 'otakimi',
  project: 'shaynlink',
  authToken: process.env.DNS_TOKEN,
  configFile: path.join(__dirname, '.sentryclirc')
}

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
