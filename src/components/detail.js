import React from 'react';
import data from '../data.json';
import MyComponent from './carousel.js';
import ModalBox from './modal.js';

const Detail = (props) => {

  const path = window.location.pathname;
  const splitPath = path.split('/');
  const item = splitPath.pop();
  const items = data.items;
  const detailItem = items.filter(listItem => listItem.id === item)[0];
  const subImg = detailItem.subImg;

  return(
    <div className="detail-wrapper">
      <section className="detail-section">
        <button onClick={() => props.browserPath('/')}>Return to Catalog</button>
        <h1>{detailItem.name}</h1>
        <div className="style-block">
        </div>
        <div className="offerBtn">
          <ModalBox text={"Make Offer"} />
        </div>
        <div className="gallery-wrapper">
          <MyComponent images={subImg} />
        </div>
        <p className="price">${detailItem.price}</p>
        <p className="bid">Current highest bid: ${detailItem.highestBid}</p>
        <p className="description">{detailItem.description}</p>
      </section>
    </div>
  );

}

export default Detail;
