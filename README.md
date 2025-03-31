# Hostel360
A full-stack **PG & Hostel Management System** that allows users to browse available hostels, book rooms, and manage hostel amenities efficiently. The platform includes user authentication, an intuitive dashboard, and a seamless booking experience.

## Features

### Frontend
#### User Authentication
- Users can register and log in securely.
- Admin authentication with restricted access to manage hostels, rooms, and bookings.

#### Hostel Dashboard
- Displays a list of available PGs/Hostels with search and filter options.
- Detailed view of rooms, amenities, and pricing.

#### Booking Management
- Users can select rooms and book them online.
- Real-time updates on booking status and availability.

#### Responsive Design
- Fully optimized for desktops, tablets, and mobile devices.

### Backend
#### Authentication API
- Secure authentication using industry best practices.

#### Hostel & Room Management API
- CRUD operations for hostels, rooms, and booking management.
- Role-based access control for admin and users.

#### Real-Time Updates
- WebSockets for live booking status updates.

### Database
- **MongoDB Atlas** is used for efficient data storage.

## Deployment

### Frontend Hosting
- Deployed on **Vercel** for fast and scalable hosting.

### Backend Hosting
- Deployed on **Render** for backend services.

### Database
- **MongoDB Atlas** (Free Plan) for cloud database storage.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- MongoDB Atlas account for database setup.

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/Abhishek-Dhamshetty/hostel360.git
   cd hostel360
   ```
2. Install dependencies for both frontend and backend:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file and configure database and authentication settings.

4. Start the development server:
   ```sh
   npm start
   ```

5. Open your browser and visit `https://hostel360-kappa.vercel.app/` to access the application.

