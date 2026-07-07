import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import pb from '../lib/pb';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };

const inputStyle = {
  width: '100%', padding: '1.1rem 1.2rem', border: '1px solid #e5e5e5',
  borderRadius: '12px', fontSize: '1rem', background: '#fff',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
};

const prefillFromUser = (u) => {
  if (!u) return { firstName: '', lastName: '', email: '', phone: '', address: '', city: '', postal: '', card: '', expiry: '', cvc: '' };
  const parts = (u.name || '').split(' ');
  return {
    firstName: parts[0] || '',
    lastName: parts.slice(1).join(' ') || '',
    email: u.email || '',
    phone: u.phone || '',
    address: u.address || '',
    city: u.location || '',
    postal: u.postal || '',
    card: '', expiry: '', cvc: '',
  };
};

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(() => prefillFromUser(user));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (user) setForm(f => ({ ...prefillFromUser(user), card: f.card, expiry: f.expiry, cvc: f.cvc }));
  }, [user]);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      await login(loginForm.email, loginForm.password);
    } catch {
      setLoginError('Incorrect email or password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) { setError('Your cart is empty.'); return; }
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postal', 'card', 'expiry', 'cvc'];
    if (required.some(k => !form[k].trim())) { setError('Please fill in all fields.'); return; }

    setLoading(true);
    setError('');
    try {
      let orderId = null;
      const order = await pb.collection('orders').create({
        totalAmount: total,
        status: 'PENDING',
        ...(user ? { customer: user.id } : {}),
      });
      for (const item of items) {
        await pb.collection('orderItems').create({
          order: order.id,
          product: item.id,
          quantity: item.qty,
          price: item.price,
        });
      }
      orderId = order.id;
      clearCart();
      setSuccess({ orderId, name: form.firstName, total });
    } catch (err) {
      setError('Something went wrong placing your order. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ background: '#f8f9fa', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{ textAlign: 'center', maxWidth: '500px', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✅</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Order Placed!</h1>
          <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>
            Thank you, {success.name}. Your order of <strong>₹{success.total.toLocaleString()}</strong> has been confirmed.
          </p>
          {success.orderId && (
            <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '2rem' }}>Order ID: <code>{success.orderId}</code></p>
          )}
          <p style={{ color: '#888', fontSize: '0.95rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            100% of this purchase goes directly to the artisan. You will receive a confirmation shortly.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/marketplace" className="btn-primary" style={{ padding: '0.8rem 2rem' }}>Continue Shopping</Link>
            {user && <Link to="/dashboard" style={{ padding: '0.8rem 2rem', border: '1px solid #ddd', borderRadius: '8px', textDecoration: 'none', color: '#333', fontWeight: 600 }}>View Orders</Link>}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '120px', paddingBottom: '6rem', color: '#1a1a1a' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Secure Checkout</h1>
          <p style={{ color: '#666', fontSize: '1rem' }}>100% of profits go directly to the artisan.</p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '2rem' }}>Your cart is empty.</p>
            <Link to="/marketplace" className="btn-primary">Browse Marketplace</Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>

              {/* Left: Form */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }} style={{ flex: '1 1 420px' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>Shipping Information</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <input style={{ ...inputStyle, flex: '1 1 180px' }} placeholder="First Name" value={form.firstName} onChange={set('firstName')} />
                    <input style={{ ...inputStyle, flex: '1 1 180px' }} placeholder="Last Name" value={form.lastName} onChange={set('lastName')} />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <input style={{ ...inputStyle, flex: '1 1 200px' }} type="email" placeholder="Email Address" value={form.email} onChange={set('email')} />
                    <input style={{ ...inputStyle, flex: '1 1 160px' }} type="tel" placeholder="Phone Number" value={form.phone} onChange={set('phone')} />
                  </div>
                  <input style={inputStyle} placeholder="Street Address" value={form.address} onChange={set('address')} />
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <input style={{ ...inputStyle, flex: '1 1 180px' }} placeholder="City" value={form.city} onChange={set('city')} />
                    <input style={{ ...inputStyle, flex: '1 1 120px' }} placeholder="Postal Code" value={form.postal} onChange={set('postal')} />
                  </div>

                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>Payment Details</h2>
                  <p style={{ fontSize: '0.85rem', color: '#999', margin: '-0.5rem 0 0.5rem' }}>Demo only — no real charge will be made.</p>
                  <input style={inputStyle} placeholder="Card Number (e.g. 4242 4242 4242 4242)" value={form.card} onChange={set('card')} maxLength={19} />
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input style={{ ...inputStyle, flex: 1 }} placeholder="MM/YY" value={form.expiry} onChange={set('expiry')} maxLength={5} />
                    <input style={{ ...inputStyle, flex: 1 }} placeholder="CVC" value={form.cvc} onChange={set('cvc')} maxLength={4} />
                  </div>

                  {error && <p style={{ color: '#e53e3e', fontSize: '0.9rem', margin: 0 }}>{error}</p>}

                  <button type="submit" disabled={loading} style={{ width: '100%', padding: '1.2rem', background: 'var(--text-main)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, marginTop: '0.5rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, fontFamily: 'inherit' }}>
                    {loading ? 'Placing Order…' : `Place Order · ₹${total.toLocaleString()}`}
                  </button>

                  {!user && (
                    <div style={{ background: '#fff8f5', border: '1px solid #fde8de', borderRadius: '12px', padding: '1.2rem', marginTop: '0.5rem' }}>
                      <p style={{ fontWeight: 700, fontSize: '0.95rem', margin: '0 0 0.75rem', color: 'var(--text-main)' }}>Log in to save your order history</p>
                      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <input style={inputStyle} type="email" placeholder="Email" value={loginForm.email} onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))} />
                        <input style={inputStyle} type="password" placeholder="Password" value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} />
                        {loginError && <p style={{ color: '#e53e3e', fontSize: '0.85rem', margin: 0 }}>{loginError}</p>}
                        <button type="submit" disabled={loginLoading} style={{ padding: '0.8rem', background: 'var(--brand-rust)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: loginLoading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: loginLoading ? 0.7 : 1 }}>
                          {loginLoading ? 'Logging in…' : 'Log In'}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Right: Order Summary */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }} style={{ flex: '1 1 280px', background: 'var(--text-main)', color: '#fff', padding: 'clamp(1.5rem, 3vw, 2.5rem)', borderRadius: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>Order Summary</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  {items.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: '#333' }}>
                        {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                        {item.artisanName && <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>by {item.artisanName}</div>}
                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.2rem' }}>Qty: {item.qty} · ₹{(item.price * item.qty).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
                  <span>Subtotal</span><span>₹{total.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
                  <span>Shipping</span><span style={{ color: '#6ee7b7' }}>Free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '1.4rem', fontWeight: 700 }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--brand-rust)' }}>₹{total.toLocaleString()}</span>
                </div>

                <div style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div>✓ 100% Authentic Product Guarantee</div>
                  <div>✓ Direct Support to Artisan Community</div>
                  <div>✓ Secure 256-bit SSL Encryption</div>
                </div>
              </motion.div>

            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;
