import React from 'react';
import '../CSS/AdminDashboard.css'
function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-content">
        <section className="system-metrics">
          <h2>System Metrics</h2>
          <div className="metrics">
            <div className="metric-card">
              <h3>Total Workers</h3>
              <p>1,245 workers</p>
            </div>
            <div className="metric-card">
              <h3>completed task</h3>
              <p>980 taks</p>
            </div>
            <div className="metric-card">
              <h3>Pending task</h3>
              <p>23 tasks</p>
            </div>
            <div className="metric-card">
              <h3>FindAll</h3>
              <p>track location of worker</p>
            </div>
          </div>
        </section>

        <section className="recent-activities">
          <h2>Recent Activities</h2>
          <ul>
            <li>Approved new user registrations</li>
            <li>Assign task for workers</li>
            <li>Update staus of work</li>
            <li>Generated monthly performance report</li>
          </ul>
        </section>

        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions">
            <button className="action-button">Add New User</button>
            <button className="action-button">View All Users</button>
            <button className="action-button">Manage Requests</button>
            <button className="action-button">Contact worker</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
