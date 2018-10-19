import React ,{Component} from 'react'
import './App.css'

class SearchResults extends Component {

render() {
    const { results, getThumbnailURL, addBookToShelf, books, renderCheckMark, moveBookToShelf} = this.props;
    return(
    <div className="search-results">
      {results !== "undefined" && (
        <ol className="books-grid">
          {results.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${getThumbnailURL(book.imageLinks)})` }}></div>
                  <div className="book-shelf-changer">
                    <select onChange={(event) => {moveBookToShelf(event, book, addBookToShelf, books)}}>
                      <option value="move">Move to...</option>
                      <option value="currentlyReading">{renderCheckMark("currentlyReading", books, book)} Currently Reading</option>
                      <option value="wantToRead">{renderCheckMark("wantToRead", books, book)} Want to Read</option>
                      <option value="read">{renderCheckMark("read", books, book)} Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </li>
          ))}

        </ol>
      )}
    </div>
    )
  }
}

export default SearchResults