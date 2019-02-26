import React, { Component } from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './components/userViews/home.js';
import Detail from './components/userViews/detail.js';
import Dashboard from './components/dashboard.js';
import LoginPage from './components/loginPage.js';
import { createBrowserHistory } from 'history';
import { createFilter } from 'react-search-input';
import data from './data.json';
import axios from 'axios';

const items = data.items;

const KEYS_TO_FILTERS = ['name'];

const history = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      filter: [],
      page: {},
      src: null
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `/api/v1/page`,
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      /*
      this.loginForm[0].value = '';
      this.loginForm[1].value = '';
      this.loginForm[2].value = '';
      this.loginForm[3].value = '';
      */

      this.setState({
        page: response.data.page,
        src: response.data.src
      });

    })
    .catch((error) => {
      console.log(error);
    });
  }

  updateState = (obj) => {
    this.setState(obj);
  }

  browserPath = (path) => {
    history.push(path);
  }

  render() {
    const filteredItems = items.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    //console.log(filteredItems);
    return (
      <div className="ReactApp">

        <Router history={history}>
          <Switch>
            <Route exact path="/" render={() => <Home list={filteredItems} updateState={this.updateState} page={this.state.page} src={this.state.src} browserPath={this.browserPath} />} />
            <Route path="/catalog/:item" render={() => <Detail page={this.state.page} browserPath={this.browserPath} />} />
            <Route path="/dashboard" render={() => <Dashboard />} />
            <Route path="/login" render={() => <LoginPage />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
