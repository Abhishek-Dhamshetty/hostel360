Hostel360
A full-stack PG & Hostel Management System that enables users to browse available hostels, book rooms, and manage hostel amenities efficiently. The platform offers secure user authentication, an intuitive dashboard, real-time booking updates, and seamless online payments through Razorpay.

🚀 Features
✨ Frontend
User Authentication

Secure registration and login system.

Admin authentication with restricted access to manage hostels, rooms, and bookings.

Hostel Dashboard

Displays a list of available PGs/Hostels with powerful search and filter options.

Detailed room view showcasing amenities, pricing, and photos.

Booking Management

Users can select rooms and complete bookings online.

Integrated Razorpay payment gateway for secure and smooth transactions.

Admin Features

Admins can approve/reject hostel listing requests submitted by owners.

View and manage all hostels, rooms, and bookings from a single dashboard.

Responsive Design

Fully optimized for desktops, tablets, and mobile devices.

⚙️ Backend
Authentication API

Secure token-based authentication.

Role-based access control for users and admins.

Hostel & Room Management API

CRUD operations for hostels, rooms, users, and bookings.

Real-Time Updates

WebSocket (optional) support for live booking status updates.

Payment Integration

Razorpay checkout integrated for fast, secure online payments.

🛢️ Database
MongoDB Atlas — Cloud database storage with high scalability and reliability.

🖥️ Tech Stack

Technology	Description
Frontend	React.js, Tailwind CSS, Axios
Backend	Node.js, Express.js
Database	MongoDB Atlas
Hosting	Vercel (Frontend), Render (Backend)
Payments	Razorpay Integration
Authentication	JWT (JSON Web Tokens)
🚀 Deployment
🌐 Live Application
Frontend (Vercel)

☁️ Hosting
Frontend — Deployed on Vercel.

Backend — Deployed on Render.

Database — Managed with MongoDB Atlas (Free Tier).

🛠️ Setup Instructions (Run Locally)
📋 Prerequisites
Node.js installed

MongoDB Atlas account (or local MongoDB)

🔥 Steps to Setup
Clone the Repository:

bash
Copy
Edit
git clone https://github.com/Abhishek-Dhamshetty/hostel360.git
cd hostel360
Install Dependencies:

bash
Copy
Edit
npm install
Environment Variables:

Create a .env file in the root directory.

Add the following environment variables:

ini
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
Start the Development Server:

bash
Copy
Edit
npm start
Access the Application:

Open your browser and go to: http://localhost:3000/

Or visit the live site: https://hostel360-kappa.vercel.app/

📜 License
This project is licensed under the MIT License — feel free to use and customize it!

Built with ❤️ by Abhishek Dhamshetty

🎯 Improvements added in this final version:
✔️ Razorpay payment flow integration

✔️ Admin can approve hostel listings

✔️ Final optimized, professional README

✔️ Environment variable details for easy setup

✔️ Tech Stack table for clarity

