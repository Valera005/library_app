import * as actionTypes from './actionTypes';

const initialState = [];

function booksReducer(state = initialState, action) {

  switch (action.type) {
    case actionTypes.ADD_BOOK:
      return [...state, action.payload];

    case actionTypes.DELETE_BOOK:
      return state.filter((book) => book.id !== action.payload.id);

    case actionTypes.TOGGLE_FOVORITE:
      return state.map((book) => book.id === action.payload.id
        ? { ...book, isFavorite: !book.isFavorite } : book);

    default:
      return state;
  }
}

export default booksReducer;