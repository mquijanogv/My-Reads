import React ,{Component} from 'react'
import './App.css'

class SearchResults extends Component {

  componentWillReceiveProps(propstoReceived) {
     this.setState({
       results: propstoReceived.results,
     });
   }

   /**
   * @description Method to check that results is not empty
   * @param {array} obj - Results array
   */
   checkForEmpty = (res) => {
     if (res === "undefined" || res.length === 0) {
       return [];
     }
     return res;
   }

render() {
    const searchResults = this.checkForEmpty(this.props.results)
    const { getThumbnailURL } = this.props;
    return(
    <div>
      {searchResults !== "undefined" && (
        <ol className="books-grid">
          {searchResults.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${getThumbnailURL(book.imageLinks)})` }}></div>
                  <div className="book-shelf-changer">
                    <select>
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
