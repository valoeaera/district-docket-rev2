// Styles
import { ReactElement } from "react";
import "./Section.css";

interface Props {
  id?: string; //                               Pass through ID, if needed
  label: string; //                             Label for header element
  children?: ReactElement | ReactElement[]; //  Any sub-components to render
}

const Section = (props: Props) => {
  return (
    <div id={props.id ? props.id : ""} className="section">
      <h2 className="section-header">{props.label}</h2>
      {props.children ? props.children : <></>}
    </div>
  );
};

export default Section;
