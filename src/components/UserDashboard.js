import React from 'react';
import './UserDashboard.css'; // Make sure you have a corresponding CSS file for styling

function UserDashboard() {
  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>
      <div className="dashboard-content">
        <section className="overview">
          <h2>Hii, Kaviya</h2>
          <p>Welcome back,</p>
          <div className="stats">
            <div className="stat-card">
              <h3>New Tasks</h3>
              <p>You have 2 new tasks.</p>
            </div>
            <div className="stat-card">
              <h3>Tasks Completed</h3>
              <p>You've completed 12 tasks.</p>
            </div>
            <div className="stat-card">
              <h3>Onprogress</h3>
              <p>Undergoing task with details.</p>
            </div>
          </div>
        </section>

        <section className="recent-activities">
          <h2>Recent Activities</h2>
          <ul>
            <li>Completed the "network problem at main auditorium" task</li>
            <li>checking whether all PC's working properly at cse lab</li>
            <li>Scheduled a meeting with the supervisor</li>
            <li>Reviewed the "New task" </li>
          </ul>
        </section>

        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions">
            <button className="action-button">Contact</button>
            <button className="action-button">View All Tasks</button>
            <button className="action-button">Send Message</button>
            <button className="action-button">Manage Profile</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserDashboard;
