// Types
import InputChangeHandler from "../../types/types";

interface Props {
  id?: string; //                               Pass through ID, if needed
  onChange: InputChangeHandler["onChange"]; //  Function to control input
  value: string; //                             Value controlled by the parent element
}

const Textarea = (props: Props) => {
  return (
    <textarea
      id={props.id}
      onChange={(event) => {
        props.onChange(
          props.id ? props.id : "",
          event.target.value,
          "Textarea"
        );
      }}
      value={props.value}
    />
  );
};

export default Textarea;
