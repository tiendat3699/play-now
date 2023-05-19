import { ReactNode, useEffect, useRef } from 'react';

interface InfiniteScrollProps {
    children: ReactNode;
    className?: string;
    hasMore?: boolean;
    loading?: boolean;
    loader?: ReactNode;
    loadMore?: () => any;
}

function InfiniteScroll({ children, className, loading, loader, hasMore, loadMore }: InfiniteScrollProps) {
    const pageEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (hasMore) {
            const pageEnd = pageEndRef.current;
            const observer: IntersectionObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    loadMore?.();
                }
            });

            !!pageEnd && observer.observe(pageEnd);

            return () => {
                !!pageEnd && observer.unobserve(pageEnd);
            };
        }
    }, [hasMore, loadMore]);
    return (
        <div className={className}>
            {children}
            {loading && loader}
            {hasMore && <div ref={pageEndRef} />}
        </div>
    );
}

export default InfiniteScroll;
