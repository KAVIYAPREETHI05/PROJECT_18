import React, { useState, useEffect, useMemo } from 'react';
import '../CSS/UserOngoingTask.css';

function UserOngoingTask() {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    // Fetch tasks from the backend
    useEffect(() => {
        fetch('http://localhost:8080/api/tasks/ongoing') // Replace with the correct endpoint for ongoing tasks
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    // Function to handle task completion
    const handleTaskCompletion = (taskId) => {
        fetch(`http://localhost:8080/api/tasks/${taskId}/complete`, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            alert('Task marked as completed!');
            // Optionally, remove the completed task from the ongoing tasks list
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        })
        .catch(error => console.error('Error marking task as completed:', error));
    };

    // Sorting logic
    const sortedTasks = useMemo(() => {
        let sortableItems = [...tasks];
        if (sortConfig !== null) {
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

    // Filtering logic
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

    // Sorting request function
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="task-table">
            <input
                type="text"
                placeholder="Search tasks"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <table>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('id')}>TASK ID</th>
                        <th onClick={() => requestSort('description')}>TASK DESCRIPTION</th>
                        <th onClick={() => requestSort('estimationTime')}>TIME TAKEN</th>
                        <th onClick={() => requestSort('totalMembers')}>TOTAL MEMBERS</th>
                        <th onClick={() => requestSort('coworkers')}>CO-WORKERS</th>
                        <th onClick={() => requestSort('location')}>LOCATION</th>
                        <th>ACTION</th> {/* New column for completion action */}
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
                                <button onClick={() => handleTaskCompletion(task.id)}>
                                    Complete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserOngoingTask;





