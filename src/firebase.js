import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAaV0WRXsRp-aJpmGA8K8c7Uwe9GVPb1vs",
    authDomain: "chat-39b4b.firebaseapp.com",
    projectId: "chat-39b4b",
    storageBucket: "chat-39b4b.appspot.com",
    messagingSenderId: "590620648328",
    appId: "1:590620648328:web:c58f1c13640ec83842103d"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);