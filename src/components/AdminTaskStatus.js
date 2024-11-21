import React, { useState, useMemo } from 'react';
import '../CSS/AdminTaskStatus.css';

const initialTasks = [
  { id: 21868, description: 'Server Setup', estimationTime: '4 hours', totalMembers: 5, coworkers: 'ANAND, RAJ, SUDHARSAN', location: 'Room 101' },
  { id: 21869, description: 'tank cleaner', estimationTime: '4 hours', totalMembers: 5, coworkers: 'ANAND, RAJ, SUDHARSAN', location: 'Room 101' },
  { id: 21861, description: 'lib tech', estimationTime: '4 hours', totalMembers: 5, coworkers: 'ANAND, RAJ, SUDHARSAN', location: 'Room 101' },
  { id: 21862, description: 'network issue', estimationTime: '3 hours', totalMembers: 5, coworkers: 'ANAND, RAJ, SUDHARSAN', location: 'Room 101' },
  { id: 21863, description: 'water leakage', estimationTime: '4 hours', totalMembers: 5, coworkers: 'ANAND, RAJ, SUDHARSAN', location: 'Room 101' },

  // Add more initial tasks here...
];

const initialTaskStatuses = [
  { id: 21868, status: 'Completed' },
  // Add more task statuses here...
];

function AdminTaskStatus() {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskStatuses, setTaskStatuses] = useState(initialTaskStatuses);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Sort tasks based on sort configuration
  const sortedTasks = useMemo(() => {
    let sortableItems = [...tasks];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [tasks, sortConfig]);

  // Filter tasks based on search term
  const filteredTasks = useMemo(() => {
    return sortedTasks.filter(task =>
      task.id.toString().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.estimationTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.totalMembers.toString().includes(searchTerm.toLowerCase()) ||
      task.coworkers.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedTasks, searchTerm]);

  // Request sort configuration
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Handle status change
  const handleStatusChange = (event, taskId) => {
    const updatedStatus = event.target.value;
    setTaskStatuses((prevStatuses) =>
      prevStatuses.map((status) =>
        status.id === taskId ? { ...status, status: updatedStatus } : status
      )
    );
  };

  // Update task status
  const updateStatus = (taskId, status) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      alert(`Updating status for Task: ${task.description} to ${status}`);
      // Here you would make an API call or update logic to persist the status
    }
  };

  // Get task status by task ID
  const getTaskStatus = (taskId) => {
    const statusObj = taskStatuses.find(status => status.id === taskId);
    return statusObj ? statusObj.status : 'Pending';
  };

  return (
    <div className="task-table">
      <input
        type="text"
        placeholder="Search "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('id')}>TASK ID</th>
            <th onClick={() => requestSort('description')}>TASK DESCRIPTION</th>
            <th onClick={() => requestSort('estimationTime')}>ESTIMATION TIME</th>
            <th onClick={() => requestSort('totalMembers')}>TOTAL MEMBERS</th>
            <th onClick={() => requestSort('coworkers')}>CO-WORKERS</th>
            <th onClick={() => requestSort('location')}>LOCATION</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.description}</td>
              <td>{task.estimationTime}</td>
              <td>{task.totalMembers}</td>
              <td>{task.coworkers}</td>
              <td>{task.location}</td>
              <td>
                <select
                  value={getTaskStatus(task.id)}
                  onChange={(e) => handleStatusChange(e, task.id)}
                >
                  <option value="Completed">Completed</option>
                  <option value="Not Completed">Not Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
                </select>
              </td>
              <td>
                <button onClick={() => updateStatus(task.id, getTaskStatus(task.id))}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTaskStatus;
