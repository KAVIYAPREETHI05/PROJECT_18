import React, { useState } from 'react';
import '../CSS/UserContact.css';

const tasks = [
  // Include your tasks with members here, for example:
  { id: 1, description: 'Task 1', members: [{ name: 'John Doe', mobile: '123-456-7890' }, { name: 'Jane Smith', mobile: '987-654-3210' }] },
  { id: 2, description: 'Task 2', members: [{ name: 'Alice Brown', mobile: '555-123-4567' }, { name: 'Bob White', mobile: '555-987-6543' }] },
];

function UserContact() {
  const [selectedTask, setSelectedTask] = useState('');
  const [members, setMembers] = useState([]);

  const handleTaskChange = (e) => {
    const taskDescription = e.target.value;
    setSelectedTask(taskDescription);

    // Find the selected task
    const task = tasks.find(task => task.description === taskDescription);
    if (task) {
      setMembers(task.members);
    } else {
      setMembers([]);
    }
  };

  const handleCall = (phoneNumber) => {
    // Initiates a phone call; this will work on devices with phone capabilities
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="contact-page">
      <h1>Contact Colleagues</h1>
      <form className="contact-form">
        <label htmlFor="task">Select Task:</label>
        <select
          id="task"
          value={selectedTask}
          onChange={handleTaskChange}
          required
          className={`form-select ${!selectedTask && 'error'}`}
        >
          <option value="" disabled>Select a task</option>
          {tasks.map(task => (
            <option key={task.id} value={task.description}>
              {task.description}
            </option>
          ))}
        </select>

        {members.length > 0 && (
          <div className="members-list">
            <p><strong>Colleagues Assigned:</strong></p>
            <ul>
              {members.map((member, index) => (
                <li key={index}>
                  {member.name}: {member.mobile}
                  <button 
                    type="button" 
                    className="call-button"
                    onClick={() => handleCall(member.mobile)}
                  >
                    Call
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}

export default UserContact;
