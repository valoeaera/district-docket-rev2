// Components
import { Checkbox, Dropdown, TextField } from "../../components";

// Styles
import "./input.css";

const Input = () => {
  return (
    <>
      <div id="input-container">
        <div id="event-information" className="section">
          <h2 className="section-header">Event Information</h2>
          <TextField label="test" type="text" />
          <TextField label="test" type="text" />
          <TextField label="test" type="text" />
          <TextField label="test" type="text" />
          <Checkbox label="test" />
          <Dropdown
            label="dropdown"
            options={[
              { label: "test1", value: "test1" },
              { label: "test2", value: "test2" },
            ]}
          />
        </div>
        <div id="event-description" className="section">
          <h2 className="section-header">Describe Your Event</h2>
          <textarea></textarea>
        </div>
        <div id="location-information" className="section">
          <h2 className="section-header">Location Information</h2>
          <TextField label="test" type="text" className="address-box" />
          <TextField label="test" type="text" />
          <TextField label="test" type="text" />
          <Dropdown
            label="dropdown"
            options={[
              { label: "test1", value: "test1" },
              { label: "test2", value: "test2" },
            ]}
          />
          <TextField label="test" type="text" />
        </div>
        <div id="tags-section" className="section">
          <h2 className="section-header">Select Applicable Tags</h2>
          <Checkbox label="test" />
          <Checkbox label="test" />
          <Checkbox label="test" />
          <Checkbox label="test" />
          <Checkbox label="test" />
          <Checkbox label="test" />
          <Checkbox label="test" />
          <Checkbox label="test" />
          <Checkbox label="test" />
          <Checkbox label="test" />
          <Checkbox label="test" />
          <Checkbox label="test" />
          <Checkbox label="test" />
          <Checkbox label="test" />
          <Checkbox label="test" />
        </div>
        <div id="contact-information" className="section">
          <h2 className="section-header">Contact Information</h2>
          <Dropdown
            label="test"
            options={[
              { label: "test1", value: "test1" },
              { label: "test2", value: "test2" },
            ]}
          />
          <Dropdown
            label="test"
            options={[
              { label: "test1", value: "test1" },
              { label: "test2", value: "test2" },
            ]}
          />
        </div>
        <div id="image-upload-section" className="section">
          <label htmlFor="image-upload" className="section-header">
            Upload Your Images
          </label>
          <input id="image-upload" type="upload" />
        </div>
        <b></b>
      </div>
      <button></button>
    </>
  );
};

export default Input;
