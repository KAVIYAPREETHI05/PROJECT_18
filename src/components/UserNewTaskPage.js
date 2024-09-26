import React, { useState, useMemo } from 'react';
//import '../CSS/UserNewTaskPage.css';

const initialTasks = [
    { id: 21868, description: 'Server Setup', estimationTime: '4 hours', totalMembers: 5, coworkers: 'ANAND, RAJ, SUDHARSAN', location: 'Room 101' },
    { id: 21868, description: 'Server Setup', estimationTime: '4 hours', totalMembers: 5, coworkers: 'ANAND, RAJ, SUDHARSAN', location: 'Room 101' },
    
    // Add more initial tasks here...
];

function UserNewTaskPage() {
    const [tasks, setTasks] = useState(initialTasks);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [selectedTask, setSelectedTask] = useState(null); // To track the selected task
    const [dropdownTaskId, setDropdownTaskId] = useState(null); // To track the task for dropdown

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

    // Handle dropdown selection
    const handleDropdownChange = (event) => {
        const option = event.target.value;
        if (dropdownTaskId) {
            const task = tasks.find(t => t.id === dropdownTaskId);
            if (task) {
                const message = `Task: ${task.description}\nStatus: ${option}`;
                alert(`Message to admin:\n${message}`);
                // Here you would make an API call to send the message to the admin
            }
        }
        setDropdownTaskId(null); // Reset dropdown task ID
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
                            <button >Start</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserNewTaskPage;
