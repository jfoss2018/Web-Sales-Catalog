import React, { Component } from 'react';
import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/userViews/home.js';
import Detail from './components/userViews/detail.js';
import Dashboard from './components/dashboard.js';
import Login from './components/login.js';
import Initial from './components/initial.js';
import { createBrowserHistory } from 'history';
import axios from 'axios';


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
      if (response.data.page) {
        this.setState({
          page: response.data.page,
          src: response.data.src,
          itemsPerPage: response.data.page.itemsPerPage
        });
      } else {
        this.browserPath("/initialize");
      }

    })
    .catch((error) => {
      console.log(error);
    });
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
            <Route exact path="/dashboard" render={() => <Dashboard />} />
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/initialize" render={() => <Initial browserPath={this.browserPath} />} />
            <Route render={() => <Redirect to="/"/>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
