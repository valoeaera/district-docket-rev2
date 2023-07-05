// React & 3rd party Imports
import { ReactElement } from "react";

// Components
import Button from "../Button";

// Styles
import "./Card.css";

// Other
import { Collapse, Expand } from "../../assets";

interface Props {
  cardIndex: number;
  children: ReactElement | ReactElement[];
  isActive: boolean;
  onExpand: (cardIndex: number, isExpanding: boolean) => void;
  title: string;

  className?: string;
  image?: string;
}

const Card = (props: Props) => {
  return (
    <div
      className={[
        props.className ? props.className : "",
        props.isActive ? "big-card" : "small-card",
        "card",
      ].join(" ")}>
      <div className="card-header">
        {props.title}
        <Button
          onClick={() => {
            props.onExpand(props.cardIndex, props.isActive ? false : true);
            console.log("clicked => ", props.title);
          }}
          className="expand-button">
          <img src={props.isActive ? Collapse : Expand} />
        </Button>
      </div>
      <div className="card-contents">
        {props.image ? (
          <img
            className="image"
            alt={`${props.title}-image`}
            src={props.image}></img>
        ) : (
          <div className="image"></div>
        )}
        <div className="information-container">{props.children}</div>
      </div>
    </div>
  );
};

export default Card;
