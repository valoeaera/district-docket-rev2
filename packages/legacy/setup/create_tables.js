import { db } from "../js/backend/index.js";
import {
  addDoc,
  collection,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

setDoc(doc(db, "preapproved", "true"), {});
setDoc(doc(db, "preapproved", "false"), {});

setDoc(doc(db, "repeat_event", "true"), {});
setDoc(doc(db, "repeat_event", "false"), {});

setDoc(doc(db, "approved", "true"), {});
setDoc(doc(db, "approved", "false"), {});

const frequency = ["NA", "biweekly", "daily", "monthly", "weekly", "yearly"];

const tags = [
  "Athletics",
  "Beer & Wine",
  "Cars",
  "Common Interest",
  "Dog Friendly",
  "Family Friendly",
  "Festivals",
  "Fundraisers",
  "Health & Wellness",
  "Music & Performance",
  "Networking",
  "Professional Development",
  "Public Meeting",
  "Shopping",
];

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

frequency.forEach((frequency) => {
  setDoc(doc(db, "frequency", frequency), {});
});
tags.forEach((tag) => {
  setDoc(doc(db, "tags", tag), {});
});
states.forEach((state) => {
  setDoc(doc(db, "states", state), {});
});

// Create the 'organizations' collection with the specified fields
const orgDocRef = await addDoc(collection(db, "organizations"), {
  org_name: "Example Org",
  preapproved: doc(collection(db, "preapproved"), "true"),
});

// Define an array of contacts
const contacts = [
  {
    first_name: "Jane",
    last_name: "Smith",
    email: "janesmith@example.com",
    phone: "555-555-5555",
  },
];

// Add contacts to the organization document
const contactDocs = [];
for (const contact of contacts) {
  const contactDocRef = await addDoc(
    collection(orgDocRef, "contacts"),
    contact
  );
  contactDocs.push(contactDocRef);
}

const orgId = orgDocRef.id;
const contactId = contactDocs.map((docRef) =>
  doc(collection(db, "organizations", orgId, "contacts"), docRef.id)
);

// Add a venue to the 'venues' collection
const venueDocRef = await addDoc(collection(db, "venues"), {
  city: "Example City",
  name: "Example Venue",
  state: doc(collection(db, "states"), "IN"),
  street: "123 Example Street",
  zip: "12345",
});
const venue = venueDocRef.id;

const eventDocRef = await addDoc(collection(db, "events"), {
  event_name: "Example Event",
  event_desc: "This is an example event",
  event_time: new Date(),
  event_cost: 10,
  banner: "https://example.com/banner.jpg",
  organization: doc(collection(db, "organizations"), orgId),
  contacts: contactId,
  tags: [
    doc(collection(db, "tags"), "Athletics"),
    doc(collection(db, "tags"), "Music & Performance"),
  ],
  venue: doc(collection(db, "venues"), venue),
  frequency: doc(collection(db, "frequency"), "weekly"),
  repeat_event: doc(collection(db, "repeat_event"), "true"),
  approved: doc(collection(db, "approved"), "false"),
});

console.log(eventDocRef);
