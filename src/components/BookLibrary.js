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
        book.shelf = shelf
        BooksAPI.update(book, shelf)
            .then(this.setState((prevState) => ({
                books: [...prevState.books.filter((x) => x.id !== book.id), book],
            })))
            .catch(() => alert('Something went wrong! Please try again!'));
    }

    render() {
        const { books } = this.state
        const shelves = {
            currentlyReading: ['Currently Reading', 'currentlyReading'],
            wantToRead: ['Want to Read', 'wantToRead'],
            read: ['Read', 'read']
        }



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
                                bookShelfHandler={this.bookShelfHandler.bind(this)}
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


export default BookLibrary;