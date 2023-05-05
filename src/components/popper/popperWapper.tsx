import { ReactNode } from 'react';

interface PopperWapperProps {
    children: ReactNode;
    className?: string;
}

function PopperWapper({ children, className }: PopperWapperProps) {
    return (
        <div className={`border-2 p-2 bg-secondary-2 text-neutral-100 rounded overflow-hidden shadow ${className}`}>
            {children}
        </div>
    );
}

export default PopperWapper;
