import React from 'react';
import Header from './header.js';
import Toolbar from './toolbar.js';
import Catalog from './catalog.js';

const Home = (props) => {
  return (
    <main>
      <Header />
      <Toolbar updateState={props.updateState} />
      <Catalog list={props.list} browserPath={props.browserPath} />
    </main>
  );
}

export default Home;
