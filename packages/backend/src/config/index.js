import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import dotenv from "dotenv";

import loginToFirebase from "../loginMethods.js";

dotenv.config();

// Initialize Firebase SDK
const firebaseApp = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
});

loginToFirebase(
  firebaseApp,
  process.env.FIREBASE_UNAME,
  process.env.FIREBASE_PWORD
);

export const firebaseDB = getFirestore(firebaseApp);
