
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import Book from './Books';

class SearchBooks extends Component {
  static propTypes = {
    searchBooks: PropTypes.func.isRequired,
    changeShelfBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }
  state = {
    query: ''
  }
  componentDidMount() {
    this.props.searchBooks(this.state.query);
  }
  updateQuery = (query) => {
    this.setState({ query });
    this.props.searchBooks(query);
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              value={this.state.query}
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  changeShelfBook={this.props.changeShelfBook}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks