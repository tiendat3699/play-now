import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '~/firebase';

export type GameData = {
    title: string;
    colorTitle: string;
    shortDescription?: string;
    description: string;
    coverImage: string;
    screenShots?: string[];
};

const gameService = {
    store: async (gameData: GameData) => {
        try {
            const collctionRef = collection(db, 'games');
            const docRef = await addDoc(collctionRef, { ...gameData, timestamp: serverTimestamp() });
            return docRef;
        } catch (err) {
            return Promise.reject(err);
        }
    },
};

export default gameService;
