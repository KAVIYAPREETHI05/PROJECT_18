import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../CSS/UserDashboard.css'; // Make sure you have a corresponding CSS file for styling

function UserDashboard() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Navigation handlers
  const goToNewTaskPage = () => {
    navigate('/user/task');
  };

  const goToCompletedTasks = () => {
    navigate('/user/completed');
  };

  const goToOnProgressTasks = () => {
    navigate('/user/ongoing');
  };

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>
      <div className="dashboard-content">
        <section className="overview">
          <h2>Hi, Kaviya</h2>
          <p>Welcome back,</p>
          <div className="stats">
            <div className="stat-card" onClick={goToNewTaskPage}>
              <h3>New Tasks</h3>
              <p>You have 2 new tasks.</p>
            </div>
            <div className="stat-card" onClick={goToCompletedTasks}>
              <h3>Tasks Completed</h3>
              <p>You've completed 12 tasks.</p>
            </div>
            <div className="stat-card" onClick={goToOnProgressTasks}>
              <h3>On Progress</h3>
              <p>Undergoing task with details.</p>
            </div>
          </div>
        </section>

       {/*<section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions">
            <button className="action-button">Contact</button>
            <button className="action-button">View All Tasks</button>
            <button className="action-button" onClick={goToNewTaskPage}>Send Message</button>
            <button className="action-button">Manage Profile</button>
          </div>
        </section>
        */}
        
      </div>
    </div>
  );
}

export default UserDashboard;
