import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password, role || 'CUSTOMER');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '120px 1rem 4rem 1rem' }}>
      
      {/* Parallax Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2 }}>
        <img src="/clay-molding.jpg" alt="Artisan Background" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3) blur(5px)' }} />
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.4) 100%)', zIndex: -1 }}></div>

      <motion.div initial="hidden" animate="visible" variants={fadeUpItem} style={{ 
        width: '100%', 
        maxWidth: '600px', 
        background: 'rgba(255, 255, 255, 0.05)', 
        backdropFilter: 'blur(30px)', 
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.1)', 
        borderRadius: '32px', 
        padding: 'clamp(2rem, 5vw, 4rem)',
        color: '#fff',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.1, textAlign: 'center' }}>
          Create Account
        </h1>
        <p style={{ color: '#ccc', fontSize: '1.05rem', marginBottom: '2.5rem', textAlign: 'center' }}>
          Join CraftConnect and support authentic artisans.
        </p>
        
        {error && <div style={{ background: 'rgba(255, 0, 0, 0.1)', color: '#ff6b6b', padding: '1rem', borderRadius: '16px', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid rgba(255, 0, 0, 0.2)' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <input 
                type="text" 
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '1rem', outline: 'none', width: '100%' }} 
              />

              <input 
                type="email" 
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '1rem', outline: 'none', width: '100%' }} 
              />
              
              <input 
                type="password" 
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '1rem', outline: 'none', width: '100%' }} 
              />

              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '1rem', outline: 'none', width: '100%', appearance: 'none' }}
              >
                <option value="" disabled style={{ color: '#000' }}>I am a...</option>
                <option value="CUSTOMER" style={{ color: '#000' }}>Customer</option>
                <option value="ARTISAN" style={{ color: '#000' }}>Artisan</option>
              </select>
            </div>
          </motion.div>
          
          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              padding: '1.2rem', 
              background: '#fff', 
              color: 'var(--text-main)', 
              border: 'none', 
              borderRadius: '16px', 
              fontSize: '1.1rem', 
              fontWeight: 700, 
              marginTop: '1rem', 
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Create Account
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '2.5rem', color: '#ccc' }}>
          Already have an account? <Link to="/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}
