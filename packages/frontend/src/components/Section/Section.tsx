// React & 3rd party Imports
import { ReactElement } from "react";

// Styles
import "./Section.css";

interface Props {
  id?: string; //                               Pass through ID, if needed
  label: string; //                             Label for header element
  children?: string | ReactElement | ReactElement[]; //  Any sub-components to render
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
