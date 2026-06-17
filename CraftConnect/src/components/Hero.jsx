import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative', 
      paddingTop: '5rem',
      overflow: 'hidden'
    }}>
      {/* Background Image with Overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1920")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -2
      }}></div>
      
      {/* Deep Rust Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(to right, rgba(142,62,45,0.9) 0%, rgba(142,62,45,0.4) 100%)',
        zIndex: -1
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ maxWidth: '750px' }}
        >
          <div className="script-text" style={{ marginBottom: '1rem', color: 'var(--brand-accent)' }}>
            Dil se banao
          </div>
          
          <h1 style={{ 
            fontSize: '5.5rem', 
            fontWeight: 900, 
            lineHeight: 1.1, 
            letterSpacing: '-1px', 
            marginBottom: '1.5rem',
            color: '#FFFFFF'
          }}>
            Crafted from the Heart
          </h1>
          
          <p style={{ fontSize: '1.2rem', color: '#E0E0E0', marginBottom: '3rem', maxWidth: '600px', lineHeight: 1.6 }}>
            We lay the perfect foundation for your home, connecting you with artisans who build with strength, love, and unwavering excellence.
          </p>
          
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#explore" className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
              Know Further
            </a>
            <a href="#video" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#fff', textDecoration: 'none', fontWeight: 500, transition: 'opacity 0.3s' }} onMouseOver={(e) => e.currentTarget.style.opacity = 0.7} onMouseOut={(e) => e.currentTarget.style.opacity = 1}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '10px solid #fff', marginLeft: '4px' }}></div>
              </div>
              Watch Video
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
