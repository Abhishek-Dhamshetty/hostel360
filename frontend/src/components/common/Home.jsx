import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';
import Typewriter from "typewriter-effect";

// Import images
import blogImage1 from "../../assets/ic-1.png";
import blogImage2 from "../../assets/ic-2.png";
const Home = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSignedIn || !user || userData) return; // Prevent unnecessary API calls

    const registerUser = async () => {
      try {
        const response = await axios.post(
          "http://localhost:9000/user-api/register",
          {
            email: user.primaryEmailAddress?.emailAddress, // Use optional chaining
            firstName: user.firstName,
            lastName: user.lastName,
            profileImageUrl: user.imageUrl,
          },
          { withCredentials: true }
        );

        if (response.status === 200 || response.status === 201) {
          setUserData(response.data.payload);
        }
      } catch (err) {
        console.error("❌ Error fetching user data:", err);
        setError("Error fetching user details.");
      }
    };

    registerUser();
  }, [isSignedIn, user, userData]); // Ensures it only runs when needed

  useEffect(() => {
    if (!userData) return; // Ensure userData is available before navigating

    const email = user.primaryEmailAddress?.emailAddress; // Extract email safely
    if (!email) return; // Ensure email exists

    if (email === "abhishekdhamshetty@gmail.com") {
      navigate(`admin-profile/${userData.email}`);
    }
      if(email === "bhargavdhamshetty@gmail.com") {
      navigate(`warden-profile/${userData.email}`);
    } else if (userData.role === "user") {
      navigate(`user-profile/${userData.email}`);
    }
  }, [userData, navigate, user]);
  
  // Carousel Data (Image + Text)
    const slides = [
      {
        image: blogImage1,
        title: "Comfortable Living",
        text: "Experience a safe, clean, and homely atmosphere with all essential amenities.",
      },
      {
        image: blogImage2,
        title: "Healthy & Delicious Meals",
        text: "Enjoy nutritious and hygienic meals, ensuring a balanced diet every day.",
      },
    ];


  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-poppins">
      {isSignedIn ? (
        <div>
          <h1>Welcome to Hostel360... {userData?.firstName || "Guest"}</h1>
            <div className="flex space-x-4">
            <button
              onClick={() => navigate("/food-menu")}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              View Food Menu
            </button>
            <button
              onClick={() => navigate("/hostel-layout")}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Rooms Availability
            </button>
          </div>

        </div>
      ) : (
        <>
        {/* Infinite Gradient Background with Continuous Flow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ backgroundPositionX: ["0%", "200%", "0%"] }} // Moves back to start smoothly
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{
            background: "linear-gradient(90deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153))", // Your 3 colors
            backgroundSize: "300% 100%", // Ensures smooth transition
          }}
        />
      </div>

      {/* Main Content Box */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl w-full bg-black/40 backdrop-blur-lg border border-white/10 shadow-2xl rounded-lg p-8 flex flex-col items-center text-center font-montserrat"
      >
        {/* Welcome Text */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-extrabold text-white mb-4 tracking-wide font-inter"
        >
          <Typewriter
            options={{
              strings: ["Welcome to Hostel360.."],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 50,
              cursor: "|",
            }}
          />
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 mb-6 text-lg tracking-wide font-poppins"
        >
          <Typewriter
            options={{
              strings: ["Your platform for hassle-free PG living, connecting residents, and exploring the best hostel experiences."],
              autoStart: true,
              loop: true,
              delay: 20,
              deleteSpeed: 30,
              cursor: "|",
            }}
          />
        </motion.p>

        {/* Image & Content Carousel (Each Slide Contains Image + Text) */}
        <div className="relative w-full max-w-lg mx-auto">
          {/* Image Slide */}
          <motion.img
            key={currentIndex}
            src={slides[currentIndex].image}
            alt="Blog Preview"
            className="w-full h-64 object-cover rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Navigation Buttons */}
          <div className="absolute inset-0 flex items-center justify-between p-2">
            <button 
              onClick={prevSlide} 
              className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
            >
              ◀
            </button>
            <button 
              onClick={nextSlide} 
              className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Text Below Image (Changes with Carousel) */}
        <div className="mt-4">
          <motion.h3 
            key={slides[currentIndex].title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold text-white tracking-wide font-montserrat"
          >
            {slides[currentIndex].title}
          </motion.h3>
          <motion.p 
            key={slides[currentIndex].text}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-gray-400 text-md tracking-wide font-poppins"
          >
            {slides[currentIndex].text}
          </motion.p>
        </div>

      </motion.div>
      </>
      
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Home;
