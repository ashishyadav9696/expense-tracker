import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createExpense, updateExpense, deleteExpense } from '../store/expenseSlice';
import ExpenseModal from '../components/ExpenseModal';

const CATEGORIES = ['All', 'Food', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Others'];

const fmt = (n) => '₹' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2 });

const ExpensesPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(s => s.expenses.items);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = items.filter(i => {
    const matchCat = category === 'All' || i.category === category;
    const matchSearch = i.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const total = filtered.reduce((s, i) => s + i.amount, 0);
  const allTotal = items.reduce((s, i) => s + i.amount, 0);
  const thisMonth = items.filter(i => i.date?.startsWith(new Date().toISOString().slice(0,7))).reduce((s,i) => s + i.amount, 0);
  const maxAmt = items.length ? Math.max(...items.map(i => i.amount)) : 0;

  const handleSave = async (data) => {
    if (editing) {
      await dispatch(updateExpense({ id: editing.id, data }));
    } else {
      await dispatch(createExpense(data));
    }
    setShowModal(false);
    setEditing(null);
  };

  const handleEdit = (item) => { setEditing(item); setShowModal(true); };
  const confirmDelete = (item) => setDeleteTarget(item);
  const handleDelete = async () => {
    await dispatch(deleteExpense(deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div>
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card violet">
          <div className="stat-label">Total Expenses</div>
          <div className="stat-value">{fmt(allTotal)}</div>
          <div className="stat-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
        </div>
        <div className="stat-card cyan">
          <div className="stat-label">This Month</div>
          <div className="stat-value">{fmt(thisMonth)}</div>
          <div className="stat-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-label">Total Records</div>
          <div className="stat-value">{items.length}</div>
          <div className="stat-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-label">Highest Expense</div>
          <div className="stat-value">{fmt(maxAmt)}</div>
          <div className="stat-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="action-bar">
        <div className="action-bar-left">
          <div className="search-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input placeholder="Search expenses…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="filter-select" value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button className="btn-primary" onClick={() => { setEditing(null); setShowModal(true); }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Expense
        </button>
      </div>

      {/* Table */}
      <div className="table-card">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <h3>No expenses found</h3>
            <p>{items.length === 0 ? 'Click "Add Expense" to track your first expense.' : 'Try adjusting your search or filter.'}</p>
          </div>
        ) : (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="expense-name">{item.title}</div>
                    {item.note && <div className="expense-date" style={{ marginTop:'2px' }}>{item.note}</div>}
                  </td>
                  <td><span className={`badge badge-${item.category}`}>{item.category}</span></td>
                  <td><span className="expense-date">{item.date}</span></td>
                  <td><span className="expense-amount">{fmt(item.amount)}</span></td>
                  <td>
                    <div className="expense-actions">
                      <button className="btn-edit" onClick={() => handleEdit(item)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Edit
                      </button>
                      <button className="btn-danger" onClick={() => confirmDelete(item)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          <path d="M10 11v6"/><path d="M14 11v6"/>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {filtered.length > 0 && (
        <div style={{ marginTop:'12px', textAlign:'right', color:'var(--text3)', fontSize:'0.82rem' }}>
          Showing {filtered.length} record{filtered.length !== 1 ? 's' : ''} · Total: <strong style={{ color:'var(--text2)' }}>{fmt(total)}</strong>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <ExpenseModal expense={editing} onSave={handleSave} onClose={() => { setShowModal(false); setEditing(null); }} />
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setDeleteTarget(null)}>
          <div className="modal-box" style={{ maxWidth:'400px' }}>
            <div className="modal-header">
              <h2>Delete Expense</h2>
              <button className="modal-close" onClick={() => setDeleteTarget(null)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <p className="confirm-msg">Are you sure you want to delete <strong>"{deleteTarget.title}"</strong>? This action cannot be undone.</p>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="btn-danger" style={{ padding:'10px 20px' }} onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
