import React from 'react'
import './App.css'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

// Stateless React Component
const BookShelf = (props) => {
    const { books, shelfName, moveBookToAnotherShelf, renderCheckMark, shelfNameObject } = props;
    const shelfBooks = books.filter((book) => book.shelf === shelfName);

    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{shelfNameObject[shelfName]}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {shelfBooks.map((book) => (
                    <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select onChange={(event) => moveBookToAnotherShelf(event.target.value, book.id )}>
                            <option value="move">Move to...</option>
                            <option value="currentlyReading">{renderCheckMark("currentlyReading", book.shelf)} Currently Reading</option>
                            <option value="wantToRead">{renderCheckMark("wantToRead", book.shelf)} Want to Read</option>
                            <option value="read">{renderCheckMark("read", book.shelf)} Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">
                        {book.authors}<br/>
                      </div>
                    </div>
                  </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>
                Add Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelfName: PropTypes.string.isRequired,
  moveBookToAnotherShelf: PropTypes.func.isRequired,
  renderCheckMark: PropTypes.func.isRequired,
  shelfNameObject: PropTypes.object.isRequired
}

export default BookShelf;
