// Components
import { Checkbox, Dropdown, TextField } from "../../components";

// Styles
import "./input.css";

const Input = () => {
  return (
    <>
      <div id="input-container">
        <div id="event-information" className="section">
          <h2>Event Information</h2>
          <TextField label="test" type="text" />
          <TextField label="test" type="text" />
          <TextField label="test" type="text" />
          <TextField label="test" type="text" />
          <Checkbox label="test" />
          <Dropdown label="test" />
        </div>
        <div></div>
        <div id="location-information" className="section">
          <h2>Location Information</h2>
          <TextField label="test" type="text" />
          <TextField label="test" type="text" />
          <TextField label="test" type="text" />
          <Dropdown label="test" />
          <TextField label="test" type="text" />
        </div>
        <div></div>
        <div id="contact-information" className="section">
          <h2>Contact Information</h2>
          <Dropdown label="test" />
          <Dropdown label="test" />
        </div>
        <div></div>
        <b></b>
      </div>
      <button></button>
    </>
  );
};

export default Input;
