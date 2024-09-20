import { useState } from 'react';
import './BookForm.css';
import { useDispatch, useSelector } from 'react-redux';
import booksData from '../../data/books.json';
import createBookWithID from '../../utils/createBookWithID';
import { addBook, fetchBook, selectIsLoadingViaAPI } from "../../redux/slices/booksSlice";
import { setError } from "../../redux/slices/errorSlice";
import { FaSpinner } from 'react-icons/fa';

const BookForm = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);

  const handleAddRandomBook = () => {
    const book = booksData[Math.floor(Math.random() * booksData.length)];

    dispatch(addBook(createBookWithID(book, "random")));
  };

  const handleSumbit = (e) => {
    e.preventDefault();

    if (title && author) {
      dispatch(addBook(createBookWithID({ title, author }, "manual")));
      setTitle('');
      setAuthor('');
    }
    else {
      dispatch(setError("Author or title is not filled"));
    }
  };

  const handleAddRandomBookViaAPI = async () => {
    dispatch(fetchBook("http://localhost:5000/random-book-delayed"));
  };

  return (
    <div className='app-block book-form'>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSumbit}>
        <div>
          <label htmlFor='title'>Title: </label>
          <input type='text' id="title" value={title}
            onChange={(e) => setTitle(e.target.value)}></input>
        </div>
        <div>
          <label htmlFor='author'>Author: </label>
          <input type='text' id="author" value={author}
            onChange={(e) => setAuthor(e.target.value)}></input>
        </div>

        <button type='submit'>Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>Add Random</button>

        <button type="button" onClick={handleAddRandomBookViaAPI} disabled={isLoadingViaAPI}>
          {isLoadingViaAPI ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className="spinner" />
            </>) : 'Add Random via API'}</button>
      </form>
    </div>
  );
};

export default BookForm;