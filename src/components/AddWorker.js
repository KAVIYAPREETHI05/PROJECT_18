import '../CSS/AddWorker.css'; // Import the CSS file for styling the component
import React, { useState } from 'react'; // Import React and useState hook for managing state

function AddWorker({ onSaveWorker, setIsModalOpen }) { // Define the AddWorker component, accepting onSaveWorker and setIsModalOpen as props
    // Initialize state for the new worker with default values
    const [newWorker, setNewWorker] = useState({
        id: '',
        name: '',
        email: '',
        natureOfWork: '',
        experience: '',
        mobile: '',
        totalTasksCompleted: ''
    });
    // Initialize state for form validation errors
    const [validationErrors, setValidationErrors] = useState({});

    // Function to validate form fields
    const validateFields = () => {
        const errors = {}; // Create an empty errors object
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
        const mobilePattern = /^\d{10}$/; // Regular expression for mobile number validation

        // Validate each field and set error messages
        if (!newWorker.name) errors.name = 'Name is required.';
        if (!newWorker.email) {
            errors.email = 'Email is required.';
        } else if (!emailPattern.test(newWorker.email)) {
            errors.email = 'Invalid email format.';
        }
        if (!newWorker.natureOfWork) errors.natureOfWork = 'Please select the nature of work.';
        if (newWorker.experience === '') {
            errors.experience = 'Experience is required.';
        } else if (newWorker.experience < 0) {
            errors.experience = 'Experience cannot be negative.';
        }
        if (!newWorker.mobile) {
            errors.mobile = 'Mobile number is required.';
        } else if (!mobilePattern.test(newWorker.mobile)) {
            errors.mobile = 'Mobile number must be exactly 10 digits.';
        }
        if (newWorker.totalTasksCompleted === '') {
            errors.totalTasksCompleted = 'Total tasks completed is required.';
        } else if (newWorker.totalTasksCompleted < 0) {
            errors.totalTasksCompleted = 'Total tasks completed cannot be negative.';
        }
        return errors; // Return the errors object
    };

    // Function to handle saving a new worker
    const handleSaveWorker = () => {
        const errors = validateFields(); // Validate form fields
        if (Object.keys(errors).length > 0) { // Check if there are validation errors
            setValidationErrors(errors); // Set validation errors state if any
            return; // Stop save process if there are errors
        }
        onSaveWorker({ ...newWorker, id: Date.now() }); // Save the new worker with a unique ID
        setIsModalOpen(false); // Close the modal after saving
        resetForm(); // Reset form fields
    };

    // Function to reset form fields and clear validation errors
    const resetForm = () => {
        setNewWorker({
            id: '',
            name: '',
            email: '',
            natureOfWork: '',
            experience: '',
            mobile: '',
            totalTasksCompleted: ''
        });
        setValidationErrors({}); // Clear validation errors
    };

    // Function to handle input changes and update state
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from the input event
        setNewWorker(prevState => ({
            ...prevState, // Preserve previous state
            [name]: value // Update the corresponding field in newWorker state
        }));
    };

    // Function to handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        handleSaveWorker(); // Call handleSaveWorker to save the worker
    };

    return (
        <div className="modal"> {/* Modal container */}
            <div className="modal-content"> {/* Modal content container */}
                <h2>Add New Worker</h2>
                <form onSubmit={handleFormSubmit}> {/* Form submission handler */}
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={newWorker.name}
                            onChange={handleInputChange}
                            placeholder="Worker Name"
                            aria-label="Worker Name"
                            required
                        />
                        {validationErrors.name && <p className="error">{validationErrors.name}</p>} {/* Display validation error for name */}
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={newWorker.email}
                            onChange={handleInputChange}
                            placeholder="Worker Email"
                            aria-label="Worker Email"
                            required
                        />
                        {validationErrors.email && <p className="error">{validationErrors.email}</p>} {/* Display validation error for email */}
                    </div>
                    <div>
                        <select
                            name="natureOfWork"
                            value={newWorker.natureOfWork}
                            onChange={handleInputChange}
                            aria-label="Nature of Work"
                            required
                        >
                            <option value="" disabled>Select Nature of Work</option>
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="Manager">Manager</option>
                            <option value="Tester">Tester</option>
                        </select>
                        {validationErrors.natureOfWork && <p className="error">{validationErrors.natureOfWork}</p>} {/* Display validation error for nature of work */}
                    </div>
                    <div>
                        <input
                            type="number"
                            name="experience"
                            value={newWorker.experience}
                            onChange={handleInputChange}
                            placeholder="Years of Experience"
                            aria-label="Years of Experience"
                            required
                            min="0"
                        />
                        {validationErrors.experience && <p className="error">{validationErrors.experience}</p>} {/* Display validation error for experience */}
                    </div>
                    <div>
                        <input
                            type="text"
                            name="mobile"
                            value={newWorker.mobile}
                            onChange={handleInputChange}
                            placeholder="Mobile Number"
                            aria-label="Mobile Number"
                            required
                            pattern="\d{10}"
                        />
                        {validationErrors.mobile && <p className="error">{validationErrors.mobile}</p>} {/* Display validation error for mobile */}
                    </div>
                    <div>
                        <input
                            type="number"
                            name="totalTasksCompleted"
                            value={newWorker.totalTasksCompleted}
                            onChange={handleInputChange}
                            placeholder="Total Tasks Completed"
                            aria-label="Total Tasks Completed"
                            required
                            min="0"
                        />
                        {validationErrors.totalTasksCompleted && <p className="error">{validationErrors.totalTasksCompleted}</p>} {/* Display validation error for total tasks completed */}
                    </div>
                    <button type="submit" className="save-button">Save Worker</button> {/* Save button */}
                </form>
                <button className="close-button" onClick={() => {
                    setIsModalOpen(false); // Close the modal
                    resetForm(); // Reset the form when closing
                }}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default AddWorker; // Export the AddWorker component for use in other parts of the app
