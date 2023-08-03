import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";

import { firebaseDB } from "../config/index.js";

export const createEvent = async (req, res) => {
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
    const eventDocRef = await addDoc(
      collection(firebaseDB, "events"),
      eventData
    );

    // Everything went ok!
    res.status(201).send(`Added document with ID: ${eventDocRef.id}.`);
  } catch (error) {
    // Something went wrong!
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
