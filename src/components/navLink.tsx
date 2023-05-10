import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ReactNode } from 'react';

interface NavLinkProps {
    href: string;
    children: ReactNode;
    className?: string | ((active: boolean) => string | undefined);
}

function NavLink({ href, children, className }: NavLinkProps) {
    const pathname = usePathname();

    const getClasses = (): string | undefined => {
        if (typeof className === 'string') return className;
        else return className ? className(pathname == href) : undefined;
    };

    return (
        <Link href={href} className={getClasses()}>
            {children}
        </Link>
    );
}

export default NavLink;
