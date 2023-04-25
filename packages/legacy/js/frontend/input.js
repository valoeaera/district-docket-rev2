import { add_event_to_firestore } from "../backend/index.js";

const form = document.querySelector("#input-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const host_org_select = document.getElementById("host-org");
  const contact_select = document.getElementById("contact-name");

  // Check if either the host org or contact has a value of "Other"
  if (host_org_select.value === "Other" || contact_select.value === "Other") {
    alert(
      "It seems you do not have a valid organization or contact. Please contact the administrator at {SOME EMAIL HERE} to get your information added to our system."
    );
    return;
  }

  const form_data = new FormData(); // initialize formData as a FormData object
  const image_file = document.getElementById("myfile").files[0]; // get the uploaded image file
  const tags = {}; // initialize tags as an object

  const form_inputs = document.querySelectorAll(
    "#input-form input, #input-form select, #description"
  );

  form_inputs.forEach((input) => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    let actual_value;

    if (input.type === "checkbox") {
      actual_value = input.checked;
    } else if (input.type === "file") {
      actual_value = input.files[0]; // get the uploaded file
    } else {
      actual_value = input.value;
    }

    if (input.className === "tag") {
      const tag_label = label.innerHTML.replace(/&amp;/g, "&");
      tags[tag_label] = actual_value;
    } else {
      form_data.append(label.innerHTML, actual_value);
    }
  });

  // add tags object to formData object
  form_data.append(
    "tags",
    JSON.stringify(Object.keys(tags).filter((tag) => tags[tag]))
  );

  add_event_to_firestore(form_data, image_file);
});

const input_field = document.getElementById("event-cost");

input_field.addEventListener("focus", () => {
  input_field.select();
});

// Check for recurring event selection box
const recurring_checkbox = document.getElementById("recurring-event");
const frequency_select = document.getElementById("frequency-select");

// Disable frequency select initially
frequency_select.disabled = true;
recurring_checkbox.checked = false;

// Add event listener to recurring checkbox
recurring_checkbox.addEventListener("change", () => {
  // If recurring checkbox is checked, enable frequency select
  if (recurring_checkbox.checked) {
    frequency_select.disabled = false;
  }
  // If recurring checkbox is unchecked, disable frequency select and set the value of the "N/A" option to "NA"
  else {
    frequency_select.disabled = true;
    frequency_select.selectedIndex = 0; // to show the default value
  }
});

const contact_select = document.getElementById("contact-name");
const org_select = document.getElementById("host-org");

contact_select.disabled = true; // Set contact select as disabled by default
org_select.addEventListener("change", () => {
  const selected_value = org_select.value;
  if (selected_value === "Other") {
    contact_select.disabled = true; // Grey out contact select
  } else {
    contact_select.disabled = false; // Enable contact select
  }
});
