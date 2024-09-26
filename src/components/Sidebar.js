import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../CSS/Sidebar.css';

function Sidebar({ userType }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <h2>{userType === 'admin' ? 'Admin Panel' : 'User Panel'}</h2>
      <ul className="nav-items">
        {userType === 'user' && (
          <>
            <li className={isActive('/user/dashboard') ? 'active' : ''}>
              <Link to="/user/dashboard">Dashboard</Link>
            </li>
            <li className={isActive('/user/task') ? 'active' : ''}>
              <Link to="/user/task">New Task</Link>
            </li>
            <li className={isActive('/user/completed') ? 'active' : ''}>
              <Link to="/user/completed">Completed Task</Link>
            </li>
            <li className={isActive('/user/ongoing') ? 'active' : ''}>
              <Link to="/user/ongoing">On Progress Task</Link>
            </li>
            <li className={isActive('/user/contact') ? 'active' : ''}>
              <Link to="/user/contact">Contact</Link>
            </li>
          </>
        )}

        {userType === 'admin' && (
          <>
          <li className={isActive('/admin/admin-dashboard') ? 'active' : ''}>
              <Link to="/admin/admin-dashboard">Dashboard</Link>
            </li>
            <li className={isActive('/admin/task-assign') ? 'active' : ''}>
              <Link to="/admin/task-assign">Assign Task</Link>
            </li>
            <li className={isActive('/admin/task-status') ? 'active' : ''}>
              <Link to="/admin/task-status">Task Status</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
