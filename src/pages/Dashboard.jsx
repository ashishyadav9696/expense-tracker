import React from 'react';
import { useSelector } from 'react-redux';

const COLORS = {
  Food: '#f59e0b', Transport: '#06b6d4', Entertainment: '#ec4899',
  Health: '#10b981', Shopping: '#8b5cf6', Others: '#94a3b8'
};

const fmt = (n) => '₹' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2 });

const Dashboard = () => {
  const items = useSelector(s => s.expenses.items);

  if (items.length === 0) {
    return (
      <div>
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Analytics and spending overview</p>
        </div>
        <div className="empty-state">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
          </svg>
          <h3>No data yet</h3>
          <p>Add some expenses to see your analytics dashboard.</p>
        </div>
      </div>
    );
  }

  // Category breakdown
  const catTotals = {};
  items.forEach(i => { catTotals[i.category] = (catTotals[i.category] || 0) + i.amount; });
  const total = Object.values(catTotals).reduce((s, v) => s + v, 0);
  const catList = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);

  // Monthly breakdown (last 6 months)
  const monthMap = {};
  items.forEach(i => {
    const m = (i.date || '').slice(0, 7);
    if (m) monthMap[m] = (monthMap[m] || 0) + i.amount;
  });
  const months = Object.entries(monthMap).sort((a, b) => a[0].localeCompare(b[0])).slice(-6);
  const maxMonthly = Math.max(...months.map(([,v]) => v), 1);

  // Recent 5 expenses
  const recent = [...items].sort((a, b) => (b.date||'').localeCompare(a.date||'')).slice(0, 5);

  const avgExpense = total / items.length;

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Analytics and spending overview for all your expenses</p>
      </div>

      {/* Summary Stats */}
      <div className="stats-grid">
        <div className="stat-card violet">
          <div className="stat-label">Total Spent</div>
          <div className="stat-value">{fmt(total)}</div>
        </div>
        <div className="stat-card cyan">
          <div className="stat-label">Total Entries</div>
          <div className="stat-value">{items.length}</div>
        </div>
        <div className="stat-card green">
          <div className="stat-label">Avg per Expense</div>
          <div className="stat-value">{fmt(avgExpense)}</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-label">Categories Used</div>
          <div className="stat-value">{catList.length}</div>
        </div>
      </div>

      <div className="charts-grid">
        {/* Category Breakdown */}
        <div className="chart-card">
          <div className="chart-title">Spending by Category</div>
          <div className="category-breakdown">
            {catList.map(([cat, amt]) => (
              <div key={cat} className="cat-row">
                <div className="cat-label">
                  <span className={`badge badge-${cat}`}>{cat}</span>
                </div>
                <div className="cat-bar-wrap">
                  <div className="cat-bar" style={{ width: `${(amt/total*100).toFixed(1)}%`, background: COLORS[cat] || '#94a3b8' }} />
                </div>
                <div className="cat-pct">{(amt/total*100).toFixed(0)}%</div>
                <div style={{ fontSize:'0.8rem', fontWeight:700, width:'90px', textAlign:'right', color:'var(--text2)' }}>{fmt(amt)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="chart-card">
          <div className="chart-title">Monthly Spending Trend</div>
          <div style={{ display:'flex', alignItems:'flex-end', gap:'10px', height:'220px', padding:'8px 0' }}>
            {months.map(([month, amt]) => {
              const pct = (amt / maxMonthly) * 100;
              const label = new Date(month + '-01').toLocaleString('default', { month: 'short', year:'2-digit' });
              return (
                <div key={month} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', height:'100%', justifyContent:'flex-end' }}>
                  <div style={{ fontSize:'0.7rem', color:'var(--text3)', fontWeight:700 }}>{fmt(amt).replace('₹','₹')}</div>
                  <div style={{ width:'100%', background:'rgba(124,58,237,0.15)', borderRadius:'6px 6px 0 0', position:'relative', height:`${Math.max(pct,4)}%`, transition:'height 0.6s cubic-bezier(0.4,0,0.2,1)' }}>
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,#8b5cf6,#4f46e5)', borderRadius:'6px 6px 0 0', opacity:0.85 }} />
                  </div>
                  <div style={{ fontSize:'0.7rem', color:'var(--text3)', fontWeight:600 }}>{label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="chart-card">
        <div className="chart-title">Recent Expenses</div>
        <table className="expense-table" style={{ marginTop:'-8px' }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {recent.map(item => (
              <tr key={item.id}>
                <td><div className="expense-name">{item.title}</div></td>
                <td><span className={`badge badge-${item.category}`}>{item.category}</span></td>
                <td><span className="expense-date">{item.date}</span></td>
                <td><span className="expense-amount">{fmt(item.amount)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
