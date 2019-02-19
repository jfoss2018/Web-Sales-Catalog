import React, { Component } from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './components/home.js';
import Detail from './components/detail.js';
import Dashboard from './components/dashboard.js';
import LoginPage from './components/loginPage.js';
import { createBrowserHistory } from 'history';
import { createFilter } from 'react-search-input';
import data from './data.json';

const items = data.items;

const KEYS_TO_FILTERS = ['name'];

const history = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      filter: [],

    }
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
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path="/" render={() => <Home list={filteredItems} updateState={this.updateState} browserPath={this.browserPath} />} />
            <Route path="/catalog/:item" render={() => <Detail browserPath={this.browserPath} />} />
            <Route path="/dashboard" render={() => <Dashboard />} />
            <Route path="/login" render={() => <LoginPage />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
