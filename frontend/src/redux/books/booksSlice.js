import { createSlice } from "@reduxjs/toolkit";
import createBookWithID from "../../utils/createBookWithID";
import axios from "axios";

const initialState = [];

const booksSlice = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {

    addBook: (state, action) => {
      state.push(action.payload);
    },

    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },

    toggleFavorite: (state, action) => {
      state.forEach((book) => {
        if (book.id === action.payload) book.isFavorite = !book.isFavorite;
      });

      // return state.map((book) => book.id === action.payload
      //   ? { ...book, isFavorite: !book.isFavorite } : book);
    }

  }
});


export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const thunkFunction = async (dispatch, getState) => {

  console.log(getState());
  // async action
  try {
    const res = await axios.get("http://localhost:4000/random-book");
    if (res?.data?.title && res?.data?.author);
    {
      const book = res.data;
      dispatch(addBook(createBookWithID({ title: book.title, author: book.author }, "API")));
    }
  }
  catch (error) {
    console.error('Error fetching random book');
  }
  console.log(getState());

};

export default booksSlice.reducer;
