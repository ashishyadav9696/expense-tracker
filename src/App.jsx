import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchExpenses } from './store/expenseSlice';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import ExpensesPage from './pages/Expenses';
import Dashboard from './pages/Dashboard';

function AppInner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(() => sessionStorage.getItem('is_user') || '');

  useEffect(() => {
    if (user) dispatch(fetchExpenses());
  }, [user, dispatch]);

  const handleLogin = (username) => {
    sessionStorage.setItem('is_user', username);
    setUser(username);
    navigate('/', { replace: true });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('is_user');
    setUser('');
    navigate('/', { replace: true });
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ExpensesPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;
