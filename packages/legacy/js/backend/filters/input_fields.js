import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { db } from "../connection/connection.js";

/*
    HOST ORG AND CONTACT CALLS FOR INPUT FROM DB
*/

// Get all organizations and their contacts from Firestore
async function get_all_orgs_and_contacts() {
  const orgs_snapshot = await getDocs(collection(db, "organizations"));
  const orgs = await Promise.all(
    orgs_snapshot.docs.map(async (doc) => {
      const org_data = doc.data();
      const contacts_snapshot = await getDocs(
        collection(db, "organizations", doc.id, "contacts")
      );
      const contacts = contacts_snapshot.docs.map((contact_doc) => {
        const contact_data = contact_doc.data();
        const segments = contact_doc._key.path.segments;
        const contact_id = segments[segments.indexOf("contacts") + 1];
        contact_data.id = contact_id; // add contact_id as a property of contact_data object
        return contact_data;
      });

      org_data.contacts = contacts;
      return { id: doc.id, ...org_data };
    })
  );
  return orgs;
}

// Populate the Host Organization select element
function populate_orgs_select(orgs) {
  const select = document.getElementById("host-org");
  select.innerHTML = "";
  const default_option = document.createElement("option");
  default_option.value = "";
  default_option.disabled = true;
  default_option.selected = true;
  default_option.hidden = true;
  default_option.textContent = "Select Host Organization";
  select.appendChild(default_option);

  orgs.forEach((org) => {
    const option = document.createElement("option");
    option.value = org.id;
    option.textContent = org.org_name;
    select.appendChild(option);
  });

  // add "Other" option
  const other_option = document.createElement("option");
  other_option.value = "Other";
  other_option.textContent = "Other";
  select.appendChild(other_option);

  select.addEventListener("change", (event) => {
    const selected_org_id = event.target.value;
    let selected_org;

    // Handle case where "Other" option is selected
    if (selected_org_id === "Other") {
      selected_org = { id: "Other", org_name: "Other", contacts: [] };
    } else {
      selected_org = orgs.find((org) => org.id === selected_org_id);
    }

    const contacts_list = selected_org.contacts;
    populate_contacts_select(contacts_list);
  });
}

// Populate the Contact Name select element
function populate_contacts_select(contacts) {
  const select = document.getElementById("contact-name");
  select.innerHTML = "";
  const default_option = new Option("Select Contact Name", "", true, true);
  select.add(default_option);

  contacts.forEach((contact) => {
    const option = new Option(
      `${contact.first_name} ${contact.last_name}`,
      contact.id
    );
    option.value = contact.id; // Set the value of the option to the contact ID
    select.add(option);
  });

  // add "Other" option
  const other_option = new Option("Other", "Other");
  select.add(other_option);
}

// Initialize the Host Organization select element with data from Firestore
get_all_orgs_and_contacts()
  .then((orgs) => {
    populate_orgs_select(orgs);
  })
  .catch((error) => {
    console.error(error);
  });

/*
    ALL OTHER CALLS TO INPUT FROM DB
*/

// Retrieves all the IDs from a given collection in the Firestore database
async function get_all_ids(coll) {
  const collection_ref = collection(db, coll);
  const collection_snapshot = await getDocs(collection_ref);
  const collection_ids = collection_snapshot.docs.map((doc) => doc.id);
  return collection_ids;
}

// Generates the tags anchor tags and adds them to the DOM
async function generate_tags_anchor_tags() {
  const tags_info_div = document.getElementById("tags-info");

  // Create the "Select All Applicable Tags" header
  const header = document.createElement("h2");
  header.classList.add("input-section-header");
  header.textContent = "Select All Applicable Tags";
  tags_info_div.appendChild(header);

  // Create the categories input group div
  const categories_input_group = document.createElement("div");
  categories_input_group.id = "categories-input-group";

  // Get the tags array of IDs
  const tags = await get_all_ids("tags");

  // Loop through the tags array and generate anchor tags
  tags.forEach((tag) => {
    const input = document.createElement("input");
    input.id = tag;
    input.type = "checkbox";
    input.classList.add("tag");

    const label = document.createElement("label");
    label.setAttribute("for", tag);
    label.textContent = tag;

    const div = document.createElement("div");
    div.appendChild(input);
    div.appendChild(label);

    categories_input_group.appendChild(div);
  });

  tags_info_div.appendChild(categories_input_group);
}

// Generates select options and adds them to the DOM
async function select_options(select_id, collection_name, default_value) {
  const select = document.getElementById(select_id);
  const options = await get_all_ids(collection_name);

  // Add the default option as the first option
  const default_option = document.createElement("option");
  default_option.value = "";
  default_option.textContent = default_value;
  select.appendChild(default_option);

  // Add the rest of the options
  options.forEach((option) => {
    if (option !== "NA") {
      // check if option is not equal to "NA"
      const option_element = document.createElement("option");
      option_element.value = option;
      option_element.textContent = option;
      select.appendChild(option_element);
    }
  });
}

// Generate options for frequency-select
select_options("frequency-select", "frequency", "N/A");

// Generate options for state-select
select_options("state", "states", "State");

// Generate tags anchor tags and add them to the DOM
generate_tags_anchor_tags();
