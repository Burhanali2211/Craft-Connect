import PocketBase from 'pocketbase';

// Use '/' to rely on Vercel rewrites (prod) and Vite proxy (dev) 
// This prevents mixed content errors when fetching over HTTPS
const pb = new PocketBase('/');

export default pb;
