import { collection } from 'firebase/firestore';
import { ReactNode } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import CommonItem from '~/components/commonItems';
import DropDown from '~/components/dropdown';
import Filter from '~/components/filter';
import Page from '~/components/page';
import SearchBar from '~/components/searchBar';
import { category } from '~/configs/category';
import { db } from '~/firebase';

function Games() {
    const [value, loading] = useCollection(collection(db, 'games'));
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
                            : value?.docs.map((doc) => {
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
                    <Filter />
                </div>
            </div>
        </Page>
    );
}

export default Games;
