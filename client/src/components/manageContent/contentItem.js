import React from 'react';

const ContentItem = (props) => {
  return (
    <tr className="user-data-row">
      <td hidden>{props.itemInfo._id}</td>
      <td>{props.record + 1}</td>
      <td>{props.itemInfo.name}</td>
      <td>{props.itemInfo.price}</td>
      <td>{props.itemInfo.bids.length}</td>
      <td>{props.itemInfo.viewable ? 'Yes' : 'No'}</td>
    </tr>
  );
}

export default ContentItem;
