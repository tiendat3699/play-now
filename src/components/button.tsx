import { MouseEvent, ReactNode } from 'react';
import Link from 'next/link';

type theme = 'primary' | 'outline' | 'translucent';
type size = 'sm' | 'md' | 'lg';

interface ButtonProps {
    children: ReactNode;
    href?: string;
    theme?: theme;
    size?: size;
    className?: string;
    onClick?: (event: MouseEvent<HTMLElement>) => any;
    passProp?: any;
}

function Button({ href, children, theme, size, className, onClick, passProp }: ButtonProps) {
    let Comp: any = 'button';
    const props = {
        onClick,
        ...passProp,
    };

    if (href) {
        props.href = href;
        Comp = Link;
    }

    let themeClasses = 'bg-white text-primary hover:bg-accent hover:text-white';
    let sizeClasses = 'py-3 px-6 text-xs';
    if (theme == 'outline') {
        themeClasses = 'bg-transparent text-white border border-white hover:bg-white/[0.1]';
    } else if (theme == 'translucent') {
        themeClasses = 'bg-white/[0.3] text-white border border-white hover:bg-white/[0.9] hover:text-primary';
    }
    if (size == 'sm') {
        sizeClasses = 'py-2 px-4 text-2xs';
    } else if (size == 'lg') {
        sizeClasses = 'py-4 px-8 text-lg';
    }

    return (
        <Comp
            className={`inline-flex rounded font-medium tracking-wide select-none transition-colors duration-200 ${sizeClasses} ${themeClasses} ${className}`}
            {...props}
        >
            {children}
        </Comp>
    );
}

export default Button;
