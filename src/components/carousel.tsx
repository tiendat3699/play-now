import { useRef } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import { AutoplayOptions, NavigationOptions, Swiper as SwiperType } from 'swiper/types';

import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import CommonItem from './commonItems';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface CarouselProps {
    title?: string;
    link?: string;
    autoplay?: AutoplayOptions;
    maxHeight?: number | string;
    allowTouchMove?: boolean;
    loop?: boolean;
    slidesGroup?: boolean;
}

function Carousel({ title, link, autoplay, maxHeight, allowTouchMove, loop, slidesGroup }: CarouselProps) {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    return (
        <div className="mt-16" style={{ maxHeight: maxHeight }}>
            <div className="flex items-center mb-6">
                {title && (
                    <Link href={link || ''} className="text-lg flex items-center group leading-none">
                        {title}
                        <MdOutlineKeyboardArrowRight className="transition-transform duration-100 text-sm group-hover:translate-x-1" />
                    </Link>
                )}
                <div className="space-x-2 ml-auto">
                    <button
                        ref={prevRef}
                        className="prev-btn text-lg disabled:opacity-60 rounded-[50%] bg-secondary-2 p-2 transition-colors border border-transparent focus:border-white enabled:hover:bg-secondary-1"
                    >
                        <MdOutlineKeyboardArrowLeft />
                    </button>
                    <button
                        ref={nextRef}
                        className="next-btn text-lg disabled:opacity-60 rounded-[50%] bg-secondary-2 p-2 transition-colors border border-transparent focus:border-white enabled:hover:bg-secondary-1"
                    >
                        <MdOutlineKeyboardArrowRight />
                    </button>
                </div>
            </div>
            <div className="select-none">
                <Swiper
                    navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                    onBeforeInit={(s: SwiperType) => {
                        const navigation = s.params.navigation;
                        if (typeof navigation !== 'boolean' && navigation) {
                            navigation.prevEl = prevRef.current;
                            navigation.nextEl = nextRef.current;
                        }
                    }}
                    allowTouchMove={allowTouchMove}
                    spaceBetween={16}
                    autoplay={autoplay}
                    loop={loop}
                    modules={[Autoplay, Navigation]}
                    slidesPerGroup={1}
                    breakpoints={{
                        640: {
                            slidesPerGroup: slidesGroup ? 2 : 1,
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerGroup: slidesGroup ? 3 : 1,
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerGroup: slidesGroup ? 5 : 1,
                            slidesPerView: 5,
                        },
                    }}
                >
                    {(() => {
                        const render = [];
                        for (let i = 0; i < 10; i++) {
                            render.push(
                                <SwiperSlide key={i}>
                                    <CommonItem
                                        thumb="/game1.avif"
                                        title="Red Fall"
                                        link="/"
                                        poster="tiendat"
                                        preview={false}
                                    />
                                </SwiperSlide>,
                            );
                        }
                        return render;
                    })()}
                </Swiper>
            </div>
        </div>
    );
}

export default Carousel;
