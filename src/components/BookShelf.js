import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookList from './BookList';



export default class BookShelf extends Component {



    render() {
        const { books, name, resetMain } = this.props



        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            books.length &&
                            <li key={book.id}>
                                <BookList book={book}
                                    //  bookShelfHandler={this.bookShelfHandler.bind(this)}
                                    resetMain={resetMain}
                                />
                            </li>
                        ))}
                    </ol>

                </div>
            </div>
        )
    }
}

BookList.propTypes = {
    book: PropTypes.object.isRequired,
    bookShelfHandler: PropTypes.func.isRequired,
};
