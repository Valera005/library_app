import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const booksSlice = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {

    addBook: (state, action) => {
      console.log("add");
      return [...state, action.payload];
    },

    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },

    toggleFavorite: (state, action) => {
      return state.map((book) => book.id === action.payload
        ? { ...book, isFavorite: !book.isFavorite } : book);
    }

  }
});


export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export default booksSlice.reducer;
