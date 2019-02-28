import React, { Component } from 'react';
import DashboardUser from './manageUser/dashboardUser.js';
import DashboardPage from './managePageLayout/dashboardPage.js';
import DashboardContent from './manageContent/dashboardContent.js';
import DashboardQuestion from './manageQuestions/dashboardQuestions.js';
import DashboardAppointment from './manageAppointments/dashboardAppointments.js';
import DashboardBid from './manageBids/dashboardBids.js';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      dashboardBtn: 'users'
    }
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

  render() {
    return (
      <div className="dashboard-wrapper">
        <div className="dashboard">
          <h1 className="dashboard-title">Dashboard</h1>
          <button className="log-out-btn" name="log-out">Log Out</button>
          <div className="dashboard-left">
            <ul className="dashboard-categories">
              <li className="list-btn active"><button className="li-btn" name="users" onClick={this.toggleActive}>Manage Users</button></li>
              <li className="list-btn"><button className="li-btn" name="page" onClick={this.toggleActive}>Manage Page</button></li>
              <li className="list-btn"><button className="li-btn" name="contents" onClick={this.toggleActive}>Manage Contents</button></li>
              <li className="list-btn"><button className="li-btn" name="appointments" onClick={this.toggleActive}>Manage Appointments</button></li>
              <li className="list-btn"><button className="li-btn" name="bids" onClick={this.toggleActive}>Manage Bids</button></li>
              <li className="list-btn"><button className="li-btn" name="questions" onClick={this.toggleActive}>Manage Questions</button></li>
            </ul>
          </div>
          <div className="dashboard-right">
            {(this.state.dashboardBtn === 'users') && (
              <DashboardUser />
            )}
            {(this.state.dashboardBtn === 'page') && (
              <DashboardPage />
            )}
            {(this.state.dashboardBtn === 'contents') && (
              <DashboardContent />
            )}
            {(this.state.dashboardBtn === 'appointments') && (
              <DashboardAppointment />
            )}
            {(this.state.dashboardBtn === 'bids') && (
              <DashboardBid />
            )}
            {(this.state.dashboardBtn === 'questions') && (
              <DashboardQuestion />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
