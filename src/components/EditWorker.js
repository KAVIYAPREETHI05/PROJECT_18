import '../CSS/AddWorker.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EditWorker({ onUpdateWorker }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [worker, setWorker] = useState(location.state.worker);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWorker({ ...worker, [name]: value });
    };

    const handleSaveChanges = () => {
        onUpdateWorker(worker);
        navigate('/admin/dashboard');
    };

    return (
        <div className="edit-worker">
            <h2>Edit Worker Details</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
                <div>
                    <input
                        type="text"
                        name="name"
                        value={worker.name}
                        onChange={handleInputChange}
                        placeholder="Worker Name"
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        value={worker.email}
                        onChange={handleInputChange}
                        placeholder="Worker Email"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="natureOfWork"
                        value={worker.natureOfWork}
                        onChange={handleInputChange}
                        placeholder="Nature of Work"
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="experience"
                        value={worker.experience}
                        onChange={handleInputChange}
                        placeholder="Years of Experience"
                        required
                        min="0"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="mobile"
                        value={worker.mobile}
                        onChange={handleInputChange}
                        placeholder="Mobile Number"
                        required
                        pattern="\d{10}"
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="totalTasksCompleted"
                        value={worker.totalTasksCompleted}
                        onChange={handleInputChange}
                        placeholder="Total Tasks Completed"
                        required
                        min="0"
                    />
                </div>
                <button type="submit" className="save-button">Save Changes</button>
            </form>
            <button className="cancel-button" onClick={() => navigate('/admin/dashboard')}>Cancel</button>
        </div>
    );
}

export default EditWorker;
