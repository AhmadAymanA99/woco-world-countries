# WoCo - World Countries App

A full-stack web application for exploring countries, tracking travels, and managing your world journey.

## Features

- 🌍 Explore 195+ countries with detailed information
- 📍 Track visited countries with photos and memories
- ❤️ Build wishlist of countries to visit
- 📊 View travel statistics and analytics
- 🔐 User authentication and profiles
- 📱 Responsive design for all devices

## Tech Stack

### Frontend
- React 18
- React Router
- React Query
- Tailwind CSS
- Lucide React Icons
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary (for image uploads)

## Deployment Guide

### Frontend (Vercel)

1. **Connect to GitHub:**
   - Push your code to GitHub
   - Connect your repository to Vercel

2. **Environment Variables:**
   Set these in Vercel dashboard:
   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app/api
   ```

3. **Build Settings:**
   - Framework Preset: Create React App
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/build`

### Backend Deployment Options

**Option 1: Vercel (Serverless Functions)**
- Convert Express routes to Vercel serverless functions
- Requires restructuring the backend

**Option 2: Railway**
- Easy deployment for Node.js apps
- Supports MongoDB connections
- Simple environment variable management

**Option 3: Render**
- Free tier available
- Supports Node.js and MongoDB
- Easy deployment from GitHub

**Option 4: Heroku**
- Popular platform for Node.js apps
- Requires paid plan for production

## Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   cd client && npm install
   ```

2. **Environment Setup:**
   - Copy `.env.example` to `.env`
   - Fill in your MongoDB and Cloudinary credentials

3. **Run Development Servers:**
   ```bash
   # Backend (Terminal 1)
   npm run dev
   
   # Frontend (Terminal 2)
   cd client && npm start
   ```

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/woco
JWT_SECRET=your-super-secret-jwt-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

## Database Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables
5. Run seed script: `node seed.js`

## Image Upload Setup

1. Create Cloudinary account
2. Get API credentials
3. Update environment variables
4. Images will be automatically uploaded to Cloudinary

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
