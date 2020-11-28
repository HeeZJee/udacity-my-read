import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookList from './BookList';
import * as BooksAPI from './../BooksAPI'
import { Link } from 'react-router-dom'



class BookSearch extends Component {

    state = {
        query: '',
        searchedBooks: [],
    }


    queryHandler(query) {
        this.setState({ query })
        if (query) {
            BooksAPI.search(query)
                .then(books => {
                    books.length && books.error
                        ? this.setState({ newBooks: [] })
                        : this.setState({ newBooks: books })

                })
        }
        else {
            this.setState({ searchedBooks: [] })
        }
    }



    render() {

        const { query, newBooks } = this.state
        const { bookShelfHandler, books } = this.props



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
                        {newBooks && !newBooks.error &&
                            newBooks.map((book) => (
                                <li key={book.id}>
                                    <BookList book={book} books={books} bookShelfHandler={bookShelfHandler}
                                    />
                                </li>))
                        }

                    </ol>
                </div>
            </div>
        );
    }
}

BookSearch.propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    bookShelfHandler: PropTypes.func.isRequired,
}




export default BookSearch;