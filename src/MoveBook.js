import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

class MoveBook extends Component {
  state = {
    newShelf: this.props.shelf
  };
 
  update = (event) => {
    this.setState({ newShelf: event.target.value });
    BooksAPI.update(this.props.book, event.target.value)
      .then(() => {this.props.updateShelf(this.props.book, this.state.newShelf)});
  };

  render() {
    return (
      <select 
        key={this.props.book.id} 
        value={this.state.newShelf} 
        onChange={this.update}
      >
        {this.props.shelves.map((shelf) => (<option key={shelf.slug} value={shelf.slug}>{shelf.title}</option>))}
        <option value="none">None</option>
      </select>
    );
  }
}

MoveBook.propTypes = { 
  books: PropTypes.array.isRequired,
  book: PropTypes.object.isRequired,
  shelf: PropTypes.string.isRequired,
  shelves: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
};

export default MoveBook;
