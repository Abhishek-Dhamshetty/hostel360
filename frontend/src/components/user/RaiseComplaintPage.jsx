import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser,useAuth } from '@clerk/clerk-react';
import { CalendarRange } from 'lucide-react';
function RaiseComplaintPage() {
  const { user, isLoaded } = useUser();
  const [floor, setFloor] = useState('');
  const [roomType, setRoomType] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!floor || !roomType || !description) {
      setErrorMessage('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    if (!user) {
      setErrorMessage('You must be logged in to submit a complaint.');
      setIsSubmitting(false);
      return;
    }

    const userData = {
      userId: user.id,
      userMail: user.primaryEmailAddress?.emailAddress,
    };

    try {
       // Get Clerk Auth Token

      const complaintData = {
        userData,
        place: `${floor} & ${roomType}`,
        description,
        category: 'Maintenance', // ✅ Added category field
      };
      const token = await getToken();
      const response = await axios.post(
        'http://localhost:9000/complaint-api/register',
        complaintData,
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Corrected token usage
        }
      );
      
      if (response.status === 201) {
        alert('Complaint registered successfully!');
        navigate('/');
      } else {
        setErrorMessage('Failed to submit complaint. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to submit complaint.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white shadow-lg p-8 rounded-lg">
      <h1 className="text-3xl font-semibold text-white flex items-center gap-2 rounded p-1 mx-auto pt-2 pb-2" 
            style={{ marginLeft: "10px", background: "linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153))", color:"white", width:"350px", textAlign:"center", margin:"auto", paddingLeft:"30px", paddingRight:"-2px" }}>
          <CalendarRange className="w-7 h-7 text-blue-400 animate-bounce" />
          Raise a Complaint
        </h1>
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
            <p>{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <label htmlFor="floor" className="block text-sm font-medium text-gray-700">
              Select Floor
            </label>
            <select
              id="floor"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="mt-1 block w-full p-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select Floor</option>
              {Array.from({ length: 5 }, (_, index) => (
                <option key={index} value={`Floor-${index + 1}`}>
                  Floor-{index + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
              Room Type
            </label>
            <select
              id="roomType"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="mt-1 block w-full p-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select Room Type</option>
              {['1-sharing', '2-sharing', '3-sharing', '4-sharing', '5-sharing', '6-sharing'].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Problem Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="mt-1 block w-full p-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Describe your problem here..."
              required
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RaiseComplaintPage;
