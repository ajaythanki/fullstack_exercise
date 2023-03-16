import InputField from "./InputField";

const AddNew = (props) => {
  const { onSubmitHandler } = props,
    { newName } = props,
    { newNameHandler } = props,
    { newNumber } = props,
    { newNumberHandler } = props;
  return (
    <div>
      <h3>Add New</h3>
      <form onSubmit={onSubmitHandler}>
        <div>
          <InputField
            title={"Name: "}
            inputType={"text"}
            fieldValue={newName}
            onChangeHandler={newNameHandler}
          />
          <InputField
            title={"Number: "}
            inputType={"text"}
            fieldValue={newNumber}
            onChangeHandler={newNumberHandler}
          />
        </div>
        <br />
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};
export default AddNew;
