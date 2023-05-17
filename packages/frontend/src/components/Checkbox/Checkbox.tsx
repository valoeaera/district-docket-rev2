// Styles
import "./Checkbox.css";

// Other
import camelCaseify from "../camelCaseify";

interface Props {
  // Required Props:
  label: string; //                         Text to be displayed in the label for this input element
  onChange: (inputKV: object) => void; //   Function to control input, takes an object of structure { inputID: inputValue }

  // Optional Props:
  className?: string; //    additional classNames; if applicable
  isDisabled?: boolean; //  whether the element is disabled
}

const Checkbox = (props: Props) => {
  const camelCasedLabel = camelCaseify(props.label);

  return (
    <div
      id={`${camelCasedLabel}-input-group`}
      className={props.className ? `checkbox ${props.className}` : "checkbox"}>
      <input
        id={camelCasedLabel}
        onChange={(event) => {
          props.onChange({ [camelCasedLabel]: event.target.value });
        }}
        type="checkbox"
      />
      <label htmlFor={camelCasedLabel}>{props.label}</label>
    </div>
  );
};

export default Checkbox;
