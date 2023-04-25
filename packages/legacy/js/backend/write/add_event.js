import { db, storage } from "../connection/connection.js";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";
import {
  addDoc,
  collection,
  doc,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

const add_event_to_firestore = async (eventInfo, imageFile) => {
  try {
    // Create the venue
    const venue = {
      street: eventInfo.get("Street Address"),
      city: eventInfo.get("City"),
      state: doc(db, "states", eventInfo.get("State")),
      zip: eventInfo.get("Zip"),
      name: eventInfo.get("Location Name"),
    };

    // Collection References
    const organizationRef = doc(
      db,
      "organizations",
      eventInfo.get("Host Organization")
    );
    const approvalRef = doc(db, "approved", "false");
    const contactRef = doc(
      organizationRef,
      "contact",
      eventInfo.get("Contact Name")
    );

    // Add the venue to the "venues" collection with a generated ID
    const venueRef = await addDoc(collection(db, "venues"), venue);

    // Get the ID of the venue document
    const venueId = venueRef.id;

    // Upload the image to storage using the venue ID as the filename
    const fileExtension = imageFile.name.split(".").pop();
    const storageRef = ref(storage, `${venueId}.${fileExtension}`);
    await uploadBytesResumable(storageRef, imageFile, {
      contentType: "image/*",
    });

    // Get the download URL of the uploaded image
    const imageUrl = await getDownloadURL(storageRef);

    const event = {
      event_name: eventInfo.get("Event Name"),
      event_time: new Date(
        `${eventInfo.get("Event Date")}T${eventInfo.get("Event Time")}`
      ),
      event_cost: eventInfo.get("Event Cost"),
      contact: contactRef,
      organization: organizationRef,
      event_desc: eventInfo.get("Description"),
      approved: approvalRef,
      venue: venueRef,
      banner: imageUrl, // Set the banner field to the URL of the uploaded image
    };

    if (eventInfo.get("Event Frequency")) {
      const repeatRef = doc(db, "repeat_event", eventInfo.get("Repeat Event?"));
      const frequencyRef = doc(
        db,
        "frequency",
        eventInfo.get("Event Frequency")
      );
      event.repeat_event = repeatRef;
      event.frequency = frequencyRef;
    }

    const tagsString = eventInfo.get("tags");
    if (tagsString && tagsString !== "[]") {
      const tagsArray = JSON.parse(tagsString);
      const tagRefs = [];
      for (const tag of tagsArray) {
        const tagRef = doc(db, "tags", tag);
        tagRefs.push(tagRef);
      }
      event.tags = tagRefs;
    }

    // Add the event to the "events" collection with a generated ID
    await addDoc(collection(db, "events"), event);

    console.log(`Added ${eventInfo.get("Event Name")} to the database`);
    // Reset the form fields to their default values
    const form = document.getElementById("input-form");
    form.reset();
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("There was an error adding your event. Please try again later.");
  }
};

export default add_event_to_firestore;
