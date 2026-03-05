import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCjQk80gfBRNSM2GefePxzLQi4yWPqoL10",
  authDomain: "rupyou-4bbf5.firebaseapp.com",
  projectId: "rupyou-4bbf5",
  storageBucket: "rupyou-4bbf5.firebasestorage.app",
  messagingSenderId: "713719809137",
  appId: "1:713719809137:web:e47b47a99d22277c9187d0",
  measurementId: "G-ZT5YDRT1ZZ"
};

if (!firebaseConfig.apiKey) {
  console.warn("Firebase API Key is missing. Auth features will not work until VITE_FIREBASE_API_KEY is set in environment variables.");
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
