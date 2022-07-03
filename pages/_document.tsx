import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import * as gtm from '../lib/gtm';

interface Props {
    lang: string;
}

export default class MyDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return {  ...initialProps, lang: ctx.query.lng || 'en' };
    }

    render() {
        return (
            <Html lang={this.props.lang}>
                <Head />
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
                    <NextScript />
                </body>
            </Html>
        )
    }
}