// Styles
import "./TextField.css";

interface Props {
  label: string;
  type: string;
  className?: string;
}

const TextField = (props: Props) => {
  const hyphenatedLabel = props.label.toLowerCase().replaceAll(" ", "-");
  return (
    <div
      id={`${hyphenatedLabel}-input-group`}
      className={
        props.className ? `text-input ${props.className}` : "text-input"
      }>
      <label htmlFor={hyphenatedLabel}>{props.label}</label>
      <input required id={hyphenatedLabel} type={props.type} />
    </div>
  );
};

export default TextField;
