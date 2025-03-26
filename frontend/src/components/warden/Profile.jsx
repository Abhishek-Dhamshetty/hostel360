import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { ShieldUser } from 'lucide-react';

function WardenProfile() {
  const { user } = useAuth(); // Get the current user from Clerk
  const [userDetails, setUserDetails] = useState({
    name: 'John Wick',
    email: 'warden1@abhishek.in',
    hostelName: 'Abhishek Hostels', // Example static value
    role: 'Warden',
    salary: 15000,
    roomDetails: {
      totalRooms: 50,
      availableRooms: 12,
      filledRooms: 38,
    },
    duePayers: 5,
  });

  // Set the user details from Clerk
  useEffect(() => {
    if (user) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        name: user.firstName + ' ' + user.lastName, // Combine first and last names
        email: user.emailAddresses[0]?.emailAddress || 'Not Available',
      }));
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-900 p-6 m-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-white flex items-center gap-2 rounded p-1 mx-auto pt-2 pb-2 border border-black border-2" style={{ marginLeft: "10px",background: "linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153))",color:"white",width:"300px",textAlign:"center",margin:"auto",paddingLeft:"30px", paddingRight:"-2px" }}>
          <ShieldUser className="w-7 h-7 text-black animate-bounce" /> Warden Profile
        </h1>

        {/* Profile Section */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md mt-2 border border-gray-900  border-2">
          <h2 className="text-2xl font-semibold text-gray-800">Profile Information</h2>
          <div className="space-y-4 mt-4 ">
            <p className="text-lg">
              <strong>Name:</strong> {userDetails.name}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {userDetails.email}
            </p>
            <p className="text-lg">
              <strong>Hostel Name:</strong> {userDetails.hostelName}
            </p>
            <p className="text-lg">
              <strong>Role:</strong> {userDetails.role}
            </p>
            <p className="text-lg">
              <strong>Salary:</strong> ₹{userDetails.salary}
            </p>
          </div>
        </div>

        {/* Hostel Details Section */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-gray-900  border-2">
          <h2 className="text-2xl font-semibold text-gray-800">Hostel Details</h2>
          <div className="space-y-4 mt-4">
            <p className="text-lg">
              <strong>Total Rooms:</strong> {userDetails.roomDetails.totalRooms}
            </p>
            <p className="text-lg">
              <strong>Available Rooms:</strong> {userDetails.roomDetails.availableRooms}
            </p>
            <p className="text-lg">
              <strong>Filled Rooms:</strong> {userDetails.roomDetails.filledRooms}
            </p>
            
          </div>
        </div>

        {/* Due Payers Section */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-gray-900  border-2">
          <h2 className="text-2xl font-semibold text-gray-800">Due Payers</h2>
          <div className="space-y-4 mt-4">
            <p className="text-lg">
              <strong>Number of Due Payers:</strong> {userDetails.duePayers}
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default WardenProfile;
