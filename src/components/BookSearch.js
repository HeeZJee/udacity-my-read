import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import BookList from './BookList';
import * as BooksAPI from './../BooksAPI'
import { Link } from 'react-router-dom'



class BookSearch extends Component {

    state = {
        query: '',
        books: [],
        book: ''
    }

    queryHandler(query) {
        this.setState({ query })
        BooksAPI.search(query)
            .then(books => {
                if (books && books.error) {
                    this.setState({ books: [] })
                }
                else if (books && this.state.book.shelf && this.state.book.shelf !== '') {
                    const newBooks = books.filter(b => (b.id !== this.state.book.id))
                    this.setState({ books: [this.state.book, ...newBooks,] })
                }
                else if (this.state.books !== books) {
                    this.setState({ books })
                }
            })
    }

    bookShelfHandler(book, shelf) {
        book.shelf = shelf
        this.setState({ book })
        BooksAPI.update(book, shelf)
            .then(() => {
                this.setState((prevState) => ({
                    books: [...prevState.books],
                }))
                if (shelf !== 'none') { alert(`${book.title} has been added to your shelf!`) }
            })
            .catch(() => alert('Something went wrong! Please try again!'));

    }


    render() {
        const { query, books } = this.state


        return (
            <div className="search-books" >
                <div className="search-books-bar">
                    <Link className="close-search" to={{ pathname: '/' }}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={e => this.queryHandler(e.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books && !books.error &&
                            books.map((book) => (
                                <li key={book.id}>
                                    <BookList book={book} bookShelfHandler={this.bookShelfHandler.bind(this)}
                                    />
                                </li>))
                        }

                    </ol>
                </div>
            </div>
        );
    }
}



export default BookSearch;