import React, { Component } from 'react';
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom';
import * as BooksAPI from './../BooksAPI'

class BookLibrary extends Component {


    state = {
        books: [],
    }

    getAllBooks() {
        BooksAPI.getAll().then((res) => this.setState({ books: res }))

    }


    componentDidMount() {
        this.getAllBooks();
    }

    resetMain() {
        this.getAllBooks();
    }



    render() {
        const { books } = this.state

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Books Library</h1>
                </div>
                <div className="list-books-content">
                    <div>

                        <BookShelf
                            name="Currently Reading"
                            books={books.filter(b => b.shelf === "currentlyReading")}
                            // bookShelfHandler={this.bookShelfHandler.bind(this)}
                            // refreshResults={this.refreshResults.bind(this)}
                            resetMain={this.resetMain}
                        />
                        <BookShelf
                            name="Want to Read"
                            books={books.filter(b => b.shelf === "wantToRead")}
                            // bookShelfHandler={this.bookShelfHandler.bind(this)}
                            // refreshResults={this.refreshResults.bind(this)}
                            resetMain={this.resetMain}
                        />
                        <BookShelf
                            name="Read"
                            books={books.filter(b => b.shelf === "read")}
                            // bookShelfHandler={this.bookShelfHandler.bind(this)}
                            // refreshResults={this.refreshResults.bind(this)}
                            resetMain={this.resetMain}
                        />
                    </div>
                </div>
                <Link to={{ pathname: "/search" }} className="open-search">Add a book</Link>
            </div>
        );
    }
}


export default BookLibrary;