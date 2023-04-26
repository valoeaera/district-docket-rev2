// Styles
import "./Checkbox.css";

interface Props {
  label: string;
}

const Checkbox = (props: Props) => {
  const hyphenatedLabel = props.label.toLowerCase().replaceAll(" ", "-");
  return (
    <div id={`${hyphenatedLabel}-input-group`} className="checkbox">
      <input id={hyphenatedLabel} type="checkbox" />
      <label htmlFor={hyphenatedLabel}>{props.label}</label>
    </div>
  );
};

export default Checkbox;
