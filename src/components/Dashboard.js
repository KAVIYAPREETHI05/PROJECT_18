import React from "react";
import "./Dashboard.css";

const workers = [
  { id: "W01", name: "Kowsi", work: "Plumber", task: 15 },
  { id: "W02", name: "Ragi", work: "Electrician", task: 13 },
  { id: "W03", name: "Kani", work: "Photographer", task: 25 },
  { id: "W04", name: "Mani", work: "Cleaner", task: 3 },
  { id: "W05", name: "Vasu", work: "Plumber", task: "04" },
  { id: "W06", name: "Aravind", work: "Constructor", task: 32 },
  { id: "W07", name: "Kaviya", work: "Technician", task: 8 },
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <input type="text" className="search-bar" placeholder="🔍 Search" />
      <table className="worker-table">
        <thead>
          <tr>
            <th>WorkerID</th>
            <th>W.Name</th>
            <th>NatureOfWork</th>
            <th>Task</th>
            <th>Phone</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.name}</td>
              <td>{worker.work}</td>
              <td>{worker.task}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
