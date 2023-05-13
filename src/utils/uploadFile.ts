import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '~/firebase';
import slugify from 'slugify';

const uploadFile = async (file: File, pathUrl: string, fileName: string) => {
    try {
        const url = pathUrl + slugify(fileName);
        const fileRef = ref(storage, url);
        return await uploadBytes(fileRef, file);
    } catch (err) {
        return Promise.reject(err);
    }
};

export default uploadFile;
