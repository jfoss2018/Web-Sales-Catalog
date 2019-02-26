import React, { Component } from 'react';
import DashboardUser from './manageUser/dashboardUser.js';
import DashboardPage from './managePageLayout/dashboardPage.js';
import DashboardContent from './manageContent/dashboardContent.js';
import DashboardQuestion from './manageQuestions/dashboardQuestions.js';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      dashboardNum: 0
    }
  }

  toggleActive = (e) => {
    const listItems = document.querySelectorAll('.list-btn');
    for (let i = 0; i < listItems.length; i += 1) {
      listItems[i].classList.remove('active');
      if (e.target === listItems[i]) {
        this.setState({
          dashboardNum: i
        });
      }
    }
    e.target.classList.add('active');
  }

  render() {
    return (
      <div className="dashboard-wrapper">
        <div className="dashboard">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="dashboard-left">
            <ul className="dashboard-categories">
              <li className="list-btn active" onClick={this.toggleActive}>Manage Users</li>
              <li className="list-btn" onClick={this.toggleActive}>Manage Page</li>
              <li className="list-btn" onClick={this.toggleActive}>Manage Contents</li>
              <li className="list-btn" onClick={this.toggleActive}>Manage Appointments</li>
              <li className="list-btn" onClick={this.toggleActive}>Manage Bids</li>
              <li className="list-btn" onClick={this.toggleActive}>Manage Questions</li>
            </ul>
          </div>
          <div className="dashboard-right">
            {(this.state.dashboardNum === 0) && (
              <DashboardUser />
            )}
            {(this.state.dashboardNum === 1) && (
              <DashboardPage />
            )}
            {(this.state.dashboardNum === 2) && (
              <DashboardContent />
            )}
            {(this.state.dashboardNum === 5) && (
              <DashboardQuestion />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
