import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const errorSlice = createSlice({
  name: "error",
  initialState: initialState,
  reducers: {
    setError: (state, action) => {
      return action.payload;
    },

    clearError: () => {
      return initialState;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
