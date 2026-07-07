import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import pb from '../lib/pb';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const Artisans = () => {
  const [artisans, setArtisans] = useState([]);
  const [productCounts, setProductCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [artisanList, products] = await Promise.all([
          pb.collection('users').getFullList({ filter: 'role="ARTISAN"' }),
          pb.collection('products').getFullList({ fields: 'artisan' }),
        ]);
        const counts = {};
        for (const p of products) counts[p.artisan] = (counts[p.artisan] || 0) + 1;
        setArtisans(artisanList);
        setProductCounts(counts);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem' }}>
      <div className="container">

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <motion.div variants={fadeUpItem} className="overline-text" style={{ color: 'var(--brand-rust)', marginBottom: '0.5rem' }}>
            Master Craftspeople
          </motion.div>
          <motion.h1 variants={fadeUpItem} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Meet the Artisans of Kashmir.
          </motion.h1>
          <motion.p variants={fadeUpItem} style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.5, margin: 0 }}>
            Each artisan carries generations of heritage. Browse their storefronts and support authentic craftsmanship directly.
          </motion.p>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading artisans...</div>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'clamp(2rem, 4vw, 4rem)' }}>
            {artisans.map(artisan => (
              <motion.div key={artisan.id} variants={fadeUpItem}>
                <Link to={`/artisan/${artisan.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', marginBottom: '1.5rem', backgroundColor: '#f0f0f0', aspectRatio: '1/1' }}>
                    {artisan.coverImage ? (
                      <motion.img src={artisan.coverImage} alt={artisan.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
                    ) : (
                      <motion.div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e8d5c4 0%, #f5ede4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}>
                        <span style={{ fontSize: '5rem', opacity: 0.3 }}>🎨</span>
                      </motion.div>
                    )}
                    {artisan.profileImage && (
                      <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', borderRadius: '50%', overflow: 'hidden', width: '60px', height: '60px', border: '3px solid #fff' }}>
                        <img src={artisan.profileImage} alt={artisan.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>{artisan.name}</h3>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      {artisan.location || 'Jammu & Kashmir'}
                    </div>
                    {artisan.bio && (
                      <p style={{ color: '#444', fontSize: '0.9rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                        {artisan.bio}
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                      <span style={{ padding: '0.3rem 0.8rem', background: 'rgba(0,0,0,0.04)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {productCounts[artisan.id] || 0} Products
                      </span>
                      <span style={{ padding: '0.3rem 0.8rem', background: 'var(--brand-rust)', color: '#fff', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600 }}>
                        Verified Artisan
                      </span>
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

export default Artisans;
