import React, { Component } from 'react';
import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/userViews/home.js';
import Detail from './components/userViews/detail.js';
import Dashboard from './components/dashboard.js';
import Login from './components/login.js';
import Initial from './components/initial.js';
import { createBrowserHistory } from 'history';


const history = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: {},
      src: null,
      pageNum: 1,
      itemsPerPage: null
    }
  }

  browserPath = (path) => {
    history.push(path);
  }

  updateState = (obj) => {
    this.setState(obj);
  }

  render() {
    return (
      <div className="ReactApp">

        <Router history={history}>
          <Switch>
            <Route exact path="/" render={() => <Home page={this.state.page} updateState={this.updateState} src={this.state.src} browserPath={this.browserPath} pageNum={this.state.pageNum} itemsPerPage={this.state.itemsPerPage} />} />
            <Route path="/catalog/:item" render={() => <Detail page={this.state.page} browserPath={this.browserPath} />} />
            <Route exact path="/dashboard" render={() => <Dashboard browserPath={this.browserPath} />} />
            <Route exact path="/login" render={() => <Login browserPath={this.browserPath} />} />
            <Route exact path="/initialize" render={() => <Initial browserPath={this.browserPath} />} />
            <Route render={() => <Redirect to="/"/>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
