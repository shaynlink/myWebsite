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
  include: '.',
  ignore: ['node_modules'],
  url: 'https://sentry.io/',
  org: 'otakimi',
  project: 'shaynlink',
  authToken: process.env.DNS_TOKEN,
  configFile: path.join(__dirname, 'sentry.properties')
}

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
