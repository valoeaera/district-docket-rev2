// React
import { useState } from "react";

// Components
import { Checkbox, Dropdown, TextField } from "../../components";

// Styles
import "./input.css";

const Input = () => {
  const [eventInfo, setEventInfo] = useState({});

  const changeHandler = (inputKV: object) => {
    setEventInfo((prevState: object) => {
      return { ...prevState, ...inputKV };
    });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(eventInfo);
  };

  return (
    <form id="input-container" onSubmit={submitHandler}>
      <div id="event-information" className="section">
        <h2 className="section-header">Event Information</h2>
        <TextField label="Event Name" type="text" onChange={changeHandler} />
        <TextField label="Event Date" type="date" onChange={changeHandler} />
        <TextField label="Event Time" type="time" onChange={changeHandler} />
        <TextField
          label="Event Cost"
          onChange={changeHandler}
          type="number"
          max={1000.0}
          min={0.0}
          step={0.01}
        />
        <Checkbox label="Repeat Event?" onChange={changeHandler} />
        <Dropdown
          label="Event Frequency"
          onChange={changeHandler}
          options={[
            { label: "test1", value: "test1" },
            { label: "test2", value: "test2" },
          ]}
          isDisabled={false}
        />
      </div>
      <div id="event-description" className="section">
        <h2 className="section-header">Describe Your Event</h2>
        <textarea></textarea>
      </div>
      <div id="location-information" className="section">
        <h2 className="section-header">Location Information</h2>
        <TextField
          label="Venue Address"
          onChange={changeHandler}
          type="text"
          className="address-box"
        />
        <TextField label="Venue Name" onChange={changeHandler} type="text" />
        <TextField label="Venue City" onChange={changeHandler} type="text" />
        <Dropdown
          label="Venue State"
          onChange={changeHandler}
          options={[
            { label: "MI", value: "MI" },
            { label: "OH", value: "OH" },
          ]}
        />
        <TextField
          label="Venue ZIP Code"
          onChange={changeHandler}
          type="text"
          maxLength={5}
          pattern={"^[0-9]{5}$"}
        />
      </div>
      <div id="tags-section" className="section">
        <h2 className="section-header">Select Applicable Tags</h2>
        <Checkbox label="Recreation & Sports" onChange={changeHandler} />
        <Checkbox label="Arts & Culture" onChange={changeHandler} />
        <Checkbox label="Continuous Education" onChange={changeHandler} />
        <Checkbox label="Government" onChange={changeHandler} />
        <Checkbox label="Schools" onChange={changeHandler} />
        <Checkbox label="Family-Friendly" onChange={changeHandler} />
        <Checkbox label="Chamber of Commerce" onChange={changeHandler} />
        <Checkbox label="Clubs & Organizations" onChange={changeHandler} />
        <Checkbox label="Holiday" onChange={changeHandler} />
        <Checkbox label="Young Professionals" onChange={changeHandler} />
        <Checkbox label="Community" onChange={changeHandler} />
        <Checkbox label="Public Library" onChange={changeHandler} />
        <Checkbox label="Festivals & Celebrations" onChange={changeHandler} />
        <Checkbox label="Networking" onChange={changeHandler} />
      </div>
      <div id="contact-information" className="section">
        <h2 className="section-header">Contact Information</h2>
        <Dropdown
          label="Contact Name"
          onChange={changeHandler}
          options={[
            { label: "Val Roudebush", value: "Val Roudebush" },
            { label: "Ivy Goyetche", value: "Ivy Goyetche" },
          ]}
        />
        <Dropdown
          label="Host Organization"
          onChange={changeHandler}
          options={[
            { label: "District Docket", value: "District Docket" },
            { label: "Modern Arcane", value: "Modern Arcane" },
          ]}
        />
      </div>
      <div id="image-upload-section" className="section">
        <label htmlFor="image-upload" className="section-header">
          Upload Your Images
        </label>
        <input id="image-upload" type="file" />
        <button id="submit-button" type="submit">
          submit me!
        </button>
      </div>
    </form>
  );
};

export default Input;
