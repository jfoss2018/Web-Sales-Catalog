import React, {Component} from 'react';
import SearchInput from 'react-search-input';

class SearchApp extends Component {
  constructor (props) {
    super(props);
    this.searchUpdated = this.searchUpdated.bind(this)
  }

  render () {
    return (
      <div className="search-box">
        <SearchInput className="search-input" onChange={this.searchUpdated} />
      </div>
    )
  }

  searchUpdated(term) {
    this.props.updateState({
      searchTerm: term,
      needsUpdate: true
    });
    this.props.updatePagination({
      pageNum: 1
    });
  }
}

export default SearchApp;
