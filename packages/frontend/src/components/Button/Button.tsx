// React & 3rd party Imports
import { ReactElement } from "react";

// Styles
import "./Button.css";

interface Props {
  children: string | ReactElement | ReactElement[];
  onClick: () => void;

  className?: string;
}

const Button = (props: Props) => {
  return (
    <button
      className={props.className ? props.className : ""}
      onClick={() => {
        props.onClick();
      }}>
      {props.children}
    </button>
  );
};

export default Button;
