import { motion } from 'framer-motion';

const StorySection = ({ title, content, reverse, id, isQuote, authorImage, authorName }) => {
  return (
    <section id={id} className="section" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          flexDirection: reverse ? 'row-reverse' : 'row',
          alignItems: 'center',
          gap: '6rem',
          flexWrap: 'wrap'
        }}>
          
          <motion.div 
            className={isQuote ? "torn-paper" : ""}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{ flex: 1, minWidth: '350px' }}
          >
            {isQuote && authorImage && (
              <img src={authorImage} alt={authorName} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', float: 'left', marginRight: '1rem', filter: 'sepia(0.2)' }} />
            )}
            {title && <h2 style={{ fontSize: isQuote ? '1.5rem' : '2.5rem', marginBottom: '1.5rem', fontStyle: isQuote ? 'italic' : 'normal' }}>{title}</h2>}
            <p style={{ fontSize: isQuote ? '1.2rem' : '1.1rem', fontStyle: isQuote ? 'italic' : 'normal', color: 'var(--text-main)', lineHeight: '1.8' }}>{content}</p>
            {isQuote && authorName && (
               <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', clear: 'both' }}>
                 <div style={{ height: '1px', width: '30px', background: 'var(--text-main)' }}></div>
                 <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{authorName}</span>
               </div>
            )}
          </motion.div>

          {isQuote && (
             <motion.div style={{ flex: 1, minWidth: '350px', paddingLeft: reverse ? '0' : '4rem', paddingRight: reverse ? '4rem' : '0' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <p style={{ marginBottom: '3rem' }}>
                  <span className="watercolor-splash" style={{ fontSize: '1.2em', color: 'var(--text-main)', fontWeight: 'bold' }}>We</span> are a platform dedicated to empowering traditional artisans, prioritizing authentic connection over mass production. Each piece is crafted slowly, in limited quantities, allowing the process to remain intentional and deeply connected to cultural heritage.
                </p>
                <p>
                  Our purpose is to bring a quieter presence into everyday living. Through thoughtful materials and an unhurried process, we connect you with pieces that invite stillness and soften environments.
                </p>
             </motion.div>
          )}

          {!isQuote && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              style={{ flex: 1, minWidth: '350px' }}
            >
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Process of Making</h3>
              <p style={{ marginBottom: '2rem' }}>Emerging not from rigid lines, but a quiet progression.</p>
              
              <div style={{ display: 'grid', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '80px', height: '60px', background: 'url("https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80") center/cover', mixBlendMode: 'multiply', opacity: 0.8, borderRadius: '8px' }}></div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Beginning with Raw Form</h4>
                    <p style={{ fontSize: '0.9rem' }}>Every piece begins as an unrefined material.</p>
                  </div>
                </div>
                {/* Add more steps as needed */}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};

export default StorySection;
