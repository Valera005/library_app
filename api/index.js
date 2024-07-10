const express = require('express');
const cors = require('cors');
const booksData = require('./data/books.json');
const app = express();

app.use(cors());

app.get('/random-book', function (req, res) {
  const randomIndex = Math.floor(Math.random() * booksData.length);
  const randomBook = booksData[randomIndex];
  console.log(randomBook);
  res.json(randomBook);
});

app.listen(4000, () => console.log(`Server is running on port ${4000}`));