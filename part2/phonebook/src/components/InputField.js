const InputField = ({ title,inputType, fieldValue, onChangeHandler }) => {
  return (
    <p>
      {title} <input type={inputType} value={fieldValue} onChange={(e) => onChangeHandler(e)} />
    </p>
  );
};
export default InputField;
