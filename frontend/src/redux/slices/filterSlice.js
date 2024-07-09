import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  author: "",
  onlyFavorite: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {

    setTitleFilter: (state, action) => {
      state.title = action.payload;
    },

    setAuthorFilter: (state, action) => {
      state.author = action.payload;
    },

    resetFilters: (state) => {
      return initialState;
    },

    setOnlyFavoriteFilter: (state) => {
      state.onlyFavorite = !state.onlyFavorite;
      console.log("In set: ", state.onlyFavorite);
    },

  }
});


export const { setTitleFilter, resetFilters, setAuthorFilter, setOnlyFavoriteFilter } = filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;

export default filterSlice.reducer;
