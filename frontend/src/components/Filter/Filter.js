import { useDispatch, useSelector } from "react-redux";
import './Filter.css';
import { setTitleFilter, resetFilters, setAuthorFilter, setOnlyFavoriteFilter } from "../../redux/slices/filterSlice";


const Filter = () => {
  const dispatch = useDispatch();
  const filterObj = useSelector((state) => state.filter);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleOnlyFavoriteFilterChange = (e) => {
    dispatch(setOnlyFavoriteFilter());
  };


  return (
    <div className='app-block filter'>
      <div className="filter-row">
        <div className="filter-group">
          <input onChange={handleTitleFilterChange} value={filterObj.title} type="text" placeholder="Filter by title"></input>
        </div>
        <div className="filter-group">
          <input onChange={handleAuthorFilterChange} value={filterObj.author} type="text" placeholder="Filter by author"></input>
        </div>
        <div className="fiter-group">
          <label>
            <input type="checkbox" checked={filterObj.onlyFavorite} onChange={handleOnlyFavoriteFilterChange}></input>
            Only Favorite
          </label>
        </div>

        <button type="button" onClick={() => dispatch(resetFilters())}>Reset Filters</button>
      </div>


    </div>
  );
};

export default Filter;