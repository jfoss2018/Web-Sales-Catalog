import React from 'react';
import Item from './item.js';
import data from '../data.json';

const Catalog = (props) => {
  return(
    <ul className="catalog">
      {props.list.map(function(item, i) {
        return <Item browserPath={props.browserPath} key={i} itemInfo={item} />
      })}
    </ul>
  );
}

export default Catalog;
