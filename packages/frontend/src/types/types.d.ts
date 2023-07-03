interface InputChangeHandler {
  onChange: (
    fieldName: string,
    fieldValue: string | number | boolean,
    inputType: string
  ) => void;
}

export default InputChangeHandler;
