import React from 'react';
import MoveBook from './MoveBook';
import PropTypes from 'prop-types';

const ShowBook = ({ books, book, shelves, updateShelf }) => {

  const thumbnail = typeof book.imageLinks === 'undefined' 
    ? 'http://via.placeholder.com/128x193?text=No%20Cover'
    : book.imageLinks['thumbnail'];

  const author = book.authors ? book.authors.join(', ') : 'Unknown Author';

  let thisShelf = book.shelf;
  if (!thisShelf) {
    /* For Search, see if the search result matches an existing book on a shelf */
    const match = books.find(myBook => myBook.id === book.id);
    thisShelf = match ? match.shelf : 'none';
  }
 
  return (
    <li key={book.id.toString()}>
      <div className="book">
        <div className="book-top">
          <div 
            className="book-cover" 
            style={{
              width: 128, 
              height: 193, 
              backgroundImage: `url('${thumbnail}')` 
            }}
          >
          </div>
          <div className="book-shelf-changer">
            <MoveBook 
              books={books} 
              book={book} 
              shelf={thisShelf}
              shelves={shelves}
              updateShelf={updateShelf} 
            />
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{author}</div>
      </div>
    </li>
  );
};

ShowBook.propTypes = { 
  books: PropTypes.array.isRequired,
  book: PropTypes.object.isRequired,
  shelves: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
};

export default ShowBook;
