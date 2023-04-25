import {
  collection,
  doc,
  getDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

import { db } from "../connection/connection.js";

// Query database for every document in a certain collection
async function get_full_collection(collection_name) {
  const collection_ref = collection(db, collection_name);
  const collection_snapshot = await getDocs(collection_ref);
  return collection_snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Create array that contains all data for every event
async function create_event_array() {
  const events_list = await get_full_collection("events");
  const event_array = [];

  for (const event_data of events_list) {
    const event_details = {};

    // Add the id property to the event_details object
    event_details.id = event_data.id;

    for (const field in event_data) {
      if (field === "venue") {
        const venue_ref = event_data[field];
        const venue_snapshot = await getDoc(venue_ref);
        const venue_data = venue_snapshot.data();
        if (venue_data.state) {
          const state_ref = venue_data.state;
          const state_id = state_ref.id;
          venue_data.state = state_id;
        }
        event_details[field] = venue_data;
      } else if (field === "contact") {
        const contact_ref = doc(
          collection(
            db,
            "organizations",
            event_data.contact._key.path.segments[6],
            "contacts"
          ),
          event_data.contact._key.path.segments[8]
        );
        const contact_snapshot = await getDoc(contact_ref);
        const contact_data = contact_snapshot.data();
        if (contact_data && contact_data.state) {
          const state_ref = contact_data.state;
          const state_id = state_ref.id;
          contact_data.state = state_id;
        }
        event_details[field] = contact_data;
      } else if (field === "organization") {
        const org_ref = event_data[field];
        const org_snapshot = await getDoc(org_ref);
        const org_data = org_snapshot.data();
        if (org_data.preapproved) {
          const preapproved_ref = org_data.preapproved;
          const preapproved_id = preapproved_ref.id;
          org_data.preapproved = preapproved_id;
        }
        const org_id = org_ref.id;
        org_data.id = org_id;
        event_details[field] = org_data;
      } else if (field === "tags") {
        const value = event_data[field];
        const tag_array = [];
        for (const ref of value) {
          const id = ref.id;
          tag_array.push(id);
        }
        event_details[field] = tag_array;
      } else if (
        field === "approved" ||
        field === "repeat_event" ||
        field === "frequency"
      ) {
        const ref = event_data[field];
        const id = ref.id;
        event_details[field] = id;
      } else if (field === "event_time") {
        const event_timestamp = event_data[field];
        const event_date = new Date(event_timestamp.seconds * 1000);
        event_details["event_date"] = event_date.toLocaleString();
      } else {
        event_details[field] = event_data[field];
      }
    }

    event_array.push(event_details);
  }
  return event_array;
}

/*
    APPROVED EVENTS
*/
async function filter_not_approved_events(events_list) {
  const today = new Date();
  const not_approved_events = events_list.filter((event) => {
    const event_date = new Date(event.event_date);
    return event.approved === "false" && event_date >= today;
  });
  return not_approved_events;
}
async function filter_approved_events(events_list) {
  const approved_events = events_list.filter((event) => {
    if (["approval", "event-list"].includes(document.body.id)) {
      const today = new Date();
      const event_date = new Date(event.event_date);
      return event.approved === "true" && event_date >= today;
    } else {
      return event.approved === "true";
    }
  });
  return approved_events;
}

/*
    DROPDOWN QUERIES
*/
async function filter_by_city(city, events_list) {
  const filtered_events = events_list.filter((event) => {
    return event.venue.city.toLowerCase() === city.toLowerCase();
  });
  return filtered_events;
}

async function filter_by_category(category, events_list) {
  const filtered_events = events_list.filter((event) => {
    return event.tags.includes(category);
  });
  return filtered_events;
}
async function filter_by_cost(cost, events_list) {
  const filtered_events = events_list.filter((event) => {
    return event.event_cost <= cost;
  });
  return filtered_events;
}
async function filter_by_org(org_id, events_list) {
  const filtered_events = events_list.filter((event) => {
    return event.organization.id === org_id;
  });
  return filtered_events;
}

export {
  create_event_array,
  filter_approved_events,
  filter_by_category,
  filter_by_city,
  filter_by_cost,
  filter_not_approved_events,
  filter_by_org,
  get_full_collection,
};
