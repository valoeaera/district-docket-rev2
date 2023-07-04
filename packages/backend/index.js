import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore/lite";
import dotenv from "dotenv";

import loginToFirebase from "./src/loginMethods.js";

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

const firebaseDB = getFirestore(firebaseApp);

// Create a new Express app
const app = express();

// Enable middleware
app.use(cors());
app.use(express.json());

// Define a route to get data from Firebase
app.get("/", async (req, res) => {
  res.status(200).send("Working!");
});

app.post("/event/new", async (req, res) => {
  try {
    // This is what will be destructured into the document, but we must do some manipulation first.
    const eventData = req.body;

    // Organization is stored as a reference to a document in the organizations collection.
    // We need to look up the reference for the passed organization name and add it to the data.
    const orgRef = collection(firebaseDB, "organizations");
    const orgQuery = query(
      orgRef,
      where("organizationName", "==", eventData.hostOrganization)
    );
    const orgQuerySnap = await getDocs(orgQuery);
    orgQuerySnap.forEach((doc) => {
      eventData.hostOrganization = `organizations/${doc.id}`;
    });

    // Contact is also stored as a reference, but it is a sub-collection of each organization document.
    // We must use the reference we gained from above to find the person reference.
    const peopleRef = collection(
      firebaseDB,
      `${eventData.hostOrganization}/people`
    );
    const peopleQuery = query(
      peopleRef,
      where("name", "==", eventData.contactName)
    );
    const peopleQuerySnap = await getDocs(peopleQuery);
    peopleQuerySnap.forEach((doc) => {
      eventData.contactName = `${eventData.hostOrganization}/people/${doc.id}`;
    });

    eventData.eventCost = parseFloat(eventData.eventCost);
    const eventDocRef = await addDoc(doc(firebaseDB, "events"), eventData);

    // Everything went ok!
    res.status(201).send(`Added document with ID: ${eventDocRef.id}.`);
  } catch (error) {
    // Something went wrong!
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Start the Express server
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
