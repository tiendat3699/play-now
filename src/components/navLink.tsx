import Link from 'next/link';
import { useRouter } from 'next/router';

import { ReactNode } from 'react';

interface NavLinkProps {
    href: string;
    children: ReactNode;
    props?: ReactNode;
    className?: string | ((active: boolean) => string | undefined);
}

function NavLink({ href, children, className, ...props }: NavLinkProps) {
    const router = useRouter();

    const getClasses = (): string | undefined => {
        if (typeof className === 'string') return className;
        else return className ? className(router.pathname === href) : undefined;
    };

    return (
        <Link href={href} className={getClasses()}>
            {children}
        </Link>
    );
}

export default NavLink;
