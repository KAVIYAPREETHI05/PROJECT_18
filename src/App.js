import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'; // Ensure Outlet is imported
import UserView from './components/UserView';
import Sidebar from './components/Sidebar';
import UserDashboard from './components/UserDashboard';
import UserTaskPage from './components/UserTaskPage';
import AdminDashboard from './components/AdminDashboard';
import AdminTaskAssign from './components/AdminTaskAssign';
import AdminTaskStatus from './components/AdminTaskStatus';
import './components/Sidebar.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* User Routes */}
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="task" element={<UserTaskPage />} />
            <Route path="view" element={<UserView />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="task-assign" element={<AdminTaskAssign />} />
            <Route path="task-status" element={<AdminTaskStatus />} />
          </Route>

          {/* Default Route */}
          <Route path="/" element={<h1>Welcome! Please select a panel.</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

// Layout components for User and Admin

function UserLayout() {
  return (
    <div className="layout">
      <Sidebar userType="user" />
      <main className="main-content">
        <Outlet /> {/* This will render the matched child route */}
      </main>
    </div>
  );
}

function AdminLayout() {
  return (
    <div className="layout">
      <Sidebar userType="admin" />
      <main className="main-content">
        <Outlet /> {/* This will render the matched child route */}
      </main>
    </div>
  );
}

export default App;
