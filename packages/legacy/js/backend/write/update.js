import { db } from "../connection/connection.js";
import {
  doc,
  updateDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

async function approve_event(event_id) {
  const events_doc = doc(db, "events", event_id);

  // Get a reference to the "true" document in the "approvals" collection
  const approvals_col = collection(db, "approved");
  const true_doc = doc(approvals_col, "true");

  // Update the "approval" field of the event document to reference the "true" document
  await updateDoc(events_doc, { approved: true_doc });

  console.log(`Event with ID ${event_id} has been approved.`);
}

export default approve_event;
