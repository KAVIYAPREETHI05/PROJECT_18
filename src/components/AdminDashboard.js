//import React from 'react';
import '../CSS/AdminDashboard.css';
import React, { useState, useMemo } from 'react';

const initialWorkers = [
    { id: 101, name: 'Anand Kumar', email: 'anand.k@example.com', natureOfWork: 'Server Maintenance', experience: 5, mobile: '9876543210', totalTasksCompleted: 12 },
    { id: 102, name: 'Rajesh Kumar', email: 'rajesh.k@example.com', natureOfWork: 'Database Management', experience: 3, mobile: '9876543211', totalTasksCompleted: 8 },
    { id: 103, name: 'Sudharsan M', email: 'sudharsan.m@example.com', natureOfWork: 'Network Setup', experience: 4, mobile: '9876543212', totalTasksCompleted: 10 },
    { id: 104, name: 'Ravi Kumar', email: 'ravi.k@example.com', natureOfWork: 'Software Development', experience: 2, mobile: '9876543213', totalTasksCompleted: 5 },
    
    // Add more workers if necessary
];

function AdminDashboard() {
    const [workers, setWorkers] = useState(initialWorkers);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const sortedWorkers = useMemo(() => {
        let sortableItems = [...workers];
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
    }, [workers, sortConfig]);

    const filteredWorkers = useMemo(() => {
        return sortedWorkers.filter(worker =>
            worker.id.toString().includes(searchTerm.toLowerCase()) ||
            worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            worker.natureOfWork.toLowerCase().includes(searchTerm.toLowerCase()) ||
            worker.experience.toString().includes(searchTerm.toLowerCase()) ||
            worker.mobile.includes(searchTerm.toLowerCase()) ||
            worker.totalTasksCompleted.toString().includes(searchTerm.toLowerCase())
        );
    }, [sortedWorkers, searchTerm]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleAddWorker = () => {
        // Logic to add a new worker (you can prompt the user for worker details or navigate to another page)
        alert('Add new worker functionality');
    };

    const handleEditWorker = (worker) => {
        // Logic to edit the worker (you can open a modal for editing)
        alert(`Edit worker: ${worker.name}`);
    };

    return (
        <div className="worker-table">
            <div className="header-controls">
                <input
                    type="text"
                    placeholder="Search "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button className="add-button" onClick={handleAddWorker}>Add Worker</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('id')}>WORKER ID</th>
                        <th onClick={() => requestSort('name')}>WORKER NAME</th>
                        <th onClick={() => requestSort('email')}>EMAIL</th>
                        <th onClick={() => requestSort('natureOfWork')}>NATURE OF WORK</th>
                        <th onClick={() => requestSort('experience')}>YEARS OF EXPERIENCE</th>
                        <th onClick={() => requestSort('mobile')}>MOBILE NUMBER</th>
                        <th onClick={() => requestSort('totalTasksCompleted')}>TOTAL TASKS COMPLETED</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredWorkers.map(worker => (
                        <tr key={worker.id}>
                            <td>{worker.id}</td>
                            <td>{worker.name}</td>
                            <td>{worker.email}</td>
                            <td>{worker.natureOfWork}</td>
                            <td>{worker.experience} years</td>
                            <td>{worker.mobile}</td>
                            <td>{worker.totalTasksCompleted}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEditWorker(worker)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;
