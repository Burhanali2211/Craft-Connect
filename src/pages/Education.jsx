import { articles } from '../data/mockData';
import { motion } from 'framer-motion';

const Education = () => {
  return (
    <div className="container section">
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>Craft <span className="text-gradient">Education</span></h1>
      <p style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
        Learn about the rich history, cultural significance, and intricate processes behind Kashmir's traditional crafts.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {articles.map(article => (
          <motion.div key={article.id} className="glass-panel" whileHover={{ y: -5 }} style={{ padding: '2rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
              {article.category}
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{article.title}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{article.excerpt}</p>
            <button className="button-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem', background: 'transparent', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)' }}>
              Read Article
            </button>
          </motion.div>
        ))}
      </div>
      
      {/* Video Placeholder */}
      <div style={{ marginTop: '5rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Featured Documentary</h2>
        <div className="glass-panel" style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'url("https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80") center/cover', position: 'relative', overflow: 'hidden' }}>
           <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }}></div>
           <div style={{ zIndex: 1, width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)' }}>
             <div style={{ width: 0, height: 0, borderTop: '15px solid transparent', borderBottom: '15px solid transparent', borderLeft: '25px solid white', marginLeft: '10px' }}></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
