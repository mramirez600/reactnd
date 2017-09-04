import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI';

import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }
  listBooks = () => {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books });
      })
  }
  searchBooks = (query) => {
    if(query) {
      BooksAPI.getAll()
        .then(booksAPI => {
          BooksAPI.search(query)
            .then(response => {
              let books = [];
              if(Array.isArray(response)) {
                books = response;
              }
              if(Array.isArray(response.books)) {
                books = response.books;
              }
              if(books) {
                books = books.map(book => {
                  const bookAPI = booksAPI.find(bookAPI => bookAPI.id === book.id);
                  if(bookAPI) {
                    return bookAPI;
                  } else {
                    return book;
                  }
                });
                if(this.state.books !== books) {
                  this.setState({ books });
                }
              }
            });
        })
    } else {
      this.setState({ books: [] });
    }
  }
  changeShelfBook = (bookToChange, newShelf) => {
    BooksAPI.update(bookToChange, newShelf)
      .then(data => {
        this.setState(currentStatus => ({
          books: currentStatus.books.map(book => {
            if(bookToChange.id === book.id) {
              book.shelf = newShelf;
            }
            return book;
          })
        }));
      });
  }
  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks
            changeShelfBook={this.changeShelfBook}
            books={this.state.books}
            searchBooks={this.searchBooks}
          />
        )}/>
        <Route path='/' exact render={() => (
          <ListBooks
            changeShelfBook={this.changeShelfBook}
            books={this.state.books}
            listBooks={this.listBooks}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp