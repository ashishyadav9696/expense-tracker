import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="nav-brand">
          <div className="nav-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 4 6 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13C20 6 12 2 12 2Z" fill="url(#flame1)" />
              <path d="M12 8C12 8 8 11 8 14.5C8 16.433 9.79086 18 12 18C14.2091 18 16 16.433 16 14.5C16 11 12 8 12 8Z" fill="url(#flame2)" />
              <circle cx="12" cy="14.5" r="2" fill="white" fillOpacity="0.9" />
              <defs>
                <linearGradient id="flame1" x1="12" y1="2" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
                <linearGradient id="flame2" x1="12" y1="8" x2="12" y2="18" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#c4b5fd" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>intern<span>Spark</span></span>
        </div>

        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
            Expenses
          </NavLink>

          <NavLink to="/dashboard" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            Dashboard
          </NavLink>

          {user && (
            <span style={{ color: 'var(--text3)', fontSize: '0.82rem', marginLeft: '8px' }}>
              Hi, <strong style={{ color: 'var(--text2)' }}>{user}</strong>
            </span>
          )}

          <button className="nav-link logout" onClick={onLogout}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
