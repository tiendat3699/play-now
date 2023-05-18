import { ReactNode, useEffect, useRef } from 'react';

interface InfiniteScrollProps {
    children: ReactNode;
    hasMore: boolean;
    loadMore: () => any;
}

function InfiniteScroll({ children, hasMore, loadMore }: InfiniteScrollProps) {
    const pageEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (hasMore) {
            const pageEnd = pageEndRef.current;
            const observer: IntersectionObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            });

            !!pageEnd && observer.observe(pageEnd);

            return () => {
                !!pageEnd && observer.unobserve(pageEnd);
            };
        }
    }, [hasMore, loadMore]);
    return (
        <div>
            {children}
            {hasMore && <div ref={pageEndRef} />}
        </div>
    );
}

export default InfiniteScroll;
