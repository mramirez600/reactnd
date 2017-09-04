import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BookShelfChanger from './ShelfChange';

class Book extends Component {
  static propTypes = {
    changeShelfBook: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired
  }
  render() {
    const {book} = this.props;
    const bookImageLink = book.imageLinks ? book.imageLinks.thumbnail : '';
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookImageLink})` }}></div>
          <BookShelfChanger
            changeShelfBook={this.props.changeShelfBook}
            book={book}
          />
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors.map((writer) => <div className="book-authors">{writer}
        </div>)}
      </div>
    )
  }
}

export default Book