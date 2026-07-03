# AI CareerHub — Run & Deployment Guide

## How to Run Locally

### Terminal 1 — Backend
```bash
cd server
node server.js
```
Runs at: **http://localhost:5000**

### Terminal 2 — Frontend
```bash
cd client
npm run dev
```
Runs at: **http://localhost:5173**

---

## Deploy Frontend to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Build & deploy from the `client` folder:
```bash
cd client
npm run build
vercel --prod
```

3. When prompted:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. In Vercel dashboard → Settings → Environment Variables, add:
   - `VITE_API_URL` = `https://your-render-backend-url.onrender.com`

---

## Deploy Backend to Render

1. Push your project to GitHub

2. Go to [render.com](https://render.com) → **New Web Service**

3. Connect your GitHub repo and set:
   - **Root Directory**: `server`
   - **Build Command**: `npm install --legacy-peer-deps`
   - **Start Command**: `node server.js`

4. Add these Environment Variables in Render:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `AI_API_KEY`
   - `CLOUDINARY_URL`
   - `RAPIDAPI_KEY`
   - `NODE_ENV` = `production`

5. Click Deploy!

---

## Get Real Jobs API Key (Free)

To show live jobs from LinkedIn/Indeed/Glassdoor:

1. Go to: https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
2. Sign up free
3. Subscribe to Jsearch (Free tier: 200 requests/month)
4. Copy your key and add to `.env`:
   ```
   RAPIDAPI_KEY=your_key_here
   ```
5. On the Jobs page, click **Live Jobs** toggle to activate

---

## Full System Test Results

| Test | Result |
|---|---|
| Health Check (GET /api/health) | PASS |
| User Registration | PASS |
| User Login + JWT | PASS |
| Protected Route (/api/auth/me) | PASS |
| MongoDB Jobs Seed | PASS |
| Job Search + Filter | PASS |
| AI Resume Builder (Gemini 2.5) | PASS |
| Frontend serving (Vite) | PASS |

**8/8 tests passed!**
