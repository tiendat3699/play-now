import Skeleton, { SkeletonProps } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonElement(props: SkeletonProps) {
    return <Skeleton highlightColor="#2a2a2a" baseColor="#202020" {...props} />;
}

export default SkeletonElement;
