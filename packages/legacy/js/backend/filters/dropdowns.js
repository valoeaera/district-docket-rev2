import { db } from "../connection/connection.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

const cache = {};

async function get_collection_data(collection_ref, process_data_callback) {
  if (cache[collection_ref.path]) {
    return cache[collection_ref.path];
  }

  const snapshot = await getDocs(collection_ref);
  const data_array = [];
  snapshot.forEach((doc) => {
    const data = process_data_callback(doc);
    if (data && !data_array.includes(data)) {
      data_array.push(data);
    }
  });

  cache[collection_ref.path] = data_array;
  return data_array;
}

async function get_filter_data() {
  const tags_ref = collection(db, "tags");
  const venues_ref = collection(db, "venues");
  const org_ref = collection(db, "organizations");

  const [tags, cities, orgs] = await Promise.all([
    get_collection_data(tags_ref, (doc) => doc.id),
    get_collection_data(venues_ref, (doc) => doc.data().city),
    get_collection_data(org_ref, (doc) => doc.data().org_name),
  ]);

  return [tags, cities, orgs];
}

export { get_filter_data, get_collection_data };
