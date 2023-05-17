// Styles
import "./TextField.css";

// Other
import camelCaseify from "../camelCaseify";

interface Props {
  // Required Props:
  label: string; //                         Text to be displayed in the label for this input element
  onChange: (inputKV: object) => void; //   Function to control input, takes an object of structure { inputID: inputValue }
  type: string; //                          HTML <input> type to be used for this input element

  // Optional Props:
  className?: string; //    additional classNames; if applicable
  isDisabled?: boolean; //  whether the element is disabled
  max?: number; //          maximum number for a number-type input (Default: 100)
  maxLength?: number; //    max length for a text-type input
  min?: number; //          minimum number for a number-type input (Default: 0)
  pattern?: string; //      RegExp pattern to match for test-type input
  step?: number; //         step value for a number-type input (Default: 1.00)
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
      additionalProps = { maxLength: props.maxLength, pattern: props.pattern };
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
          props.onChange({ [camelCasedLabel]: event.target.value });
        }}
        type={props.type}
        {...additionalProps}
      />
    </div>
  );
};

export default TextField;
