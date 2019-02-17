import React from 'react';

const Item = (props) => {
  //{props.itemInfo.mainImg}
  //onClick={() => props.browserPath('/catalog/' + props.itemInfo.id)}
  return(
    <article onClick={() => props.browserPath('/catalog/' + props.itemInfo.id)}>
      <img src={'/images/' + props.itemInfo.mainImg} alt="tractor" />
      <h4>{props.itemInfo.name}</h4>
      <p className="description">{props.itemInfo.description}</p>
      <p className="price">${props.itemInfo.price}</p>
    </article>
  );
}

export default Item;
