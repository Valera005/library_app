import { useDispatch, useSelector } from 'react-redux';
import './BookList.css';
import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators';
import store from '../../redux/store';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const filterObj = useSelector((state) => state.filter);


  function deleteBookById(id) {
    dispatch(deleteBook(id));
  }

  function handleToggleFavorite(id) {
    dispatch(toggleFavorite(id));
  }

  let filteredBooks = books.filter((book) => book.title.toLowerCase().includes(filterObj.title.toLowerCase()));


  return (
    <div className='app-block book-list'>
      <h2>Book List</h2>
      {books.length === 0 ? (<p>No books available</p>) :
        (
          <ul>
            {filteredBooks.map((book, i) => {
              return <li key={book.id}>
                <div className='book-info'>{++i}. {book.title} by <strong>{book.author}</strong></div>
                <div className='book-actions'>

                  <span onClick={() => handleToggleFavorite(book.id)}>
                    {book.isFavorite ? <BsBookmarkStarFill className="star-icon" />
                      : <BsBookmarkStar className="star-icon" />}
                  </span>

                  <button onClick={() => deleteBookById(book.id)}>Delete Book</button>
                </div>
              </li>;
            })}
          </ul>
        )
      }
    </div >
  );
};

export default BookList;