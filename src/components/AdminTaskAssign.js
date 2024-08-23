import React, { useState } from 'react';
import './AdminTaskAssign.css'; // Ensure you have a corresponding CSS file for styling

function AdminTaskAssign() {
  const [taskId, setTaskId] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [numberOfWorkers, setNumberOfWorkers] = useState('1');
  const [workerId, setWorkerId] = useState('');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');
  const [message, setMessage] = useState('');

  const handleAssignTask = () => {
    if (taskId && taskDescription && workerId && minutes !== '' && seconds !== '') {
      // Implement task assign logic here
      setMessage(`Task "${taskDescription}" assigned to Worker ${workerId} with estimated time ${minutes} minutes and ${seconds} seconds.`);
      setTaskId('');
      setTaskDescription('');
      setNumberOfWorkers('1');
      setWorkerId('');
      setMinutes('0');
      setSeconds('0');
    } else {
      setMessage('Please fill out all fields.');
    }
  };

  return (
    <div className="admin-task-assign">
      <h1>Assign Task</h1>
      <div className="form-group">
        <label htmlFor="task-id">Task ID</label>
        <input 
          id="task-id"
          type="text" 
          placeholder="Task ID" 
          value={taskId} 
          onChange={(e) => setTaskId(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label htmlFor="task-description">Task Description</label>
        <input 
          id="task-description"
          type="text" 
          placeholder="Task Description" 
          value={taskDescription} 
          onChange={(e) => setTaskDescription(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label htmlFor="number-of-workers">Number of Workers Needed</label>
        <select 
          id="number-of-workers"
          value={numberOfWorkers}
          onChange={(e) => setNumberOfWorkers(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="worker-id">Worker ID</label>
        <input 
          id="worker-id"
          type="text" 
          placeholder="Worker ID" 
          value={workerId} 
          onChange={(e) => setWorkerId(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Estimated Time</label>
        <div className="time-inputs">
          <select 
            id="minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          >
            {[...Array(61).keys()].map(num => (
              <option key={num} value={num}>{num} min</option>
            ))}
          </select>
          <select 
            id="seconds"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
          >
            {[...Array(60).keys()].map(num => (
              <option key={num} value={num}>{num} sec</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={handleAssignTask}>Assign Task</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AdminTaskAssign;
