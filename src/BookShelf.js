import React from 'react'
import './App.css'
import { Link } from 'react-router-dom';

class BookShelf extends React.Component {

  getShelfName = (name) => {
    switch(name) {
      case 'currentlyReading':
        return 'Currently Reading';
      case 'wantToRead':
        return 'Want to Read';
      case 'read':
        return 'Read'
      default:
        return 'No Shelf Found'
    }
  }

  renderCheckMark = (shelf, bookShelf) => {
    return (shelf === bookShelf ? "\u2713" : "")
  }



  render() {
    const { books, shelfName, moveBookToAnotherShelf } = this.props;
    const shelfBooks = books.filter((book) => book.shelf === shelfName)
    const { getShelfName, renderCheckMark } = this;
    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{getShelfName(shelfName)}</h2>
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
                        {book.authors[0]}<br/>
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
}

export default BookShelf;
