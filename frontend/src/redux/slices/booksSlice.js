import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createBookWithID from "../../utils/createBookWithID";
import axios from "axios";

const initialState = [];

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async () => {
    const res = await axios.get("http://localhost:5000/random-book");
    return res.data;
  }
);

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

  },

  extraReducers: (builder) => {

    builder.addCase(fetchBook.fulfilled, (state, action) => {
      const book = action.payload;
      if (book?.title && book?.author) {
        state.push(createBookWithID(book, "API"));
      }
    });

    builder.addCase(fetchBook.rejected, (state, action) => {

    });
  }
});


export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export default booksSlice.reducer;
