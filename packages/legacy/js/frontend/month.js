import { MONTH_NAMES } from "./calendar_constants.js";
import { create_event_array, filter_month_view } from "../backend/index.js";

// Define our HTML element using CSS selectors
const monthBanner = document.querySelector(".calendar-header > h1"),
  calendarBody = document.querySelector("tbody"),
  prevNextButtons = document.querySelectorAll(".calendar-header > button");

// Calendar should always open to current month and year
let currentDate = new Date(),
  currentYear = currentDate.getFullYear(),
  currentMonth = currentDate.getMonth(),
  firstDay = new Date(currentYear, currentMonth, 1).getDay();

// Declare calendar parameters
let firstSunday, numberOfDays, numberOfWeeks, monthEventList;

// This function determines characteristics about the calendar based on the current date
const setCalendarParams = (cy, cm, fd) => {
  // Subtracting the index of the day of the week from the date nets the first sunday in the six-week span
  firstSunday = new Date(cy, cm, 1 - fd);

  // Determine how many weeks we need
  numberOfDays = new Date(cy, cm + 1, 0).getDate();
  switch (true) {
    // If the month is long enough and we start at the end of a week, we'll roll over to a 6th row
    case numberOfDays === 30 && fd === 6:
      numberOfWeeks = 6;
      break;
    // Same as above, but for longer months
    case numberOfDays === 31 && fd >= 5:
      numberOfWeeks = 6;
      break;
    // If a non-leap February starts on Sunday, we'll have a rectangle month
    case numberOfDays === 28 && fd === 0:
      numberOfWeeks = 4;
      break;
    // Most months need 5 rows
    default:
      numberOfWeeks = 5;
  }
};

// Date number can be expressed as 7x week index + day index days since the first sunday of the calendar
const getDateFromIndices = (d, w) => {
  return new Date(
    firstSunday.getFullYear(),
    firstSunday.getMonth(),
    firstSunday.getDate() + (7 * w + d)
  );
};

// Determines using the indices whether the day is in "this month" or not. Determines background color.
const isCurrentMonth = (d, w) => {
  const indexMonth = getDateFromIndices(d, w).getMonth();
  if (indexMonth === currentMonth) {
    return true;
  } else {
    return false;
  }
};

// This function takes a month and year and returns an array of objects corresponding to the events in that month.
const getMonthEvents = async (m, y) => {
  monthEventList = [];
  // Function from backend/Queries.js
  let me = await create_event_array();
  me = await filter_month_view(m, y, me);
  me.forEach((event, index) => {
    monthEventList.push({ ...event, eventIndex: index });
  });
  console.log(monthEventList);
};

const setLoading = () => {
  // Set to "Loading..." while we render.
  monthBanner.innerHTML = '<div class="loading-message">Loading...</div>';
  calendarBody.innerHTML = '<div class="loading-message hack">Loading...</div>';
};

const render = async () => {
  // Every time we render the calendar, we need the up-to-date parameters and events list
  setCalendarParams(currentYear, currentMonth, firstDay);
  await getMonthEvents(currentMonth, currentYear);
  let bodyHTML = "";

  for (let week = 0; week < numberOfWeeks; week++) {
    // Each week gets a row with corresponding row number
    bodyHTML += `<tr class="row-${week + 1}">`;

    for (let day = 0; day < 7; day++) {
      // We get this day's dateNum and filter events by that
      const whenWeAre = getDateFromIndices(day, week);
      const dateNum = whenWeAre.getDate();
      const actualMonth = whenWeAre.getMonth();
      const dayEvents = monthEventList.filter((event) => {
        const datifiedDate = new Date(event.event_date);
        return (
          datifiedDate.getDate() === dateNum &&
          datifiedDate.getMonth() === actualMonth
        );
      });

      // If we have events for this day from above filter, we create a series of divs with their info
      let eventsHTML = "";
      if (dayEvents.length > 0) {
        dayEvents.forEach((event) => {
          eventsHTML += `<a class="event-link little-event-tile" data-event-id="${event.eventIndex}">${event.event_name}</a>`;
        });
      }

      // Add Container
      bodyHTML += "<td>";

      // Add classes to sub-container, everyone gets "days" days from other months get "greyed"
      bodyHTML += `<div class="days${
        isCurrentMonth(day, week) ? "" : " greyed"
      }">`;

      // Everyone gets a dateNum, if there are events for this day, append them
      bodyHTML += `<span>${dateNum}${eventsHTML ? eventsHTML : ""}</span>`;

      // Finish containers
      bodyHTML += "</div>";
      bodyHTML += "</td>";
    }
    // Finish week container
    bodyHTML += "</tr>";
  }
  monthBanner.innerText = `${MONTH_NAMES[currentMonth]} ${currentYear}`;
  calendarBody.innerHTML = bodyHTML;

  // Listen I just need to get this over the line. REACT would make this so much better STG
  const modalFrame = document.querySelector(".event-modal-wrapper");
  const eventLinks = document.querySelectorAll("a.event-link"),
    cardContainer = document.querySelector(".main-container"),
    modalCloseButton = modalFrame.querySelector("button");

  modalCloseButton.addEventListener("click", () => {
    modalFrame.style.display = "none";
    cardContainer.style.display = "initial";
  });

  eventLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const clickedEvent =
        monthEventList[Number(link.attributes["data-event-id"].value)];
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
};

// Do a first render()
setLoading();
render();

prevNextButtons.forEach((button) => {
  // Listen for clicks on each of the arrow buttons
  button.addEventListener("click", () => {
    // Behavior dependent on which button was clicked ("id")
    currentMonth = button.id === "prev" ? currentMonth - 1 : currentMonth + 1;

    // If we've wrapped year, regenerate parameters
    if (currentMonth < 0 || currentMonth > 11) {
      currentDate = new Date(currentYear, currentMonth);
      currentYear = currentDate.getFullYear();
      currentMonth = currentDate.getMonth();
    }

    // Determine the day of the week of the 1st
    firstDay = new Date(currentYear, currentMonth, 1).getDay();

    // Re-render with new params
    // Set to "Loading..." while we render.
    monthBanner.innerHTML = '<div class="loading-message">Loading...</div>';
    calendarBody.innerHTML =
      '<div class="loading-message hack">Loading...</div>';
    render();
  });
});
