import { useRef } from 'react';
import { renderToString } from 'react-dom/server';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { AutoplayOptions, PaginationOptions, Swiper as SwipeType } from 'swiper/types';
import { motion } from 'framer-motion';
import Button from './button';
import { releaseStatus } from '~/services/gameService';

// Import styles
import 'swiper/css';
import SkeletonElement from './skeletonElement';

export type Slide = {
    banner: string;
    title: string;
    titleColor?: string;
    status?: releaseStatus;
    description?: string;
    thumb?: string;
    link?: string;
    id?: string;
};

interface BannerCarouselProps {
    slides: Slide[];
    autoplay?: AutoplayOptions;
    maxHeight?: number | string;
    allowTouchMove?: boolean;
    loading?: boolean;
}

function BannerCarousel({ slides, autoplay, maxHeight, allowTouchMove, loading }: BannerCarouselProps) {
    const paginationRef = useRef<HTMLDivElement>(null);

    const pagination: PaginationOptions = {
        clickable: true,
        el: '.custom-pagination',
        bulletActiveClass: 'is-active',
        bulletClass: 'pagination-item',
        renderBullet: (index: number, className: string): string => {
            return renderToString(
                <div
                    className={`${className} group relative lg:h-20 md:h-16 rounded-xl overflow-hidden cursor-pointer mb-1`}
                >
                    <div className="lg:p-4 md:p-3 flex items-center absolute top-0 right-0 bottom-0 left-0 z-10">
                        <div className="lg:w-10 md:w-8 h-full rounded-md overflow-hidden relative mr-3">
                            <Image
                                src={slides[index].thumb || slides[index].banner}
                                alt={slides[index].title}
                                width={100}
                                height={100}
                                className=" object-cover h-full w-full object-center group-[.is-active]:animate-pulse-scale"
                                placeholder="empty"
                                blurDataURL="/placeholder.jpg"
                            />
                        </div>
                        <p className="line-clamp-2 lg:text-sm md:text-xs">{slides[index].title}</p>
                    </div>
                    <div className="transition-all bg-white h-full w-full opacity-0 group-[.is-active]:opacity-10 group-hover:opacity-10 "></div>
                    <div
                        style={{ transform: 'translateX(-100%)' }}
                        className="carousel-progress absolute top-0 bottom-0 left-0 w-full z-[5] bg-white opacity-0 group-[.is-active]:opacity-10"
                    ></div>
                </div>,
            );
        },
    };

    const handleCarouselProgress = (activeIndex: number, progress: number): void => {
        const pagination = paginationRef.current;
        const childCount = !!pagination ? pagination.childElementCount : 0;
        for (let i = 0; i < childCount; i++) {
            const carouselProgress = pagination?.children[i].querySelector('.carousel-progress');
            if (i == activeIndex) {
                carouselProgress?.setAttribute('style', `transform: translateX(${-progress * 100}%)`);
            } else {
                carouselProgress?.setAttribute('style', 'transform: translateX(-100%)');
            }
        }
    };

    const onAutoplayTimeLeft = (s: SwipeType, time: number, progress: number): void => {
        handleCarouselProgress(s.realIndex, progress);
    };

    return (
        <>
            {loading ? (
                <div className="flex gap-4 select-none" style={{ height: maxHeight }}>
                    <div className="flex-1">
                        <SkeletonElement borderRadius={12} height={'100%'} />
                    </div>
                    <div className="w-1/6">
                        <SkeletonElement borderRadius={12} height={'100%'} width={'100%'} />
                    </div>
                </div>
            ) : (
                <div className="flex gap-4 select-none" style={{ maxHeight: maxHeight }}>
                    <Swiper
                        allowTouchMove={allowTouchMove}
                        spaceBetween={1}
                        autoplay={autoplay}
                        loop
                        pagination={pagination}
                        modules={[Pagination, Autoplay]}
                        onAutoplayTimeLeft={onAutoplayTimeLeft}
                        onSlideChange={(s: SwipeType): void => handleCarouselProgress(s.realIndex, 0)}
                        className="flex-1 rounded-xl"
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={slide.id || index}>
                                {({ isActive }) => (
                                    <div className="relative h-full">
                                        <Image
                                            src={slide.banner}
                                            alt={slide.title}
                                            height={600}
                                            width={900}
                                            className="w-full h-full rounded-md object-cover object-center"
                                            placeholder="empty"
                                            blurDataURL="/placeholder.jpg"
                                            priority
                                        />
                                        <div className="flex p-10 absolute top-0 right-0 bottom-0 left-0 z-10">
                                            <div className="mt-auto w-2/5">
                                                <motion.h2
                                                    className="font-bold text-5xl mb-12"
                                                    style={{ color: slide.titleColor }}
                                                    animate={{
                                                        x: isActive ? 0 : 50,
                                                        opacity: isActive ? 1 : 0,
                                                    }}
                                                    transition={{ delay: 0.4, ease: 'easeOut', duration: 0.25 }}
                                                >
                                                    {slide.title}
                                                </motion.h2>
                                                <motion.div
                                                    animate={{
                                                        opacity: isActive ? 1 : 0,
                                                    }}
                                                    transition={{ delay: 0.35, ease: 'easeInOut', duration: 0.2 }}
                                                >
                                                    <p className="text-xs uppercase mb-2 font-normal tracking-wide">
                                                        {slide.status == 'comming' ? 'Comming Soon' : 'Now Availabel'}
                                                    </p>
                                                    <p className="font-medium text-lg line-clamp-4">
                                                        {slide.description}
                                                    </p>
                                                </motion.div>
                                                <Button href={slide.link} theme="primary" size="md" className="mt-8">
                                                    PLAY NOW
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex absolute top-0 right-0 bottom-0 left-0 opacity-60 bg-gradient-to-l from-[#0b0b0b00] from-0% via-[#0B0B0B] via-100% to-[#0B0B0B] to-100% "></div>
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="w-1/6">
                        <div ref={paginationRef} className="custom-pagination flex flex-col"></div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BannerCarousel;
