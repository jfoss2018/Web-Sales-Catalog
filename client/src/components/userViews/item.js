import React from 'react';

const Item = (props) => {
  //{props.itemInfo.mainImg}
  //onClick={() => props.browserPath('/catalog/' + props.itemInfo.id)}
  let imgSrc;
  if (props.itemInfo.images.length > 0) {
    imgSrc = props.itemInfo.images[0].src
  } else {
    imgSrc = '/images/Item-default.jpg';
  }

  return(
    <article onClick={() => props.browserPath('/catalog/' + props.itemInfo._id)}>
      <div className="imgborder-2">
        <img src={imgSrc} alt={props.itemInfo.name} />
      </div>
      <h4>{props.itemInfo.name}</h4>
      <p className="description">{props.itemInfo.description}</p>
      <p className="price">{props.itemInfo.price}</p>
    </article>
  );
}

export default Item;
