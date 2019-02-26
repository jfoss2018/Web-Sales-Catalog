import React, {Component} from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import data from '../../data.json';
const items = data.items;

const KEYS_TO_FILTERS = ['name'];

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
    const filteredItems = items.filter(createFilter(term, KEYS_TO_FILTERS));
    this.props.updateState({
      searchTerm: term,
      filter: filteredItems
    });
  }

}

export default SearchApp;
