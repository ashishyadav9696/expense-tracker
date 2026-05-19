import React, { useState } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Others'];

const ExpenseModal = ({ expense, onSave, onClose }) => {
  const isEdit = Boolean(expense);
  const [form, setForm] = useState({
    title: expense?.title || '',
    amount: expense?.amount || '',
    category: expense?.category || 'Food',
    date: expense?.date || new Date().toISOString().split('T')[0],
    note: expense?.note || '',
  });
  const [saving, setSaving] = useState(false);

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.amount) return;
    setSaving(true);
    await onSave({ ...form, amount: parseFloat(form.amount) });
    setSaving(false);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <h2>{isEdit ? 'Edit Expense' : 'Add New Expense'}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="title">Description</label>
            <input id="title" name="title" className="form-input" placeholder="e.g. Lunch at cafe" value={form.title} onChange={handle} required />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="amount">Amount (₹)</label>
              <input id="amount" name="amount" type="number" min="0.01" step="0.01" className="form-input" placeholder="0.00" value={form.amount} onChange={handle} required />
            </div>
            <div className="form-field">
              <label htmlFor="date">Date</label>
              <input id="date" name="date" type="date" className="form-input" value={form.date} onChange={handle} required />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" className="form-input" value={form.category} onChange={handle}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="note">Note (optional)</label>
            <input id="note" name="note" className="form-input" placeholder="Any additional note..." value={form.note} onChange={handle} />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Update Expense' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
