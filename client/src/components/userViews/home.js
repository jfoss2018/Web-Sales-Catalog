import React from 'react';
import Header from './header.js';
import Toolbar from './toolbar.js';
import Catalog from './catalog.js';

const Home = (props) => {
  return (
    <main>
      <Header page={props.page} src={props.src} />
      {(props.page.search) && (
        <Toolbar page={props.page} updateState={props.updateState} />
      )}
      <Catalog list={props.list} page={props.page} browserPath={props.browserPath} />
    </main>
  );
}

export default Home;
