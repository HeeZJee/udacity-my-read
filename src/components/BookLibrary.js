import React, { Component } from 'react';
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class BookLibrary extends Component {

    render() {
        const shelves = {
            currentlyReading: ['Currently Reading', 'currentlyReading'],
            wantToRead: ['Want to Read', 'wantToRead'],
            read: ['Read', 'read']
        }

        const { bookShelfHandler, books } = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Books Library</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {Object.keys(shelves).map((key) =>
                            <BookShelf
                                name={shelves[key][0]}
                                books={books.filter(b => b.shelf === shelves[key][1])}
                                bookShelfHandler={bookShelfHandler}
                                key={shelves[key][1]}
                            />
                        )}
                    </div>
                </div>
                <Link to={{ pathname: "/search" }} className="open-search">Add a book</Link>
            </div>
        );
    }
}
BookLibrary.propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    bookShelfHandler: PropTypes.func.isRequired,
}


export default BookLibrary;