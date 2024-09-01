import React from 'react';
import '../CSS/UserView.css'; // Import the CSS file

function UserView() {
  // Sample data; replace with actual data as needed
  const tasks = [
    { id: 'T001', description: 'Fixing electrical short circuit', nature: 'Electrical', location: 'Building A', estimatedTime: '2 hours' },
    { id: 'T002', description: 'Network setup for new office', nature: 'Networking', location: 'Building B', estimatedTime: '4 hours' },
    { id: 'T003', description: 'Repairing wifi issues', nature: 'IT', location: 'Building C', estimatedTime: '1 hour' },
  ];

  return (
    <div className="user-view">
      <h1>Assigned Tasks</h1>
      <table>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Description</th>
            <th>Nature of Work</th>
            <th>Location</th>
            <th>Estimated Time</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.description}</td>
              <td>{task.nature}</td>
              <td>{task.location}</td>
              <td>{task.estimatedTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserView;
