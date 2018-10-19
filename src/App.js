import React from 'react'
import BookShelf from './BookShelf'
import Search from './Search'
import * as APIclient from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books:[],
    shelfName : {
      'currentlyReading': 'Currently Reading',
      'wantToRead': 'Want to Read',
      'read':'read'
    }
  }

  /**
  * @description Make an asyc API call to obtain all books and set the state
  */
  async componentDidMount() {
    const books = await APIclient.getAll();
    this.setState({
      books
    });
  }

  /**
  * @description Method to change book between shelves
  * @param {string} value - The shelve to to which the book is going to be moved. Could be none
  * @param {string} id - Id of the book
  */
  moveBookToAnotherShelf = (value, id) => {
    if (value === "none") {
      return;
    }
    let updatedBooks = this.state.books.map((book) => {
      if (book.id === id) {
        APIclient.update(book, value);
        return {
                ...book,
                shelf : value
              }
      } else {
        return book
      }
    });
    this.setState({books: updatedBooks})
  }

  /**
  * @description Method to safely obtain thumbail image link. If the book does not have any it returns a placeholder
  * @param {string} bookImageLinks - The image links of the current book
  */
  getThumbnailURL = (bookImageLinks) => {
    return (bookImageLinks === undefined ?
      "http://via.placeholder.com/128x193?text=No%20Cover"
      : bookImageLinks.thumbnail
    )
  }

  /**
  * @description Method to add book from search results to shelves
  * @param {string} shelf - The shelf to which the book will be moved
  * @param {JSON} book - Object representing the book that will be added results to shelf
  */
  addBookToShelf = (shelf, book) => {
    const bookAlreadyInShelf = this.checkForDupe(book.id)
    if (!bookAlreadyInShelf) {
      APIclient.update(book, shelf);
      this.setState({
        books: [...this.state.books, book]
      })
    } else {
      console.log("Book is already in Shelf")
      return;
    }
  }

  /**
  * @description Method to check if the book selected from search results is already in one the shelves
  * @param {string} id - Id of the book that is going to be checked for duplicate
  */
  checkForDupe(id) {
    return this.state.books.some((book) => (
      book.id === id
  ))}

  /**
  * @description Method that returns the name of the shelf that is going to be rendered
  * @param {string} name - Name of the shelf in camel case
  */
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
  /**
  * @description Method that renders checkmark in select menu
  * @param {string} shelf - Shelf in select menu
  * @param {string} bookShelf - Shelf for the current book
  */
  renderCheckMark = (shelf, bookShelf) => {
    return (shelf === bookShelf ? "\u2713" : "")
  }

  /**
  * @description Method that moves book from search results to shelves
  * @param {Object} event - Event trigerred from select menu
  * @param {Object} book - Book that is going to be added to shelfName
  * @param {function} addBookToShelf - Adds book to corresponding shelf
  */
  moveBookToShelf = (event, book, addBookToShelf) => {
    if (event.target.value === "none"){
      return;
    }
    const updatedBook = {
      ...book,
      shelf: event.target.value
    }
  addBookToShelf (event.target.value, updatedBook);
  }

  /**
  * @description Method that renders checkmarks in search results
  * @param {string} shelf - Shelf in the select menu
  * @param {string} books - All books stored in the state of the application
  * @param {string} book - Book from search results
  */
  renderCheckMarkForSearchResults = (shelf, books, book) => {
    return (this.checkForShelfInSearchResults(shelf, books, book) ? "\u2713" : "")
  }

  /**
  * @description Method that checks if book in search results is already in sheld
  * @param {string} shelf - Shelf in the select menu
  * @param {string} books - All books stored in the state of the application
  * @param {string} book - Book from search results
  */
  checkForShelfInSearchResults = (shelf, books, book) => {
    return books.some((b) => (
      b.id === book.id && shelf === b.shelf
  ))}

  render() {
    const { books, shelfName } = this.state;
    return (
       <div className="app">
          <Route exact path='/' render={() => (
            <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
              <BookShelf
                books={books}
                shelfNameObject={shelfName}
                shelfName={"currentlyReading"}
                moveBookToAnotherShelf={this.moveBookToAnotherShelf}
                renderCheckMark={this.renderCheckMark}
                getShelfName={this.getShelfName}
              />
              <BookShelf
                books={books}
                shelfNameObject={shelfName}
                shelfName={"wantToRead"}
                moveBookToAnotherShelf={this.moveBookToAnotherShelf}
                renderCheckMark={this.renderCheckMark}
                getShelfName={this.getShelfName}
              />
              <BookShelf
                books={books}
                shelfNameObject={shelfName}
                shelfName={"read"}
                moveBookToAnotherShelf={this.moveBookToAnotherShelf}
                renderCheckMark={this.renderCheckMark}
                getShelfName={this.getShelfName}
              />
            </div>
          )}/>
          <Route exact path='/search' render={() => (
            <Search
              getThumbnailURL={this.getThumbnailURL}
              addBookToShelf={this.addBookToShelf}
              books={this.state.books}
              renderCheckMark={this.renderCheckMarkForSearchResults}
              checkForShelfInSearchResults={this.checkForShelfInSearchResults}
              checkForBooks={this.checkForBooks}
              moveBookToShelf={this.moveBookToShelf}
            />
          )}/>
      </div>
    )
  }
}

export default BooksApp
