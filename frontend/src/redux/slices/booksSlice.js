import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createBookWithID from "../../utils/createBookWithID";
import axios from "axios";
import { setError } from "./errorSlice";

const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkApi) => {
    try {
      const res = await axios.get(url);
      return res.data;
    }
    catch (error) {
      thunkApi.dispatch(setError(error.message));
      throw error;
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {

    addBook: (state, action) => {
      state.books.push(action.payload);
    },

    deleteBook: (state, action) => {
      return { ...state, books: state.books.filter((book) => book.id !== action.payload) };
    },

    toggleFavorite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) book.isFavorite = !book.isFavorite;
      });

      // return state.map((book) => book.id === action.payload
      //   ? { ...book, isFavorite: !book.isFavorite } : book);
    }

  },

  extraReducers: {
    [fetchBook.pending]: (state) => {
      state.isLoadingViaAPI = true;
    },

    [fetchBook.fulfilled]: (state, action) => {
      const book = action.payload;
      if (book?.title && book?.author) {
        state.books.push(createBookWithID(book, "API"));
      }
      state.isLoadingViaAPI = false;
    },

    [fetchBook.rejected]: (state) => {
      state.isLoadingViaAPI = false;
    },
  }
});


export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.isLoadingViaAPI;

export default booksSlice.reducer;
