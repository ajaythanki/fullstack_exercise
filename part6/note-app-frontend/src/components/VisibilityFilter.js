import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const VisibilityFilter = (props) => {
  const dispatch = useDispatch();

  return (
<div>
        <label htmlFor="filterAll">all</label>
        <input
          id="filterAll"
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange("ALL"))}
        />
        <label htmlFor="filterImportant">important</label>
        <input
          id="filterImportant"
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange("IMPORTANT"))}
        />
        <label htmlFor="filterNonImportant">Non Important</label>
        <input
          id="filterNonImportant"
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange("NONIMPORTANT"))}
        />
      </div>
  );
};

export default VisibilityFilter;
