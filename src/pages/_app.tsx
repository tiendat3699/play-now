import '~/styles/globals.css';
import type { AppProps } from 'next/app';

import Layout from '~/components/layout';

import { Inter } from 'next/font/google';

import NextNProgress from 'nextjs-progressbar';

const inter = Inter({ subsets: ['vietnamese', 'latin'] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <NextNProgress color="#0078f2" />
            <div className={'text-neutral-100 ' + inter.className}>
                <Component {...pageProps} />
            </div>
        </Layout>
    );
}
