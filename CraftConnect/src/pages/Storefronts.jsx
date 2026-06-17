import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const Storefronts = () => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const res = await axios.get('/api/users/artisans');
        setArtisans(res.data);
      } catch (error) {
        console.error('Failed to fetch artisans:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtisans();
  }, []);

  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem' }}>
      <div className="container">
        
        {/* Header Section */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <motion.div variants={fadeUpItem} className="overline-text" style={{ color: 'var(--brand-rust)', marginBottom: '0.5rem' }}>
            Digital Marketplace
          </motion.div>
          <motion.h1 variants={fadeUpItem} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Authentic Crafts, Directly from the Source.
          </motion.h1>
          <motion.p variants={fadeUpItem} style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.5, margin: 0 }}>
            Browse beautifully handcrafted pieces by verified artisans from Jammu & Kashmir. Every purchase guarantees fair compensation and preserves traditional heritage.
          </motion.p>
        </motion.div>

        {/* Filters/Categories (Static for now) */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '2rem', marginBottom: '2rem', scrollbarWidth: 'none' }}>
           {['All', 'Wood Carving', 'Papier-Mâché', 'Pashmina', 'Pottery'].map((cat, i) => (
             <div key={i} style={{ 
               padding: '0.6rem 1.5rem', 
               border: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.1)', 
               background: i === 0 ? 'var(--text-main)' : 'transparent',
               color: i === 0 ? '#fff' : 'var(--text-main)',
               borderRadius: '30px',
               whiteSpace: 'nowrap',
               fontFamily: 'var(--font-sans)',
               fontWeight: 600,
               fontSize: '0.9rem',
               cursor: 'pointer'
             }}>
               {cat}
             </div>
           ))}
        </motion.div>

        {/* Product Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading authentic crafts...</div>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: 'clamp(2rem, 4vw, 4rem)' 
          }}>
            {artisans.map((artisan) => (
              <motion.div key={artisan.id} variants={fadeUpItem} style={{ display: 'flex', flexDirection: 'column' }}>
                <Link to={`/artisan/${artisan.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', marginBottom: '1.5rem', backgroundColor: '#f0f0f0', aspectRatio: '1/1' }}>
                    {(artisan.coverImage || artisan.profileImage) ? (
                      <motion.img 
                        src={artisan.coverImage || artisan.profileImage} 
                        alt={artisan.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ) : (
                      <motion.div 
                        style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #e0e0e0, #f5f5f5)' }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                    {artisan.profileImage && artisan.coverImage && (
                       <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', borderRadius: '50%', overflow: 'hidden', width: '60px', height: '60px', border: '3px solid #fff' }}>
                         <img src={artisan.profileImage} alt={artisan.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                       </div>
                    )}
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, margin: 0, paddingRight: '1rem' }}>{artisan.name}</h3>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Location: <span style={{ fontWeight: 600, color: 'var(--text-main)', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>{artisan.location || 'Jammu & Kashmir'}</span>
                    </div>
                    {artisan.bio && (
                      <p style={{ color: '#444', fontSize: '0.9rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {artisan.bio}
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                       <span style={{ padding: '0.3rem 0.8rem', background: 'rgba(0,0,0,0.04)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{artisan._count?.products || 0} Products</span>
                       <span style={{ padding: '0.3rem 0.8rem', background: 'var(--brand-rust)', color: '#fff', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600 }}>Verified Artisan</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            {artisans.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: '4rem 0' }}>No artisans available right now.</div>
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Storefronts;
