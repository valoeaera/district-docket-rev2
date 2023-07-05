// React & 3rd party Imports
import { useState } from "react";

// Components
import { Card, Section } from "../../components";

// Types
import { Event } from "../../types/types";

// Styles
import "./List.css";

// Other
import EVENT_DATA from "./TestData.json";
import { React } from "../../assets";

const List = () => {
  const [activeCard, setActiveCard] = useState(-1);

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  const formatDate = (date: string) => {
    const jsDate = new Date(date);
    jsDate.setDate(jsDate.getDate() + 1);
    return jsDate.toLocaleDateString("en-GB", dateOptions);
  };

  const expandHandler = (cardIndex: number, isExpanding: boolean) => {
    console.log(cardIndex, isExpanding);
    if (isExpanding) {
      setActiveCard(cardIndex);
    } else {
      setActiveCard(-1);
    }
  };

  return activeCard < 0 ? (
    <div className="card-container multiple-card-container">
      {EVENT_DATA.map((event: Event, index) => {
        const DATE_STRING = formatDate(event.eventDate);
        return (
          <Card
            key={event.eventName}
            title={event.eventName}
            cardIndex={index}
            image={React}
            isActive={false}
            onExpand={expandHandler}>
            <p>
              {DATE_STRING}
              <br />
              {event.eventTime}
            </p>
            <p>
              {event.venueName}
              <br />
              {event.venueAddress}
              <br />
              {event.venueCity}, {event.venueState} {event.venueZIPCode}
            </p>
          </Card>
        );
      })}
    </div>
  ) : (
    <div className="card-container">
      <Card
        key={EVENT_DATA[activeCard].eventName}
        title={EVENT_DATA[activeCard].eventName}
        cardIndex={activeCard}
        isActive={true}
        onExpand={expandHandler}>
        <Section label="Description">
          {EVENT_DATA[activeCard].description}
        </Section>
        <Section label="Location">
          <span>
            {EVENT_DATA[activeCard].venueName}
            <br />
            {EVENT_DATA[activeCard].venueAddress}
            <br />
            {EVENT_DATA[activeCard].venueCity},{" "}
            {EVENT_DATA[activeCard].venueState}{" "}
            {EVENT_DATA[activeCard].venueZIPCode}
          </span>
        </Section>
        <Section label="Date & Time">
          <span>
            {`The event will be held on ${formatDate(
              EVENT_DATA[activeCard].eventDate
            )} @ ${EVENT_DATA[activeCard].eventTime}.`}
          </span>
        </Section>
        <Section label="Website & Contact Information">
          <span>
            <b>Website:</b> placeholder
            <br />
            <b>Email Address:</b> placeholder
            <br />
            <b>Phone Number:</b> placeholder
            <br />
          </span>
        </Section>
      </Card>
    </div>
  );
};

export default List;
