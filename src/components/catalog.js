import React from 'react';
import Item from './item.js';
import data from '../data.json';

const Catalog = () => {
  return(
    <ul>
      {data.items.map(function(item, i) {
        return <Item key={i} itemInfo={item} />
      })}
    </ul>
  );
}

export default Catalog;
