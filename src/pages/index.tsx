import Link from 'next/link';
import Image from 'next/image';
import Page from '~/components/page';
import BannerCarousel from '~/components/bannerCarousel';
import Carousel from '~/components/carousel';
import Button from '~/components/button';
import SearchBar from '~/components/searchBar';

import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from '~/firebase';
import queryToSlide from '~/utils/queryToSlide';

export default function Home() {
    const [popularGames, loadingPopular] = useCollection(
        query(collection(db, 'games'), orderBy('timestamp', 'desc'), limit(6)),
    );
    const [newGames, newGameLoading] = useCollection(
        query(collection(db, 'games'), where('status', '==', 'release'), orderBy('timestamp', 'desc'), limit(10)),
    );
    const [upcommingGames, upcommingGameLoading] = useCollection(
        query(collection(db, 'games'), where('status', '==', 'comming'), limit(10)),
    );

    return (
        <Page title="Free indie games | Play & upload your game">
            <SearchBar />
            <BannerCarousel
                maxHeight={500}
                allowTouchMove={false}
                autoplay={{ delay: 8000, disableOnInteraction: false }}
                slides={queryToSlide(popularGames, 'games')}
                loading={loadingPopular}
            />
            <Carousel
                title="New Games"
                link="/games"
                slidesGroup
                slides={queryToSlide(newGames, 'games')}
                loading={newGameLoading}
            />
            <Carousel
                title="Coming Soon"
                link="/games"
                slidesGroup
                slides={queryToSlide(upcommingGames, 'games')}
                loading={upcommingGameLoading}
            />
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
                        placeholder="empty"
                        blurDataURL="/placeholder.jpg"
                        priority
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
