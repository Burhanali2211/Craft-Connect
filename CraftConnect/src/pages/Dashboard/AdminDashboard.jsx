import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <div className={`dashboard-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      {/* Sidebar */}
      <div className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="dashboard-sidebar-header">
          <h2 style={{ fontFamily: 'var(--font-heading)', margin: 0, color: '#000' }}>Admin</h2>
          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>{user.name}</p>
        </div>
        
        <nav className="dashboard-nav">
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', background: '#e9ecef', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
            Platform Overview
          </button>
        </nav>

        <div className="dashboard-logout">
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', background: 'transparent', color: '#ff6b6b', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', fontWeight: 600 }}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div data-lenis-prevent className="dashboard-main">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button className="hamburger-btn" onClick={() => setIsSidebarOpen(true)}>☰</button>
          <h1 style={{ fontFamily: 'var(--font-heading)', margin: 0, color: '#000' }}>Platform Overview</h1>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#666' }}>Users</h3>
            <p style={{ fontSize: '2rem', margin: 0, fontWeight: 700, color: '#000' }}>Active</p>
          </div>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#666' }}>Products</h3>
            <p style={{ fontSize: '2rem', margin: 0, fontWeight: 700, color: '#000' }}>Monitoring</p>
          </div>
        </div>
      </div>
    </div>
  );
}
