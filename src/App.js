import React from 'react'
import BookShelf from './BookShelf'
import Search from './Search'
import * as APIclient from './BooksAPI'
import './App.css'

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
    console.log("ssss")
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

    console.log(updatedBooks)
    this.setState({books: updatedBooks})



  }



  render() {
    const { books } = this.state;
    return (
       <div className="app">
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
          moveBookToAnotherShelf={"moveBookToAnotherShelf"}
          moveBookToAnotherShelf={this.moveBookToAnotherShelf}
        />
        <BookShelf
          books={books}
          shelfName={"read"}
          moveBookToAnotherShelf={"moveBookToAnotherShelf"}
          moveBookToAnotherShelf={this.moveBookToAnotherShelf}
        />
      </div>
    )
  }
}

export default BooksApp
