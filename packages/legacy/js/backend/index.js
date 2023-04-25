// Import Connection Information
import { db, loginToFirebase } from "./connection/connection.js";

// Import Filtering Functions
import { get_filter_data, get_collection_data } from "./filters/dropdowns.js";
import filter_month_view from "./filters/month.js";
import {
  create_event_array,
  filter_approved_events,
  filter_by_category,
  filter_by_city,
  filter_by_cost,
  filter_by_org,
  filter_not_approved_events,
  get_full_collection,
} from "./filters/queries.js";
import filter_certain_event from "./filters/singleEvent.js";
import filter_week_view from "./filters/week.js";

// Import Writing Functions
import add_event_to_firestore from "./write/add_event.js";
import approve_event from "./write/update.js";

export {
  add_event_to_firestore,
  approve_event,
  create_event_array,
  db,
  filter_approved_events,
  filter_by_category,
  filter_by_city,
  filter_by_cost,
  filter_by_org,
  filter_certain_event,
  filter_month_view,
  filter_not_approved_events,
  filter_week_view,
  get_full_collection,
  get_collection_data,
  get_filter_data,
  loginToFirebase,
};
