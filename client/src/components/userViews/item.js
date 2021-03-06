import React from 'react';

const Item = (props) => {
  let imgSrc;
  if (props.itemInfo.images.length > 0) {
    imgSrc = props.itemInfo.images[0].src
  } else {
    imgSrc = '/images/Item-default.jpg';
  }

  let displayDescription;
  if (props.itemInfo.description.length > 120) {
    displayDescription = props.itemInfo.description.slice(0, 120) + ' ...';
  } else {
    displayDescription = props.itemInfo.description;
  }

  return(
    <article onClick={() => props.browserPath('/catalog/' + props.itemInfo._id)}>
      <div className="imgborder-3">
        <img src={imgSrc} alt={props.itemInfo.name} />
      </div>
      <div className="card-wrapper">
        <h4>{props.itemInfo.name}</h4>
        <p className="description">{displayDescription}</p>
        <p className="price">{props.itemInfo.price}</p>
      </div>
    </article>
  );
}

export default Item;
