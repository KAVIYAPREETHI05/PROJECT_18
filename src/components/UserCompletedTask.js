import React, { useState, useMemo } from 'react';
import '../CSS/UserCompletedTask.css';

const initialTasks = [
    { id: 21868, description: 'Server Setup', estimationTime: '4 hours', totalMembers: 5, coworkers: 'ANAND, RAJ, SUDHARSAN', location: 'Room 101' },
    { id: 21867, description: 'Database Migration', estimationTime: '6 hours', totalMembers: 3, coworkers: 'SUDHARSAN, RAVI', location: 'Room 202' },
    { id: 21868, description: 'Server Setup', estimationTime: '4 hours', totalMembers: 5, coworkers: 'ANAND, RAJ, SUDHARSAN', location: 'Room 101' },
    { id: 21867, description: 'Database Migration', estimationTime: '6 hours', totalMembers: 3, coworkers: 'SUDHARSAN, RAVI', location: 'Room 202' },
    { id: 21868, description: 'Server Setup', estimationTime: '4 hours', totalMembers: 5, coworkers: 'ANAND, RAJ, SUDHARSAN', location: 'Room 101' },
    { id: 21867, description: 'Database Migration', estimationTime: '6 hours', totalMembers: 3, coworkers: 'SUDHARSAN, RAVI', location: 'Room 202' },
    { id: 21868, description: 'Server Setup', estimationTime: '4 hours', totalMembers: 5, coworkers: 'ANAND, RAJ, SUDHARSAN', location: 'Room 101' },
    { id: 21867, description: 'Database Migration', estimationTime: '6 hours', totalMembers: 3, coworkers: 'SUDHARSAN, RAVI', location: 'Room 202' },
   
];

function UserNewTaskPage() {
    const [tasks, setTasks] = useState(initialTasks);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleMessageClick = (task) => {
        alert(`Send message about task: ${task.description}`);
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
                        <th onClick={() => requestSort('estimationTime')}>TIME TAKEN</th>
                        <th onClick={() => requestSort('totalMembers')}>TOTAL MEMBERS</th>
                        <th onClick={() => requestSort('coworkers')}>CO-WORKERS</th>
                        <th onClick={() => requestSort('location')}>LOCATION</th>
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
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserNewTaskPage;
