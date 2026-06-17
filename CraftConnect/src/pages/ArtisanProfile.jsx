import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const textRevealItem = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const ArtisanProfile = () => {
  const { id } = useParams();
  const [artisanData, setArtisanData] = useState(null);
  const [artisanProducts, setArtisanProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtisanAndProducts = async () => {
      try {
        const [profileRes, productsRes] = await Promise.all([
          axios.get(`/api/users/${id}/profile`),
          axios.get(`/api/products/artisan/${id}`)
        ]);
        setArtisanData(profileRes.data);
        setArtisanProducts(productsRes.data);
      } catch (error) {
        console.error('Failed to fetch artisan data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtisanAndProducts();
  }, [id]);

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', color: 'var(--text-main)' }}>Loading artisan story...</div>;
  }

  if (!artisanData) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', color: 'var(--text-main)' }}>Artisan not found.</div>;
  }

  const artisan = {
    name: artisanData.name,
    location: artisanData.location || "Jammu & Kashmir",
    image: artisanData.coverImage || "/artisan-pipe.jpg", // Default image if no cover
    profileImage: artisanData.profileImage || null,
    verificationStatus: "Verified Authentic",
    story: artisanData.bio || "This master craftsman has dedicated their life to preserving the ancient traditions of Jammu & Kashmir. Every piece is a testament to their skill, patience, and deep connection to their heritage."
  };

  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. Static Hero Section */}
      <style>
        {`
          .artisan-hero-section {
            position: relative;
            height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          @media (max-width: 768px) {
            .artisan-hero-section {
              height: 55vh;
            }
          }
        `}
      </style>
      <section className="artisan-hero-section">
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
          <img src={artisan.image} alt={artisan.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.9) 100%)' }}></div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
           <motion.h1 variants={textRevealItem} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, lineHeight: 1.1, margin: 0, letterSpacing: '-0.03em', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
             {artisan.name}
           </motion.h1>
        </div>

        {/* Location at bottom right (moves above avatar on mobile) */}
        <style>
          {`
            .hero-location {
              position: absolute;
              bottom: 2rem;
              right: clamp(1rem, 5vw, 3rem);
              z-index: 2;
              display: flex;
              align-items: center;
              gap: 0.4rem;
              color: rgba(255, 255, 255, 0.9);
              font-size: 0.95rem;
              font-weight: 500;
              text-shadow: 0 2px 4px rgba(0,0,0,0.5);
            }
            @media (max-width: 768px) {
              .hero-location {
                bottom: calc(90px + 1.5rem);
                right: 50%;
                transform: translateX(50%);
                width: max-content;
              }
            }
          `}
        </style>
        <div className="hero-location">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>{artisan.location}</span>
        </div>

        {/* Avatar sticking to the bottom center */}
        {artisan.profileImage && (
          <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%, 50%)', zIndex: 3 }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img src={artisan.profileImage} alt={artisan.name} style={{ width: 'clamp(180px, 20vw, 240px)', height: 'clamp(180px, 20vw, 240px)', borderRadius: '50%', objectFit: 'cover', border: '8px solid var(--bg-main)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', backgroundColor: 'var(--bg-main)' }} />
              <div style={{ position: 'absolute', bottom: '8%', right: '8%', width: 'clamp(32px, 5vw, 48px)', height: 'clamp(32px, 5vw, 48px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', borderRadius: '50%', padding: '2px' }}>
                <svg viewBox="0 0 24 24" aria-label="Verified Artisan" role="img" fill="#1d9bf0" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' }}>
                  <g>
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.792-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.74 2.746 1.846 3.45-.046.222-.07.452-.07.687 0 2.21 1.71 4 3.918 4 .47 0 .92-.086 1.336-.25.52 1.334 1.82 2.25 3.337 2.25 1.518 0 2.818-.916 3.337-2.25.415.163.865.248 1.336.248 2.21 0 3.918-1.79 3.918-4 0-.235-.024-.465-.07-.687 1.106-.704 1.846-1.99 1.846-3.45z"></path>
                    <path fill="#ffffff" d="M10.02 16.208l-3.39-3.218 1.38-1.465 2.03 1.93 5.48-5.74 1.35 1.49-6.85 7.003z"></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2. The Story & Product Section */}
      <section className="section" style={{ padding: 'clamp(6rem, 12vh, 10rem) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(3rem, 6vw, 6rem)' }}>
             
              {/* Top Section: The Story */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer} style={{ width: '100%', marginBottom: '4rem' }}>
                 <motion.h2 variants={fadeUpItem} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '2rem' }}>The Legacy.</motion.h2>
                 <motion.p variants={fadeUpItem} style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '800px' }}>
                   {artisan.story}
                 </motion.p>
                 <motion.div variants={fadeUpItem} style={{ display: 'flex', gap: '1rem', maxWidth: '600px' }}>
                    <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.03)', borderRadius: '16px', flex: 1 }}>
                       <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>100%</div>
                       <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Authentic Materials</div>
                    </div>
                    <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.03)', borderRadius: '16px', flex: 1 }}>
                       <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>0</div>
                       <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Middlemen Involved</div>
                    </div>
                 </motion.div>
              </motion.div>

              {/* Bottom Section: Artisan's Portfolio Grid */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer} style={{ width: '100%', marginTop: '2rem' }}>
                 <motion.h2 variants={fadeUpItem} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 700, marginBottom: '3rem' }}>Artisan Portfolio</motion.h2>
                 
                 <div style={{ 
                   display: 'grid', 
                   gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                   gap: 'clamp(2rem, 4vw, 4rem)' 
                 }}>
                   {artisanProducts.map((product) => (
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
                           <motion.div 
                             style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #e0e0e0, #f5f5f5)' }}
                             whileHover={{ scale: 1.05 }}
                             transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                           />
                         )}
                       </div>
                       <div>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                           <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, margin: 0, paddingRight: '1rem' }}>{product.title}</h3>
                           <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--brand-rust)' }}>₹{product.price.toLocaleString()}</div>
                         </div>
                         <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                           By <span style={{ fontWeight: 600, color: 'var(--text-main)', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>{artisan.name}</span>
                         </div>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                           <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                             <span style={{ padding: '0.3rem 0.8rem', background: 'rgba(0,0,0,0.04)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{product.category}</span>
                             <span style={{ padding: '0.3rem 0.8rem', background: 'rgba(0,0,0,0.04)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Stock: {product.stock}</span>
                           </div>
                           <Link to="/checkout" className="btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>Buy</Link>
                         </div>
                       </div>
                     </motion.div>
                   ))}
                   {artisanProducts.length === 0 && (
                     <div style={{ gridColumn: '1 / -1', color: 'var(--text-muted)', padding: '2rem 0' }}>This artisan has no products listed right now.</div>
                   )}
                 </div>
              </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ArtisanProfile;
