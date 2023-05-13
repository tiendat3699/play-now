import { addDoc, collection, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '~/firebase';
import { uploadFile } from '~/utils';
import { v4 } from 'uuid';
import { getDownloadURL } from 'firebase/storage';

export enum releaseStatus {
    comming = 'comming',
    release = 'release',
}

export type gameData = {
    title: string;
    titleColor: string;
    shortDescription?: string;
    description: string;
    type: string;
    status: releaseStatus;
    coverImage?: File;
    loaderFile?: File;
    dataFile?: File;
    frameworkFile?: File;
    codeFile?: File;
};

type uploadData = {
    title: string;
    titleColor: string;
    description: string;
    type: string;
    status: releaseStatus;
    shortDescription?: string;
    coverImage?: string;
    coverImageUrl?: string;
    loaderFile?: string;
    loaderUrl?: string;
    dataFile?: string;
    dataUrl?: string;
    frameworkFile?: string;
    frameworkUrl?: string;
    codeFile?: string;
    codeUrl?: string;
};

const gameService = {
    store: async (gameData: gameData) => {
        try {
            const id = v4();
            let data: uploadData = {
                title: gameData.title,
                titleColor: gameData.titleColor,
                description: gameData.description,
                type: gameData.type,
                status: gameData.status,
                shortDescription: gameData.shortDescription,
            };

            if (gameData.coverImage) {
                const coverImage = await uploadFile(gameData.coverImage, `games/${id}/`, gameData.coverImage.name);
                data.coverImage = coverImage.metadata.fullPath;
                data.coverImageUrl = await getDownloadURL(coverImage.ref);
            }

            if (gameData.loaderFile && gameData.dataFile && gameData.frameworkFile && gameData.codeFile) {
                const [loaderFile, dataFile, frameworkFile, codeFile] = await Promise.all([
                    uploadFile(gameData.loaderFile, `games/${id}/`, gameData.loaderFile.name),
                    uploadFile(gameData.dataFile, `games/${id}/`, gameData.dataFile.name),
                    uploadFile(gameData.frameworkFile, `games/${id}/`, gameData.frameworkFile.name),
                    uploadFile(gameData.codeFile, `games/${id}/`, gameData.codeFile.name),
                ]);

                data.loaderFile = loaderFile.metadata.fullPath;
                data.dataFile = dataFile.metadata.fullPath;
                data.frameworkFile = frameworkFile.metadata.fullPath;
                data.codeFile = codeFile.metadata.fullPath;

                const [loaderUrl, dataUrl, frameworkUrl, codeUrl] = await Promise.all([
                    getDownloadURL(loaderFile.ref),
                    getDownloadURL(dataFile.ref),
                    getDownloadURL(frameworkFile.ref),
                    getDownloadURL(codeFile.ref),
                ]);

                data.loaderUrl = loaderUrl;
                data.dataUrl = dataUrl;
                data.frameworkUrl = frameworkUrl;
                data.codeUrl = codeUrl;
            }

            const collectionRef = collection(db, 'games');
            const docRef = await addDoc(collectionRef, { ...data, timestamp: serverTimestamp() });
            return docRef;
        } catch (err) {
            return Promise.reject(err);
        }
    },
};

export default gameService;
