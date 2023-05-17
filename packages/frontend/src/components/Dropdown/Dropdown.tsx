// Styles
import "./Dropdown.css";

// Other
import camelCaseify from "../camelCaseify";

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  // Required Props:
  label: string; //                         Text to be displayed in the label for this input element
  onChange: (inputKV: object) => void; //   Function to control input, takes an object of structure { inputID: inputValue }
  options: Option[]; //                     List of options in form {labelToDisplay: string, valueOfOption: string/number}

  // Optional Props:
  className?: string; //    additional classNames; if applicable
  isDisabled?: boolean; //  whether the element is disabled
}

const Dropdown = (props: Props) => {
  const camelCasedLabel = camelCaseify(props.label);

  return (
    <div
      id={`${camelCasedLabel}-input-group`}
      className={props.className ? `dropdown ${props.className}` : "dropdown"}>
      <label htmlFor={camelCasedLabel}>{props.label}</label>
      <select
        disabled={props.isDisabled}
        id={camelCasedLabel}
        onChange={(event) => {
          props.onChange({ [camelCasedLabel]: event.target.value });
        }}>
        {props.options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
