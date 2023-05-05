import CommonItem from '~/components/commonItems';
import DropDown from '~/components/dropdown';
import Filter from '~/components/filter';
import Page from '~/components/page';
import SearchBar from '~/components/searchBar';

function Games() {
    return (
        <Page title="Free indie games">
            <SearchBar />
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-9">
                    <div className="py-3">
                        <span className="text-neutral-100/[0.7] text-sm">Show: </span>
                        <DropDown
                            initValue={{ lable: 'All', value: 'all' }}
                            options={[
                                { lable: 'All', value: 'all' },
                                { lable: 'New Release', value: 'new-release' },
                                { lable: 'Comming Soon', value: 'comming-soon' },
                            ]}
                        />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-12">
                        {(() => {
                            const renders = [];
                            for (let i = 0; i < 20; i++) {
                                renders.push(
                                    <CommonItem
                                        key={i}
                                        title="Red Fall"
                                        thumb="/game1.avif"
                                        link="/"
                                        poster="tiendat"
                                        description="Rule a fantasy realm of your own design! Explore new magical realms in Age of Wonders’ signature blend of 4X strategy and turn-based tactical combat. Control a faction that grows and changes as you expand your empire with each turn!"
                                        screenShots={['/game1.avif', '/banner.avif']}
                                    />,
                                );
                            }
                            return renders;
                        })()}
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
