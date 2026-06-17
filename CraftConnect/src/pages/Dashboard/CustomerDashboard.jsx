import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CustomerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
      const res = await axios.get('/api/orders/my-orders', config);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="dashboard-layout">
      <div className={`dashboard-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      {/* Sidebar */}
      <div className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="dashboard-sidebar-header">
          <h2 style={{ fontFamily: 'var(--font-heading)', margin: 0, color: '#000' }}>My Account</h2>
          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>{user.name}</p>
        </div>
        
        <nav className="dashboard-nav">
          <button onClick={() => setActiveTab('orders')} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', background: activeTab === 'orders' ? '#e9ecef' : 'transparent', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: activeTab === 'orders' ? 600 : 400 }}>
            Order History
          </button>
          <button onClick={() => setActiveTab('saved')} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', background: activeTab === 'saved' ? '#e9ecef' : 'transparent', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: activeTab === 'saved' ? 600 : 400 }}>
            Saved Artisans
          </button>
          <button onClick={() => navigate('/storefronts')} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', background: 'transparent', color: 'var(--brand-rust)', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
            Browse Storefronts
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="hamburger-btn" onClick={() => setIsSidebarOpen(true)}>☰</button>
            <h1 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>{activeTab === 'orders' ? 'Order History' : 'Saved Artisans'}</h1>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Loading...</div>
        ) : (
          <>
            {activeTab === 'orders' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {orders.map(o => (
                  <div key={o.id} style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #eaeaea' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                          <span style={{ fontFamily: 'monospace', color: '#666', fontSize: '1.1rem' }}>Order #{o.id.split('-')[0]}</span>
                          <span style={{ padding: '0.3rem 0.8rem', background: o.status === 'SHIPPED' ? '#ebfbee' : '#fff3bf', color: o.status === 'SHIPPED' ? '#2b8a3e' : '#e67700', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>{o.status}</span>
                        </div>
                        <p style={{ color: '#666', margin: 0 }}>Placed on {new Date(o.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ color: '#666', margin: '0 0 0.5rem 0' }}>Total Amount</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#000' }}>₹{o.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                      {o.orderItems.map(item => (
                        <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                          <div style={{ width: '60px', height: '60px', background: '#f8f9fa', border: '1px solid #eaeaea', borderRadius: '8px' }}></div>
                          <div>
                            <p style={{ margin: '0 0 0.2rem 0', fontWeight: 600, color: '#000' }}>{item.product.title}</p>
                            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Qty: {item.quantity} × ₹{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {orders.length === 0 && <div style={{ color: '#666', textAlign: 'center', padding: '3rem 0' }}>You haven't placed any orders yet. <Link to="/storefronts" style={{ color: 'var(--brand-rust)' }}>Browse storefronts</Link></div>}
              </div>
            )}

            {activeTab === 'saved' && (
              <div style={{ color: '#666', textAlign: 'center', padding: '3rem 0' }}>
                You haven't saved any artisans yet.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
