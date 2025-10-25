# Railway Backend Deployment Guide

## Step-by-Step Railway Deployment

### 1. Create Railway Account
- Go to [railway.app](https://railway.app)
- Sign up with GitHub (recommended)
- Connect your GitHub account

### 2. Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your `woco-world-countries` repository

### 3. Configure Deployment
Railway will automatically detect your Node.js app, but you can customize:

**Build Settings:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Root Directory**: `/` (root of your repo)

### 4. Set Environment Variables
In Railway dashboard, go to Variables tab and add:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/woco
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### 5. Database Setup
**Option A: MongoDB Atlas (Recommended)**
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster
3. Get connection string
4. Add to Railway environment variables

**Option B: Railway MongoDB Plugin**
1. In Railway dashboard, click "New"
2. Select "Database" → "MongoDB"
3. Railway will provide connection string automatically

### 6. Deploy
- Railway will automatically deploy when you push to GitHub
- Check the "Deployments" tab for build logs
- Your API will be available at: `https://your-app-name.railway.app`

### 7. Update Frontend
Once deployed, update your frontend environment variable:
```
REACT_APP_API_URL=https://your-app-name.railway.app/api
```

## Railway Features

### Automatic Deployments
- Deploys automatically on every GitHub push
- Zero-downtime deployments
- Automatic HTTPS

### Environment Management
- Easy environment variable management
- Different environments (staging/production)
- Secure secret storage

### Monitoring
- Built-in logs and metrics
- Performance monitoring
- Error tracking

### Scaling
- Automatic scaling based on traffic
- Pay-as-you-go pricing
- Free tier available

## Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check build logs in Railway dashboard
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **Database Connection Issues**
   - Check MongoDB URI format
   - Ensure IP whitelist includes Railway IPs
   - Verify credentials are correct

3. **Environment Variables Not Working**
   - Variables are case-sensitive
   - Restart deployment after adding variables
   - Check for typos in variable names

4. **CORS Issues**
   - Set FRONTEND_URL environment variable
   - Update CORS configuration in server.js

## Cost
- **Free Tier**: $5 credit monthly
- **Pro Plan**: $5/month + usage
- **Team Plan**: $20/month + usage

## Next Steps After Deployment
1. Test your API endpoints
2. Update frontend environment variables
3. Deploy frontend to Vercel
4. Test full application integration
