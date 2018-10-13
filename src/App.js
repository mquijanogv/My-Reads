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
        />
        <BookShelf
          books={books}
          shelfName={"wantToRead"}
        />
        <BookShelf
          books={books}
          shelfName={"read"}
        />
      </div>
    )
  }
}

export default BooksApp
