import React from 'react';
import SearchApp from './search.js';

const Toolbar = (props) => {
  return(
    <nav>
      <section className="toolbar">
        {(props.page.filter) && (
          <select className="filter">
            {(props.page.filterOptions.featured) && (
              <option value="featured">Featured</option>
            )}
            {(props.page.filterOptions.priceLowToHigh) && (
              <option value="priceLowToHigh">Price Low to High</option>
            )}
            {(props.page.filterOptions.PriceHighToLow) && (
              <option value="priceHighToLow">Price High to Low</option>
            )}
          </select>
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
