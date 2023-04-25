import {
  filter_approved_events,
  filter_not_approved_events,
  filter_month_view,
  filter_week_view,
  filter_by_city,
  filter_by_cost,
  filter_by_org,
  filter_by_category,
  filter_certain_event,
  create_event_array,
} from "./index.js";

const array = await create_event_array();

const approved = await filter_approved_events(array);
console.log("Approved Events", approved);

const unapproved = await filter_not_approved_events(array);
console.log("Not Approved Events", unapproved);

// Check for current page based off body ID. This is used to determine what query should run for the particular view, and then change the array used for the dropdown filters
let altered_array;
switch (document.body.id) {
  case "month":
    altered_array = await filter_month_view(3, "2023", approved);
    console.log("Month", altered_array);
    break;
  case "week":
    altered_array = await filter_week_view(
      new Date("2023-04-15"),
      new Date("2023-04-21"),
      approved
    );
    console.log("Week", altered_array);
    break;
  case "approval":
    altered_array = unapproved;
    console.log("Approval", altered_array);
    break;
  default:
    altered_array = approved;
}

const city_button = document.querySelector("#lcity-town");
city_button.addEventListener("click", async () => {
  const city = await filter_by_city("Angola", altered_array);
  console.log("city", city);
});

const category_button = document.querySelector("#lcategories");
category_button.addEventListener("click", async () => {
  const tags = await filter_by_category("Networking", altered_array);
  console.log("tags", tags);
});

const org_button = document.querySelector("#lorganizations");
org_button.addEventListener("click", async () => {
  const org = await filter_by_org("pinkkhpRQBhsLJmlbD1T", altered_array);
  console.log("org", org);
});

const cost_button = document.querySelector("#lcost");
cost_button.addEventListener("click", async () => {
  const cost = await filter_by_cost(2000, altered_array);
  console.log("cost", cost);
});

const single_button = document.querySelector("#one-event");
single_button.addEventListener("click", async () => {
  const single = await filter_certain_event(
    "DyW70FcxLWZzaxEpQnXA ",
    altered_array
  );
  console.log("single event", single);
});
