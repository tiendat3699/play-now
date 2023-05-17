import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '~/firebase';

import NavLink from '../navLink';
import { RiUpload2Fill, RiGoogleFill, RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlineLoading } from 'react-icons/ai';
import Tippy from '@tippyjs/react/headless';

type NavItem = {
    title: string;
    href: string;
    icon?: ReactNode;
    separate?: boolean;
};

const navItems: NavItem[] = [
    { title: 'HOME', href: '/' },
    { title: 'GAMES', href: '/games' },
    { title: 'MY GAMES', href: '/my-games' },
    { title: 'ABOUT', href: '/about' },
    { title: 'CONTACT', href: '/contact' },
    { title: 'UPLOAD GAME', href: '/upload', separate: true, icon: <RiUpload2Fill /> },
];

function Header() {
    const [user, loading] = useAuthState(auth);

    const signIn = async () => {
        if (!loading) {
            try {
                const provider = new GoogleAuthProvider();
                await signInWithPopup(auth, provider);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const signOut = async () => {
        if (!loading) {
            await auth.signOut();
        }
    };

    const popperSignOut = (prop: any): ReactNode => {
        return (
            <div tabIndex={-1} {...prop}>
                <div className="bg-primary">
                    <button
                        onClick={signOut}
                        className="text-xs hover:bg-secondary-2 border rounded text-neutral-100 py-2 px-4 flex items-center transition-colors"
                    >
                        <RiLogoutBoxRLine className="text-lg mr-2" />
                        Sign out
                    </button>
                </div>
            </div>
        );
    };

    return (
        <header className="bg-secondary-1">
            <nav className="flex items-center">
                <Link
                    href="/"
                    className="flex w-14 ml-1 opacity-90 hover:opacity-100 transition-opacity duration-200 px-3"
                >
                    <Image
                        src={'/Logo.png'}
                        alt="logo"
                        width={100}
                        height={100}
                        className="w-7 h-auto m-auto"
                        placeholder="empty"
                        blurDataURL="/placeholder.jpg"
                    />
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
                <div className="ml-auto text-2xs flex items-center">
                    {user ? (
                        <Tippy interactive placement="bottom-end" offset={[0, 8]} render={popperSignOut}>
                            <div className="pr-6 flex items-center cursor-pointer">
                                <p className="text-xs text-neutral-100">{user.displayName}</p>
                                {user.photoURL && (
                                    <div className="relative rounded-full overflow-hidden w-8 h-8 ml-2 ring-1 ring-primary">
                                        <Image
                                            src={user.photoURL}
                                            alt="avatar"
                                            fill
                                            sizes="100%"
                                            placeholder="empty"
                                            blurDataURL="/placeholder.jpg"
                                        />
                                    </div>
                                )}
                            </div>
                        </Tippy>
                    ) : (
                        <button
                            onClick={signIn}
                            className="flex items-center h-13 px-6 transition-all duration-200 bg-accent text-white tracking-wider opacity-95 hover:opacity-100"
                        >
                            {loading ? (
                                <AiOutlineLoading className="mr-2 text-lg animate-spin" />
                            ) : (
                                <RiGoogleFill className="mr-2 text-lg" />
                            )}
                            SIGN IN WITH GOOGLE
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
