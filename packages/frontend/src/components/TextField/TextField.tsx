// Types
import InputChangeHandler from "../../types/types";

// Styles
import "./TextField.css";

// Other
import camelCaseify from "../camelCaseify";

interface Props {
  // Required Props:
  label: string; //                             Text to be displayed in the label for this input element
  onChange: InputChangeHandler["onChange"]; //  Function to control input
  type: string; //                              HTML <input> type to be used for this input element

  // Optional Props:
  className?: string; //      additional classNames; if applicable
  isDisabled?: boolean; //    whether the element is disabled
  max?: number; //            maximum number for a number-type input (Default: 100)
  maxLength?: number; //      max length for a text-type input
  min?: number; //            minimum number for a number-type input (Default: 0)
  step?: number; //           step value for a number-type input (Default: 1.00)
  value?: string | number; // Value the input currently holds, controlled by parent components
}

const TextField = (props: Props) => {
  let additionalProps = {};

  switch (props.type) {
    case "number":
      additionalProps = {
        min: props.min || 0,
        max: props.max || 100,
        step: props.step || 1,
      };
      break;
    case "text":
      additionalProps = { maxLength: props.maxLength };
      break;
  }

  const camelCasedLabel = camelCaseify(props.label);

  return (
    <div
      id={`${camelCasedLabel}-input-group`}
      className={
        props.className ? `text-input ${props.className}` : "text-input"
      }>
      <label htmlFor={camelCasedLabel}>{props.label}</label>
      <input
        disabled={props.isDisabled}
        id={camelCasedLabel}
        onChange={(event) => {
          props.onChange(camelCasedLabel, event.target.value, "TextField");
        }}
        type={props.type}
        value={props.value}
        {...additionalProps}
      />
    </div>
  );
};

export default TextField;
