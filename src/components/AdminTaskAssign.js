import React, { useState } from 'react';
import '../CSS/AdminTaskAssign.css'; // Ensure you have a corresponding CSS file for styling

function AdminTaskAssign() {
  const [taskId, setTaskId] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [numberOfWorkers, setNumberOfWorkers] = useState(1);
  const [workerIds, setWorkerIds] = useState(['']); // Array for worker IDs
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');
  const [message, setMessage] = useState('');

  // Dynamically handle worker ID input changes
  const handleWorkerIdChange = (index, value) => {
    const updatedWorkerIds = [...workerIds];
    updatedWorkerIds[index] = value;
    setWorkerIds(updatedWorkerIds);
  };

  // Update workerIds array based on the number of workers
  const handleNumberOfWorkersChange = (value) => {
    const num = parseInt(value);
    setNumberOfWorkers(num);
    setWorkerIds(Array(num).fill('')); // Reset or expand workerIds array
  };

  const handleAssignTask = () => {
    if (taskId && taskDescription && workerIds.every(id => id) && minutes !== '' && seconds !== '') {
      setMessage(`Task "${taskDescription}" assigned to Workers: ${workerIds.join(', ')} with estimated time ${minutes} minutes and ${seconds} seconds.`);
      // Clear form after assigning the task
      setTaskId('');
      setTaskDescription('');
      setNumberOfWorkers(1);
      setWorkerIds(['']);
      setMinutes('0');
      setSeconds('0');
    } else {
      setMessage('Please fill out all fields.');
    }
  };

  return (
    <div className="admin-task-assign">
      <h1>Assign Task</h1>
      <div className="form-container">
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
            onChange={(e) => handleNumberOfWorkersChange(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        {/* Render Worker ID input fields dynamically based on numberOfWorkers */}
        {Array.from({ length: numberOfWorkers }).map((_, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={`worker-id-${index}`}>Worker ID {index + 1}</label>
            <input 
              id={`worker-id-${index}`}
              type="text" 
              placeholder={`Worker ID ${index + 1}`} 
              value={workerIds[index] || ''} 
              onChange={(e) => handleWorkerIdChange(index, e.target.value)} 
            />
          </div>
        ))}
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
    </div>
  );
}

export default AdminTaskAssign;
