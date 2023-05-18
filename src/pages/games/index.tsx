import {
    DocumentData,
    QueryDocumentSnapshot,
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import CommonItem from '~/components/commonItems';
import DropDown, { option } from '~/components/dropdown';
import Filter from '~/components/filter';
import Page from '~/components/page';
import SearchBar from '~/components/searchBar';
import { category } from '~/configs/category';
import { db } from '~/firebase';

function Games() {
    const router = useRouter();
    const [games, setGames] = useState<QueryDocumentSnapshot<DocumentData>[]>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fecth = async () => {
            try {
                let q = query(collection(db, 'games'), orderBy('timestamp', 'desc'), limit(12));

                if (router.query.type) {
                    q = query(
                        collection(db, 'games'),
                        where('type', 'in', router.query.type),
                        orderBy('timestamp', 'desc'),
                        limit(12),
                    );
                }

                if (router.query.show) {
                    q = query(
                        collection(db, 'games'),
                        where('status', '==', router.query.show),
                        orderBy('timestamp', 'desc'),
                        limit(12),
                    );
                }
                if (router.query.type && router.query.show) {
                    q = query(
                        collection(db, 'games'),
                        where('type', 'in', router.query.type),
                        where('status', '==', router.query.show),
                        orderBy('timestamp', 'desc'),
                        limit(12),
                    );
                }

                const docSnap = await getDocs(q);
                setGames(docSnap.docs);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fecth();
    }, [router.query.show, router.query.type]);

    const handleFilter = (options: option[]) => {
        const queryParams = { type: options.map((option) => option.value) };
        router.push({ query: { ...router.query, ...queryParams } });
    };

    const handelDropChange = (value: string) => {
        const queryParams = { show: value };
        if (value == 'all') {
            delete router.query.show;
            router.push({ query: { ...router.query } });
        } else {
            router.push({ query: { ...router.query, ...queryParams } });
        }
    };

    return (
        <Page title="Free indie games">
            <SearchBar />
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-9">
                    <div className="py-3">
                        <span className="text-neutral-100/[0.7] text-sm">Show: </span>
                        <DropDown initValue={category[0]} options={category} onChange={handelDropChange} />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-12">
                        {loading
                            ? ((): ReactNode[] => {
                                  const renders: ReactNode[] = [];
                                  for (let i = 0; i < 12; i++) {
                                      renders.push(
                                          <CommonItem key={i} thumb="" link="" title="" preview={false} loading />,
                                      );
                                  }
                                  return renders;
                              })()
                            : games?.map((doc) => {
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
                    </div>
                </div>
                <div className="col-span-12 md:col-span-3">
                    <Filter onChange={handleFilter} />
                </div>
            </div>
        </Page>
    );
}

export default Games;
