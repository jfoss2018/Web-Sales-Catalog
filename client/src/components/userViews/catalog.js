import React, { Component } from 'react';
import Item from './item.js';
import axios from 'axios';
import Pagination from './pagination.js';

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      loading: true
    }
  }

  updateState = (obj) => {
    this.setState(obj);
  }



  render() {
    const message = this.props.page.message;
    const browser = this.props.browserPath;
    let itemList;
    if (this.props.loading) {
      itemList = <p>Loading...</p>
    } else {
      itemList = <ul className="catalog">
        {this.props.contents.map(function(item, i) {
          return <Item browserPath={browser} key={i} itemInfo={item} />
        })}
      </ul>
    }
    return(
      <div className="catalog-div">
        {itemList}
        {(this.props.page.pagination) && (
          <Pagination page={this.props.page} updatePagination={this.props.updatePagination} itemsPerPage={this.props.itemsPerPage} btnArr={this.props.btnArr} pageNum={this.props.pageNum} contents={this.props.contents} updateState={this.updateState} />
        )}
        {(this.props.page.footer) && (
          <h3 className="page-footer">{message}</h3>
        )}
      </div>
    );
  }
}

export default Catalog;
