import { ReactElement, ReactNode } from 'react';
import Image from 'next/image';
import Tippy from '@tippyjs/react/headless';
import PopperWapper from './popperWapper';
import { useSpring, motion } from 'framer-motion';
import Button from '~/components/button';

interface PreviewProp {
    children: ReactElement;
    title: string;
    href: string;
    description?: string;
    screenShots?: string[];
    visible?: boolean;
}

function Preview({ children, title, href, description, screenShots, visible }: PreviewProp) {
    const y = useSpring(50, { stiffness: 200, damping: 20 });
    const opacity = useSpring(0);

    const renderPreview = (prop: any): ReactNode => (
        <div tabIndex={-1} className="group" {...prop}>
            <motion.div style={{ opacity, y }}>
                <PopperWapper className="flex flex-col p-[0px] w-64">
                    <h4 className="bg-secondary-1 px-3 py-2 text-lg font-medium tracking-wide">{title}</h4>
                    {description && (
                        <p className="px-3 my-2 text-xs leading-5 tracking-wide font-light text-white/[0.8] line-clamp-5">
                            {description}
                        </p>
                    )}
                    {screenShots && screenShots?.length > 0 && (
                        <div className="px-3 pt-1 pb-3 space-y-1">
                            {screenShots?.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    alt=""
                                    width={100}
                                    height={100}
                                    className="w-full h-32 object-cover object-center rounded-sm border border-secondary-1"
                                />
                            ))}
                        </div>
                    )}
                    <Button href={href} className=" rounded-none" size="sm">
                        PLAY
                    </Button>
                </PopperWapper>
                <div
                    data-popper-arrow={true}
                    className=" invisible after:bg-white after:absolute after:w-4 after:h-4 after:rotate-45 after:visible -z-10 group-data-[placement^='top']:bottom-3 group-data-[placement^='bottom']:-top-1 group-data-[placement^='left']:right-3 group-data-[placement^='right']:-left-1"
                />
            </motion.div>
        </div>
    );

    return (
        <Tippy
            interactive
            visible={visible}
            placement="left"
            animation
            onMount={() => {
                opacity.set(1);
                y.set(0);
            }}
            onHide={({ unmount }) => {
                const cleanup = opacity.on('change', (value) => {
                    if (value <= 0) {
                        cleanup();
                        unmount();
                    }
                });
                y.set(50);
                opacity.set(0);
            }}
            render={renderPreview}
            delay={[600, 100]}
            appendTo={() => document.body}
        >
            {children}
        </Tippy>
    );
}

export default Preview;
