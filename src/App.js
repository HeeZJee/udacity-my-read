import React from 'react'
import './App.css'
import BookLibrary from './components/BookLibrary.js'
import BookSearch from './components/BookSearch.js'
import { Route } from 'react-router'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {

  state = {
    books: [],
  }

  componentDidMount() {
    // get books on load
    BooksAPI.getAll().then(books => this.setState({ books }));
  }


  bookShelfHandler = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      // set shelf for new or updated book
      book.shelf = shelf;
      // update state with changed book
      this.setState(prevState => ({
        books: [...prevState.books.filter((b) => b.id !== book.id), book],
      }))
    })
      .catch(() => alert('Something went wrong! Please try again!'));
  };


  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path='/'
          render={() =>
            <BookLibrary books={books} bookShelfHandler={this.bookShelfHandler} />}
        />
        <Route path='/search'
          render={() =>
            <BookSearch books={books} bookShelfHandler={this.bookShelfHandler} />}
        />
      </div>

    )
  }
}



export default BooksApp
