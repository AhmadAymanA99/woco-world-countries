# World Countries (WoCo) - MERN SaaS Application

A comprehensive web application for exploring countries, tracking travels, and building memories. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and designed to be mobile-responsive.

## Features

### 🌍 Country Exploration
- **Complete Country Database**: Detailed information about countries worldwide
- **Advanced Filtering**: Sort by continent, population, GDP, or alphabetical order
- **Search Functionality**: Find countries by name, capital, or country code
- **Rich Country Details**: 
  - National flags and anthems
  - Geographic location and coordinates
  - Population statistics
  - GDP and economic data
  - Religious demographics
  - Cultural traditions
  - Tourist attractions with photos

### 🗺️ My World Feature
- **Travel Tracking**: Mark countries as visited with visit dates and duration
- **Photo Management**: Upload up to 10 photos per country with captions
- **Travel Memories**: Add notes, cities visited, and activities
- **Rating System**: Rate your travel experiences (1-5 stars)
- **Wishlist**: Save countries you want to visit
- **Travel Statistics**: View your travel stats and achievements

### 📱 Mobile-Responsive Design
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Touch-Friendly**: Easy navigation on mobile devices
- **Progressive Web App**: Fast loading and offline capabilities

### 🔐 User Authentication
- **Secure Registration**: User account creation with validation
- **Login System**: JWT-based authentication
- **Profile Management**: Update personal information and travel preferences
- **Protected Routes**: Secure access to user-specific features

## Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication tokens
- **Cloudinary**: Image storage and management
- **Multer**: File upload handling
- **bcryptjs**: Password hashing
- **Express Validator**: Input validation
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **React Query**: Data fetching and caching
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **React Hot Toast**: Notifications
- **Framer Motion**: Animations
- **React Image Gallery**: Photo galleries
- **Axios**: HTTP client

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image storage)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd woco
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

### 4. Environment Configuration
Create a `config.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/woco-countries
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 5. Database Setup
Make sure MongoDB is running, then seed the database with sample data:
```bash
node seed.js
```

### 6. Start the Application

#### Development Mode (with hot reload)
```bash
npm run dev
```

#### Production Mode
```bash
# Build the frontend
npm run build

# Start the server
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Countries
- `GET /api/countries` - Get all countries with filtering
- `GET /api/countries/:id` - Get country by ID
- `GET /api/countries/continent/:continent` - Get countries by continent
- `GET /api/countries/meta/continents` - Get continents list
- `GET /api/countries/search/:query` - Search countries

### User Features
- `GET /api/users/visited-countries` - Get user's visited countries
- `POST /api/users/visited-countries` - Add visited country
- `PUT /api/users/visited-countries/:countryId` - Update visit record
- `DELETE /api/users/visited-countries/:countryId` - Remove visited country
- `POST /api/users/visited-countries/:countryId/photos` - Upload photo
- `DELETE /api/users/visited-countries/:countryId/photos/:photoIndex` - Delete photo
- `GET /api/users/wishlist` - Get user's wishlist
- `POST /api/users/wishlist/:countryId` - Add to wishlist
- `DELETE /api/users/wishlist/:countryId` - Remove from wishlist

## Project Structure

```
woco/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── index.js       # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── models/                # MongoDB models
│   ├── Country.js
│   └── User.js
├── routes/                # API routes
│   ├── auth.js
│   ├── countries.js
│   └── users.js
├── middleware/            # Custom middleware
│   └── auth.js
├── server.js              # Express server
├── seed.js                # Database seeder
├── package.json
└── config.env             # Environment variables
```

## Features in Detail

### Country Information
Each country includes comprehensive data:
- **Basic Info**: Name, code, continent, capital, currency
- **Geography**: Coordinates, area, borders, coastline, climate
- **Demographics**: Population, density, growth rate, urbanization
- **Economy**: GDP, per capita income, growth rate, economic sectors
- **Culture**: Religions, traditions, languages, national day
- **Tourism**: Tourist attractions with photos and ratings

### My World Dashboard
Personal travel management system:
- **Visit Tracking**: Record when and how long you visited
- **Photo Albums**: Upload and organize travel photos
- **Travel Notes**: Document experiences and memories
- **Rating System**: Rate your travel experiences
- **Statistics**: View travel achievements and stats

### Mobile Optimization
- **Responsive Design**: Adapts to all screen sizes
- **Touch Navigation**: Optimized for mobile interaction
- **Fast Loading**: Optimized images and lazy loading
- **Offline Support**: Basic offline functionality

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@woco.com or create an issue in the repository.

---

**WoCo** - Explore the World, Track Your Journey 🌍✈️
