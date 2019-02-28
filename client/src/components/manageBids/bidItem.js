import React from 'react';

const BidItem = (props) => {
  return (
    <tr className="user-data-row">
      <td hidden>{props.bidInfo._id}</td>
      <td>{props.record + 1}</td>
      <td>{props.bidInfo.content.name}</td>
      <td>{props.bidInfo.amount}</td>
      <td>{props.bidInfo.viewed ? 'Yes' : 'No'}</td>
    </tr>
  );
}

export default BidItem;
