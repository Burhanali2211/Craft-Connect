import { motion } from 'framer-motion';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const About = () => {
  return (
    <main style={{ paddingTop: '150px', background: 'var(--bg-light)', minHeight: '100vh', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div variants={fadeUpItem} className="overline-text" style={{ color: 'var(--brand-rust)', marginBottom: '1rem' }}>
            Who We Are
          </motion.div>
          <motion.h1 variants={fadeUpItem} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '2rem', color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
            Preserving Culture.<br />
            <span className="rust-gradient-text" style={{ background: 'linear-gradient(135deg, var(--brand-rust-dark) 0%, var(--brand-rust) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Empowering Artisans.</span>
          </motion.h1>
          <motion.p variants={fadeUpItem} style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.8 }}>
            CraftConnect was born from a simple belief: the exquisite heritage of Jammu & Kashmir deserves a global stage, and the artisans who create it deserve fair, direct compensation.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '6rem' }}>
          <motion.div variants={fadeUpItem} style={{ background: '#fff', padding: '3rem', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '60px', height: '60px', background: 'rgba(192, 86, 64, 0.1)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--brand-rust)' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>Our Mission</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              To eliminate exploitative middlemen and provide a direct, transparent marketplace where artisans have full control over their business and pricing.
            </p>
          </motion.div>

          <motion.div variants={fadeUpItem} style={{ background: '#fff', padding: '3rem', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '60px', height: '60px', background: 'rgba(192, 86, 64, 0.1)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--brand-rust)' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>Our Vision</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              A world where traditional craftsmanship is highly valued, and rural artisans thrive economically while passing down their ancient skills to the next generation.
            </p>
          </motion.div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} style={{ background: 'var(--text-main)', color: '#fff', borderRadius: '40px', padding: '4rem', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }}>
          <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '60%', height: '150%', background: 'radial-gradient(circle, var(--brand-rust-dark) 0%, transparent 70%)', opacity: 0.4, zIndex: 0, filter: 'blur(40px)' }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.h2 variants={fadeUpItem} style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Join Our Journey</motion.h2>
            <motion.p variants={fadeUpItem} style={{ color: '#ccc', maxWidth: '500px', margin: '0 auto 2.5rem auto', lineHeight: 1.7, fontSize: '1.1rem' }}>
              Whether you are an artisan looking for a platform, or a connoisseur seeking authentic crafts, there is a place for you here.
            </motion.p>
            <motion.a variants={fadeUpItem} href="/storefronts" className="btn-primary" style={{ backgroundColor: '#fff', color: 'var(--text-main)', border: 'none', padding: '16px 40px', fontSize: '1.05rem', display: 'inline-block' }}>
              Explore the Marketplace
            </motion.a>
          </div>
        </motion.div>

      </div>
    </main>
  );
};

export default About;
