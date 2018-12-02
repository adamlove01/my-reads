import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import ShowBook from './ShowBook';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    query: '',
    results: [],
  };

  componentDidMount() {
    this.search = debounce( this.search, 500);
    /* Re-render the query results, if any, on page reload */
    const queryInStorage = localStorage.getItem('query');
    if (queryInStorage !== null) {
      this.setState({ query: queryInStorage });
      BooksAPI.search(queryInStorage, 20)
      .then((results) => {
        this.setState({ results });
      })
      .catch((error) => {
        this.setState({ results: [] });
      });
    }
  }

  updateQuery = (query) => {
    this.setState({ query }, () => {
      this.search(this.state.query);
    });
  };
  
  search = query => {
    /* Copy the query to localStorage so we can persist the results on page reload */
    localStorage.setItem('query', query);
    if (query) {
      BooksAPI.search(query, 20)
        .then((results) => {
          this.setState({ results });
        })
        .catch((error) => {
          this.setState({ results: [] });
        });
    } else {
      this.setState({ results: [] });
    }
  };

  render() {
    const { query, results } = this.state;
    const { books, shelves, updateShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">

          <Link to='/' className='search-close'>
            <p>&larr;</p>
          </Link>

          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {[...results].map((book) => (
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
  }
}

Search.propTypes = { 
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
};

export default Search;
