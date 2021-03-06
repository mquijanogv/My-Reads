import React from 'react'
import { Link } from 'react-router-dom'
import * as APIclient from './BooksAPI'
import SearchResults from './SearchResults'
import PropTypes from 'prop-types'

class Search extends React.Component {
  static propTypes = {
    getThumbnailURL: PropTypes.func.isRequired,
    addBookToShelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    setDefaultValueInSelectMenu: PropTypes.func.isRequired,
    checkForShelfInSearchResults: PropTypes.func.isRequired,
    moveBookToShelf: PropTypes.func.isRequired

  }

  state = {
      query:'',
      results:[],
    }

    /**
    * @description Method that makes an API call when the user types something in the input field
    * @param {string} query - The query that the user is typing
    */
  searchForBooks = (query) => {
    if (query !== '') {
      APIclient.search(query)
        .then((results) => {
          if(results.error === 'empty query') {
            this.setState({ results: []});
          } else {
          this.setState({ results});
          }
        }).catch((err) => {
          this.setState({results : []});
      })
  } else {
    this.setState({results : []});
  }
}

  render() {
    const { query } = this.state.query;
    const { getThumbnailURL, addBookToShelf, books, setDefaultValueInSelectMenu, checkForShelfInSearchResults, checkForBooks, moveBookToShelf } = this.props;
    return(
      <div className="search-books">
        <div className="search-books-bar">
        <div className="close-search">
          <Link to='/' className="close-search">Close</Link>
        </div>
          <div className="search-books-input-wrapper">
          <input type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => this.searchForBooks(event.target.value, "d")}
          />
          </div>
        </div>
        <SearchResults
         results = {this.state.results}
         getThumbnailURL = {getThumbnailURL}
         addBookToShelf = {addBookToShelf}
         books = {books}
         setDefaultValueInSelectMenu = {setDefaultValueInSelectMenu}
         checkForShelfInSearchResults = {checkForShelfInSearchResults}
         checkForBooks = {checkForBooks}
         moveBookToShelf = {moveBookToShelf}
        />
      </div>

    )
  }
}

export default Search;
