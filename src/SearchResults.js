import React ,{Component} from 'react'
import './App.css'

class SearchResults extends Component {

  componentWillReceiveProps(propstoReceived) {
     this.setState({
       results: propstoReceived.results,
     });
   }

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

render() {
    const searchResults = this.props.results
    const { getThumbnailURL, addBookToShelf, books } = this.props;
    return(
    <div className="search-results">
      {searchResults !== "undefined" && (
        <ol className="books-grid">
          {searchResults.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${getThumbnailURL(book.imageLinks)})` }}></div>
                  <div className="book-shelf-changer">
                    <select onChange={(event) => {this.moveBookToShelf(event, book, addBookToShelf, books)}}>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
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
