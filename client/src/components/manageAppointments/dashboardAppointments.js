import React, { Component } from 'react';
import axios from 'axios';
import AppointmentItem from './appointmentItem.js';
import DeleteAppointment from './deleteAppointment.js';
import ViewAppointment from './viewAppointment.js';
import { compareValues } from '../../sort.js';

class DashboardAppointment extends Component {
  constructor() {
    super();
    this.state = {
      appointments: [],
      filteredAppointments: [],
      selectedItem: null,
      selectedAction: '',
      loading: true,
      sortName: null,
      sortDir: null,
      resStatus: null,
      resMessage: null
    }
  }

  updateState = (obj) => {
    this.setState(obj);
  }

  updateList = () => {
    this.setState({
      loading: true
    });
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
      // Close Action Modal
      const modal = document.querySelector('.user-modal');
      modal.style.display = 'none';
      // Remove Active Row
      const rows = document.querySelectorAll('.user-data-row');
      for (let i = 0; i < rows.length; i += 1) {
        rows[i].classList.remove('active');
      }
      // Set State with filter if it exists
      let filtItems;
      if (this.state.sortName) {
        filtItems = response.data.appointments.sort(compareValues(this.state.sortName, this.state.sortDir));
      } else {
        filtItems = response.data.appointments;
      }
      // Open Message Modal
      if (this.state.resStatus) {
        this.openModalMessage();
      }
      this.setState({
        appointments: response.data.appointments,
        filteredAppointments: filtItems,
        selectedItem: null,
        selectedAction: 'empty',
        loading: false
      });
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        resStatus: error.response.status.toString(),
        resMessage: error.response.data.message.toString()
      });
      this.props.openModal();
    });
  }

  componentDidMount() {
    this.updateList();
  }

  handleSort = (e) => {
    this.setState({
      loading: true
    });
    if (e.target.dataset.name === this.state.sortName && this.state.sortDir === 'asc') {
      this.setState({
        filteredAppointments: this.state.appointments.sort(compareValues(e.target.dataset.name, 'desc')),
        loading: false,
        sortName: e.target.dataset.name,
        sortDir: 'desc'
      });
    } else {
      this.setState({
        filteredAppointments: this.state.appointments.sort(compareValues(e.target.dataset.name, 'asc')),
        loading: false,
        sortName: e.target.dataset.name,
        sortDir: 'asc'
      });
    }
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

  openModalMessage = (e) => {
    const modal = document.querySelector('.init-message-modal');
    modal.style.display = 'block';
    if (e) {
      if (e.target.className === 'init-login-modal-close' || e.target === modal) {
        this.modalClose(modal);
      }
    }
  }

  modalClose = (modal) => {
    modal.style.display = 'none';
    this.setState({
      resStatus: null,
      resMessage: null
    });
  }

  render() {
    // Modal Contents ==========================================================
    let modalContents;
    if (this.state.selectedAction === 'view') {
      modalContents = <ViewAppointment id={this.state.selectedItem} openModal={this.openModalMessage} updateState={this.updateState} updateList={this.updateList} />
    } else if (this.state.selectedAction === 'delete') {
      modalContents = <DeleteAppointment id={this.state.selectedItem} openModal={this.openModalMessage} updateState={this.updateState} updateList={this.updateList} />
    } else {
      modalContents = null;
    }

    // Buttons =================================================================
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
          <button disabled className="user-control-btn-dis">View</button>
          <button disabled className="user-control-btn-dis">Delete</button>
        </div>
    }

    // Contents List Contents ==================================================
    let bodyContents;
    if (this.state.loading) {
      bodyContents = <p>Loading...</p>
    } else {
      bodyContents = this.state.appointments.map(function(appoint, i) {
        return <AppointmentItem key={i} record={i} appointInfo={appoint} />
      })
    }

    // Message Modal Contents ==================================================
    let secondaryModalContents;
    if (this.state.resStatus) {
      const modalBG = document.querySelector('.init-message-modal-content');
      if (this.state.resStatus === '204') {
        modalBG.classList.remove('fail');
        modalBG.classList.add('success');
        secondaryModalContents = <section>
          <h5 className="init-message-title">{this.state.resMessage}</h5>
        </section>
      } else if (this.state.resStatus === '500') {
        modalBG.classList.add('fail');
        secondaryModalContents = <section>
          <h5 className="init-message-title">Error: {this.state.resStatus}</h5>
          <p className="init-message-form-control">{this.state.resMessage}</p>
        </section>
      }
    }

    return (
      /*==============Appointments Dashboard Panel==============*/
      <div className="user-block">
        {/*========View & Delete Buttons=======*/}
        {buttons}
        {/*======End View & Delete Buttons=====*/}
        <div className="user-list-wrapper">
          {/*=======Appointments List===========*/}
          <table className="user-list">
            <thead>
              <tr>
                <th>Record</th>
                <th className="table-header" data-name="name" onClick={this.handleSort}>Name</th>
                <th className="table-header" data-name="preferredDate" onClick={this.handleSort}>Preferred Time</th>
                <th className="table-header" data-name="viewed" onClick={this.handleSort}>Viewed</th>
              </tr>
            </thead>
            <tbody onClick={this.toggleActive}>
              {(!this.state.loading) && (
                bodyContents
              )}
            </tbody>
          </table>
          {/*=====End Appointments List=========*/}
          {/*=======Loading Message========*/}
          {(this.state.loading) && (
            bodyContents
          )}
          {/*====End Loading Message=======*/}
        </div>

        {/*=========Action Modal===========*/}
        <div onClick={this.checkModal} className="user-modal">
          <div className="user-modal-content centered">
            <span onClick={this.openModal} className="user-modal-close">&times;</span>
            {modalContents}
          </div>
        </div>
        {/*======End Action Modal==========*/}

        {/*=======Message Modal============*/}
        <div onClick={this.openModalMessage} className="init-message-modal">
          <div className="init-message-modal-content">
            <span onClick={this.openModalMessage} className="init-login-modal-close">&times;</span>
            {(this.state.resStatus) && (
              secondaryModalContents
            )}
          </div>
        </div>
        {/*====End Message Modal===========*/}

      </div>
      /*===========End Appointments Dashboard Panel=============*/
    );
  }
}



export default DashboardAppointment;
