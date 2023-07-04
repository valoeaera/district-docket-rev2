// Components
import { Card } from "../../components";

// Types
import { Event } from "../../types/types";

// Styles
import "./List.css";

const EVENT_DATA: Event = {
  eventName: "Test Event 2",
  eventDate: "2023-07-04",
  eventTime: "12:30",
  eventCost: 10,
  repeatEvent: false,
  eventFrequency: null,
  venueAddress: "3616 Camelot Drive SE",
  venueName: "My Apartment",
  venueCity: "Grand Rapids",
  venueState: "MI",
  venueZIPCode: "49546",
  contactName: "organizations/district-docket/people/val-roudebush",
  hostOrganization: "organizations/district-docket",
  description: "",
  tags: ["Festivals & Celebrations", "Holiday"],
  image: null,
  approvalStatus: "pending",
};

const List = () => {
  return (
    <div className="card-container">
      <Card eventInfo={EVENT_DATA} />
      <Card eventInfo={EVENT_DATA} />
    </div>
  );
};

export default List;
