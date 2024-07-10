import { useDispatch, useSelector } from 'react-redux';
import './BookList.css';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import { deleteBook, toggleFavorite } from "../../redux/slices/booksSlice";

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

  let filteredBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(filterObj.title.toLowerCase());
    const matchesAuthor = book.author.toLowerCase().includes(filterObj.author.toLowerCase());
    const matchesFavorite = filterObj.onlyFavorite ? book.isFavorite : true;

    return matchesAuthor && matchesTitle && matchesFavorite;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, 'gi');
    return text.split(regex).map((subString, i) => {

      if (subString.toLowerCase() === filter.toLowerCase())
        return (<span className="highlight" key={i}>{subString}</span>);
      return subString;
    });
  };

  return (
    <div className='app-block book-list'>
      <h2>Book List</h2>
      {filteredBooks.length === 0 ? (<p>No books available</p>) :
        (
          <ul>
            {filteredBooks.map((book, i) => {
              return <li key={book.id}>
                <div className='book-info'>
                  {++i}. {highlightMatch(book.title, filterObj.title)} by <strong>{highlightMatch(book.author, filterObj.author)}</strong> ({book.source})</div>
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