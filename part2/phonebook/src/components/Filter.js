import InputField from "./InputField";

const Filter = ({ filteredData, handleFilter }) => {
  return (
    <InputField
      title={"Filter shown with: "}
      inputType={"text"}
      fieldValue={filteredData}
      onChangeHandler={handleFilter}
    />
  );
};
export default Filter;
