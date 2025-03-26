import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";
import { School } from 'lucide-react';
function HostelLayout() {
  const { user } = useUser();
  const [floor, setFloor] = useState(1);
  const [sharing, setSharing] = useState(6);
  const [rooms, setRooms] = useState([]);
  const { getToken } = useAuth();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/rooms-booking-api/all`)
      .then((res) => setRooms(res.data.bookings || []))
      .catch((err) => console.error("❌ Error fetching rooms:", err));
  }, []);

  const handleBooking = async (roomNumber, bedIndex) => {
    if (!user) return alert("⚠️ Please log in to book a room.");
    
    const bookingData = {
      userId: user.id,
      userMail: user.emailAddresses[0].emailAddress,
      roomNumber,
      floorNumber: floor,
      roomType: `${sharing}-Sharing`,
      bedIndex,
      userName : `${user.firstName} ${user.lastName}`,
      bedCount: sharing,
      pricePerMonth: 6000 + (6 - parseInt(sharing)) * 500, // Example pricing logic
      checkInDate: new Date().toISOString().split("T")[0],
      checkOutDate: "2025-12-31",
    };

    const token = await getToken();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/rooms-booking-api/book`,
        bookingData,
        { headers: { Authorization: `Bearer ${token}`, } }
      );
      alert("✅ Room booked successfully!");
    } catch (err) {
      console.error("❌ Error booking room:", err);
      alert("❌ Booking failed: " + (err.response?.data?.message || "Try again."));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center  px-4">
        <h1 className="text-3xl font-semibold text-white flex items-center gap-2 rounded p-1 mx-auto border border-black border-2 mt-30 mb-4" style={{ background: "linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153))", color: "white", width: "450px", textAlign: "center", padding: "8px 20px" }}>
  <School className="w-7 h-7 text-black animate-bounce" /> Hostel Room Booking
</h1>

  
  <div className="flex gap-6 mb-8 justify-center items-center w-full">
    <select 
      value={floor} 
      onChange={(e) => setFloor(Number(e.target.value))} 
      className="p-3 border-2 border-indigo-300 rounded-md shadow-lg focus:ring-2 focus:ring-indigo-500 text-lg transition-all duration-300 hover:bg-indigo-100"
    >
      {[1, 2, 3, 4, 5].map((f) => (
        <option key={f} value={f}>Floor {f}</option>
      ))}
    </select>

    <select 
      value={sharing} 
      onChange={(e) => setSharing(Number(e.target.value))} 
      className="p-3 border-2 border-indigo-300 rounded-md shadow-lg focus:ring-2 focus:ring-indigo-500 text-lg transition-all duration-300 hover:bg-indigo-100"
    >
      {[6, 5, 4, 3, 2, 1].map((s) => (
        <option key={s} value={s}>{s}-Sharing</option>
      ))}
    </select>
  </div>

  <div className="grid grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {Array(sharing).fill().map((_, index) => {
      const bedIndex = index + 1;
      const roomNumber = `${floor}0${sharing}0${bedIndex}`; // Creating a unique room number
      const isBooked = rooms.some(room => room.roomNumber === roomNumber && room.bedIndex === bedIndex && room.status === "Booked");

      return (
        <div
          key={bedIndex}
          className={`w-32 h-32 ${isBooked ? "bg-red-500" : "bg-green-500"} text-white flex items-center justify-center rounded-md cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg relative overflow-hidden`}
          onClick={() => !isBooked && handleBooking(roomNumber, bedIndex)}
        >
          <div className="text-xl font-semibold">{`Bed ${bedIndex}`}</div>
          {isBooked && (
            <div className="absolute bottom-2 left-7 text-xs bg-black bg-opacity-50 px-2 py-1 rounded-md text-white text-center">
              Reserved
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>

  );
}

export default HostelLayout;
