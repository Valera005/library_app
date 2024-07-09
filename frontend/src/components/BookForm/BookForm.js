import { useState } from 'react';
import './BookForm.css';
import { useDispatch } from 'react-redux';
import { addBook } from '../../redux/books/actionCreators';
import booksData from '../../data/books.json';
import createBookWithID from '../../utils/createBookWithID';

const BookForm = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const book = booksData[Math.floor(Math.random() * booksData.length)];

    dispatch(addBook(createBookWithID(book)));
  };

  const handleSumbit = (e) => {
    e.preventDefault();

    if (title && author) {
      dispatch(addBook(createBookWithID({ title, author })));
      setTitle('');
      setAuthor('');
    }
    // Dispatch action
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
      </form>
    </div>
  );
};

export default BookForm;