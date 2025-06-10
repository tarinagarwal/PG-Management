# PG Management System

## Overview

The **PG Management System** is a comprehensive web application designed to streamline the process of finding, listing, and managing Paying Guest (PG) accommodations. It serves as a digital marketplace connecting PG seekers with property owners, making the accommodation search process efficient.

## What It Does

### 🏠 For PG Seekers (Finders)
- **Search & Discover**: Browse through a curated list of PG accommodations with advanced search and filtering options
- **Detailed Property Views**: Access comprehensive property information including photos, amenities, rules, and pricing
- **Direct Communication**: Contact property owners directly through the platform
- **Booking Management**: Submit booking requests and track their status in real-time
- **Personal Dashboard**: Manage profile, view booking history, and track application status

### 🏢 For Property Owners
- **Property Listing**: Create detailed property listings with photos, descriptions, and amenities
- **Booking Management**: Review and respond to booking requests from potential tenants
- **Property Portfolio**: Manage multiple properties from a centralized dashboard
- **Tenant Communication**: Communicate with prospective tenants through booking messages
- **Analytics**: Track property performance and booking statistics

### 👨‍💼 For Administrators
- **Platform Oversight**: Monitor all users, properties, and bookings across the platform
- **User Management**: Manage user accounts and resolve disputes
- **Content Moderation**: Ensure quality and authenticity of property listings
- **System Analytics**: Access comprehensive platform usage and performance metrics

## Key Features

### 🔍 Smart Search System
- Location-based property search
- Filter by price range, property type, gender preference, and amenities
- Real-time search results with instant filtering

### 📱 Responsive Design
- Mobile-first approach ensuring seamless experience across all devices
- Touch-friendly interface optimized for smartphones and tablets
- Progressive web app capabilities for app-like experience

### 🔐 Secure Authentication
- Role-based access control (Finder, Owner, Admin)
- JWT-based authentication for secure sessions
- Password encryption and secure data handling

### 💬 Communication Hub
- Direct messaging between seekers and owners
- Booking request system with status tracking
- Notification system for important updates

### 📊 Dashboard Analytics
- Personalized dashboards for each user type
- Real-time statistics and performance metrics
- Booking trends and property insights

## Technology Highlights

- **Frontend**: React 18 with TypeScript for type-safe, modern UI development
- **Backend**: Node.js with Express.js for robust API development
- **Database**: MongoDB for flexible, scalable data storage
- **Styling**: Tailwind CSS for rapid, responsive design development
- **Authentication**: JWT tokens with bcrypt password hashing
- **Development**: Vite for fast development and optimized builds

## Problem It Solves

### Traditional PG Search Challenges:
- ❌ Limited visibility of available properties
- ❌ Lack of standardized information
- ❌ Difficulty in comparing options
- ❌ Inefficient communication channels
- ❌ No centralized booking management

### Our Solution:
- ✅ Comprehensive property database with standardized listings
- ✅ Advanced search and filtering capabilities
- ✅ Direct communication between seekers and owners
- ✅ Transparent booking process with status tracking
- ✅ Centralized platform for all PG-related activities

## Target Audience

### Primary Users:
- **Students**: Looking for affordable, convenient accommodation near educational institutions
- **Working Professionals**: Seeking comfortable PG options close to their workplace
- **Property Owners**: Wanting to list and manage their PG properties efficiently

### Secondary Users:
- **Real Estate Agents**: Managing multiple properties for clients
- **Educational Institutions**: Helping students find suitable accommodation
- **Corporate HR Teams**: Assisting relocated employees in finding housing

## Business Impact

- **Efficiency**: Reduces time spent searching for suitable PG accommodations
- **Transparency**: Provides clear, standardized property information
- **Accessibility**: Makes PG search accessible to users across different devices and locations
- **Scalability**: Supports growth from local to national PG marketplace
- **Revenue Generation**: Commission-based model for successful bookings

## Future Enhancements

- **Payment Integration**: Online rent payment and security deposit handling
- **Review System**: User reviews and ratings for properties and owners
- **Virtual Tours**: 360-degree property viewing capabilities
- **AI Recommendations**: Machine learning-based property suggestions
- **Mobile App**: Native mobile applications for iOS and Android

---

*The PG Management System transforms the traditional, often chaotic process of finding PG accommodation into a streamlined, digital experience that benefits both seekers and property owners.*



## 🛠️ Technology Stack

### Frontend

- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with enhanced IDE support
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Router DOM**: Client-side routing for single-page application
- **Axios**: HTTP client for API communication
- **Lucide React**: Beautiful, customizable icons
- **Vite**: Fast build tool and development server

### Backend

- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Web application framework for Node.js
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: MongoDB object modeling for Node.js
- **JWT**: JSON Web Tokens for secure authentication
- **bcryptjs**: Password hashing for security
- **CORS**: Cross-Origin Resource Sharing middleware
- **Morgan**: HTTP request logger middleware

### Development Tools

