import React from 'react';
import moment from 'moment';

const AppointmentItem = (props) => {
  return (
    <tr className="user-data-row">
      <td hidden>{props.appointInfo._id}</td>
      <td>{props.record + 1}</td>
      <td>{props.appointInfo.name}</td>
      <td>{moment(props.appointInfo.preferredDate).format('LLL')}</td>
      <td>{props.appointInfo.viewed ? 'Yes' : 'No'}</td>
    </tr>
  );
}

export default AppointmentItem;
