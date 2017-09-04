import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Book from './Books';

class BookShelf extends Component {
  static propTypes = {
    bookShelfName: PropTypes.string.isRequired,
    changeShelfBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookShelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <li key={book.id}>
                <Book
                  changeShelfBook={this.props.changeShelfBook}
                  book={book}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf