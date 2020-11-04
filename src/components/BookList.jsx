import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookList extends Component {

    switchShelfName() {
        switch (this.props.book.shelf) {
            case "currentlyReading":
                return "Currently Reading";
            case "wantToRead":
                return "Want To Read";
            case "read":
                return "Read";
            case "none":
                return "None";
            default:
                return "None";
        }
    }

    render() {
        const { book, bookShelfHandler } = this.props

        this.switchShelfName()


        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf || 'none'} onChange={(e) => bookShelfHandler(book, e.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors} </div>
            </div>
        );
    }
}

BookList.propTypes = {
    book: PropTypes.object.isRequired,
    bookShelfHandler: PropTypes.func.isRequired,
};

export default BookList;