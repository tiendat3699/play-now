import Head from 'next/head';
import React, { ReactNode, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '~/firebase';
import { GoSignIn } from 'react-icons/go';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface PageProps {
    title: string;
    children: ReactNode;
    requrieAuth?: boolean;
}

function Page({ title, children, requrieAuth }: PageProps) {
    const titleDoc = title + ' - playnow.io';
    const [user, loading] = useAuthState(auth);
    const [authentiacted, setAuthentiacted] = useState<boolean>(!requrieAuth || !!user);

    useEffect(() => {
        if (requrieAuth) {
            if (!loading) {
                setAuthentiacted(!!user);
            }
        }
    }, [loading, requrieAuth, user]);

    return (
        <>
            <Head>
                <title>{titleDoc}</title>
            </Head>
            <div className="px-4">
                {authentiacted ? (
                    children
                ) : (
                    <>
                        {loading ? (
                            <div className="fixed top-0 right-0 bottom-0 left-0 bg-black/[0.6] flex z-20">
                                <AiOutlineLoading3Quarters className="text-6xl animate-spin m-auto" />
                            </div>
                        ) : (
                            <div className="mt-14">
                                <GoSignIn className="mx-auto mb-4 text-5xl" />
                                <p className="text-center text-2xl font-semibold">Oop! You must be Sign In!</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default Page;
