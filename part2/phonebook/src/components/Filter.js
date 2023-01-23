import InputField from "./InputField";

const Filter = ({ filteredData, handleFilter }) => {
  return (
    <InputField
      title={"Filter shown with: "}
      fieldValue={filteredData}
      onChangeHandler={handleFilter}
    />
  );
};
export default Filter;
