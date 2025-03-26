import React, { useState } from 'react';
import { Users, Shield } from 'lucide-react';

function EmployeesList() {
  // Sample employee data
  const [employees] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Chef', wardenEmail: 'chef.warden@example.com', blocked: false },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Warden', wardenEmail: 'jane.warden@example.com', blocked: false },
    { id: 3, name: 'Samuel Green', email: 'samuel.green@example.com', role: 'Maintenance', wardenEmail: 'samuel.maintenance@example.com', blocked: false },
    { id: 4, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Electrician', wardenEmail: 'alice.electrician@example.com', blocked: false },
    { id: 5, name: 'Michael Brown', email: 'michael.brown@example.com', role: 'Chef', wardenEmail: 'michael.warden@example.com', blocked: true },
    { id: 6, name: 'Sophia White', email: 'sophia.white@example.com', role: 'Warden', wardenEmail: 'sophia.warden@example.com', blocked: true },
    // Add more employees as needed
  ]);
  
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Toast helper function
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Toast component
  const Toast = ({ message, type }) => {
    return (
      <div
        className={`fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300 ${
          toast.show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } ${
          type === 'error' ? 'bg-red-700 text-red-100' : 'bg-green-700 text-green-100'
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
          Employees List
        </h1>

        {/* Employee Table */}
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
                {employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-200 transition-all duration-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {employee.name}
                      <div className="text-xs text-gray-500 md:hidden">{employee.email}</div>
                    </td>
                    <td className="px-4 py-3 text-sm hidden md:table-cell text-gray-700">{employee.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-md ${
                        employee.role === "Chef" ? "bg-green-600 text-white" :
                        employee.role === "Warden" ? "bg-blue-600 text-white" :
                        employee.role === "Maintenance" ? "bg-yellow-600 text-white" :
                        employee.role === "Electrician" ? "bg-red-600 text-white" :
                        "bg-gray-500 text-white"
                      }`}>
                        {employee.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-md ${
                        employee.blocked ? "bg-red-600 text-white" : "bg-green-600 text-white"
                      }`}>
                        {employee.blocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => {
                          showToast(employee.blocked ? "Unblocking" : "Blocking");
                        }}
                        className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 shadow-md ${
                          employee.blocked
                            ? "bg-green-600 hover:bg-green-500 text-white rounded-lg"
                            : "bg-red-600 hover:bg-red-500 text-white rounded-lg"
                        }`}
                      >
                        {employee.blocked ? "Unblock" : "Block"}
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

export default EmployeesList;
