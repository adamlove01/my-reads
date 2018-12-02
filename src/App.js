import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import Main from './Main';
import Search from './Search';
import './App.css';

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    loading: true,
    error: false
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(allBooks => this.setState({ allBooks }))
      .catch(error => {
        // Log error in DB here
        this.setState({ error: true});
      })
      .finally(() => this.setState({ loading: false }));
  }

  /* This function is passed up to MoveBook.js */
  updateShelf = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf)
        .then(() => {
          if (shelf === 'none') {
            this.setState(prevState => ({
              allBooks: prevState.allBooks.filter(prevBook => prevBook.id !== book.id)
            }));
          } else {
            book.shelf = shelf;
            this.setState(prevState => ({
              allBooks: prevState.allBooks
                .filter(prevBook => prevBook.id !== book.id)
                .concat(book)
            }))          
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ error: true })
        });
    }
  };

  render() {
    const { updateShelf } = this;
    const { allBooks, loading, error } = this.state;

    const shelves = [
      {'slug': 'currentlyReading', 'title': 'Currently Reading'}, 
      {'slug': 'wantToRead',       'title': 'Want to Read'},
      {'slug': 'read',             'title': 'Read'},
    ];

    if (loading) {
      return <p className="error-msg loading"></p>
    }

    if (error) {
      return (
        <p className="error-msg">
          OOPS!<br/>Something went wrong.<br/>Please try again later.
        </p>
      );
    }

    return (
      <div className="app">
        <Route exact path='/' render={() => (
           <Main 
             books={allBooks}
             shelves={shelves}
             updateShelf={updateShelf}
           />
        )}/>
        <Route path='/search' render={() => (
          <Search 
            books={allBooks}
            shelves={shelves}
            updateShelf={updateShelf}
          />
        )}/>
      </div>   
    );
  }
}

export default BooksApp;
