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
      </div>
    </div>
  );
}

export default Dashboard;
