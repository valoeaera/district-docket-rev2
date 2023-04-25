import { DAY_HEADERS, MONTH_NAMES } from "./calendar_constants.js";
import { create_event_array, filter_week_view } from "../backend/index.js";

// Define our HTML element using CSS selectors
const weekBanner = document.querySelector(".calendar-header > h1"),
  headersBody = document.querySelector(".day-titles-week"),
  calendarBody = document.querySelector(".grid-calendar-week"),
  prevNextButtons = document.querySelectorAll(".calendar-header > button");

// Declare some parameters to generate the calendar
let currentDate = new Date(),
  currentYear = currentDate.getFullYear(),
  currentMonth = currentDate.getMonth(),
  lastSunday = currentDate.getDate() - currentDate.getDay(),
  activeDay = 0,
  weekEventList;

const getWeekEvents = async () => {
  // Create a start date to compare against. Needs to be at midnight to capture all events
  const lastSundayDate = new Date(
    currentYear,
    currentMonth,
    lastSunday,
    0,
    0,
    0
  );
  // Create an end date to compare against. Needs to be at 11:59pm to capture all events
  const thisSaturdayDate = new Date(
    currentYear,
    currentMonth,
    lastSunday + 7,
    0,
    0,
    -1
  );
  let we = await create_event_array();
  // Get and array of all events in that range using backend/Queries.js
  we = await filter_week_view(lastSundayDate, thisSaturdayDate, we);
  weekEventList = we;
};

const displayEvents = (isPhone, array) => {
  let returnHTML = "";
  // If we have events for this day from above filter, we create cards with their info
  if (array.length > 0) {
    array.forEach((event, index) => {
      // Format the date
      const eventDate = event.event_date.split(",")[0];
      let eventTime = event.event_date.split(",")[1];
      eventTime = eventTime.replace(" ", "");

      // Containers
      returnHTML += '<div class="week">';
      returnHTML += '<div id="card-container">';
      returnHTML += `<a class="event-link" data-event-id="${index}">`;
      returnHTML += '<div class="card">';

      // Image, currently a placeholder
      returnHTML += `<img src="${event.banner}" alt="event image"/>`;

      // Text information
      returnHTML += '<div class="card-text">';
      returnHTML += `<p class="card-text-item" id="event-${index}-name"><b>${event.event_name}</b></p>`;
      returnHTML += `<p class="card-text-item" id="event-${index}-time">${eventDate} @${eventTime}</p>`;
      returnHTML += `<p class="card-text-item" id="event-${index}-location">${event.venue.name}<br/>${event.venue.street}<br/>${event.venue.city}, ${event.venue.state} ${event.venue.zip}</p>`;
      returnHTML += "</div>";

      // Call-to-action
      returnHTML += '<div class="card-cta">';
      returnHTML += '<p class="card-cta-info">View Event Details</p>';
      returnHTML += "</div>";

      // Cap containers
      returnHTML += "</div>";
      returnHTML += "</a>";
      returnHTML += "</div>";
      returnHTML += "</div>";
    });
  } else {
    // If there are no events for today, render an empty <h3>
    returnHTML += '<div class="week">';
    returnHTML += `<h3>${isPhone ? "No Events Today" : ""}</h3>`;
    returnHTML += "</div>";
  }
  return returnHTML;
};

// Displays "Loading..." while we get all events and render the page
const setLoading = () => {
  weekBanner.innerHTML = '<div class="loading-message">Loading...</div>';
  headersBody.innerHTML = '<div class="loading-message hack">Loading...</div>';
  calendarBody.innerHTML = "";
};

