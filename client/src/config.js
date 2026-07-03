const envUrl = import.meta.env.VITE_API_URL;
const BACKEND_URL = envUrl || (import.meta.env.DEV ? 'http://localhost:5000' : '');

if (!BACKEND_URL) {
  throw new Error('VITE_API_URL is required in production. Set it in Vercel environment variables.');
}

export default BACKEND_URL;