- **ESLint**: Code linting for consistent code quality
- **TypeScript ESLint**: TypeScript-specific linting rules
- **Nodemon**: Auto-restart development server
- **PostCSS**: CSS post-processing
- **Autoprefixer**: Automatic vendor prefixing

## 📁 Project Structure

```
pg-management-system/
├── client/                     # Frontend React application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── PropertyCard.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── context/           # React context providers
│   │   │   └── AuthContext.tsx
│   │   ├── layouts/           # Layout components
│   │   │   ├── DashboardLayout.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── pages/             # Page components
│   │   │   ├── AddProperty.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── EditProperty.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── MyBookings.tsx
│   │   │   ├── MyProperties.tsx
│   │   │   ├── NotFound.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Properties.tsx
│   │   │   ├── PropertyDetails.tsx
│   │   │   └── Register.tsx
│   │   ├── App.tsx            # Main application component
│   │   ├── main.tsx           # Application entry point
│   │   └── index.css          # Global styles
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/                     # Backend Node.js application
│   ├── controllers/           # Request handlers
│   │   ├── auth.js
│   │   ├── bookings.js
│   │   ├── properties.js
│   │   └── users.js
│   ├── middleware/            # Custom middleware
│   │   └── auth.js
│   ├── models/                # Database models
│   │   ├── Booking.js
│   │   ├── Property.js
│   │   └── User.js
│   ├── routes/                # API routes
│   │   ├── auth.js
│   │   ├── bookings.js
│   │   ├── properties.js
│   │   └── users.js
│   ├── .env                   # Environment variables
│   ├── index.js               # Server entry point
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/tarinagarwal/pg-management-system.git
   cd pg-management-system
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**

   Create a `.env` file in the server directory:

   ```env
   MONGO_URI=mongodb://localhost:27017/pg-management
   # Or use MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pg-management

   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   ```

5. **Start the development servers**

   **Backend server** (from server directory):

   ```bash
   npm start
   ```

   **Frontend development server** (from client directory):

   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📊 Database Schema

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: 'finder', 'owner', 'admin'),
  phone: String,
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Property Model

```javascript
{
  title: String (required),
  description: String (required),
  address: {
    street: String (required),
    city: String (required),
    state: String (required),
    zipCode: String (required),
    country: String (default: 'India')
  },
  price: Number (required),
  propertyType: String (enum: 'PG', 'Hostel', 'Apartment', 'Room', 'House'),
  roomType: String (enum: 'Single', 'Double', 'Triple', '1BHK', '2BHK', '3BHK', 'Other'),
  gender: String (enum: 'Male', 'Female', 'Unisex'),
  photos: [String],
  amenities: [String],
  rules: [String],
  features: [String],
  available: Boolean (default: true),
  owner: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Model

```javascript
{
  user: ObjectId (ref: 'User'),
  property: ObjectId (ref: 'Property'),
  checkInDate: Date (required),
  status: String (enum: 'pending', 'approved', 'rejected', 'canceled'),
  message: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### User Routes

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin only)
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user (Admin only)

### Property Routes

- `GET /api/properties` - Get all properties (with filtering)
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create new property (Owner/Admin)
- `PUT /api/properties/:id` - Update property (Owner/Admin)
- `DELETE /api/properties/:id` - Delete property (Owner/Admin)

### Booking Routes

- `GET /api/bookings` - Get bookings (filtered by user role)
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create new booking (Finder only)
- `PUT /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Delete booking

## 🎨 UI Components

### Core Components

- **Navbar**: Navigation with authentication state
- **Footer**: Site footer with links and contact information
- **PropertyCard**: Reusable property display component
- **Sidebar**: Dashboard navigation sidebar

### Layout Components

- **MainLayout**: Public pages layout with navbar and footer
- **DashboardLayout**: Protected dashboard layout with sidebar

### Page Components

- **Home**: Landing page with search and featured properties
- **Properties**: Property listing with search and filters
- **PropertyDetails**: Detailed property view with booking form
- **Dashboard**: User dashboard with statistics and recent activity
- **Profile**: User profile management
- **MyProperties**: Property management for owners
- **MyBookings**: Booking management for all users

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Role-Based Access Control**: Different permissions for finders, owners, and admins
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests
- **Environment Variables**: Sensitive data stored in environment variables

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Adapted layouts with collapsible navigation
- **Mobile**: Touch-friendly interface with mobile-optimized components

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

1. Build the client application:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `dist` folder to your hosting platform

### Backend Deployment (Heroku/Railway/DigitalOcean)

1. Set environment variables on your hosting platform
2. Deploy the server directory
3. Ensure MongoDB connection is configured for production

### Environment Variables for Production

```env
MONGO_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
PORT=5000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint configuration for code consistency
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Tarin Agarwal** - [Portfolio](https://tarinagarwal.in/)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the flexible database solution

## 📞 Support

For support, email tarinagarwal@gmail.com

## 🔄 Changelog

### Version 1.0.0

- Initial release with core functionality
- User authentication and authorization
- Property listing and management
- Booking system
- Responsive design
- Dashboard for all user types

---

**Happy Coding! 🚀**
