import React, { Component } from 'react';
import DashboardUser from './manageUser/dashboardUser.js';
import DashboardPage from './managePageLayout/dashboardPage.js';
import DashboardContent from './manageContent/dashboardContent.js';
import DashboardQuestion from './manageQuestions/dashboardQuestions.js';
import DashboardAppointment from './manageAppointments/dashboardAppointments.js';
import DashboardBid from './manageBids/dashboardBids.js';
import axios from 'axios';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      dashboardBtn: 'loading',
      resStatus: null,
      resMessage: null,
      auth: null,
      username: ''
    }
  }

  componentWillMount() {
    axios({
      method: 'get',
      url: '/api/v1/login',
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200) {
        if (response.data.auth === 1) {
          this.setState({
            dashboardBtn: 'contents',
            auth: 1,
            username: response.data.username
          });
        } else if (response.data.auth === 2) {
          this.setState({
            dashboardBtn: 'users',
            auth: 2,
            username: response.data.username
          });
        } else {
          this.props.browserPath('/login');
        }
      } else {
        this.props.browserPath('/login');
      }
    })
    .catch((error) => {
      console.log(error);
      this.props.browserPath('/login');
    });
  }

  logout = () => {
    axios({
      method: 'get',
      url: '/api/v1/logout',
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200) {
        this.props.browserPath('/login');
      } else {
        this.setState({
          resStatus: '500',
          resMessage: 'Something went wrong!'
        });
        this.openModalMessage();
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        resStatus: error.response.status.toString(),
        resMessage: error.response.data.message.toString()
      });
      this.openModalMessage();
    });
  }

  toggleActive = (e) => {
    const listItems = document.querySelectorAll('.list-btn');
    for (let i = 0; i < listItems.length; i += 1) {
      listItems[i].classList.remove('active');
    }
    this.setState({
      dashboardBtn: e.target.name
    });
    e.target.closest('li').classList.add('active');
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

  render() {

    let modalContents;
    if (this.state.resStatus) {
      const modalBG = document.querySelector('.init-message-modal-content');
      if (this.state.resStatus === '201') {
        modalBG.classList.remove('fail');
        modalBG.classList.add('success');
        modalContents = <section>
          <h5 className="init-message-title">Thank you for Registering!</h5>
          <p className="init-message-form-control">{this.state.resMessage}</p>
        </section>
      } else if (this.state.resStatus === '401') {
        modalBG.classList.add('fail');
        modalContents = <section>
          <h5 className="init-message-title">Error: 401, Unauthorized</h5>
          <p className="init-message-form-control">{this.state.resMessage}</p>
        </section>
      } else if (this.state.resStatus === '409') {
        modalBG.classList.add('fail');
        modalContents = <section>
          <h5 className="init-message-title">Error: 409, Conflict</h5>
          <p className="init-message-form-control">{this.state.resMessage}</p>
        </section>
      } else if (this.state.resStatus === '500') {
        modalBG.classList.add('fail');
        modalContents = <section>
          <h5 className="init-message-title">{this.state.resStatus}</h5>
          <p className="init-message-form-control">{this.state.resMessage}</p>
        </section>
      }
    }

    let usersBtn;
    let contentsBtn;
    if (this.state.dashboardBtn === 'users') {
      usersBtn = <li className="list-btn active"><button className="li-btn" name="users" onClick={this.toggleActive}>Manage Users</button></li>
    } else {
      usersBtn = <li className="list-btn"><button className="li-btn" name="users" onClick={this.toggleActive}>Manage Users</button></li>
    }
    if (this.state.dashboardBtn === 'contents') {
      contentsBtn = <li className="list-btn active"><button className="li-btn" name="contents" onClick={this.toggleActive}>Manage Contents</button></li>
    } else {
      contentsBtn = <li className="list-btn"><button className="li-btn" name="contents" onClick={this.toggleActive}>Manage Contents</button></li>
    }

    return (
      <div className="dashboard-wrapper">
        <div className="dashboard">
          <div className="show-when-large">
            <p className="dashboard-username-intro">Current User:</p>
            <p className="dashboard-username">{this.state.username}</p>
          </div>
          <h1 className="dashboard-title">Dashboard</h1>
          <button className="log-out-btn" name="log-out" onClick={this.logout}>Log Out</button>
          <div className="dashboard-left">
            <ul className="dashboard-categories">
              {(this.state.auth === 2) && (
                usersBtn
              )}
              {(this.state.auth === 2) && (
                <li className="list-btn"><button className="li-btn page-dash-btn" name="page" onClick={this.toggleActive}>Manage Page</button></li>
              )}
              {(this.state.auth > 0) && (
                contentsBtn
              )}
              {(this.state.auth > 0) && (
                <li className="list-btn"><button className="li-btn appointments-dash-btn" name="appointments" onClick={this.toggleActive}>Manage Appointments</button></li>
              )}
              {(this.state.auth > 0) && (
                <li className="list-btn"><button className="li-btn bids-dash-btn" name="bids" onClick={this.toggleActive}>Manage Bids</button></li>
              )}
              {(this.state.auth > 0) && (
                <li className="list-btn"><button className="li-btn questions-dash-btn" name="questions" onClick={this.toggleActive}>Manage Questions</button></li>
              )}
            </ul>
          </div>
          <div className="dashboard-right">
            {(this.state.dashboardBtn === 'loading') && (
              <p>Loading...</p>
            )}
            {(this.state.dashboardBtn === 'users' && this.state.auth === 2) && (
              <DashboardUser />
            )}
            {(this.state.dashboardBtn === 'page' && this.state.auth === 2) && (
              <DashboardPage />
            )}
            {(this.state.dashboardBtn === 'contents' && this.state.auth > 0) && (
              <DashboardContent />
            )}
            {(this.state.dashboardBtn === 'appointments' && this.state.auth > 0) && (
              <DashboardAppointment />
            )}
            {(this.state.dashboardBtn === 'bids' && this.state.auth > 0) && (
              <DashboardBid />
            )}
            {(this.state.dashboardBtn === 'questions' && this.state.auth > 0) && (
              <DashboardQuestion />
            )}
          </div>
        </div>

        {/*==============Message Modal============*/}
        <div onClick={this.openModalMessage} className="init-message-modal">
          <div className="init-message-modal-content">
            <span onClick={this.openModalMessage} className="init-login-modal-close">&times;</span>
            {(this.state.resStatus) && (
              modalContents
            )}
          </div>
        </div>
        {/*============Message Modal End==========*/}
      </div>
    );
  }
}

export default Dashboard;
