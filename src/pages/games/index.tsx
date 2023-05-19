import {
    DocumentData,
    QueryConstraint,
    QueryDocumentSnapshot,
    collection,
    getCountFromServer,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import CommonItem from '~/components/commonItems';
import DropDown from '~/components/dropdown';
import { getCategory, getTypeGame, option } from '~/configs/category';
import Filter from '~/components/filter';
import Page from '~/components/page';
import SearchBar from '~/components/searchBar';
import { category } from '~/configs/category';
import { db } from '~/firebase';
import { useSearchParams } from 'next/navigation';
import InfiniteScroll from '~/components/infiniteScroll';

function Games() {
    const router = useRouter();
    const [games, setGames] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const [loading, setLoading] = useState<boolean>();
    const [queryParams, setQueryParams] = useState<{ types: option[]; show?: option }>({
        types: [],
        show: undefined,
    });
    const [lastPage, setLastPage] = useState<QueryDocumentSnapshot<DocumentData> | null>();
    const [totalGames, setTotalGames] = useState<number>(0);
    const searchParams = useSearchParams();

    useEffect(() => {
        const getCount = async () => {
            const snap = await getCountFromServer(query(collection(db, 'games')));
            setTotalGames(snap.data().count);
        };
        getCount();
    }, []);

    useEffect(() => {
        const types: string[] = searchParams.getAll('type');
        const show: string | null = searchParams.get('show');
        if (types.length > 0 || show) {
            setLastPage(null);
            setQueryParams((prevState) => {
                return {
                    ...prevState,
                    types: types.map((type): any => getTypeGame(type)),
                    show: getCategory(show),
                };
            });
        }
    }, [searchParams]);

    useEffect(() => {
        const fecth = async () => {
            try {
                setLoading(true);
                const queryConstraints: QueryConstraint[] = [orderBy('timestamp', 'desc'), limit(8)];
                if (queryParams.types.length > 0) {
                    queryConstraints.push(
                        where(
                            'type',
                            'in',
                            queryParams.types.map((type) => type.value),
                        ),
                    );
                }

                if (queryParams.show && queryParams.show.value != 'all') {
                    queryConstraints.push(where('status', '==', queryParams.show.value));
                }

                if (lastPage) {
                    queryConstraints.push(startAfter(lastPage));
                    let q = query(collection(db, 'games'), ...queryConstraints);
                    const docSnap = await getDocs(q);
                    setGames((prevState) => prevState.concat(docSnap.docs));
                    setLoading(false);
                } else {
                    let q = query(collection(db, 'games'), ...queryConstraints);
                    const docSnap = await getDocs(q);
                    setGames(docSnap.docs);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fecth();
    }, [lastPage, queryParams]);

    const handleSetlastGame = () => {
        if (games.length > 0) {
            setLastPage(games[games.length - 1]);
        }
    };

    const handleFilter = (options: option[]) => {
        const queryParams = { type: options.map((option) => option.value) };
        router.push({ query: { ...router.query, ...queryParams } });
    };

    const handelDropChange = (option: option) => {
        const queryParams = { show: option.value };
        router.push({ query: { ...router.query, ...queryParams } });
    };

    const renderLoader = (): ReactNode[] => {
        const renders: ReactNode[] = [];
        for (let i = 0; i < 4; i++) {
            renders.push(<CommonItem key={i} thumb="" link="" title="" preview={false} loading />);
        }
        return renders;
    };

    return (
        <Page title="Free indie games">
            <SearchBar />
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-9">
                    <div className="py-3">
                        <span className="text-neutral-100/[0.7] text-sm">Show: </span>
                        <DropDown selectedOption={queryParams.show} options={category} onChange={handelDropChange} />
                    </div>
                    <InfiniteScroll
                        loader={renderLoader()}
                        loadMore={handleSetlastGame}
                        loading={loading}
                        hasMore={games.length < totalGames}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-12"
                    >
                        {games?.map((doc) => {
                            const game = doc.data();
                            return (
                                <CommonItem
                                    key={doc.id}
                                    title={game.title}
                                    thumb={game.coverImageUrl}
                                    poster={game.poster}
                                    link={`games/${doc.id}`}
                                    description={game.shortDescription}
                                />
                            );
                        })}
                    </InfiniteScroll>
                </div>
                <div className="col-span-12 md:col-span-3">
                    <div className=" sticky top-24">
                        <Filter seletedFilters={queryParams.types} onChange={handleFilter} />
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default Games;
