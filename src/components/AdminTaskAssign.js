import '../CSS/AddWorker.css';
import React, { useState } from 'react';

function AssignTask({ onSaveWorker, setIsModalOpen }) {
    const [newWork, setNewWork] = useState({
        id: '',
        taskDescription: '',
        natureOfWork: '',
        numberOfWorkers: '',
        mobile: '',
        estimatedTime: ''
    });
    const [numberOfWorkers, setNumberOfWorkers] = useState(1);
    const [workerIds, setWorkerIds] = useState(['']); // Array for worker IDs
    const [minutes, setMinutes] = useState('0');
    const [hours, setSeconds] = useState('0');

    const [validationErrors, setValidationErrors] = useState({});

    const validateFields = () => {
        const errors = {};
        const mobilePattern = /^\d{10}$/;

        if (!newWork.id) errors.id = 'Task ID is required.';
        if (!newWork.taskDescription) errors.taskDescription = 'Task description is required.';
        if (!newWork.natureOfWork) errors.natureOfWork = 'Please select the nature of work.';
        if (newWork.numberOfWorkers === '') {
            errors.numberOfWorkers = 'Number of workers is required.';
        } else if (newWork.numberOfWorkers < 0) {
            errors.numberOfWorkers = 'Number of workers cannot be negative.';
        }
        if (!newWork.mobile) {
            errors.mobile = 'Mobile number is required.';
        } else if (!mobilePattern.test(newWork.mobile)) {
            errors.mobile = 'Mobile number must be exactly 10 digits.';
        }
        if (newWork.estimatedTime === '') {
            errors.estimatedTime = 'Estimated time is required.';
        } else if (newWork.estimatedTime < 0) {
            errors.estimatedTime = 'Estimated time cannot be negative.';
        }

        return errors;
    };

    const handleTaskAssign = () => {
        const errors = validateFields();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return; // Stop save process if there are errors
        }

        onSaveWorker({ ...newWork, id: Date.now() }); // Save the new worker
        setIsModalOpen(false); // Close modal after saving
        resetForm(); // Reset form fields
    };

    const resetForm = () => {
        setNewWork({
            id: '',
            taskDescription: '',
            natureOfWork: '',
            numberOfWorkers: '',
            mobile: '',
            estimatedTime: ''
        });
        setValidationErrors({}); // Clear validation errors
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWork(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent form submission via Enter key
        handleTaskAssign();
    };
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

  

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Assign Task</h2>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <input
                            type="text"
                            name="id"
                            value={newWork.id}
                            onChange={handleInputChange}
                            placeholder="Task ID"
                            aria-label="Task ID"
                            required
                        />
                        {validationErrors.id && <p className="error">{validationErrors.id}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="taskDescription"
                            value={newWork.taskDescription}
                            onChange={handleInputChange}
                            placeholder="Task Description"
                            aria-label="Task Description"
                            required
                        />
                        {validationErrors.taskDescription && <p className="error">{validationErrors.taskDescription}</p>}
                    </div>

                    <div>
                        <select
                            name="natureOfWork"
                            value={newWork.natureOfWork}
                            onChange={handleInputChange}
                            aria-label="Nature of Work"
                            required
                        >
                            <option value="" disabled>Select Nature of Work</option>
                            <option value="Designer">Designer</option>
                            <option value="Plumber">Plumber</option>
                            <option value="Electrician">Electrician</option>
                        </select>
                        {validationErrors.natureOfWork && <p className="error">{validationErrors.natureOfWork}</p>}
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
              id="hours"
              value={hours}
              onChange={(e) => setSeconds(e.target.value)}
            >
              {[...Array(24).keys()].map(num => (
                <option key={num} value={num}>{num} hr</option>
              ))}
            </select>
            <select 
              id="minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            >
              {[...Array(60).keys()].map(num => (
                <option key={num} value={num}>{num} min</option>
              ))}
            </select>
           
          </div>
        </div>
                    <button type="submit" className="save-button">Assign Task</button>
                </form>
                
                <button className="close-button" onClick={() => {
                    setIsModalOpen(false);
                    resetForm(); // Reset the form when closing
                }}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default AssignTask;
