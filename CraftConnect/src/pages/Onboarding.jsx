import { motion } from 'framer-motion';
import { useState } from 'react';

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState('English');

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '120px 1rem 4rem 1rem' }}>
      
      {/* Parallax Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2 }}>
        <img src="/clay-molding.jpg" alt="Artisan Background" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3) blur(5px)' }} />
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.4) 100%)', zIndex: -1 }}></div>

      <motion.div initial="hidden" animate="visible" variants={fadeUpItem} style={{ 
        width: '100%', 
        maxWidth: '600px', 
        background: 'rgba(255, 255, 255, 0.05)', 
        backdropFilter: 'blur(30px)', 
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.1)', 
        borderRadius: '32px', 
        padding: 'clamp(2rem, 5vw, 4rem)',
        color: '#fff',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
      }}>
        
        {/* Language Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
           <div className="overline-text" style={{ color: 'var(--brand-rust-light)', margin: 0 }}>Step {step} of 3</div>
           <select 
             value={language} 
             onChange={(e) => setLanguage(e.target.value)}
             style={{ background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', outline: 'none' }}
           >
             <option value="English">English</option>
             <option value="Urdu">اردو (Urdu)</option>
             <option value="Kashmiri">کأشُر (Kashmiri)</option>
           </select>
        </div>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.1 }}>
          {language === 'English' ? 'Join CraftConnect' : 'CraftConnect میں شامل ہوں'}
        </h1>
        <p style={{ color: '#ccc', fontSize: '1.05rem', marginBottom: '2.5rem' }}>
          {language === 'English' ? 'Start selling your authentic handmade products directly to the world. Zero middlemen, 100% fair trade.' : 'اپنی مستند ہاتھ سے بنی مصنوعات براہ راست دنیا کو فروخت کرنا شروع کریں۔ کوئی درمیانی آدمی نہیں، 100% منصفانہ تجارت۔'}
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <input type="text" placeholder={language === 'English' ? "Full Name / Artisan Group Name" : "پورا نام / آرٹیزن گروپ کا نام"} style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '1rem', outline: 'none' }} />
                <input type="tel" placeholder={language === 'English' ? "Phone Number (for SMS verification)" : "فون نمبر (SMS تصدیق کے لیے)"} style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '1rem', outline: 'none' }} />
                <select style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '1rem', outline: 'none' }}>
                  <option value="" disabled selected>{language === 'English' ? "Select your Craft..." : "اپنے کرافٹ کا انتخاب کریں..."}</option>
                  <option value="wood" style={{ color: '#000' }}>Wood Carving</option>
                  <option value="pashmina" style={{ color: '#000' }}>Pashmina Weaving</option>
                  <option value="embroidery" style={{ color: '#000' }}>Kashmiri Embroidery</option>
                  <option value="papier-mache" style={{ color: '#000' }}>Papier-Mâché</option>
                  <option value="carpet" style={{ color: '#000' }}>Carpet Weaving</option>
                </select>
              </div>
            </motion.div>
          )}

          <button 
            type="button" 
            onClick={() => setStep(step < 3 ? step + 1 : 1)}
            style={{ 
              width: '100%', 
              padding: '1.2rem', 
              background: '#fff', 
              color: 'var(--text-main)', 
              border: 'none', 
              borderRadius: '16px', 
              fontSize: '1.1rem', 
              fontWeight: 700, 
              marginTop: '1rem', 
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {step === 3 ? (language === 'English' ? 'Submit Application' : 'درخواست جمع کرائیں') : (language === 'English' ? 'Continue' : 'جاری رہے')}
          </button>
        </form>

      </motion.div>
    </div>
  );
};

export default Onboarding;
