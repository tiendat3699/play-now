import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useCallback, useEffect } from 'react';
import { useUnityContext } from 'react-unity-webgl';
import Tippy from '@tippyjs/react';
import Page from '~/components/page';
import SearchBar from '~/components/searchBar';
import { BiFullscreen } from 'react-icons/bi';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db, dbRealTime } from '~/firebase';
import { useList } from 'react-firebase-hooks/database';
import TextEditorReadOnly from '~/components/textEditorReadOnly';
import { releaseStatus } from '~/services/gameService';
import { IoLogoGameControllerA } from 'react-icons/io';
import { ref } from 'firebase/database';

const Unity = dynamic(
    async () => {
        const { Unity } = await import('react-unity-webgl');
        return Unity;
    },
    {
        ssr: false,
    },
);

interface GameDetailProps {
    title: string;
    coverImage: string;
    description: string;
    loaderUrl: string;
    dataUrl: string;
    frameworkUrl: string;
    codeUrl: string;
    status?: releaseStatus;
}

function GameDetail({
    title,
    description,
    coverImage,
    loaderUrl,
    dataUrl,
    frameworkUrl,
    codeUrl,
    status,
}: GameDetailProps) {
    const {
        unityProvider,
        loadingProgression,
        UNSAFE__unityInstance,
        isLoaded,
        requestFullscreen,
        addEventListener,
        removeEventListener,
        sendMessage,
        UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate,
    } = useUnityContext({
        loaderUrl,
        dataUrl,
        frameworkUrl,
        codeUrl,
    });

    const [snapshots, loading, error] = useList(ref(dbRealTime, 'API'));

    useEffect(() => {
        return () => {
            if (UNSAFE__unityInstance) {
                detachAndUnloadImmediate().catch((reason) => {
                    console.log('========================', reason);
                });
            }
        };
    }, [detachAndUnloadImmediate, UNSAFE__unityInstance]);

    const SendAPI = useCallback(() => {
        if (snapshots) {
            const data = snapshots.map((v) => v.toJSON());
            sendMessage('ReactCommunicate', 'SetData', JSON.stringify(data[0]));
        }
    }, [sendMessage, snapshots]);

    useEffect(() => {
        addEventListener('Ready', SendAPI);
        return () => {
            removeEventListener('Ready', SendAPI);
        };
    }, [SendAPI, addEventListener, removeEventListener]);

    return (
        <Page title={title}>
            <SearchBar />
            <h2 className="text-2xl font-bold tracking-wide mb-2">{title}</h2>
            <div className="grid grid-cols-7 gap-4">
                <div className="col-span-6 md:col-span-5">
                    <div className=" bg-secondary-2">
                        <div
                            className="relative"
                            style={{ background: `url("${coverImage}") no-repeat center / cover` }}
                        >
                            <Unity
                                style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
                                className="w-full"
                                unityProvider={unityProvider}
                            />
                            {!isLoaded && (
                                <div className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex bg-black/[0.7]">
                                    {status == 'comming' ? (
                                        <div className="m-auto text-4xl font-bold flex flex-col items-center">
                                            <IoLogoGameControllerA className="text-6xl" />
                                            <p>Comming soon</p>
                                        </div>
                                    ) : (
                                        <div className="w-1/4 rounded-full h-4 bg-gray-700 m-auto">
                                            <div
                                                className="bg-white h-full rounded-full"
                                                style={{ width: Math.round((loadingProgression / 0.9) * 100) + '%' }}
                                            ></div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        {status == 'release' && (
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
                        )}
                    </div>
                    <div className="mt-4">
                        <TextEditorReadOnly value={description} />
                    </div>
                </div>
                <div className="col-span-6 md:col-span-2"></div>
            </div>
        </Page>
    );
}

export default GameDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    const gamesCollectionRef = collection(db, 'games');
    const games = await getDocs(gamesCollectionRef);
    const paths = games.docs.map((game) => {
        return { params: { id: game.id } };
    });

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (params?.id) {
        const id: string = params.id.toString();
        const gameRef = doc(db, 'games', id);
        const gameSnap = await getDoc(gameRef);
        if (gameSnap.exists()) {
            const data = gameSnap.data();
            const props: GameDetailProps = {
                title: data.title,
                description: data.description,
                coverImage: data.coverImageUrl,
                loaderUrl: data.loaderUrl ? data.loaderUrl : null,
                dataUrl: data.dataUrl ? data.dataUrl : null,
                frameworkUrl: data.frameworkUrl ? data.frameworkUrl : null,
                codeUrl: data.codeUrl ? data.codeUrl : null,
                status: data.status,
            };

            return {
                props,
            };
        }

        return { props: {} };
    }
    return {
        props: {},
    };
};
