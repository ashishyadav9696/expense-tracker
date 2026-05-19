import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(username.trim());
    }, 900);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-brand">
          <div className="login-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 4 6 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13C20 6 12 2 12 2Z" fill="url(#lflame1)" />
              <path d="M12 8C12 8 8 11 8 14.5C8 16.433 9.79086 18 12 18C14.2091 18 16 16.433 16 14.5C16 11 12 8 12 8Z" fill="url(#lflame2)" />
              <circle cx="12" cy="14.5" r="2" fill="white" fillOpacity="0.95" />
              <defs>
                <linearGradient id="lflame1" x1="12" y1="2" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
                <linearGradient id="lflame2" x1="12" y1="8" x2="12" y2="18" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#e9d5ff" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="login-title">intern<span>Spark</span></h1>
          <p className="login-subtitle">Expense Tracker — Sign in to continue</p>
        </div>

        {error && (
          <div style={{ background:'rgba(244,63,94,0.1)', border:'1px solid rgba(244,63,94,0.2)', borderRadius:'10px', padding:'10px 14px', color:'#f43f5e', fontSize:'0.85rem', marginBottom:'16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="username">Username</label>
            <div className="input-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <input id="username" type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input id="password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
            </div>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? (
              <div style={{ width:'18px', height:'18px', border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
