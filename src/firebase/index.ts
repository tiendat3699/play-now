// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
    apiKey: 'AIzaSyBo8ruyrxXbtnlVw2qtsOEDnsNExXJ1L6Y',
    authDomain: 'play-now-1aef8.firebaseapp.com',
    projectId: 'play-now-1aef8',
    storageBucket: 'play-now-1aef8.appspot.com',
    messagingSenderId: '719547043635',
    appId: '1:719547043635:web:af64770f76336a3fb8b846',
    measurementId: 'G-CD7W7HQ9RX',
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export const storage: FirebaseStorage = getStorage(app);
export const db: Firestore = getFirestore();
