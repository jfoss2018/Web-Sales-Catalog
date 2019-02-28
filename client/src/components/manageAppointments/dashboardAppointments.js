import React, { Component } from 'react';
import axios from 'axios';
import AppointmentItem from './appointmentItem.js';
import DeleteAppointment from './deleteAppointment.js';
import ViewAppointment from './viewAppointment.js';

class DashboardAppointment extends Component {
  constructor() {
    super();
    this.state = {
      appointments: [],
      selectedItem: null,
      selectedAction: ''
    }
  }



  updateList = () => {
    axios({
      method: 'get',
      url: '/api/v1/appointments',
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      /*
      this.loginForm[0].value = '';
      this.loginForm[1].value = '';
      this.loginForm[2].value = '';
      this.loginForm[3].value = '';
      */
      this.setState({
        appointments: response.data.appointments,
        selectedItem: null,
        selectedAction: 'empty'
      });
      const modal = document.querySelector('.user-modal');
      modal.style.display = 'none';
      const rows = document.querySelectorAll('.user-data-row');
      for (let i = 0; i < rows.length; i += 1) {
        rows[i].classList.remove('active');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.updateList();
  }

  toggleActive = (e) => {
    const rows = document.querySelectorAll('.user-data-row');
    for (let i = 0; i < rows.length; i += 1) {
      rows[i].classList.remove('active');
    }
    e.target.closest('tr').classList.add('active');
    this.setState({
      selectedItem: e.target.closest('tr').childNodes[0].innerHTML
    });
  }

  checkModal = (e) => {
    const modal = document.querySelector('.user-modal');
    if (e.target === modal) {
      modal.style.display = "none";
      this.setState({
        selectedAction: 'empty'
      });
    }
  }

  openModal = (e) => {
    const modal = document.querySelector('.user-modal');
    modal.style.display = 'block';
    if (e.target.className === 'user-modal-close' || e.target === modal) {
      modal.style.display = 'none';
      this.setState({
        selectedAction: 'empty'
      });
    } else {
      this.setState({
        selectedAction: e.target.value
      });
    }
  }

  render() {
    let modalContents;
    if (this.state.selectedAction === 'view') {
      modalContents = <ViewAppointment id={this.state.selectedItem} updateList={this.updateList} />
    } else if (this.state.selectedAction === 'delete') {
      modalContents = <DeleteAppointment id={this.state.selectedItem} updateList={this.updateList} />
    } else {
      modalContents = null;
    }


    let buttons;
    if (this.state.selectedItem) {
      buttons =
        <div className="user-controls">
          <button value="view" onClick={this.openModal} className="user-edit user-control-btn">View</button>
          <button value="delete" onClick={this.openModal} className="user-delete user-control-btn">Delete</button>
        </div>
    } else {
      buttons =
        <div className="user-controls">
          <button disabled className="user-edit user-control-btn">View</button>
          <button disabled className="user-delete user-control-btn">Delete</button>
        </div>
    }

    return (
      <div className="user-block">
        {buttons}
        <div className="user-list-wrapper">
          <table className="user-list">
            <thead>
              <tr>
                <th>Record</th>
                <th>Name</th>
                <th>Preferred Time</th>
                <th>Viewed</th>
              </tr>
            </thead>
            <tbody onClick={this.toggleActive}>
              {this.state.appointments.map(function(appoint, i) {
                return <AppointmentItem key={i} record={i} appointInfo={appoint} />
              })}
            </tbody>
          </table>
        </div>

        <div onClick={this.checkModal} className="user-modal">
          <div className="user-modal-content">
            <span onClick={this.openModal} className="user-modal-close">&times;</span>
            {modalContents}
          </div>
        </div>

      </div>
    );
  }
}



export default DashboardAppointment;
