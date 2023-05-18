import '~/styles/globals.css';
import type { AppProps } from 'next/app';

import Layout from '~/components/layout';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['vietnamese', 'latin'] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={'text-neutral-100 ' + inter.className}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </div>
    );
}
