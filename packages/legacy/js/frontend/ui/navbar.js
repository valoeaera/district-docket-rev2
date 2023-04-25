const titleContainer = document.querySelector("div.title");

const pages = [
  { id: "list", href: "index.html" },
  { id: "month", href: "month.html" },
  { id: "week", href: "week.html" },
  { id: "input", href: "input.html" },
  { id: "approval", href: "approval.html" },
];
const URL = window.location.href;

const capitalizeFirstLetter = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

let navbarHTML = '<ul id="navbar" class="select-view">';
navbarHTML += '<p id="view-header">Select View</p>';

pages.forEach((page) => {
  navbarHTML += `<li><a id="${page.id}" href=${page.href} class="${
    URL.includes(page.href) ? "active" : ""
  }">${capitalizeFirstLetter(page.id)}</a></li>`;
});

navbarHTML += "</ul>";
titleContainer.innerHTML = navbarHTML;
