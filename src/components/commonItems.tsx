import Image from 'next/image';
import Link from 'next/link';
import Button from './button';
import Preview from './popper/preview';

interface CommonItemProps {
    thumb: string;
    title: string;
    link: string;
    poster: string;
    description?: string;
    screenShots?: string[];
    preview?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

function CommonItem({ thumb, title, link, poster, description, screenShots, preview, size = 'md' }: CommonItemProps) {
    return (
        <Preview title={title} href={link} description={description} screenShots={screenShots} visible={preview}>
            <Link href={link} className={`group flex flex-col ${size}`}>
                <div className="group  relative group-[.md]:h-60 group-[.sm]:h-32 group-[.lg]:h-80">
                    <Image
                        src={thumb}
                        alt={title}
                        width={0}
                        height={0}
                        className="h-full w-full object-cover object-center rounded"
                        priority
                    />
                    <div className=" transition-all absolute z-10 flex top-0 right-0 bottom-0 left-0 bg-black/[0.6] opacity-0 group-hover:opacity-100 ">
                        <div className="transition-all m-auto translate-y-6 group-hover:translate-y-0">
                            <Button>PLAY</Button>
                        </div>
                    </div>
                </div>
                <div className="pt-3 mt-auto flex flex-col">
                    <p className="text-base line-clamp-2 tracking-wide font-medium">{title}</p>
                    <p className="text-2xs leading-none font-medium tracking-widest text-neutral-100/[0.6] line-clamp-1">
                        {poster}
                    </p>
                </div>
            </Link>
        </Preview>
    );
}

export default CommonItem;
