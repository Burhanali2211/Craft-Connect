import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Parent container variant for staggering
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

// Standard fade-up item variant
const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

// Sleek text reveal (used for headings)
const textRevealItem = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

// Dramatic scale up for numbers
const scaleUpItem = {
  hidden: { opacity: 0, scale: 0.6, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
};

const horizontalCards = [
  { subtitle: 'The Struggle', title: 'The Hidden Cost', desc: 'Despite immense cultural value, artisans struggle. Intermediaries take the lion\'s share, leaving creators with a fraction of their true worth.', img: '/clay-molding.jpg' },
  { subtitle: 'The Solution', title: 'Enter CraftConnect', desc: 'We eliminate unnecessary middlemen, enabling artisans to showcase products, set fair prices, and preserve traditions directly.', img: '/hero-wood-carving.jpg' },
  { subtitle: 'Feature 01', title: 'Direct Market', desc: 'A centralized platform to list handmade products, set prices, and receive orders directly with complete business control.', img: '/artisan-pipe.jpg' },
  { subtitle: 'Feature 02', title: 'Verified Profiles', desc: 'Strict verification to guarantee authenticity and build deep trust with global buyers looking for genuine crafts.', img: '/women-painting.png' },
  { subtitle: 'Feature 03', title: 'Storytelling', desc: 'Each listing includes cultural significance, techniques, and history to forge a deep emotional connection.', img: '/vibrant-ceramics.jpg' },
  { subtitle: 'Feature 04', title: 'Secure Payments', desc: 'Integrated regional payment systems ensure safe, transparent transactions and combat counterfeits.', img: '/clay-molding.jpg' },
];

const Home = () => {
  const { scrollYProgress } = useScroll();

  // Ref for the massive Hero section parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);

  // Ref for Horizontal Scroll Section
  const horizontalRef = useRef(null);
  const { scrollYProgress: horizontalProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"]
  });
  // Transform x from 0% to a negative percentage to slide cards left
  const x = useTransform(horizontalProgress, [0, 1], ["0%", "-75%"]);

  // Ref for full-width parallax (Ceramics)
  const parallaxRef = useRef(null);
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  const parallaxY = useTransform(parallaxProgress, [0, 1], ["-20%", "20%"]);

  return (
    <main>
      {/* 1. The Massive Rounded Hero (Wood Carving) */}
      <section ref={heroRef} style={{ padding: '1rem', height: '100vh', width: '100%', position: 'relative' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 'clamp(20px, 4vw, 40px)', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 5vw, 6vw)' }}>
          <motion.img
            style={{ y: heroY }}
            src="/hero-wood-carving.jpg"
            alt="Master Wood Carver"
            style={{ position: 'absolute', top: '-10%', left: 0, width: '100%', height: '120%', objectFit: 'cover', zIndex: -2 }}
          />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.4) 100%)', zIndex: -1 }}></div>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ zIndex: 1, color: '#fff', maxWidth: '800px', width: '100%', marginTop: 'clamp(2rem, 10vh, 6rem)' }}>
            <motion.div variants={fadeUpItem} className="overline-text" style={{ marginBottom: 'clamp(0.5rem, 2vh, 1.5rem)', color: 'var(--brand-rust-light)' }}>
              Empowering Local Artisans
            </motion.div>
            <motion.h1 variants={textRevealItem} style={{ color: '#fff', fontSize: 'clamp(2.5rem, 10vw, 6rem)', marginBottom: 'clamp(1rem, 3vh, 1.5rem)', letterSpacing: '-0.03em', lineHeight: '1.05', textShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
              Bridging Heritage<br />and Commerce.
            </motion.h1>
            <motion.p variants={fadeUpItem} style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)', maxWidth: '550px', color: '#e5e5e5' }}>
              Connecting the master craftsmen of Jammu & Kashmir directly with the world, eliminating middlemen and preserving traditional art.
            </motion.p>
            <motion.div variants={fadeUpItem}>
              <a href="#discover" className="btn-primary" style={{ backgroundColor: '#fff', color: 'var(--text-main)', border: 'none', padding: 'clamp(12px, 3vw, 16px) clamp(24px, 6vw, 32px)', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Discover the Crafts</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. The Heritage */}
      <section className="section" id="discover">
        <div className="container story-section reverse">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} style={{ flex: 1, paddingLeft: '4vw' }}>
            <motion.div variants={fadeUpItem} className="overline-text" style={{ marginBottom: '1.5rem', color: 'var(--brand-rust)' }}>
              Our Roots
            </motion.div>
            <motion.h2 variants={textRevealItem} style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', marginBottom: '1.5rem' }}>
              A Legacy of Craftsmanship
            </motion.h2>
            <motion.p variants={fadeUpItem}>
              Jammu & Kashmir is home to a rich heritage of traditional handicrafts: intricate wood carving, authentic Pashmina shawls, delicate embroidery, vibrant papier-mâché, and masterful carpet weaving. These crafts are not just products; they are the soul of our culture.
            </motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }} whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }} style={{ flex: 1.2, position: 'relative', display: 'flex', alignItems: 'stretch' }}>
            <img src="/Rafugar-Artisan-Craft-1024x576.jpg" alt="Rafugar Artisan Crafting" style={{ width: '100%', minHeight: '400px', height: '100%', objectFit: 'cover', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
          </motion.div>
        </div>
      </section>

      {/* 3. Horizontal Scroll Cards Section (The Struggle & Platform Features) */}
      <section ref={horizontalRef} style={{ height: '350vh', position: 'relative', background: 'var(--text-main)' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

          {/* Background image for the horizontal scroll section */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <img
              src="/clay-molding.jpg"
              alt="Working with Clay"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, filter: 'blur(10px)' }}
            />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.6) 100%)' }}></div>
          </div>

          {/* Content Wrapper */}
          <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            {/* Title Block */}
            <div style={{ paddingLeft: '5vw', color: '#fff', marginBottom: 'clamp(1.5rem, 4vh, 3rem)' }}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                <motion.div variants={fadeUpItem} className="overline-text" style={{ color: 'var(--brand-rust-light)', marginBottom: '1rem' }}>The Platform</motion.div>
                <motion.h2 variants={textRevealItem} style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}>The CraftConnect Journey</motion.h2>
              </motion.div>
            </div>

            {/* Scrolling Container */}
            <motion.div style={{ x, display: 'flex', alignItems: 'stretch', gap: 'clamp(1rem, 3vw, 2.5rem)', paddingLeft: '5vw', paddingRight: '15vw' }}>
              {horizontalCards.map((card, idx) => (
                <div key={idx} style={{
                  width: '85vw',
                  minWidth: '280px',
                  maxWidth: '420px',
                  flexShrink: 0,
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'clamp(20px, 4vw, 40px)',
                  padding: 'clamp(1rem, 3vw, 1.5rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(1rem, 3vw, 1.5rem)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}>
                  <img src={card.img} alt={card.title} style={{ width: '100%', height: 'clamp(160px, 25vh, 260px)', objectFit: 'cover', borderRadius: 'clamp(15px, 3vw, 30px)' }} />
                  <div style={{ padding: '0.5rem 0.5rem 1rem 0.5rem', color: '#fff' }}>
                    <div className="overline-text" style={{ color: 'var(--brand-rust-light)', marginBottom: '0.5rem' }}>{card.subtitle}</div>
                    <h3 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>{card.title}</h3>
                    <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: '#ccc', lineHeight: 1.5 }}>{card.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>

        </div>
      </section>

      {/* 4. The Artisans (Painting Pottery) */}
      <section className="section">
        <div className="container story-section">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} style={{ flex: 1.2 }}>
            <img src="/Kashmir-craftsmen.jpeg" alt="Kashmir Craftsmen" style={{ width: '100%', borderRadius: '30px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }} />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} style={{ flex: 1, paddingLeft: '5vw' }}>
            <motion.div variants={fadeUpItem} className="overline-text" style={{ marginBottom: '1.5rem', color: 'var(--brand-rust)' }}>
              Our Beneficiaries
            </motion.div>
            <motion.h2 variants={textRevealItem} style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', marginBottom: '1.5rem' }}>
              The <span className="rust-gradient-text">Creators</span>
            </motion.h2>
            <motion.p variants={fadeUpItem} style={{ fontSize: '1.25rem' }}>
              Our primary focus is on the local craftsmen: the wood carvers, shawl makers, embroidery artists, carpet weavers, and especially the rural women's self-help groups whose delicate hands keep our history alive and thriving.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 5 & 6. Full Width Parallax (Vibrant Ceramics) - The Collectors & Impact */}
      <section ref={parallaxRef} style={{ position: 'relative', minHeight: '60vh', padding: 'clamp(4rem, 10vh, 8rem) 0', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 1rem', borderRadius: 'clamp(20px, 4vw, 40px)' }}>
        <motion.img
          style={{ y: parallaxY }}
          src="/vibrant-ceramics.jpg"
          alt="Colorful Ceramics"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '140%', objectFit: 'cover', zIndex: -1, filter: 'brightness(0.3)' }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1, color: '#fff', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={staggerContainer}>
            <motion.div variants={fadeUpItem} className="overline-text" style={{ color: 'var(--brand-rust)', marginBottom: 'clamp(1rem, 3vh, 1.5rem)' }}>
              The Impact
            </motion.div>
            <motion.h2 variants={textRevealItem} style={{ color: '#fff', fontSize: 'clamp(3rem, 10vw, 6rem)', marginBottom: 'clamp(1.5rem, 4vh, 3rem)', textShadow: '0 10px 40px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>
              Global Reach,<br />Local Impact
            </motion.h2>

            <motion.div variants={{ hidden: { height: 0, opacity: 0 }, visible: { height: 50, opacity: 1, transition: { duration: 1 } } }} style={{ width: '2px', background: 'var(--brand-rust)', margin: '0 auto clamp(1.5rem, 4vh, 3rem) auto' }}></motion.div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 8vw, 8vw)', flexWrap: 'wrap' }}>
              <motion.div variants={scaleUpItem}>
                <div style={{ fontSize: 'clamp(4rem, 6vw, 6rem)', color: 'var(--brand-rust-light)', fontWeight: 700, lineHeight: 1 }}>+150%</div>
                <div className="overline-text" style={{ color: '#fff', marginTop: '1.5rem' }}>Artisan Revenue</div>
              </motion.div>
              <motion.div variants={scaleUpItem}>
                <div style={{ fontSize: 'clamp(4rem, 6vw, 6rem)', color: 'var(--brand-rust-light)', fontWeight: 700, lineHeight: 1 }}>10k+</div>
                <div className="overline-text" style={{ color: '#fff', marginTop: '1.5rem' }}>Authentic Crafts</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. Future Roadmap */}
      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <motion.div variants={fadeUpItem} className="overline-text" style={{ marginBottom: '1.5rem', color: 'var(--brand-rust)' }}>
              Our Journey
            </motion.div>
            <motion.h2 variants={textRevealItem} style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)' }}>
              The Future Roadmap
            </motion.h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {[
              { phase: 'Phase 1', title: 'Launch', desc: 'Web & mobile app, verification system.' },
              { phase: 'Phase 2', title: 'Expand', desc: 'Secure payments, multilingual support.' },
              { phase: 'Phase 3', title: 'Scale', desc: 'National campaigns, logistics integration.' },
              { phase: 'Phase 4', title: 'Global', desc: 'International expansion, AI recommendations.' }
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} transition={{ delay: i * 0.1 }} style={{ padding: '3rem 2rem', borderTop: '2px solid var(--text-main)' }}>
                <motion.div variants={fadeUpItem} className="overline-text" style={{ color: 'var(--text-main)', marginBottom: '1.5rem' }}>{item.phase}</motion.div>
                <motion.h3 variants={fadeUpItem} style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>{item.title}</motion.h3>
                <motion.p variants={fadeUpItem}>{item.desc}</motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Conclusion CTA */}
      <section className="section" style={{ padding: 'clamp(4rem, 10vh, 8rem) 1rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={staggerContainer}
            style={{ 
              background: 'var(--text-main)', 
              color: '#fff', 
              borderRadius: 'clamp(20px, 4vw, 40px)', 
              padding: 'clamp(4rem, 10vh, 8rem) clamp(2rem, 5vw, 4rem)', 
              textAlign: 'center', 
              position: 'relative', 
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.15)'
            }}
          >
            {/* Subtle background glow elements to make it pop */}
            <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '60%', height: '150%', background: 'radial-gradient(circle, var(--brand-rust-dark) 0%, transparent 70%)', opacity: 0.4, zIndex: 0, filter: 'blur(40px)' }}></div>
            <div style={{ position: 'absolute', bottom: '-50%', right: '-10%', width: '60%', height: '150%', background: 'radial-gradient(circle, var(--brand-rust) 0%, transparent 70%)', opacity: 0.2, zIndex: 0, filter: 'blur(40px)' }}></div>

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
              <motion.div variants={fadeUpItem} className="overline-text" style={{ color: 'var(--brand-rust-light)', marginBottom: '1.5rem' }}>
                Join the Movement
              </motion.div>
              
              <motion.h2 variants={textRevealItem} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                Preserve Heritage.<br />
                <span className="rust-gradient-text" style={{ background: 'linear-gradient(135deg, var(--brand-rust-light) 0%, var(--brand-rust) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Empower Creators.</span>
              </motion.h2>
              
              <motion.p variants={fadeUpItem} style={{ color: '#e5e5e5', maxWidth: '600px', margin: '0 auto 3rem auto', fontSize: '1.15rem', lineHeight: 1.6 }}>
                Help us safeguard the rich cultural heritage of Jammu & Kashmir. Support authentic traditional craftsmanship directly from the source.
              </motion.p>
              
              <motion.div variants={fadeUpItem}>
                <a href="/storefronts" className="btn-primary" style={{ backgroundColor: '#fff', color: 'var(--text-main)', border: 'none', padding: '18px 50px', fontSize: '1.1rem' }}>
                  Support the Artisans
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
