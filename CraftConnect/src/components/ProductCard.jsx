import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass-panel"
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div style={{ height: '250px', background: `url(${product.image}) center/cover` }}></div>
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{product.name}</h3>
        <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{product.description}</p>
        
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Transparent Pricing</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
            <span>Artisan's Share:</span>
            <span style={{ color: '#22c55e', fontWeight: 'bold' }}>₹{product.pricingBreakdown.artisan}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
            <span>Materials:</span>
            <span>₹{product.pricingBreakdown.materials}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderTop: '1px solid var(--glass-border)', paddingTop: '0.25rem', marginTop: '0.25rem' }}>
            <span>Platform Support:</span>
            <span>₹{product.pricingBreakdown.platformFee}</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>
            ₹{product.price}
          </div>
          <Link to="/checkout" className="button-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
            Buy Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
