import React, { Component } from 'react';
import './App.css';
import Header from './components/header.js';
import Toolbar from './components/toolbar.js';
import Catalog from './components/catalog.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Header />
          <Toolbar />
          <Catalog />
        </main>
      </div>
    );
  }
}

export default App;
