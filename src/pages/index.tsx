import Link from 'next/link';
import Image from 'next/image';
import Page from '~/components/page';
import BannerCarousel from '~/components/bannerCarousel';

import { CgSearch } from 'react-icons/cg';
import Carousel from '~/components/carousel';
import Button from '~/components/button';

export default function Home() {
    return (
        <Page title="Free indie games | Play & upload your game">
            <div className="flex items-center h-24 sticky top-0 z-50 bg-primary">
                <div className="flex items-center rounded-full px-3 sm:max-w-md bg-secondary-2 focus-within:bg-secondary-1 transition-colors duration-75">
                    <CgSearch className="text-sm ml-2 mr-1" color="#ccc" />
                    <input
                        type="text"
                        name="search"
                        className="block flex-1 border-0 outline-none  bg-transparent py-2 px-2 text-white  placeholder:text-neutral-400  text-sm sm:leading-6 rounded-full"
                        placeholder="Search game"
                        autoComplete="off"
                    />
                </div>
                <ul className="flex text-neutral-100 text-sm tracking-wider items-center mx-4">
                    <li className=" transition-opacity ease-in-out opacity-70 hover:opacity-100">
                        <Link href={'/'} className="flex items-center h-10 px-3">
                            Popular
                        </Link>
                    </li>
                    <li className=" transition-opacity ease-in-out opacity-70 hover:opacity-100">
                        <Link href={'/'} className="flex items-center h-10 px-3">
                            New
                        </Link>
                    </li>
                </ul>
            </div>
            <BannerCarousel
                maxHeight={500}
                allowTouchMove={false}
                autoplay={{ delay: 8000, disableOnInteraction: true }}
                slides={[
                    {
                        banner: '/game1.avif',
                        thumb: '/thumbgame1.avif',
                        title: 'Red Fall',
                        colorTitle: '#FF351F',
                        subTitle: 'Now Avaiable',
                        description:
                            'Rule a fantasy realm of your own design! Explore new magical realms in Age of Wonders’ signature blend of 4X strategy and turn-based tactical combat. Control a faction that grows and changes as you expand your empire with each turn!',
                    },
                    {
                        banner: '/game1.avif',
                        thumb: '/thumbgame1.avif',
                        title: 'Red Fall',
                        colorTitle: '#00bae7',
                        subTitle: 'Now Avaiable',
                        description:
                            'Rule a fantasy realm of your own design! Explore new magical realms in Age of Wonders’ signature blend of 4X strategy and turn-based tactical combat. Control a faction that grows and changes as you expand your empire with each turn!',
                    },
                    {
                        banner: '/game1.avif',
                        thumb: '/thumbgame1.avif',
                        title: 'Red Fall',
                        subTitle: 'Now Avaiable',
                        description:
                            'Rule a fantasy realm of your own design! Explore new magical realms in Age of Wonders’ signature blend of 4X strategy and turn-based tactical combat. Control a faction that grows and changes as you expand your empire with each turn!',
                    },
                    {
                        banner: '/game1.avif',
                        thumb: '/thumbgame1.avif',
                        title: 'Red Fall',
                        subTitle: 'Now Avaiable',
                        description:
                            'Rule a fantasy realm of your own design! Explore new magical realms in Age of Wonders’ signature blend of 4X strategy and turn-based tactical combat. Control a faction that grows and changes as you expand your empire with each turn!',
                    },
                    {
                        banner: '/game1.avif',
                        thumb: '/thumbgame1.avif',
                        title: 'Red Fall',
                        subTitle: 'Now Avaiable',
                        description:
                            'Rule a fantasy realm of your own design! Explore new magical realms in Age of Wonders’ signature blend of 4X strategy and turn-based tactical combat. Control a faction that grows and changes as you expand your empire with each turn!',
                    },
                    {
                        banner: '/game1.avif',
                        thumb: '/thumbgame1.avif',
                        title: 'Red Fall',
                        subTitle: 'Now Avaiable',
                        description:
                            'Rule a fantasy realm of your own design! Explore new magical realms in Age of Wonders’ signature blend of 4X strategy and turn-based tactical combat. Control a faction that grows and changes as you expand your empire with each turn!',
                    },
                ]}
            />
            <Carousel title="Top Games" link="/games" slidesGroup />
            <Carousel title="New Games" link="/games" slidesGroup />
            <Carousel title="Coming Soon" link="/games" slidesGroup />
            <Carousel title="Action games" link="/games" slidesGroup />
            <Carousel title="Racing games" link="/games" slidesGroup />
            <div className="grid md:grid-cols-5 gap-7 mt-20">
                <Link
                    href={'/games'}
                    className="col-span-3 overflow-hidden rounded-2xl relative after:transition-colors after:ease-in after:bg-white/[0] hover:after:bg-white/[0.1]  after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:z-10"
                >
                    <Image
                        src="/banner.avif"
                        alt="banner"
                        width={0}
                        height={0}
                        className="w-full h-full object-cover object-center"
                    />
                </Link>
                <div className="col-span-2 my-auto">
                    <h4 className="tracking-tight mb-6 text-lg">Explore Our Catalog</h4>
                    <p className="text-sm text-neutral-100/[0.6] mb-10">
                        Browse by genre, features, price, and more to find your next favorite game.
                    </p>
                    <Button href="/games">BROWSE ALL</Button>
                </div>
            </div>
        </Page>
    );
}
