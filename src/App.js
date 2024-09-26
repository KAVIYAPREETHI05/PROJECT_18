import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'; // Ensure Outlet is imported
import UserView from './components/UserView';
import Sidebar from './components/Sidebar';
import UserDashboard from './components/UserDashboard';
import UserNewTaskPage from './components/UserNewTaskPage';
import UserCompletedTask from './components/UserCompletedTask';
import UserOngoingTask from './components/UserOngoingTask';
import UserContact from './components/UserContact'
import AdminDashboard from './components/AdminDashboard';
import AdminTaskAssign from './components/AdminTaskAssign';
import AdminTaskStatus from './components/AdminTaskStatus';
import LoginPage from './components/LoginPage';
import '../src/CSS/Sidebar.css';
//import '../src/CSS';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* User Routes */}
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="task" element={<UserNewTaskPage />} />
            <Route path="completed" element={<UserCompletedTask />} />
            <Route path="ongoing" element={<UserOngoingTask />} />
            <Route path="contact" element={<UserContact />} />
          
            
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="task-assign" element={<AdminTaskAssign />} />
            <Route path="task-status" element={<AdminTaskStatus />} />
          </Route>

          {/* Default Route */}
       
          <Route path="/" element={<LoginPage />} />
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
