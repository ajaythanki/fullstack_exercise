const InputField = ({ title, fieldValue, onChangeHandler }) => {
  return (
    <p>
      {title} <input value={fieldValue} onChange={(e) => onChangeHandler(e)} />
    </p>
  );
};
export default InputField;
