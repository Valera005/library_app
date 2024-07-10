const express = require('express');
const cors = require('cors');
const booksData = require('./data/books.json');
const app = express();

app.use(cors());

function getRandomBook() {

  const randomIndex = Math.floor(Math.random() * booksData.length);
  const randomBook = booksData[randomIndex];
  return randomBook;
}

app.get('/random-book', function (req, res) {
  const randomBook = getRandomBook();

  res.json(randomBook);
});

app.get('/random-book-delayed', function (req, res) {
  const randomBook = getRandomBook();

  setTimeout(() => {
    res.json(randomBook);
  }, 2000);

});

app.listen(4000, () => console.log(`Server is running on port ${4000}`));