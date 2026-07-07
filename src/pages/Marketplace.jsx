import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import pb from '../lib/pb';
import { useCart } from '../context/CartContext';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const CATEGORIES = ['All', 'Furniture', 'Decor', 'Clothing', 'Kitchenware'];

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const { addItem, count } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    pb.collection('products').getFullList({ expand: 'artisan' })
      .then(records => { setProducts(records); setFiltered(records); })
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory));
  }, [activeCategory, products]);

  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem' }}>
      <div className="container">

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <motion.div variants={fadeUpItem} className="overline-text" style={{ color: 'var(--brand-rust)', marginBottom: '0.5rem' }}>
            Digital Marketplace
          </motion.div>
          <motion.h1 variants={fadeUpItem} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Authentic Crafts, Directly from the Source.
          </motion.h1>
          <motion.p variants={fadeUpItem} style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.5, margin: 0 }}>
            Every piece is handcrafted by verified artisans from Jammu &amp; Kashmir. Buy direct — no middlemen.
          </motion.p>
        </motion.div>

        {/* Category filters */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '2rem', marginBottom: '2rem', scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '0.6rem 1.5rem',
              border: activeCategory === cat ? 'none' : '1px solid rgba(0,0,0,0.1)',
              background: activeCategory === cat ? 'var(--text-main)' : 'transparent',
              color: activeCategory === cat ? '#fff' : 'var(--text-main)',
              borderRadius: '30px',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}>
              {cat}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading authentic crafts...</div>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'clamp(2rem, 4vw, 4rem)' }}>
            {filtered.map(product => (
              <motion.div key={product.id} variants={fadeUpItem} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', marginBottom: '1.5rem', backgroundColor: '#f0f0f0', aspectRatio: '1/1' }}>
                  {product.imageUrl ? (
                    <motion.img
                      src={product.imageUrl}
                      alt={product.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ) : (
                    <motion.div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #e0e0e0, #f5f5f5)' }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} />
                  )}
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--brand-rust)', color: '#fff', borderRadius: '20px', padding: '0.3rem 0.8rem', fontSize: '0.8rem', fontWeight: 700 }}>
                    {product.category}
                  </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, margin: 0, paddingRight: '1rem', lineHeight: 1.2 }}>{product.title}</h3>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--brand-rust)', whiteSpace: 'nowrap' }}>₹{product.price.toLocaleString()}</div>
                  </div>

                  {product.expand?.artisan && (
                    <Link to={`/artisan/${product.expand.artisan.id}`} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '0.5rem', fontWeight: 600 }}>
                      By {product.expand.artisan.name} · {product.expand.artisan.location || 'J&K'}
                    </Link>
                  )}

                  <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.5, margin: '0.5rem 0 1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {product.description}
                  </p>

                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        disabled={product.stock === 0}
                        onClick={() => addItem(product)}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', fontWeight: 600, border: '1px solid var(--text-main)', borderRadius: '8px', background: 'transparent', cursor: product.stock === 0 ? 'not-allowed' : 'pointer', opacity: product.stock === 0 ? 0.5 : 1, fontFamily: 'inherit', color: 'var(--text-main)' }}
                      >
                        + Cart
                      </button>
                      <button
                        disabled={product.stock === 0}
                        onClick={() => { addItem(product); navigate('/checkout'); }}
                        className="btn-primary"
                        style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem', opacity: product.stock === 0 ? 0.5 : 1, cursor: product.stock === 0 ? 'not-allowed' : 'pointer' }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: '4rem 0' }}>No products in this category.</div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
