import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useEffect } from 'react';
import { useUnityContext } from 'react-unity-webgl';
import Tippy from '@tippyjs/react';
import Page from '~/components/page';
import SearchBar from '~/components/searchBar';
import { BiFullscreen } from 'react-icons/bi';

const Unity = dynamic(
    async () => {
        const { Unity } = await import('react-unity-webgl');
        return Unity;
    },
    {
        ssr: false,
    },
);

function GameDetail() {
    const {
        unityProvider,
        loadingProgression,
        UNSAFE__unityInstance,
        isLoaded,
        requestFullscreen,
        UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate,
    } = useUnityContext({
        loaderUrl:
            'https://firebasestorage.googleapis.com/v0/b/play-now-1aef8.appspot.com/o/games%2Floader%2Ftank.loader.js?alt=media&token=faf554f5-1938-453d-8de0-d2ef5cef1e45',
        dataUrl:
            'https://firebasestorage.googleapis.com/v0/b/play-now-1aef8.appspot.com/o/games%2Fdata%2Ftank.data.unityweb?alt=media&token=667c6a16-40eb-4b3b-8ffe-8a56ff210f54b',
        frameworkUrl:
            'https://firebasestorage.googleapis.com/v0/b/play-now-1aef8.appspot.com/o/games%2Fframework%2Ftank.framework.js.unityweb?alt=media&token=d3b70811-a15a-4e66-9210-1acb44f065ff',
        codeUrl:
            'https://firebasestorage.googleapis.com/v0/b/play-now-1aef8.appspot.com/o/games%2Fwasm%2Ftank.wasm.unityweb?alt=media&token=77f54f02-6f43-4425-aa29-59ee240d81aa',
    });

    useEffect(() => {
        return () => {
            if (UNSAFE__unityInstance) {
                detachAndUnloadImmediate().catch((reason) => {
                    console.log('========================', reason);
                });
            }
        };
    }, [detachAndUnloadImmediate, UNSAFE__unityInstance]);

    return (
        <Page title="game1">
            <SearchBar />
            <h2 className="text-2xl font-bold tracking-wide mb-2">Game Tank</h2>
            <div className="grid grid-cols-7 gap-4">
                <div className="col-span-6 md:col-span-5">
                    <div className=" bg-secondary-2 relative">
                        <Unity
                            style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
                            className="w-full"
                            unityProvider={unityProvider}
                        />
                        {!isLoaded && (
                            <div className="w-1/4 rounded-full h-4 bg-gray-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div
                                    className="bg-white h-full rounded-full"
                                    style={{ width: Math.round((loadingProgression / 0.9) * 100) + '%' }}
                                ></div>
                            </div>
                        )}
                        <div className="bg-secondary-1 flex items-center justify-end">
                            <Tippy content="Fullscreen">
                                <button
                                    onClick={() => requestFullscreen(true)}
                                    className="p-2 hover:opacity-60 text-xl"
                                >
                                    <BiFullscreen />
                                </button>
                            </Tippy>
                        </div>
                    </div>
                    <div className="mt-4">asdaskdjaslkdjaslkdnhfa-stackasdasdas</div>
                </div>
                <div className="col-span-6 md:col-span-2">
                    <Image
                        src={'/banner.avif'}
                        alt=""
                        width={0}
                        height={0}
                        className="w-full h-auto object-cover object-center"
                    />
                    <Image
                        src={'/banner.avif'}
                        alt=""
                        width={0}
                        height={0}
                        className="w-full h-auto object-cover object-center"
                    />
                    <Image
                        src={'/banner.avif'}
                        alt=""
                        width={0}
                        height={0}
                        className="w-full h-auto object-cover object-center"
                    />
                    <Image
                        src={'/banner.avif'}
                        alt=""
                        width={0}
                        height={0}
                        className="w-full h-auto object-cover object-center"
                    />
                </div>
            </div>
        </Page>
    );
}

export default GameDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    const arr: string[] = ['game1', 'game2'];
    const paths = arr.map((slug) => {
        return {
            params: { slug },
        };
    });
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {},
    };
};
