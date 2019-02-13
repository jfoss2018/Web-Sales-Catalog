import React from 'react';
import Header from './header.js';
import Toolbar from './toolbar.js';
import Catalog from './catalog.js';

const Home = (props) => {
  return (
    <main>
      <Header />
      <Toolbar />
      <Catalog browserPath={props.browserPath} />
    </main>
  );
}

export default Home;
