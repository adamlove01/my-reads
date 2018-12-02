import React from 'react';
import { Link } from 'react-router-dom';
import ShowBook from './ShowBook';
import PropTypes from 'prop-types';

const Main = ({ books, shelves, updateShelf }) => {
  
  const booksOnShelf = (shelf) => {
    return  books.filter((book) => book.shelf === shelf.slug);
  };
  
  const showShelf = (shelf) => {
    return (
      <div className="bookshelf" key={shelf.slug}>
        <h2 className="bookshelf-title">{shelf.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksOnShelf(shelf).map((book) => (
              <ShowBook
                key={book.id}
                books={books} 
                book={book}
                shelves={shelves}
                updateShelf={updateShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map(shelf => showShelf(shelf))}
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>
         Add a book
        </Link>
      </div>
    </div>
  );
};

Main.propTypes = { 
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
};

export default Main;
