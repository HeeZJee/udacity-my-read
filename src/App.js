import React from 'react'
import './App.css'
import BookLibrary from './components/BookLibrary.js'
import BookSearch from './components/BookSearch.js'
import { Route } from 'react-router'


class BooksApp extends React.Component {


  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() =>
          <BookLibrary />
        } />
        <Route path='/search' render={() =>
          <BookSearch />} />
      </div>

    )
  }
}

export default BooksApp
