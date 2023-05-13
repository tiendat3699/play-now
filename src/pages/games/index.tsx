import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import CommonItem, { CommonItemProps } from '~/components/commonItems';
import DropDown from '~/components/dropdown';
import Filter from '~/components/filter';
import Page from '~/components/page';
import SearchBar from '~/components/searchBar';
import { category } from '~/configs/category';
import { db } from '~/firebase';

function Games() {
    const [games, setGames] = useState<CommonItemProps[]>();
    useEffect(() => {
        const getGames = async () => {
            const gamesCollectionRef = collection(db, 'games');
            const res = await getDocs(gamesCollectionRef);
            const gamesList: CommonItemProps[] = res.docs.map((doc) => {
                const data = doc.data();
                return {
                    link: `games/${doc.id}`,
                    title: data.title,
                    thumb: data.coverImageUrl,
                    poster: 'tiendat',
                    description: data.shortDescription,
                };
            });

            setGames(gamesList);
        };
        getGames();
    }, []);

    return (
        <Page title="Free indie games">
            <SearchBar />
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-9">
                    <div className="py-3">
                        <span className="text-neutral-100/[0.7] text-sm">Show: </span>
                        <DropDown initValue={category[0]} options={category} />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-12">
                        {games?.map((game) => (
                            <CommonItem
                                key={game.link}
                                title={game.title}
                                thumb={game.thumb}
                                poster=""
                                link={game.link}
                                description={game.description}
                            />
                        ))}
                    </div>
                </div>
                <div className="col-span-12 md:col-span-3">
                    <Filter />
                </div>
            </div>
        </Page>
    );
}

export default Games;
