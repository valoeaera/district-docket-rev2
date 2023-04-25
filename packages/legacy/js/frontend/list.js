import {
  create_event_array,
  filter_approved_events,
} from "../backend/index.js";

// Define card container
const cardContainer = document.querySelector("#card-container");

// Show "Loading.."
cardContainer.innerHTML = '<div class="loading-message hack">Loading...</div>';

// Get all approved events
let eventList = await create_event_array();
eventList = await filter_approved_events(eventList);

// "Mom, can we get REACT?" "We have REACT at home!" REACT at home:
let cardListHTML = "";
eventList.forEach((event, index) => {
  // Format the date
  const eventDate = event.event_date.split(",")[0];
  let eventTime = event.event_date.split(",")[1];
  eventTime = eventTime.replace(" ", "");

  // Containers
  cardListHTML += `<a class="event-link" data-event-id="${index}">`;
  cardListHTML += '<div class="card">';

  // Image
  cardListHTML += `<img src="${event.banner}" alt="event image"/>`;

  //Text box
  cardListHTML += '<div class="card-text">';
  cardListHTML += `<p class="card-text-item" id="event-${index}-name"><b>${event.event_name}</b></p>`;
  cardListHTML += `<p class="card-text-item" id="event-${index}-time">${eventDate} @${eventTime}</p>`;
  cardListHTML += `<p class="card-text-item" id="event-${index}-location">${event.venue.name}<br/>${event.venue.street}<br/>${event.venue.city}, ${event.venue.state} ${event.venue.zip}</p>`;
  cardListHTML += "</div>";

  // Call to action
  cardListHTML += '<div class="card-cta">';
  cardListHTML += '<p class="card-cta-info">View Event Details</p>';
  cardListHTML += "</div>";

  // End of containers
  cardListHTML += "</div>";
  cardListHTML += "</a>";
});

cardContainer.innerHTML = cardListHTML;

// Listen I just need to get this over the line. REACT would make this so much better STG
const modalFrame = document.querySelector(".event-modal-wrapper");
const eventLinks = document.querySelectorAll("a.event-link"),
  modalCloseButton = modalFrame.querySelector("button");

modalCloseButton.addEventListener("click", () => {
  modalFrame.style.display = "none";
  cardContainer.style.display = "grid";
});

eventLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const clickedEvent =
      eventList[Number(link.attributes["data-event-id"].value)];

    const banner = modalFrame.querySelector("#banner"),
      title = modalFrame.querySelector("h1"),
      description = modalFrame.querySelector("#description-text"),
      location = modalFrame.querySelector("#location-text"),
      dateTime = modalFrame.querySelector("#date-time-text"),
      contactInfo = modalFrame.querySelector("#contact-info-text");

    banner.setAttribute("src", clickedEvent.banner);
    title.innerText = clickedEvent.event_name ? clickedEvent.event_name : "";
    description.innerText = clickedEvent.event_desc
      ? clickedEvent.event_desc
      : "";
    if (clickedEvent.venue) {
      location.innerText = `${clickedEvent.venue.name}\n${clickedEvent.venue.street}\n${clickedEvent.venue.city}, ${clickedEvent.venue.state} ${clickedEvent.venue.zip}`;
    }
    dateTime.innerText = clickedEvent.event_date ? clickedEvent.event_date : "";
    if (clickedEvent.contact) {
      contactInfo.innerText = `Email: ${clickedEvent.contact.email}\nPhone Number: ${clickedEvent.contact.phone}`;
    }

    cardContainer.style.display = "none";
    modalFrame.style.display = "block";
  });
});
