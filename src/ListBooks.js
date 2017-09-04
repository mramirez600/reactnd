import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BookShelf from './Bookshelf';

class ListBooks extends Component {
  static propTypes = {
    listBooks: PropTypes.func.isRequired,
    changeShelfBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }
  componentDidMount() {
    this.props.listBooks();
  }
  render() {
    const currentlyReadingBooks = this.props.books.filter(book => {
      return book.shelf === 'currentlyReading';
    });
    const wantToReadBooks = this.props.books.filter(book => {
      return book.shelf === 'wantToRead';
    });
    const readBooks = this.props.books.filter(book => {
      return book.shelf === 'read';
    });
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf changeShelfBook={this.props.changeShelfBook} bookShelfName={"Currently Reading"} books={currentlyReadingBooks}/>
            <BookShelf changeShelfBook={this.props.changeShelfBook} bookShelfName={"Want to Read"} books={wantToReadBooks}/>
            <BookShelf changeShelfBook={this.props.changeShelfBook} bookShelfName={"Read"} books={readBooks}/>
          </div>
          <div className="open-search">
            <Link
              to='/search'
              className="open-search"
            >Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks