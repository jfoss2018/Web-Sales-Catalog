import React from 'react';
import SearchApp from './search.js';

const Toolbar = (props) => {
  return(
    <nav>
      <section className="toolbar">
        {/*
        <button className="filter">
          <img className="filter-1" src={require("../images/filter.png")} alt="filter icon" />
          <img className="filter-2" src={require("../images/drop-down.png")} alt="drop-down icon" />
        </button>
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