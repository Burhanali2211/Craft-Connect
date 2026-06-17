import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const isLightPage = ['/about', '/storefronts', '/education'].some(p => location.pathname.startsWith(p));
  const [lang, setLang] = useState('EN');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const useDarkText = scrolled || isLightPage || mobileMenuOpen;

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: scrolled ? '1rem' : '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '95%',
        maxWidth: '1400px',
        padding: '0.8rem 1.5rem',
        background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        border: scrolled ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
        borderRadius: '100px',
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.05)' : 'none',
        color: useDarkText ? 'var(--text-main)' : '#fff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>
            <div style={{ width: '32px', height: '32px', background: 'var(--text-main)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700 }}>C</span>
            </div>
            <span style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: useDarkText ? 'var(--text-main)' : '#fff', fontWeight: 700, transition: 'color 0.4s ease' }}>CraftConnect</span>
          </Link>
          
          {/* Desktop Links */}
          <div className="desktop-only" style={{ display: 'flex', gap: '2.5rem', fontSize: '0.85rem', fontFamily: 'var(--font-sans)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
            {[
              { name: 'Marketplace', path: '/storefronts' },
              { name: 'Artisans', path: '/storefronts' },
              { name: 'About', path: '/about' }
            ].map((item) => (
              <Link key={item.name} to={item.path} style={{ 
                textDecoration: 'none', 
                color: useDarkText ? 'var(--text-main)' : '#fff',
                opacity: 0.8,
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.opacity = '1'; }}
              onMouseOut={(e) => { e.currentTarget.style.opacity = '0.8'; }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button 
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, color: useDarkText ? 'var(--text-main)' : '#fff', opacity: 0.8 }}
            >
              <Globe size={18} /> {lang}
            </button>
            
            {user ? (
              <Link to="/dashboard" className="btn-primary" style={{
                 padding: '10px 24px',
                 fontSize: '0.85rem',
                 backgroundColor: useDarkText ? 'var(--text-main)' : '#fff',
                 color: useDarkText ? '#fff' : 'var(--text-main)',
                 border: 'none'
              }}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" style={{ color: useDarkText ? 'var(--text-main)' : '#fff', fontWeight: 600, textDecoration: 'none' }}>Login</Link>
                <Link to="/register" className="btn-primary" style={{
                   padding: '10px 24px',
                   fontSize: '0.85rem',
                   backgroundColor: useDarkText ? 'var(--text-main)' : '#fff',
                   color: useDarkText ? '#fff' : 'var(--text-main)',
                   border: 'none'
                }}>
                  Join Us
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="mobile-only" style={{ display: 'flex', alignItems: 'center' }}>
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', color: useDarkText ? 'var(--text-main)' : '#fff', cursor: 'pointer', zIndex: 102 }}>
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
             </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: '#f7f7f5',
        zIndex: 99,
        display: mobileMenuOpen ? 'flex' : 'none',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '3rem',
        opacity: mobileMenuOpen ? 1 : 0,
        transition: 'opacity 0.4s ease'
      }}>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', textAlign: 'center', fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
            {[
              { name: 'Marketplace', path: '/storefronts' },
              { name: 'Artisans', path: '/storefronts' },
              { name: 'About', path: '/about' }
            ].map((item) => (
              <Link key={item.name} to={item.path} onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-main)' }}>
                {item.name}
              </Link>
            ))}
         </div>
         
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', marginTop: '2rem' }}>
            <button 
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)' }}
            >
              <Globe size={20} /> {lang}
            </button>
            {user ? (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1.2rem', textDecoration: 'none' }}>Login</Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
                  Join Us
                </Link>
              </>
            )}
         </div>
      </div>
    </>
  );
};

export default Navbar;
