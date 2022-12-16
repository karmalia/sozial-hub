// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBlTNpzBkhnEOwr_N2pZR5PBMT4rrgXvuY',
  authDomain: 'sozialmediaclone.firebaseapp.com',
  projectId: 'sozialmediaclone',
  storageBucket: 'sozialmediaclone.appspot.com',
  messagingSenderId: '710600859650',
  appId: '1:710600859650:web:7a472f26ae1c3fe8c1871b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
