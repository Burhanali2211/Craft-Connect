import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ArtisanDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState({ bio: '', location: '', profileImage: '', coverImage: '' });
  const [loading, setLoading] = useState(true);
  
  // Add/Edit product form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '', stock: '1', category: 'Wood Carving', imageUrl: '' });
  const [productImageFile, setProductImageFile] = useState(null);
  
  // Profile form state
  const [profileFiles, setProfileFiles] = useState({ profile: null, cover: null });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
      if (activeTab === 'products') {
        const res = await axios.get('/api/products/my-products', config);
        setProducts(res.data);
      } else if (activeTab === 'orders') {
        const res = await axios.get('/api/orders/incoming', config);
        setOrders(res.data);
      } else if (activeTab === 'profile') {
        const res = await axios.get('/api/auth/me', config); // Contains profile info
        setProfile({
          bio: res.data.bio || '',
          location: res.data.location || '',
          profileImage: res.data.profileImage || '',
          coverImage: res.data.coverImage || ''
        });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
      let imageUrl = editingProductId ? newProduct.imageUrl : '';
      
      if (productImageFile) {
        const formData = new FormData();
        formData.append('image', productImageFile);
        const uploadRes = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data', ...config.headers }
        });
        imageUrl = uploadRes.data.imageUrl;
      }

      if (editingProductId) {
        await axios.put(`/api/products/${editingProductId}`, { ...newProduct, imageUrl }, config);
      } else {
        await axios.post('/api/products', { ...newProduct, imageUrl }, config);
      }
      setShowAddForm(false);
      setEditingProductId(null);
      setNewProduct({ title: '', description: '', price: '', stock: '1', category: 'Wood Carving', imageUrl: '' });
      setProductImageFile(null);
      alert(editingProductId ? 'Listing updated successfully!' : 'New listing published successfully!');
      fetchData();
    } catch (err) {
      alert('Error saving product');
    }
  };

  const startEditProduct = (p) => {
    setEditingProductId(p.id);
    setNewProduct({
      title: p.title,
      description: p.description,
      price: p.price.toString(),
      stock: p.stock.toString(),
      category: p.category || 'Wood Carving',
      imageUrl: p.imageUrl || ''
    });
    setShowAddForm(true);
    setProductImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
      let updatedProfile = { ...profile };

      if (profileFiles.profile) {
        const formData = new FormData();
        formData.append('image', profileFiles.profile);
        const res = await axios.post('/api/upload', formData, config);
        updatedProfile.profileImage = res.data.imageUrl;
      }
      
      if (profileFiles.cover) {
        const formData = new FormData();
        formData.append('image', profileFiles.cover);
        const res = await axios.post('/api/upload', formData, config);
        updatedProfile.coverImage = res.data.imageUrl;
      }

      await axios.put('/api/users/profile', updatedProfile, config);
      setProfileFiles({ profile: null, cover: null });
      alert('Storefront profile updated successfully!');
      fetchData();
    } catch (err) {
      alert('Error updating profile');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
      await axios.delete(`/api/products/${id}`, config);
      fetchData();
    } catch (err) {
      alert('Error deleting product');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus }, config);
      fetchData();
    } catch (err) {
      alert('Error updating order status');
    }
  };

  return (
    <div className="dashboard-layout">
      <div className={`dashboard-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      {/* Sidebar */}
      <div className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="dashboard-sidebar-header">
          <h2 style={{ fontFamily: 'var(--font-heading)', margin: 0, color: '#000' }}>Studio</h2>
          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>{user.name}</p>
        </div>
        
        <nav className="dashboard-nav">
          <button onClick={() => setActiveTab('products')} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', background: activeTab === 'products' ? '#e9ecef' : 'transparent', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: activeTab === 'products' ? 600 : 400 }}>
            My Products
          </button>
          <button onClick={() => setActiveTab('orders')} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', background: activeTab === 'orders' ? '#e9ecef' : 'transparent', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: activeTab === 'orders' ? 600 : 400 }}>
            Orders
          </button>
          <button onClick={() => setActiveTab('profile')} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', background: activeTab === 'profile' ? '#e9ecef' : 'transparent', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: activeTab === 'profile' ? 600 : 400 }}>
            Storefront Settings
          </button>

          <div style={{ margin: '1rem 0', borderTop: '1px solid #eaeaea' }}></div>
          <p style={{ color: '#888', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', padding: '0 1rem', marginBottom: '0.2rem' }}>Quick Links</p>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', padding: '0.8rem 1rem', color: '#555', textDecoration: 'none', borderRadius: '8px', fontWeight: 500 }}>
            Homepage
          </Link>
          <Link to="/storefronts" style={{ display: 'flex', alignItems: 'center', padding: '0.8rem 1rem', color: '#555', textDecoration: 'none', borderRadius: '8px', fontWeight: 500 }}>
            Marketplace
          </Link>
          {user && user.id && (
            <Link to={`/artisan/${user.id}`} target="_blank" style={{ display: 'flex', alignItems: 'center', padding: '0.8rem 1rem', color: '#555', textDecoration: 'none', borderRadius: '8px', fontWeight: 500 }}>
              My Public Profile ↗
            </Link>
          )}
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
            <h1 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>
              {activeTab === 'products' && 'My Products'}
              {activeTab === 'orders' && 'Customer Orders'}
              {activeTab === 'profile' && 'Storefront Settings'}
            </h1>
          </div>
          
          {activeTab === 'products' && !showAddForm && (
            <button onClick={() => {
              setEditingProductId(null);
              setNewProduct({ title: '', description: '', price: '', stock: '1', category: 'Wood Carving', imageUrl: '' });
              setProductImageFile(null);
              setShowAddForm(true);
            }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', background: '#000', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
              + Add Product
            </button>
          )}
        </div>

        {/* Add Product Form */}
        {showAddForm && activeTab === 'products' && (
          <div style={{ 
            background: '#fff', 
            border: '1px solid #eaeaea', 
            padding: '3rem', 
            borderRadius: '24px', 
            marginBottom: '3rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>{editingProductId ? 'Edit Listing' : 'Craft a New Listing'}</h3>
            
            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: '#555', fontSize: '0.9rem', fontWeight: 600 }}>Product Title</label>
                  <input type="text" placeholder="e.g. Hand-carved Walnut Wood Box" required value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} style={{ padding: '1.2rem', background: '#f8f9fa', border: '1px solid #eaeaea', color: '#000', borderRadius: '12px', outline: 'none', transition: 'border 0.3s ease' }} onFocus={e => e.target.style.border = '1px solid #000'} onBlur={e => e.target.style.border = '1px solid #eaeaea'} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: '#555', fontSize: '0.9rem', fontWeight: 600 }}>Craft Category</label>
                  <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} style={{ padding: '1.2rem', background: '#f8f9fa', border: '1px solid #eaeaea', color: '#000', borderRadius: '12px', outline: 'none', appearance: 'none', cursor: 'pointer' }}>
                    <option value="Wood Carving">Wood Carving</option>
                    <option value="Pashmina">Pashmina</option>
                    <option value="Pottery">Pottery</option>
                    <option value="Jewelry">Jewelry</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: '#555', fontSize: '0.9rem', fontWeight: 600 }}>Price (₹)</label>
                  <input type="number" placeholder="0" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} style={{ padding: '1.2rem', background: '#f8f9fa', border: '1px solid #eaeaea', color: '#000', borderRadius: '12px', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ color: '#555', fontSize: '0.9rem', fontWeight: 600 }}>Available Stock</label>
                  <input type="number" placeholder="1" required value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} style={{ padding: '1.2rem', background: '#f8f9fa', border: '1px solid #eaeaea', color: '#000', borderRadius: '12px', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#555', fontSize: '0.9rem', fontWeight: 600 }}>Product Image</label>
                <input type="file" accept="image/*" onChange={e => setProductImageFile(e.target.files[0])} required={!editingProductId && !newProduct.imageUrl} style={{ padding: '1rem', background: '#f8f9fa', border: '1px solid #eaeaea', color: '#000', borderRadius: '12px', outline: 'none' }} />
                {editingProductId && newProduct.imageUrl && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#666' }}>
                    Current Image: <a href={newProduct.imageUrl} target="_blank" rel="noreferrer">View Image</a>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#555', fontSize: '0.9rem', fontWeight: 600 }}>Story & Description</label>
                <textarea placeholder="Tell the story behind this crafted piece..." required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} style={{ padding: '1.2rem', background: '#f8f9fa', border: '1px solid #eaeaea', color: '#000', borderRadius: '12px', outline: 'none', minHeight: '120px', resize: 'vertical' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => {
                  setShowAddForm(false);
                  setEditingProductId(null);
                }} style={{ padding: '1rem 2rem', background: 'transparent', color: '#000', border: '1px solid #eaeaea', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ padding: '1rem 2rem', background: '#000', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}>{editingProductId ? 'Save Changes' : 'Publish Listing'}</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Loading...</div>
        ) : (
          <>
            {activeTab === 'products' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {products.map(p => (
                  <div key={p.id} style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    {p.imageUrl && <img src={p.imageUrl} alt={p.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />}
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#000' }}>{p.title}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                      <span>₹{p.price.toLocaleString()}</span>
                      <span>{p.stock} in stock</span>
                    </div>
                    <p style={{ color: '#444', fontSize: '0.9rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => startEditProduct(p)} style={{ flex: 1, padding: '0.8rem', background: '#e9ecef', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                      <button onClick={() => handleDeleteProduct(p.id)} style={{ flex: 1, padding: '0.8rem', background: '#ffe3e3', color: '#e03131', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
                    </div>
                  </div>
                ))}
                {products.length === 0 && <div style={{ gridColumn: 'span 3', color: '#888', textAlign: 'center', padding: '3rem 0' }}>No products yet. Click 'Add Product' to list your first item!</div>}
              </div>
            )}

            {activeTab === 'orders' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.map(o => (
                  <div key={o.id} style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontFamily: 'monospace', color: '#666' }}>#{o.id.split('-')[0]}</span>
                        <span style={{ padding: '0.3rem 0.8rem', background: o.status === 'SHIPPED' ? '#ebfbee' : '#fff3bf', color: o.status === 'SHIPPED' ? '#2b8a3e' : '#e67700', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>{o.status}</span>
                      </div>
                      <p style={{ margin: '0 0 0.5rem 0', color: '#000' }}><strong>Customer:</strong> {o.customer.name}</p>
                      <p style={{ color: '#444', fontSize: '0.9rem', margin: 0 }}>
                        {o.items.map(i => `${i.quantity}x ${i.product.title}`).join(', ')}
                      </p>
                    </div>
                    
                    {o.status === 'PENDING' && (
                      <button onClick={() => handleUpdateOrderStatus(o.id, 'SHIPPED')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', background: '#000', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                        Mark Shipped
                      </button>
                    )}
                  </div>
                ))}
                {orders.length === 0 && <div style={{ color: '#888', textAlign: 'center', padding: '3rem 0' }}>No incoming orders yet.</div>}
              </div>
            )}

            {activeTab === 'profile' && (
              <div style={{ background: '#fff', border: '1px solid #eaeaea', padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', maxWidth: '800px' }}>
                <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ color: '#555', fontSize: '0.9rem', fontWeight: 600 }}>Profile Avatar</label>
                    <input type="file" accept="image/*" onChange={e => setProfileFiles({...profileFiles, profile: e.target.files[0]})} style={{ padding: '1rem', background: '#f8f9fa', border: '1px solid #eaeaea', borderRadius: '12px' }} />
                    {profile.profileImage && <img src={profile.profileImage} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginTop: '0.5rem' }} />}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ color: '#555', fontSize: '0.9rem', fontWeight: 600 }}>Cover Image</label>
                    <input type="file" accept="image/*" onChange={e => setProfileFiles({...profileFiles, cover: e.target.files[0]})} style={{ padding: '1rem', background: '#f8f9fa', border: '1px solid #eaeaea', borderRadius: '12px' }} />
                    {profile.coverImage && <img src={profile.coverImage} alt="Cover" style={{ width: '100%', height: '120px', borderRadius: '12px', objectFit: 'cover', marginTop: '0.5rem' }} />}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ color: '#555', fontSize: '0.9rem', fontWeight: 600 }}>Location (e.g. Srinagar, Kashmir)</label>
                    <input type="text" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} style={{ padding: '1.2rem', background: '#f8f9fa', border: '1px solid #eaeaea', borderRadius: '12px', outline: 'none' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ color: '#555', fontSize: '0.9rem', fontWeight: 600 }}>Artisan Bio & Story</label>
                    <textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} style={{ padding: '1.2rem', background: '#f8f9fa', border: '1px solid #eaeaea', borderRadius: '12px', minHeight: '150px', resize: 'vertical', outline: 'none' }} />
                  </div>

                  <button type="submit" style={{ padding: '1rem 2rem', background: '#000', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', marginTop: '1rem' }}>
                    Save Storefront Settings
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
