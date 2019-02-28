import React from 'react';
import SearchApp from './search.js';
import Filter from './filter.js';

const Toolbar = (props) => {
  return(
    <nav>
      <section className="toolbar">
        {(props.page.filter) && (
          <Filter page={props.page} updateState={props.updateState} />
        )}
        {/*

        <Menu />
        */}
        <SearchApp updateState={props.updateState} />
        {/*
        <input type="text" placeholder="Search..." />
        <button className="search">
          <img src={require("../images/magnifier.png")} alt="magnifier icon" />
        </button>
        */}
      </section>
    </nav>
  );
}

export default Toolbar;