const render = async () => {
  // Fetch all events and define variables to hold HTML
  await getWeekEvents();
  let headersHTML = "",
    calendarHTML = "";

  if (window.innerWidth < 768) {
    for (let i = 0; i < 7; i++) {
      // Determine and add the day's "rendered date" to the headers' HTML
      const renderedDate = new Date(
        currentYear,
        currentMonth,
        lastSunday + i
      ).getDate();
      headersHTML += `<button data-day-index="${i}" class="${
        i === activeDay ? "active-day" : ""
      }">${DAY_HEADERS[i]}<br/>${currentMonth + 1}/${renderedDate}</button>`;
    }

    const dayEvents =
      typeof weekEventList === Array || Object
        ? weekEventList.filter((event) => {
            return new Date(event.event_date).getDay() === activeDay;
          })
        : [];
    console.log(activeDay, dayEvents);

    calendarHTML = displayEvents(true, dayEvents);
  } else {
    for (let i = 0; i < 7; i++) {
      // Determine and add the day's "rendered date" to the headers' HTML
      const renderedDate = new Date(
        currentYear,
        currentMonth,
        lastSunday + i
      ).getDate();
      headersHTML += `<h3>${DAY_HEADERS[i]} ${
        currentMonth + 1
      }/${renderedDate}</h3>`;

      // Get the events for the day by comparing loop index with the day index of the event
      const dayEvents =
        typeof weekEventList === Array || Object
          ? weekEventList.filter((event) => {
              return new Date(event.event_date).getDay() === i;
            })
          : [];

      calendarHTML += displayEvents(false, dayEvents);
    }
  }

  // Set innerHTML
  weekBanner.innerText = `Week of ${MONTH_NAMES[currentMonth]} ${lastSunday}, ${currentYear}`;
  headersBody.innerHTML = headersHTML;
  calendarBody.innerHTML = calendarHTML;

  // Listen I just need to get this over the line. REACT would make this so much better STG
  const modalFrame = document.querySelector(".event-modal-wrapper");
  const eventLinks = document.querySelectorAll("a.event-link"),
    cardContainer = document.querySelector(".calendar-view"),
    modalCloseButton = modalFrame.querySelector("button");

  modalCloseButton.addEventListener("click", () => {
    modalFrame.style.display = "none";
    cardContainer.style.display = window.innerWidth < 768 ? "initial" : "grid";
  });

  eventLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const clickedEvent =
        weekEventList[Number(link.attributes["data-event-id"].value)];
      console.log(clickedEvent);

      const banner = modalFrame.querySelector("#banner"),
        title = modalFrame.querySelector("#event-title"),
        description = modalFrame.querySelector("#description-text"),
        location = modalFrame.querySelector("#location-text"),
        dateTime = modalFrame.querySelector("#date-time-text"),
        contactInfo = modalFrame.querySelector("#contact-info-text");

      banner.setAttribute("src", clickedEvent.banner);
      title.innerText = clickedEvent.event_name;
      description.innerText = clickedEvent.event_desc;
      location.innerText = `${clickedEvent.venue.name}\n${clickedEvent.venue.street}\n${clickedEvent.venue.city}, ${clickedEvent.venue.state} ${clickedEvent.venue.zip}`;
      dateTime.innerText = clickedEvent.event_date;
      contactInfo.innerText = `Email: ${clickedEvent.contact.email}\nPhone Number: ${clickedEvent.contact.phone}`;

      cardContainer.style.display = "none";
      modalFrame.style.display = "block";
    });
  });

  if (window.innerWidth < 768) {
    const dayButtons = document.querySelectorAll(".day-titles-week > button");
    dayButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const day = Number(button.attributes["data-day-index"].value);
        activeDay = day;

        // Re-render to catch new day events
        setLoading();
        render();
      });
    });
  }
};

// Initial render
setLoading();
await render();

prevNextButtons.forEach((button) => {
  // Listen for clicks on arrows
  button.addEventListener("click", () => {
    // Set week start to previous or next sunday
    currentDate = new Date(
      currentYear,
      currentMonth,
      button.id === "prev" ? lastSunday - 7 : lastSunday + 7
    );

    // Define new params
    currentYear = currentDate.getFullYear();
    currentMonth = currentDate.getMonth();
    lastSunday = currentDate.getDate() - currentDate.getDay();
    activeDay = 0; // Always start on Sunday for mobile view

    //Re-render
    setLoading();
    render();
  });
});
