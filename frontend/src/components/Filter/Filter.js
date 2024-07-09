import { useDispatch, useSelector } from "react-redux";
import './Filter.css';
import { setTitleFilter, selectTitleFilter, resetFilters } from "../../redux/slices/filterSlice";


const Filter = () => {
  const dispatch = useDispatch();
  const title = useSelector(selectTitleFilter);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  return (
    <div className='app-block filter'>
      <div className="filter-group">
        <input onChange={handleTitleFilterChange} value={title} type="text" placeholder="Filter by title"></input>
      </div>
      <button type="button" onClick={() => dispatch(resetFilters())}>Reset Filters</button>
    </div>
  );
};

export default Filter;