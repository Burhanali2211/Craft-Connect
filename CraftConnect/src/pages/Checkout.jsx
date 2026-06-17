import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const Checkout = () => {
  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '120px', paddingBottom: '6rem', color: '#1a1a1a' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <motion.div initial="hidden" animate="visible" variants={fadeUpItem} style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1rem' }}>Secure Checkout</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Complete your purchase. 100% of profits go to the artisan.</p>
        </motion.div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>
          
          {/* Left Column: Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }} style={{ flex: '1 1 500px', padding: '1rem 0' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '2rem' }}>Shipping Information</h2>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <input type="text" placeholder="First Name" style={{ flex: '1 1 200px', padding: '1.2rem', border: '1px solid #e5e5e5', borderRadius: '12px', fontSize: '1rem', background: '#fff' }} />
                <input type="text" placeholder="Last Name" style={{ flex: '1 1 200px', padding: '1.2rem', border: '1px solid #e5e5e5', borderRadius: '12px', fontSize: '1rem', background: '#fff' }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <input type="email" placeholder="Email Address" style={{ flex: '1 1 200px', padding: '1.2rem', border: '1px solid #e5e5e5', borderRadius: '12px', fontSize: '1rem', background: '#fff' }} />
                <input type="tel" placeholder="Phone Number" style={{ flex: '1 1 200px', padding: '1.2rem', border: '1px solid #e5e5e5', borderRadius: '12px', fontSize: '1rem', background: '#fff' }} />
              </div>
              <input type="text" placeholder="Street Address" style={{ width: '100%', padding: '1.2rem', border: '1px solid #e5e5e5', borderRadius: '12px', fontSize: '1rem', background: '#fff' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <input type="text" placeholder="City" style={{ flex: '1 1 200px', padding: '1.2rem', border: '1px solid #e5e5e5', borderRadius: '12px', fontSize: '1rem', background: '#fff' }} />
                <input type="text" placeholder="Postal Code" style={{ flex: '1 1 150px', padding: '1.2rem', border: '1px solid #e5e5e5', borderRadius: '12px', fontSize: '1rem', background: '#fff' }} />
              </div>

              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginTop: '1rem', marginBottom: '1rem' }}>Payment Details</h2>
              <input type="text" placeholder="Card Number" style={{ width: '100%', padding: '1.2rem', border: '1px solid #e5e5e5', borderRadius: '12px', fontSize: '1rem', background: '#fff' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <input type="text" placeholder="MM/YY" style={{ flex: '1 1 120px', padding: '1.2rem', border: '1px solid #e5e5e5', borderRadius: '12px', fontSize: '1rem', background: '#fff' }} />
                <input type="text" placeholder="CVC" style={{ flex: '1 1 120px', padding: '1.2rem', border: '1px solid #e5e5e5', borderRadius: '12px', fontSize: '1rem', background: '#fff' }} />
              </div>

              <button type="button" style={{ width: '100%', padding: '1.2rem', background: 'var(--text-main)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600, marginTop: '1rem', cursor: 'pointer' }}>
                Pay ₹350.00
              </button>
            </form>
          </motion.div>

          {/* Right Column: Order Summary */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }} style={{ flex: '1 1 300px', background: 'var(--text-main)', color: '#fff', padding: 'clamp(2rem, 4vw, 3rem)', borderRadius: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '2rem' }}>Order Summary</h2>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
               <img src="/shawl.png" alt="Pashmina" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px' }} />
               <div>
                 <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.2rem' }}>Authentic Hand-Spun Pashmina Shawl</div>
                 <div style={{ color: 'var(--brand-rust-light)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Zoya Weavers Co-op</div>
                 <div style={{ fontWeight: 700 }}>₹350.00</div>
               </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#ccc' }}>
              <span>Subtotal</span>
              <span>₹350.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#ccc' }}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '1.5rem', fontWeight: 700 }}>
              <span>Total</span>
              <span style={{ color: 'var(--brand-rust)' }}>₹350.00</span>
            </div>

            <div style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#888', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--brand-rust)' }}>✓</span> 100% Authentic Product Guarantee
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--brand-rust)' }}>✓</span> Direct Support to Artisan Community
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--brand-rust)' }}>✓</span> Secure 256-bit SSL Encryption
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
