import React, { Component } from 'react';
import Header from './header.js';
import Toolbar from './toolbar.js';
import Catalog from './catalog.js';
import { filterContent } from '../../filterContent.js';
import axios from 'axios';
import { compareValues } from '../../sort.js';
import { paginate } from '../../paginate.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      featured: false,
      htol: false,
      ltoh: false,
      searchTerm: null,
      contents: null,
      filteredContents: null,
      loading: true,
      needsUpdate: false,
      btnArr: null
    }
  }

  updateState = (obj) => {
    this.setState(obj);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.needsUpdate !== this.state.needsUpdate) {
      this.filterContents();
    }
    if ((prevProps.pageNum !== this.props.pageNum) || (prevProps.itemsPerPage !== this.props.itemsPerPage)) {
      if (this.state.contents) {
        /*this.setState({
          needsUpdate: true
        });*/
        this.filterContents();
      }
    }
  }

  filterContents = () => {
    let filtItems = {
      contents: filterContent(this.state.contents, this.state.filter, this.state.searchTerm, this.state.featured, this.state.ltoh, this.state.htol)
    }
    if (this.state.filter && this.state.ltoh) {
      filtItems.contents = filtItems.contents.sort(compareValues('priceNum', 'asc'));
    }
    if (this.state.filter && this.state.htol) {
      filtItems.contents = filtItems.contents.sort(compareValues('priceNum', 'desc'));
    }
    if (this.props.page.pagination) {
      filtItems = paginate(filtItems.contents, this.props.pageNum, this.props.itemsPerPage);
    }
    this.setState({
      filteredContents: filtItems.contents,
      needsUpdate: false,
      btnArr: filtItems.btnArr
    });
  }

  updateContents = () => {
    axios({
      method: 'get',
      url: `/api/v1/contents`,
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      let filtItems = {
        contents: filterContent(response.data.contents, this.state.filter, this.state.searchTerm, this.state.featured, this.state.ltoh, this.state.htol)
      }
      if (this.props.page.pagination) {
        filtItems = paginate(filtItems.contents, this.props.pageNum, this.props.itemsPerPage);
      }
      this.setState({
        contents: response.data.contents,
        filteredContents: filtItems.contents,
        loading: false,
        btnArr: filtItems.btnArr
      });

    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.updateContents();
  }

  render() {
    return (
      <main>
        <Header page={this.props.page} src={this.props.src} />
        {(this.props.page.search) && (
          <Toolbar page={this.props.page} updatePagination={this.props.updateState} updateState={this.updateState} />
        )}
        <Catalog updateState={this.updateState} updatePagination={this.props.updateState} contents={this.state.filteredContents} loading={this.state.loading} page={this.props.page} browserPath={this.props.browserPath} pageNum={this.props.pageNum} btnArr={this.state.btnArr} itemsPerPage={this.props.itemsPerPage} />
      </main>
    );
  }
}

export default Home;
