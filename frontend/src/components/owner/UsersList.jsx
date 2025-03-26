import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { Users, Shield } from "lucide-react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const { getToken } = useAuth();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentuser"));
    const userId = currentUser ? currentUser._id : null;

    axios
      .get(`${BACKEND_URL}/user-api/users`, {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      })
      .then((response) => {
        setUsers(response.data.payload);
      })
      .catch((error) => {
        console.error(error);
        showToast("Failed to load users", "error");
      });
  }, []);

  // Toast helper function
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const toggleBlockStatus = async (id, blocked) => {
    try {
      const token = await getToken();

      const response = await axios.put(
        `${BACKEND_URL}/admin-api/admin/block-unblock/${id}`,
        { blocked: !blocked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast(response.data.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, blocked: response.data.payload.blocked } : user
        )
      );
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
      showToast("Failed to update user status", "error");
    }
  };

  // Toast component
  const Toast = ({ message, type }) => {
    return (
      <div
        className={`fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300 ${
          toast.show ? "opacity-100" : "opacity-0 pointer-events-none"
        } ${
          type === "error"
            ? "bg-red-700 text-red-100"
            : "bg-green-700 text-green-100"
        }`}
      >
        <p>{message}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-blue-100 text-gray-900 p-6 m-4">
      <div className="max-w-6xl mx-auto m-12">
        {/* Page Title */}
        <h1 className="text-3xl font-semibold text-white flex items-center gap-2 rounded p-1 mx-auto pt-2 pb-2" style={{ marginLeft: "10px",background: "linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153))",color:"white",width:"300px",textAlign:"center",margin:"auto",paddingLeft:"30px", paddingRight:"-2px" }}>
            <Users className="w-7 h-7 text-blue-400 animate-bounce" />
            Hostelers List
          </h1>

        {/* User Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden m-2">
          <div className="overflow-x-auto mt-2">
            <table className="w-full table-auto">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider hidden md:table-cell">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-200 transition-all duration-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {user.firstName} {user.lastName}
                      <div className="text-xs text-gray-500 md:hidden">{user.email}</div>
                    </td>
                    <td className="px-4 py-3 text-sm hidden md:table-cell text-gray-700">{user.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-md ${
                        user.role === "admin" ? "bg-purple-600 text-white" :
                        user.role === "warden" ? "bg-blue-600 text-white" :
                        "bg-gray-900 text-white"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-md ${
                        user.blocked ? "bg-red-600 text-white" : "bg-green-600 text-white"
                      }`}>
                        {user.blocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => toggleBlockStatus(user._id, user.blocked)}
                        className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 shadow-md ${
                          user.blocked
                            ? "bg-green-600 hover:bg-green-500 text-white rounded-lg"
                            : "bg-red-600 hover:bg-red-500 text-white rounded-lg"
                        }`}
                      >
                        {user.blocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}

export default UsersList;
