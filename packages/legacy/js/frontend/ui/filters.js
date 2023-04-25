import { get_filter_data } from "../../backend/index.js";

const filtersPanel = document.querySelector(".filters");
const filterData = await get_filter_data();

console.log(filterData);

let filtersHTML = "";

const render = () => {
  if (window.innerWidth < 768) {
    // Form Containers & Button
    filtersHTML += '<form class="filter-box">';
    filtersHTML +=
      '<button type="button" class="filters-button mobile-filters-button">Filters</button>';
    filtersHTML += `<div class="filters-content hidden">`;

    // Category
    filtersHTML += '<div class="mobile-box">';
    filtersHTML +=
      '<button type="button" class="filters-button">Category</button>';
    filtersHTML += '<div class="category-filters">';
    filterData[0].forEach((option, index) => {
      filtersHTML += `<label for="${index}">${option} <input type="checkbox" name="cat1" id="${index}"/></label>`;
    });
    filtersHTML += "</div>";
    filtersHTML += "</div>";

    // Organizations
    filtersHTML += '<div class="mobile-box">';
    filtersHTML +=
      '<button type="button" class="filters-button">Organizations</button>';
    filtersHTML += '<div class="orgs-Filters">';
    filterData[2].forEach((option, index) => {
      filtersHTML += `<label for="${index}">${option} <input type="checkbox" name="cat1" id="${index}"/></label>`;
    });
    filtersHTML += "</div>";
    filtersHTML += "</div>";

    // City / Town
    filtersHTML += '<div class="mobile-box">';
    filtersHTML +=
      '<button type="button" class="filters-button">City/Towns</button>';
    filtersHTML += '<div class="city-Filters">';
    filterData[1].forEach((option, index) => {
      filtersHTML += `<label for="${index}">${option} <input type="checkbox" name="cat1" id="${index}"/></label>`;
    });
    filtersHTML += "</div>";
    filtersHTML += "</div>";

    // Cost
    filtersHTML += '<div class="mobile-box">';
    filtersHTML += '<button type="button" class="filters-button">Cost</button>';
    filtersHTML += '<div class="cost-Filters">';

    filtersHTML += "</div>";
    filtersHTML += "</div>";

    // Submit Button
    filtersHTML += '<div class="submit-buttons">';
    filtersHTML +=
      '<button type="reset" class="filters-button" id="resetButton">Reset</button>';
    filtersHTML +=
      '<button type="submit" class="filters-button" id="submitButton">Submit</button>';
    filtersHTML += "</div>";

    // Closing Tags
    filtersHTML += "</div>";
    filtersHTML += "</form>";

    // Set Inner HTML for Mobile view
    filtersPanel.innerHTML = filtersHTML;
  } else {
    // Categories
    filtersHTML += '<div class="filter-box">';
    filtersHTML += '<button class="filters-button">Categories</button>';
    filtersHTML += '<div class="filters-content">';
    filterData[0].forEach((option) => {
      filtersHTML += `<a href="#">${option}</a>`;
    });
    filtersHTML += "</div>";
    filtersHTML += "</div>";

    // Orgs
    filtersHTML += '<div class="filter-box">';
    filtersHTML += '<button class="filters-button">Organizations</button>';
    filtersHTML += '<div class="filters-content">';
    filterData[2].forEach((option) => {
      filtersHTML += `<a href="#">${option}</a>`;
    });
    filtersHTML += "</div>";
    filtersHTML += "</div>";

    // Cities
    filtersHTML += '<div class="filter-box">';
    filtersHTML += '<button class="filters-button">City/Town</button>';
    filtersHTML += '<div class="filters-content">';
    filterData[1].forEach((option) => {
      filtersHTML += `<a href="#">${option}</a>`;
    });
    filtersHTML += "</div>";
    filtersHTML += "</div>";

    // Cost
    filtersHTML += '<div class="filter-box">';
    filtersHTML += '<button class="filters-button">Cost</button>';
    filtersHTML += '<div class="filters-content">';
    filtersHTML +=
      '<input type="range" min="1" max="50" value="25" class="cost-slider" id="cost-slider">';
    filtersHTML += '<p id="cost-value"></p>';
    filtersHTML += "</div>";
    filtersHTML += "</div>";

    // Set Inner HTML for Desktop view
    filtersPanel.innerHTML = filtersHTML;
  }
  // Get the slider and value elements
  const slider = document.getElementById("cost-slider");
  const output = document.getElementById("cost-value");

  // Set the initial value display
  output.innerHTML = slider.value;

  // Update the value display as the slider is moved
  slider.oninput = function () {
    output.innerHTML = this.value;
  };
};

// Page Load
render();

const filtersButton = document.querySelector(".mobile-filters-button"),
  submitButton = document.querySelector("#submitButton");

if (filtersButton && submitButton) {
  filtersButton.addEventListener("click", () => {
    const filtersContent = document.querySelector(".filters-content");
    console.log(filtersContent);
    filtersContent.classList.toggle("hidden");
    filtersButton.classList.toggle("active");
  });
  submitButton.addEventListener("click", () => {
    const filtersContent = document.querySelector(".filters-content");
    filtersContent.classList.add("hidden");
    filtersButton.classList.remove("active");
  });
}
