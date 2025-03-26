import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { Landmark } from "lucide-react";

const PaymentsHistory = () => {
  const { getToken } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = await getToken();
        const response = await axios.get("http://localhost:9000/payment-api/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPayments(response.data.payload);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [getToken]);

  return (
    <div className="min-h-screen bg-blue-100 text-gray-900 p-6 m-4">
      <div className="max-w-6xl mx-auto m-12">
        <h1 className="text-3xl font-semibold text-white flex items-center gap-2 rounded p-1 mx-auto pt-2 pb-2" 
            style={{ marginLeft: "10px", background: "linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153))", color:"white", width:"300px", textAlign:"center", margin:"auto", paddingLeft:"30px", paddingRight:"-2px" }}>
          <Landmark className="w-7 h-7 text-blue-400 animate-bounce" />
          Payment History
        </h1>
        
        {loading ? (
          <p className="text-center text-gray-500 mt-6">Loading transactions...</p>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden m-2">
            <div className="overflow-x-auto mt-2">
              <table className="w-full table-auto">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">User</th>
                    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Transaction ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Date & Time</th>
                    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Method</th>
                    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Room</th>
                    <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {payments.map((payment, index) => (
                    <tr key={index} className="hover:bg-gray-200 transition-all duration-200">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{payment.userName}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{payment.userEmail}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{payment.transactionId}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{new Date(payment.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">₹{payment.amount}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{payment.paymentMethod}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{payment.room}</td>
                      <td className={`px-4 py-3 text-sm font-bold ${"text-green-600"}`}>Success</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsHistory;
