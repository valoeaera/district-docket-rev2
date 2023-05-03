// Styles
import "./Checkbox.css";

interface Props {
  label: string;
  className?: string;
}

const Checkbox = (props: Props) => {
  const hyphenatedLabel = props.label.toLowerCase().replaceAll(" ", "-");
  return (
    <div
      id={`${hyphenatedLabel}-input-group`}
      className={props.className ? `checkbox ${props.className}` : "checkbox"}>
      <input id={hyphenatedLabel} type="checkbox" />
      <label htmlFor={hyphenatedLabel}>{props.label}</label>
    </div>
  );
};

export default Checkbox;
