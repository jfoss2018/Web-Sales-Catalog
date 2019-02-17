import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard">
        <h1 className="dashboard-title">Dashboard</h1>
        <ul className="dashboard-categories">
          <li>Manage Users</li>
          <li>Manage Page</li>
          <li>Manage Contents</li>
          <li>Manage Visitors</li>
        </ul>
        <div className="user-block">
          <div className="user-controls">
            <div className="user-create user-control-btn">
            </div>
            <div className="user-edit user-control-btn">
            </div>
            <div className="user-delete user-control-btn">
            </div>
          </div>
          <div className="user-list-wrapper">
            <table className="user-list">
              <tr>
                <th>Record</th>
                <th>Name</th>
                <th>Auth-Level</th>
              </tr>
              <tr>
                <th>1</th>
                <th>John Smith</th>
                <th>0</th>
              </tr>
              <tr>
                <th>2</th>
                <th>John Doe</th>
                <th>1</th>
              </tr>
              <tr>
                <th>3</th>
                <th>John Wayne</th>
                <th>2</th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
