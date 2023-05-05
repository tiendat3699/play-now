import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
    RiUserFill,
    RiGithubFill,
    RiLinkedinBoxFill,
    RiHeartFill,
    RiPhoneFill,
    RiArrowDropUpLine,
    RiUpload2Fill,
} from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
import NavLink from './navLink';
import { IoIosMail } from 'react-icons/io';

import { Open_Sans } from 'next/font/google';
import Button from './button';

const openSans = Open_Sans({ subsets: ['vietnamese', 'latin'] });

interface NavItem {
    title: string;
    href: string;
    icon?: ReactNode;
    separate?: boolean;
}

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

    const navItems: NavItem[] = [
        { title: 'HOME', href: '/' },
        { title: 'GAMES', href: '/games' },
        { title: 'MY GAMES', href: '/my-games' },
        { title: 'ABOUT', href: '/about' },
        { title: 'CONTACT', href: '/contact' },
        { title: 'UPLOAD GAME', href: '/upload', separate: true, icon: <RiUpload2Fill /> },
    ];

    return (
        <div className={`min-h-screen flex flex-col bg-primary ${openSans.className}`}>
            <header className="bg-secondary-1">
                <nav className="flex items-center">
                    <Link
                        href="/"
                        className="flex w-14 ml-1 opacity-90 hover:opacity-100 transition-opacity duration-200 px-3"
                    >
                        <Image src={'/Logo.png'} alt="logo" height={100} width={100} className="w-7 m-auto" priority />
                    </Link>
                    <ul className="flex text-[#ccc] text-2xs tracking-wider items-center">
                        {navItems.map((navItem) => {
                            const checkActive = (active: boolean): string =>
                                `
                                    flex items-center px-2.5 relative transition-all duration-200 h-13
                                    after:transition-all after:duration-200
                                    after:absolute after:bottom-0 after:left-0 after:right-0 after:bg-accent
                                    hover:text-white
                                    hover:after:h-1
                                    ${
                                        navItem.separate
                                            ? 'ml-6 before:absolute before:inset-y-3 before:-left-3 before:bg-[#ccc] before:w-px'
                                            : ''
                                    }
                                    ${active ? 'after:h-1' : 'after:h-0'}
                                `;
                            return (
                                <li key={navItem.title}>
                                    <NavLink href={navItem.href} className={checkActive}>
                                        {navItem.icon && <span className="mr-2 text-sm">{navItem.icon}</span>}
                                        <span>{navItem.title}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="ml-auto text-3xs flex items-center">
                        <Link
                            href="/"
                            className="flex items-center h-13 px-6 transition-all duration-200 text-[#ccc] tracking-wider hover:text-white"
                        >
                            <RiUserFill className="mr-2 text-base" />
                            SIGN IN
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center h-13 px-6 transition-all duration-200 bg-accent text-white tracking-wider opacity-95 hover:opacity-100"
                        >
                            SIGN UP
                        </Link>
                    </div>
                </nav>
            </header>
            <div className="container flex-1 mb-40">{children}</div>
            <footer className="bg-secondary-1 h-44 text-[#ccc] flex flex-col py-3 px-20">
                <ul className="flex m-auto space-x-4 text-4xl">
                    <li className="transition-colors hover:text-[#ccc]/[0.7]">
                        <Link href={'https://github.com/tiendat3699'}>
                            <RiGithubFill />
                        </Link>
                    </li>
                    <li className="transition-colors hover:text-[#ccc]/[0.7]">
                        <Link href={'https://www.linkedin.com/in/ti%E1%BA%BFn-%C4%91%E1%BA%A1t-%C4%91inh-b5595223a/'}>
                            <RiLinkedinBoxFill />
                        </Link>
                    </li>
                    <li className="transition-colors hover:text-[#ccc]/[0.7]">
                        <Link href={'tel:0362231103'}>
                            <RiPhoneFill />
                        </Link>
                    </li>
                    <li className="transition-colors hover:text-[#ccc]/[0.7]">
                        <Link href={'mailto:tiendat361999@gmail.com'}>
                            <IoIosMail />
                        </Link>
                    </li>
                </ul>
                <ul className="m-auto flex space-x-4 text-sm">
                    <li className="underline underline-offset-2 hover:text-[#ccc]/[0.7] transition-colors">
                        <Link href="/about">About</Link>
                    </li>
                    <li className="underline underline-offset-2 hover:text-[#ccc]/[0.7] transition-colors">
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
                <p className="flex w-full items-center justify-center mt-auto mx-auto text-sm border-t border-[#ccc]/[0.2] pt-2">
                    playnow.io developed by &nbsp;
                    <strong className="text-accent">Tien Dat</strong>
                    &nbsp; with a lots of love! &nbsp;
                    <RiHeartFill className="text-[red] text-lg" />
                </p>
            </footer>
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
