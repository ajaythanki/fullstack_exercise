import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor="filter">Filter: </label>
      <input
        type="text"
        id="filter"
        name="filter"
        onChange={(e) => dispatch(filterChange(e.target.value))}
      />
    </div>
  );
};

export default Filter;
