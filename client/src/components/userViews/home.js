import React, { Component } from 'react';
import Header from './header.js';
import Toolbar from './toolbar.js';
import Catalog from './catalog.js';
import { filterContent } from '../../filterContent.js';
import axios from 'axios';
import { compareValues } from '../../sort.js';

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
      needsUpdate: false
    }
  }

  updateState = (obj) => {
    this.setState(obj);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.needsUpdate !== this.state.needsUpdate) {
      this.filterContents();
    }

  }

  filterContents = () => {
    let filtItems = filterContent(this.state.contents, this.state.filter, this.state.searchTerm, this.state.featured, this.state.ltoh, this.state.htol);
    if (this.state.filter && this.state.ltoh) {
      filtItems = filtItems.sort(compareValues('priceNum', 'asc'));
    }
    if (this.state.filter && this.state.htol) {
      filtItems = filtItems.sort(compareValues('priceNum', 'desc'));
    }
    this.setState({
      filteredContents: filtItems,
      needsUpdate: false
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
      const filtItems = filterContent(response.data.contents, this.state.filter, this.state.searchTerm, this.state.featured, this.state.ltoh, this.state.htol);
      this.setState({
        contents: response.data.contents,
        filteredContents: filtItems,
        loading: false
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
          <Toolbar page={this.props.page} updateState={this.updateState} />
        )}
        <Catalog updateState={this.updateState} contents={this.state.filteredContents} loading={this.state.loading} page={this.props.page} browserPath={this.props.browserPath} />
      </main>
    );
  }
}

export default Home;
