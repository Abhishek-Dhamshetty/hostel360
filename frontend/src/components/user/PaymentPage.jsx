import React, { useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Landmark } from "lucide-react";

const PaymentForm = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate=useNavigate();
  const [floor, setFloor] = useState("1");
  const [sharing, setSharing] = useState("6");
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [loading, setLoading] = useState(false);

  // Calculate amount based on sharing (6000 for 6-sharing, +500 per decrease)
  const calculateAmount = (sharing) => 6000 + (6 - parseInt(sharing)) * 500;
  const amount = calculateAmount(sharing);

  const handleSubmit = async () => {
    event.preventDefault();
    if (!user) {
      alert("Please login to continue.");
      return;
    }

    setLoading(true);
    const token = await getToken();

    const paymentData = {
      userId: user.id,
      userName : `${user.firstName} ${user.lastName}`,
      userEmail: user.emailAddresses[0].emailAddress,
      amount,
      currency: "INR",
      paymentMethod,
      room: `Floor ${floor} - ${sharing} Sharing`,
    };

    try {
      const response = await axios.post("http://localhost:9000/payment-api/create", paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("✅ Payment successful: " + response.data.message);
      if(response.data.message==="Payment Recorded Successfully"){
      navigate('/');}
    } catch (error) {
      alert("❌ Payment failed: " + (error.response?.data?.message || "An error occurred"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mt-40 p-10 bg-gray-900" style={{backgroundColor:"black",color:"white"}}>
      <h1 className="text-3xl font-semibold text-white flex items-center gap-2 rounded p-1 mx-auto pt-2 pb-2" 
                  style={{ marginLeft: "10px", background: "linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153))", color:"white", width:"300px", textAlign:"center", margin:"auto", paddingLeft:"30px", paddingRight:"-2px" }}>
                <Landmark className="w-7 h-7 text-blue-400 animate-bounce" />
                Make a Payment
              </h1>
      <p className="mb-2 mt-4">User: {user?.fullName}</p>
      <p className="mb-4">Email: {user?.emailAddresses[0]?.emailAddress}</p>
      
      <label className="block mb-2">Floor:</label>
      <select value={floor} onChange={(e) => setFloor(Number(e.target.value))} className="w-full p-2 border rounded">
        {[1, 2, 3, 4, 5].map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>
      
      <label className="block mt-4 mb-2">Sharing:</label>
      <select value={sharing} onChange={(e) => setSharing(Number(e.target.value))} className="w-full p-2 border rounded">
        {[6, 5, 4, 3, 2, 1].map((s) => (
          <option key={s} value={s}>{s}-Sharing</option>
        ))}
      </select>
      
      <p className="mt-4 mb-2">Amount: ₹{amount}</p>
      
      <label className="block mb-2">Payment Method:</label>
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-2 border rounded">
        {["Card", "UPI", "Net Banking", "Crypto", "Other"].map((method) => (
          <option key={method} value={method}>{method}</option>
        ))}
      </select>
      
      <button type="submit" className="mt-4 w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>
        {loading ? "Processing..." : "Proceed to Pay"}
      </button>
    </form>
    </div>
  );
};

export default PaymentForm;
