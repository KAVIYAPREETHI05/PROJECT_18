import '../CSS/AdminDashboard.css'; // Importing CSS styles for the AdminDashboard component.
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for programmatic navigation within the app.

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
    const navigate = useNavigate(); // Hook for navigating between routes.

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
        navigate('/admin/add-worker'); // Navigate to the AddWorker page
    };

    const handleEditWorker = (worker) => {
        navigate(`/admin/edit-worker/${worker.id}`); // Navigate to the EditWorker page with worker's id
    };
    const onUpdateWorker = (updatedWorker) => {
      setWorkers(workers.map(worker => (worker.id === updatedWorker.id ? updatedWorker : worker)));
  };

    return (
        <div className="worker-table">
            <div className="header-controls">
                <input
                    type="text"
                    placeholder="Search "
                    value={searchTerm} // Controlled input for search term.
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term state on input change.
                    className="search-input"
                />
                <button className="add-button" onClick={handleAddWorker}>Add Worker</button> {/* Button to navigate to Add Worker page */}
            </div>

            {/* Table to display the list of workers */}
            <table>
                <thead>
                    <tr>
                        {/* Column headers with sorting functionality */}
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
                    {/* Mapping through the filteredWorkers array to display each worker */}
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
                                {/* Button to trigger the edit functionality */}
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
