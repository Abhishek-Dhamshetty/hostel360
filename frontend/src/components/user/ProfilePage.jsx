import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { User } from 'lucide-react';

function UserProfile() {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState({
    name: 'Loading...',
    email: 'Loading...',
    hostelName: 'Abhishek Hostels',
    role: 'User',
    roomNumber: '101',
    complaints: [],
    bookings: [],
  });

  useEffect(() => {
    if (user) {
      const userEmail = user.emailAddresses[0]?.emailAddress || 'Not Available';
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: userEmail,
      }));

      fetchUserDetails(user.emailAddresses[0]?.emailAddress);  // Fetch user bookings
      fetchUserComplaints(user.id);  // Fetch complaints
    }
  }, [user]);

  const fetchUserDetails = async (userEmail) => {
    try {
      const response = await axios.get(`http://localhost:9000/rooms-booking-api/my-bookings`, {
        params: { userEmail }
      });
      if (response.data) {
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          bookings: response.data.bookings || [],
        }));
      }
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  const fetchUserComplaints = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:9000/complaint-api/user/${userId}`);
      if (response.data?.complaints?.length) {
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          complaints: response.data.complaints,
        }));
      } else {
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          complaints: [],
        }));
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-900 p-6 m-10" >
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6 mt-10">
        <h1 className="text-3xl font-semibold text-white flex items-center gap-2 p-2 rounded-lg border border-2 border-black" style={{ background: "linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153))", color: "white", width: "250px", textAlign: "center", margin: "auto",paddingLeft:"25px" }}>
          <User className="w-7 h-7 text-black animate-bounce" /> User Profile
        </h1>

        {/* Profile Section */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-md mt-3 border border-gray-900  border-2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Information</h2>
          <p className="text-lg"><strong>Name:</strong> {userDetails.name}</p>
          <p className="text-lg"><strong>Email:</strong> {userDetails.email}</p>
          <p className="text-lg"><strong>Hostel Name:</strong> {userDetails.hostelName}</p>
          <p className="text-lg"><strong>Room Number:</strong> {userDetails.roomNumber}</p>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-900 border-8 border-double mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 p-4">Your Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Hostel Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Room Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Bed Count</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Check-In Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Check-Out Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {userDetails.bookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-600">No bookings found.</td>
                  </tr>
                ) : (
                  userDetails.bookings.map((booking, index) => (
                    <tr key={index} className="hover:bg-gray-200 transition-all duration-200">
                      <td className="px-4 py-3 text-sm text-gray-800">Abhishek Hostels</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{booking.roomNumber}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{booking.bedCount}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{booking.pricePerMonth} ₹</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(booking.checkInDate)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(booking.checkOutDate)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Complaints Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-900 border-8 border-double mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 p-4">Your Complaints</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase">Filed On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {userDetails.complaints.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-600">No complaints registered.</td>
                  </tr>
                ) : (
                  userDetails.complaints.map((complaint, index) => (
                    <tr key={index} className="hover:bg-gray-200 transition-all duration-200">
                      <td className="px-4 py-3 text-sm text-gray-800">{complaint.category}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-md ${complaint.status === "resolved" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"}`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(complaint.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
