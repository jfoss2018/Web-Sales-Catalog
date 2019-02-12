import React from 'react';

const Item = (props) => {
  return(
    <article>
      <img src={props.itemInfo.mainImg} alt="tractor" />
      <h4>{props.itemInfo.name}</h4>
      <p className="description">{props.itemInfo.description}</p>
      <p className="price">${props.itemInfo.price}</p>
      <button>Make Offer</button>
    </article>
  );
}

export default Item;
