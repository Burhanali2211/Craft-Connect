import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Storefronts from './pages/Storefronts';
import ArtisanProfile from './pages/ArtisanProfile';
import Onboarding from './pages/Onboarding';
import Education from './pages/Education';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import SmoothScroll from './components/SmoothScroll';

function ScrollToTopEffect() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const { pathname } = useLocation();
  const hideNavbar = ['/checkout', '/login', '/register', '/onboarding'].includes(pathname) || pathname.startsWith('/dashboard');
  const hideFooter = hideNavbar || ['/storefronts'].includes(pathname) || pathname.startsWith('/artisan/');

  return (
    <AuthProvider>
      <SmoothScroll>
        <ScrollToTopEffect />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      {!hideNavbar && <Navbar />}

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/storefronts" element={<Storefronts />} />
          <Route path="/artisan/:id" element={<ArtisanProfile />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/education" element={<Education />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </div>

      {!hideFooter && (
      <footer style={{ padding: '6rem 0 3rem 0', position: 'relative', overflow: 'hidden', background: '#fff', borderTop: '1px solid #eaeaea' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            
            {/* Brand Column */}
            <motion.div variants={fadeUpItem} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', gridColumn: '1 / -1', maxWidth: '400px', marginBottom: '2rem' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 10vw, 2.5rem)', fontWeight: 800, color: 'var(--brand-rust-dark)', letterSpacing: '-1px' }}>
                CraftConnect.
              </div>
              <p style={{ fontSize: '1.05rem', margin: 0, color: 'var(--text-muted)' }}>
                Empowering the artisans of Jammu & Kashmir by connecting their authentic heritage directly with the world.
              </p>
            </motion.div>

            {/* Links Columns */}
            <motion.div variants={fadeUpItem} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div className="overline-text" style={{ color: 'var(--text-main)' }}>Platform</div>
              <a href="/storefronts" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Marketplace</a>
              <a href="/education" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Education Hub</a>
              <a href="/onboarding" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>For Artisans</a>
            </motion.div>

            <motion.div variants={fadeUpItem} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div className="overline-text" style={{ color: 'var(--text-main)' }}>Company</div>
              <a href="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>About Us</a>
              <a href="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Our Story</a>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Contact Support</a>
            </motion.div>

            <motion.div variants={fadeUpItem} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div className="overline-text" style={{ color: 'var(--text-main)' }}>Legal</div>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Terms of Service</a>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Refund Policy</a>
            </motion.div>

          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 1 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid #eaeaea', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            <div>© 2026 CraftConnect. All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Twitter</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Right Blue Splash */}
        <div style={{
          position: 'absolute',
          bottom: '-150px',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, rgba(147, 197, 253, 0) 60%)',
          filter: 'blur(25px)',
          borderRadius: '50%',
          zIndex: 1
        }}></div>
      </footer>
      )}
      </div>
      </SmoothScroll>
    </AuthProvider>
  );
}

export default App;
