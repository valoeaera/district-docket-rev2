import {
  approve_event,
  create_event_array,
  filter_not_approved_events,
  loginToFirebase,
} from "../backend/index.js";

let isLoggedIn = false;

async function displayResults() {
  try {
    const array = await create_event_array();
    const result = await filter_not_approved_events(array);
    console.log(result);
    const loadingMessage = document.querySelector(".loading-message");
    loadingMessage.style.display = "none";
    if (isLoggedIn) {
      createModals(result);
    } else {
      createLoginPage();
    }
  } catch (error) {
    console.error(error);
  }
}

const createLoginPage = () => {
  let loginHTML = '<div id="login-container" class="form-container">';

  loginHTML += "<h2>Please login to use this page</h2>";

  // Email Input
  loginHTML += '<div id="email-input-group" class="text-input">';
  loginHTML += '<label for="email">Email</label>';
  loginHTML += '<input required id="email" type="text">';
  loginHTML += "</div>";

  // Password Input
  loginHTML += '<div id="password-input-group" class="text-input">';
  loginHTML += '<label for="password">Password</label>';
  loginHTML += '<input required id="password" type="password">';
  loginHTML += "</div>";

  // Submit Button
  loginHTML +=
    '<button id="login-button" class="submit-button" type="submit">Login</button>';
  loginHTML += "</div>";

  loginHTML +=
    '<div id="error-message">There was an error logging in. Please try again.</div>';

  body.innerHTML += loginHTML;

  const loginButton = document.querySelector("#login-button"),
    errorMessage = document.querySelector("#error-message");
  errorMessage.style.display = "none";

  loginButton.addEventListener("click", async () => {
    const inputEmail = document.querySelector("#email");
    const inputPass = document.querySelector("#password");

    isLoggedIn = await loginToFirebase(inputEmail.value, inputPass.value);
    inputEmail.value = "";
    inputPass.value = "";

    if (isLoggedIn) {
      const loadingMessage = document.querySelector(".loading-message"),
        loginPage = document.querySelector("#login-container");

      loadingMessage.style.display = "block";
      loginPage.style.display = "none";
      errorMessage.style.display = "none";
      displayResults();
    } else {
      errorMessage.style.display = "block";
    }
  });
};

function createModals(events) {
  const modalTemplate = (i, event) => `
    <div class="approval-container">
      <div class="approval-required" data-modal="${event.id}">
        ${event.event_name}
      </div>
      <div id="modal-event-${i}" class="modal">
        <div class="modal-content">
          <span class="modal-close">×</span>
          <div class="modal-text">
            <h3>Event Details</h3>
            <ul>
              ${Object.entries(event)
                .map(([key, value]) => {
                  if (typeof value !== "object" && key !== "banner") {
                    return `<li>${key}: ${value}</li>`;
                  } else if (key === "banner") {
                    return `<img id="banner-img" src="${value}"/>`;
                  }
                  return "";
                })
                .join("")}
            </ul>
            <h3>Contact</h3>
            <ul>
              ${["email", "first_name", "last_name", "phone"]
                .map(
                  (field) => `
                  <li>${field}: ${event.contact[field]}</li>
              `
                )
                .join("")}
            </ul>
            <h3>Organization</h3>
            <ul>
              ${["org_name", "preapproved"]
                .map(
                  (field) => `
                  <li>${field}: ${event.organization[field]}</li>
              `
                )
                .join("")}
            </ul>
            ${
              event.tags
                ? `
              <h3>Tags</h3>
              <ul>
                ${event.tags
                  .map(
                    (tag) => `
                    <li>${tag}</li>
                `
                  )
                  .join("")}
              </ul>
            `
                : ""
            }
            <h3>Venue</h3>
            <ul>
              ${["name", "street", "city", "state", "zip"]
                .map(
                  (field) => `
                  <li>${field}: ${event.venue[field]}</li>
              `
                )
                .join("")}
            </ul>
            <button class="approve-button">Approve</button>
            </div>
        </div>
      </div>
    </div>`;

  const modalContainer = events.map((event, i) => {
    const modalHtml = modalTemplate(i, event);
    const div = document.createElement("div");
    div.innerHTML = modalHtml.trim();
    return div.firstChild;
  });

  modalContainer.forEach((container) => {
    document.body.appendChild(container);

    const approvalRequired = container.querySelector(".approval-required");
    const modal = container.querySelector(".modal");
    const modalClose = container.querySelector(".modal-close");

    approvalRequired.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "block";
    });

    modalClose.addEventListener("click", () => {
      modal.style.display = "none";
    });

    document.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    // get the approve button inside the container
    const approveButton = container.querySelector(".approve-button");

    // add the event listener to the button
    approveButton.addEventListener("click", function () {
      const eventId = approvalRequired.dataset.modal;
      approve_event(eventId);
    });
  });
}

const body = document.querySelector("#approval");
body.innerHTML += '<div class="loading-message">Loading...</div>';
displayResults();
