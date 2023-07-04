// Types
import { Event } from "../../types/types";

// Styles
import "./Card.css";

interface Props {
  eventInfo: Event;

  className?: string;
}

const Card = (props: Props) => {
  return (
    <div className={props.className ? `${props.className} card` : "card"}>
      {JSON.stringify(props.eventInfo)}
    </div>
  );
};

export default Card;
