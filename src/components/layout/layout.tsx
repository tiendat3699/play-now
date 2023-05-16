import { PropsWithChildren, useEffect, useState } from 'react';
import Link from 'next/link';

import { RiGithubFill, RiLinkedinBoxFill, RiHeartFill, RiPhoneFill, RiArrowDropUpLine } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
import { IoIosMail } from 'react-icons/io';

import { Open_Sans } from 'next/font/google';
import Button from '../button';
import Header from './header';
import Footer from './footer';

const openSans = Open_Sans({ subsets: ['vietnamese', 'latin'] });

function Layout({ children }: PropsWithChildren) {
    const [scrollTopBtn, setCcrollTopBtn] = useState<boolean>(false);
    useEffect(() => {
        const handelScroll = (): void => {
            if (window.scrollY > 100) {
                setCcrollTopBtn(true);
            } else {
                setCcrollTopBtn(false);
            }
        };
        window.addEventListener('scroll', handelScroll);

        return () => window.removeEventListener('scroll', handelScroll);
    }, []);

    return (
        <div className={`min-h-screen flex flex-col bg-primary ${openSans.className}`}>
            <Header />
            <div className="container flex-1 mb-40">{children}</div>
            <Footer />
            <AnimatePresence>
                {scrollTopBtn && (
                    <motion.div
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed right-6 bottom-16 z-40"
                    >
                        <Button
                            theme="translucent"
                            size="sm"
                            className="px-[8px] shadow-md"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <RiArrowDropUpLine className="text-3xl" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Layout;
