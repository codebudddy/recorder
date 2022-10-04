import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB0tt40BnHSuiDi-5-ikM3-RmHSbiIRn8Y',
  authDomain: 'recorder-6b6fd.firebaseapp.com',
  projectId: 'recorder-6b6fd',
  storageBucket: 'recorder-6b6fd.appspot.com',
  messagingSenderId: '1019038837266',
  appId: '1:1019038837266:web:1fd9b8fb97978eb12506cb',
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();
