import "./Dropdown.css";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  options: Option[];
  className?: string;
}

const Dropdown = (props: Props) => {
  const hyphenatedLabel = props.label.toLowerCase().replaceAll(" ", "-");
  return (
    <div
      id={`${hyphenatedLabel}-input-group`}
      className={props.className ? `dropdown ${props.className}` : "dropdown"}>
      <label htmlFor={hyphenatedLabel}>{props.label}</label>
      <select>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
