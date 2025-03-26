import React, { useEffect, useState } from "react";
import axios from "axios";
import { CalendarRange } from 'lucide-react';

function ComplaintsDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:9000/complaint-api/all");
        setComplaints(response.data.complaints);
      } catch (error) {
        setError("Failed to fetch complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const markResolved = async (id) => {
    try {
      await axios.patch(`http://localhost:9000/complaint-api/update-status/${id}`, {
        status: "resolved",
      });
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status: "resolved" } : complaint
        )
      );
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading complaints...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-blue-100 text-gray-900 p-6 m-4">
      <div className="max-w-6xl mx-auto m-12">
        {/* Page Title */}
        <h1 className="text-3xl font-semibold text-white flex items-center gap-2 rounded p-1 mx-auto pt-2 pb-2" style={{ marginLeft: "10px",background: "linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153))",color:"white",width:"450px",textAlign:"center",margin:"auto",paddingLeft:"30px", paddingRight:"-2px" }}>
        <CalendarRange className="w-7 h-7 text-gray-900 animate-bounce" />
          Complaints Dashboard
        </h1>
        
        {/* Complaints Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden m-2">
          <div className="overflow-x-auto mt-2">
            <table className="w-full table-auto">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">User Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Place</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {complaints.map((complaint) => (
                  <tr key={complaint._id} className="hover:bg-gray-200 transition-all duration-200">
                    <td className="px-4 py-3 text-sm text-gray-800">{complaint.userEmail}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{complaint.category}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{complaint.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{complaint.place}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-md ${
                        complaint.status === "pending" ? "bg-yellow-600 text-white" :
                        complaint.status === "in-progress" ? "bg-blue-600 text-white" :
                        "bg-green-600 text-white"
                      }`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {complaint.status !== "resolved" && (
                        <button
                          onClick={() => markResolved(complaint._id)}
                          className="px-3 py-2 rounded text-sm font-medium transition-all duration-200 shadow-md bg-green-600 hover:bg-green-500 text-white rounded-lg"
                        >
                          Mark as Resolved
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintsDashboard;
