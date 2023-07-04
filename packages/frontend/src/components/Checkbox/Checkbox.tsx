// Types
import { InputChangeHandler } from "../../types/types";

// Styles
import "./Checkbox.css";

// Other
import camelCaseify from "../../functions/camelCaseify";

interface Props {
  // Required Props:
  label: string; //                             Text to be displayed in the label for this input element
  onChange: InputChangeHandler; //              Function to control input
  value: boolean; //                            Handles checkbox state

  // Optional Props:
  className?: string; //    additional classNames; if applicable
  isDisabled?: boolean; //  whether the element is disabled
  isTag?: boolean; //       whether the element is a Tag
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
          props.onChange(
            props.isTag ? props.label : camelCasedLabel,
            event.target.checked,
            props.isTag ? "Tag-Checkbox" : "Checkbox"
          );
        }}
        type="checkbox"
        checked={props.value}
      />
      <label htmlFor={camelCasedLabel}>{props.label}</label>
    </div>
  );
};

export default Checkbox;
