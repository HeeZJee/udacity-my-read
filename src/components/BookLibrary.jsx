import React, { Component } from 'react';
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom';
import * as BooksAPI from './../BooksAPI'

class BookLibrary extends Component {


    state = {
        books: [],
    }



    componentDidMount() {
        BooksAPI.getAll().then((res) => this.setState({ books: res }))
    }

    bookShelfHandler(book, shelf) {
        BooksAPI.update(book, shelf)
            .then(() => shelf !== 'none' ? alert(`${book.title} has been moved, Reload! to check.`) : null)
            .catch(() => alert('Something went wrong! Please try again!'));

    }

    render() {
        const { books } = this.state

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>

                        <BookShelf
                            name="Currently Reading"
                            books={books.filter(b => b.shelf === "currentlyReading")}
                            bookShelfHandler={this.bookShelfHandler.bind(this)}
                        />
                        <BookShelf
                            name="Want to Read"
                            books={books.filter(b => b.shelf === "wantToRead")}
                            bookShelfHandler={this.bookShelfHandler.bind(this)}
                        />
                        <BookShelf
                            name="Read"
                            books={books.filter(b => b.shelf === "read")}
                            bookShelfHandler={this.bookShelfHandler.bind(this)}
                        />
                    </div>
                </div>
                <Link to={{ pathname: "/search" }} className="open-search">Add a book</Link>
            </div>
        );
    }
}


export default BookLibrary;