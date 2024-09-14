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
        <li className={isActive(`/${userType}/dashboard`) ? 'active' : ''}>
          <Link to={`/${userType}/dashboard`}>Dashboard</Link>
        </li>
        <li className={isActive(`/${userType}/task`) ? 'active' : ''}>
          <Link to={`/${userType}/task`}>New Task</Link>
        </li>
       
        <li className={isActive(`/${userType}/completed`) ? 'active' : ''}>
          <Link to={`/${userType}/completed`}>Completed Task</Link>
        </li>
        <li className={isActive(`/${userType}/ongoing`) ? 'active' : ''}>
          <Link to={`/${userType}/ongoing`}>On Progress Task</Link>
        </li>
        <li className={isActive(`/${userType}/contact`) ? 'active' : ''}>
          <Link to={`/${userType}/contact`}>Contact</Link>
        </li>
        {userType === 'admin' && (
          <>
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
