// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'app-api-e5344.firebaseapp.com',
    projectId: 'app-api-e5344',
    storageBucket: 'app-api-e5344.appspot.com',
    messagingSenderId: '387940578096',
    appId: '1:387940578096:web:c91e09dbb36062bba8cef5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const storage = getStorage(app);

export default app;
