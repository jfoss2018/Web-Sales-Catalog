import React from 'react';

const DashboardUserItem = (props) => {
  return (
    <tr className="user-data-row">
      <td hidden>{props.userInfo._id}</td>
      <td>{props.record + 1}</td>
      <td>{props.userInfo.username}</td>
      <td>{props.userInfo.authorization}</td>
    </tr>
  );
}

export default DashboardUserItem;
