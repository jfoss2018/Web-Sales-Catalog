import React from 'react';

const Item = (props) => {
  //{props.itemInfo.mainImg}
  //onClick={() => props.browserPath('/catalog/' + props.itemInfo.id)}
  return(
    <article onClick={() => props.browserPath('/catalog/' + props.itemInfo._id)}>
      <img src={props.itemInfo.images[0].src} alt={props.itemInfo.name} />
      <h4>{props.itemInfo.name}</h4>
      <p className="description">{props.itemInfo.description}</p>
      <p className="price">{props.itemInfo.price}</p>
    </article>
  );
}

export default Item;
