import React, { Component } from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './components/home.js';
import Detail from './components/detail.js';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class App extends Component {

  browserPath = (path) => {
    history.push(path);
  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path="/" render={() => <Home browserPath={this.browserPath} />} />
            <Route path="/catalog/:item" render={() => <Detail browserPath={this.browserPath} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
