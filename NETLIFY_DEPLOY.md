# Portfolio Website - Netlify Deployment

This Next.js portfolio website is configured for deployment on Netlify.

## 🚀 Deploy to Netlify

### Option 1: Git-based Deployment (Recommended)

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)
2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your Git provider
   - Select your repository
3. **Build settings are automatically configured:**
   - Build command: `npm run build`
   - Publish directory: `out`
   - These settings are defined in `netlify.toml`

### Option 2: Manual Deploy

1. **Build the site locally:**
   ```bash
   npm install
   npm run build
   ```
2. **Deploy the `out` folder:**
   - Go to [Netlify](https://app.netlify.com)
   - Drag and drop the `out` folder to the deploy area

## 📁 Key Files for Netlify

- `netlify.toml` - Netlify configuration
- `public/_redirects` - SPA routing redirects
- `public/_headers` - Security and caching headers
- `next.config.js` - Next.js static export configuration

## 🔧 Build Configuration

The site is configured for static export with:
- **Output:** Static HTML/CSS/JS files
- **Image optimization:** Disabled (required for static export)
- **Routing:** Client-side routing with fallback

## 🌍 Environment Variables

If you need environment variables:
1. Go to Site settings → Environment variables in Netlify
2. Add your variables there

## 📱 Features Optimized for Static Deployment

- ✅ Static site generation
- ✅ Client-side routing
- ✅ Optimized caching headers
- ✅ Security headers
- ✅ Mobile-responsive design
- ✅ Fast loading with image optimization alternatives

## 🎯 Performance Features

- Asset caching (1 year for static assets)
- Image caching (1 week)
- Gzip compression
- Security headers
- CDN distribution via Netlify

## 🛠️ Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Dependencies

All dependencies are included in `package.json` and will be automatically installed during the Netlify build process.