// React
import { useState } from "react";

// Components
import {
  Checkbox,
  Dropdown,
  Section,
  Textarea,
  TextField,
} from "../../components";

// Types
import InputChangeHandler from "../../types/types";

// Styles
import "./input.css";

interface Event {
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventCost: number;
  repeatEvent: boolean;
  eventFrequency: string | null;
  venueAddress: string;
  venueName: string;
  venueCity: string;
  venueState: string;
  venueZIPCode: string;
  contactName: string;
  hostOrganization: string;
  description: string;
  tags: string[];
  image: any;
}

const VALID_TAGS = [
  "Recreation & Sports",
  "Arts & Culture",
  "Continuous Education",
  "Government",
  "Schools",
  "Family-Friendly",
  "Chamber of Commerce",
  "Clubs & Organizations",
  "Holiday",
  "Young Professionals",
  "Community",
  "Public Library",
  "Festivals & Celebrations",
  "Networking",
];

const Input = () => {
  const defaultEvent: Event = {
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventCost: 0,
    repeatEvent: false,
    eventFrequency: null,
    venueAddress: "",
    venueName: "",
    venueCity: "",
    venueState: "MI",
    venueZIPCode: "",
    contactName: "",
    hostOrganization: "",
    description: "",
    tags: [],
    image: null,
  };
  const [eventInfo, setEventInfo] = useState(defaultEvent);

  const changeHandler: InputChangeHandler["onChange"] = (
    fieldName,
    fieldValue,
    inputType
  ) => {
    setEventInfo((prevState: Event) => {
      const tagArray = eventInfo.tags;
      switch (inputType) {
        case "Checkbox":
        case "Dropdown":
        case "Textarea":
        case "TextField":
          return { ...prevState, [fieldName]: fieldValue };
        case "Tag-Checkbox":
          if (fieldValue) {
            tagArray.push(fieldName);
          } else if (!fieldValue) {
            const tagIndex = tagArray.indexOf(fieldName);
            if (tagIndex > -1) {
              tagArray.splice(tagIndex, 1);
            }
          }
          return { ...prevState, tags: [...new Set(tagArray)] };
        default:
          console.log(
            "UNSUPPORTED INPUT TYPE",
            fieldName,
            fieldValue,
            inputType
          );
          break;
      }
      return { ...prevState };
    });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(eventInfo);
    setEventInfo(defaultEvent);
  };

  return (
    <form id="input-container" onSubmit={submitHandler}>
      <Section id="event-information" label="Event Information">
        <TextField
          label="Event Name"
          type="text"
          onChange={changeHandler}
          value={eventInfo.eventName}
        />
        <TextField
          label="Event Date"
          type="date"
          onChange={changeHandler}
          value={eventInfo.eventDate}
        />
        <TextField
          label="Event Time"
          type="time"
          onChange={changeHandler}
          value={eventInfo.eventTime}
        />
        <TextField
          label="Event Cost"
          onChange={changeHandler}
          type="number"
          max={1000.0}
          min={0.0}
          step={0.01}
          value={eventInfo.eventCost}
        />
        <Checkbox
          label="Repeat Event?"
          onChange={changeHandler}
          value={eventInfo.repeatEvent}
        />
        <Dropdown
          label="Event Frequency"
          onChange={changeHandler}
          options={[
            { label: "No Repeat", value: "" },
            { label: "Daily", value: "daily" },
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
            { label: "Yearly", value: "yearly" },
          ]}
          isDisabled={!eventInfo.repeatEvent}
        />
      </Section>
      <Section id="event-description" label="Describe Your Event">
        <Textarea
          id="description"
          onChange={changeHandler}
          value={eventInfo.description}
        />
      </Section>
      <Section id="location-information" label="Location Information">
        <TextField
          label="Venue Address"
          onChange={changeHandler}
          type="text"
          className="address-box"
          value={eventInfo.venueAddress}
        />
        <TextField
          label="Venue Name"
          onChange={changeHandler}
          type="text"
          value={eventInfo.venueName}
        />
        <TextField
          label="Venue City"
          onChange={changeHandler}
          type="text"
          value={eventInfo.venueCity}
        />
        <Dropdown
          label="Venue State"
          onChange={changeHandler}
          options={[
            { label: "IN", value: "IN" },
            { label: "MI", value: "MI" },
            { label: "OH", value: "OH" },
          ]}
          value={eventInfo.venueState}
        />
        <TextField
          label="Venue ZIP Code"
          onChange={changeHandler}
          type="text"
          maxLength={5}
          value={eventInfo.venueZIPCode}
        />
      </Section>
      <Section id="tags-section" label="Select Applicable Tags">
        {VALID_TAGS.map((tag) => (
          <Checkbox
            key={tag}
            isTag={true}
            label={tag}
            onChange={changeHandler}
            value={eventInfo.tags.includes(tag)}
          />
        ))}
      </Section>
      <Section id="contact-information" label="Contact Information">
        <Dropdown
          label="Contact Name"
          onChange={changeHandler}
          options={[
            { label: "Val Roudebush", value: "Val Roudebush" },
            { label: "Ivy Goyetche", value: "Ivy Goyetche" },
          ]}
          value={eventInfo.contactName}
        />
        <Dropdown
          label="Host Organization"
          onChange={changeHandler}
          options={[
            { label: "District Docket", value: "District Docket" },
            { label: "Modern Arcane", value: "Modern Arcane" },
          ]}
          value={eventInfo.hostOrganization}
        />
      </Section>
      <Section id="image-upload-section" label="Upload Your Image">
        <input type="file" />
        <button id="submit-button" type="submit">
          submit me!
        </button>
      </Section>
    </form>
  );
};

export default Input;
