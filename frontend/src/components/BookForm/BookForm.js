import { useState } from 'react';
import './BookForm.css';

const BookForm = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSumbit = (e) => {
    e.preventDefault();

    if (title && author) {
      console.log(title, author);
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

        <button type='submit'>Add book</button>
      </form>
    </div>
  );
};

export default BookForm;