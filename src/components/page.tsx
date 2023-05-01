import Head from 'next/head';
import { ReactNode } from 'react';

interface PageProps {
    title: string;
    children: ReactNode;
}

function Page({ title, children }: PageProps) {
    const titleDoc = title + ' - playnow.io';
    return (
        <>
            <Head>
                <title>{titleDoc}</title>
            </Head>
            <div className="px-4">{children}</div>
        </>
    );
}

export default Page;
