import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import dotenv from "dotenv";
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
const firebaseDB = getFirestore(firebaseApp);

// Create a new Express app
const app = express();

// Enable CORS middleware
app.use(cors());

// Define a route to get data from Firebase
app.get("/test", async (req, res) => {
  try {
    const testCollection = collection(firebaseDB, "test-data");
    const testSnapshot = await getDocs(testCollection);
    const testData = testSnapshot.docs.map((doc) => {
      return doc.data();
    });
    res.json(testData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Start the Express server
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
