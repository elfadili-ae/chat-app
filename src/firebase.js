import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

//replace with your own firebase configuratin
const firebaseConfig = {
    apiKey: "google_firebase_api_key",
    authDomain: "authDomain",
    projectId: "projectId",
    storageBucket: "storeBucket",
    messagingSenderId: "msi",
    appId: "app id"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);