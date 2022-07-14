import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import * as gtm from '../lib/gtm';
import { randomBytes } from 'node:crypto';

interface Props {
    lang: string;
}

const prod = process.env.NODE_ENV == 'production';

function getCsp(nonce: string): string {
    const contentSecurityPolicy = `
        default-src 'self' o1113799.ingest.sentry.io;
        script-src 'self' www.googletagmanager.com 'nonce-${nonce}' ${prod ? '' : "'unsafe-eval'"} 'unsafe-inline';
        child-src www.shaynlink.dev;
        style-src 'self' 'unsafe-inline' www.shaynlink.dev 'nonce-${nonce}' data:;
        font-src 'self' fonts.gstatic.com github.com;
        connect-src 'self' vitals.vercel-insights.com o1113799.ingest.sentry.io;
    `;

    return contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim();
}

export default class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return {  ...initialProps, lang: ctx.query.lng || 'en',};
    }

    render() {
        const nonce = randomBytes(8).toString('base64');

        return (
            <Html lang={this.props.lang}>
                <Head nonce={nonce as string}>
                    <meta httpEquiv="Content-Security-Policy" content={getCsp(nonce)} />
                    <meta name="referrer" content="strict-origin" />
                </Head>
                <body>
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${gtm.GTM_ID}`}
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                        />
                    </noscript>
                    <Main />
                    <NextScript nonce={nonce} />
                </body>
            </Html>
        )
    }
}