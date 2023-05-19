import Image from 'next/image';
import Link from 'next/link';
import Button from './button';
import Preview from './popper/preview';
import SkeletonElement from './skeletonElement';

export interface CommonItemProps {
    thumb: string;
    title: string;
    link?: string;
    poster?: string;
    description?: string;
    screenShots?: string[];
    preview?: boolean;
    loading?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

function CommonItem({
    thumb,
    title,
    link,
    poster,
    description,
    screenShots,
    preview,
    loading,
    size = 'md',
}: CommonItemProps) {
    let LinkElement: any = 'div';
    if (link) {
        LinkElement = Link;
    }
    const linkProps = link
        ? {
              href: link,
          }
        : {};
    return (
        <Preview title={title} description={description} screenShots={screenShots} visible={preview}>
            <LinkElement {...linkProps} className={`group flex flex-col ${size}`}>
                <div className="group  relative group-[.md]:h-60 group-[.sm]:h-32 group-[.lg]:h-80">
                    {!loading ? (
                        <Image
                            src={thumb}
                            alt={title}
                            width={300}
                            height={600}
                            className="w-full h-full object-cover object-center rounded"
                            priority
                        />
                    ) : (
                        <SkeletonElement height={'100%'} />
                    )}
                    {title && (
                        <div className=" transition-all absolute z-10 flex top-0 right-0 bottom-0 left-0 bg-black/[0.6] opacity-0 group-hover:opacity-100 ">
                            <div className="transition-all m-auto translate-y-6 group-hover:translate-y-0">
                                <Button>PLAY</Button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="pt-3 mt-auto flex flex-col">
                    <p className="text-base line-clamp-2 tracking-wide font-medium">
                        {loading ? <SkeletonElement /> : title}
                    </p>
                    <p className="text-2xs leading-none font-medium tracking-widest text-neutral-100/[0.6] line-clamp-1">
                        {loading ? <SkeletonElement width={60} /> : poster}
                    </p>
                </div>
            </LinkElement>
        </Preview>
    );
}

export default CommonItem;
