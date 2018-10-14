import React from 'react'
import BookShelf from './BookShelf'
import Search from './Search'
import * as APIclient from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books:[]
  }

  async componentDidMount() {
    const books = await APIclient.getAll();
    this.setState({
      books
    });
  }

  moveBookToAnotherShelf = (value, id) => {
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

  getThumbnailURL = (bookImageLinks) => {
    return (bookImageLinks === undefined ?
      "http://via.placeholder.com/128x193?text=No%20Cover"
      : bookImageLinks.thumbnail
    )
  }

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

  checkForDupe(id) {
    var found = this.state.books.some((book) => {
      return book.id === id;
    });
    return (found ? true : false)
  }

  render() {
    const { books } = this.state;
    return (
       <div className="app">
          <Route exact path='/' render={() => (
            <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
              <BookShelf
                books={books}
                shelfName={"currentlyReading"}
                moveBookToAnotherShelf={this.moveBookToAnotherShelf}
              />
              <BookShelf
                books={books}
                shelfName={"wantToRead"}
                moveBookToAnotherShelf={this.moveBookToAnotherShelf}
              />
              <BookShelf
                books={books}
                shelfName={"read"}
                moveBookToAnotherShelf={this.moveBookToAnotherShelf}
              />
            </div>
          )}/>
          <Route exact path='/search' render={() => (
            <Search
              getThumbnailURL={this.getThumbnailURL}
              addBookToShelf={this.addBookToShelf}
              books={this.state.books}
            />
          )}/>
      </div>
    )
  }
}

export default BooksApp
