import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';

// Import images
import blogImage1 from "../../assets/ic-1.png";
import blogImage2 from "../../assets/ic-2.png";

const Home = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterText2, setTypewriterText2] = useState('');

  // Typewriter effect for main title
  useEffect(() => {
    const text = 'Welcome to Hostel360';
    let index = 0;
    let isDeleting = false;

    const typeWriterEffect = () => {
      setTypewriterText(text.slice(0, index));

      if (!isDeleting && index < text.length) {
        index++;
      } else if (isDeleting && index > 0) {
        index--;
      }

      if (index === text.length) {
        isDeleting = true;
        setTimeout(typeWriterEffect, 1000);
      } else if (index === 0) {
        isDeleting = false;
        setTimeout(typeWriterEffect, 1000);
      } else {
        setTimeout(typeWriterEffect, 100);
      }
    };

    typeWriterEffect();
  }, []);

  // Typewriter effect for subtitle
  useEffect(() => {
    const text = 'Your platform for hassle-free PG living, connecting residents, and exploring the best hostel experiences.';
    let index = 0;
    let isDeleting = false;

    const typeWriterEffect = () => {
      setTypewriterText2(text.slice(0, index));

      if (!isDeleting && index < text.length) {
        index++;
      } else if (isDeleting && index > 0) {
        index--;
      }

      if (index === text.length) {
        isDeleting = true;
        setTimeout(typeWriterEffect, 2000);
      } else if (index === 0) {
        isDeleting = false;
        setTimeout(typeWriterEffect, 1000);
      } else {
        setTimeout(typeWriterEffect, 30);
      }
    };

    typeWriterEffect();
  }, []);

  useEffect(() => {
    if (!isSignedIn || !user || userData) return; // Prevent unnecessary API calls

    const registerUser = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user-api/register`,
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
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white mb-8"
          >
            Welcome to Hostel360... {userData?.firstName || "Guest"}
          </motion.h1>
          <div className="flex space-x-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/food-menu")}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
            >
              View Food Menu
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/hostel-layout")}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
            >
              Rooms Availability
            </motion.button>
          </div>
        </div>
      ) : (
        <>
        {/* Infinite Gradient Background with Continuous Flow */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{ backgroundPositionX: ["0%", "200%", "0%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{
              background: "linear-gradient(90deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153))",
              backgroundSize: "300% 100%",
            }}
          />
        </div>

        {/* Main Content Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-4xl w-full bg-black/40 backdrop-blur-lg border border-white/10 shadow-2xl rounded-lg p-8 flex flex-col items-center text-center"
        >
          {/* Welcome Text */}
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-extrabold text-white mb-4 tracking-wide"
          >
            {typewriterText}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 mb-6 text-lg tracking-wide"
          >
            {typewriterText2}
          </motion.p>

          {/* Image & Content Carousel */}
          <div className="relative w-full max-w-lg mx-auto">
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
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide} 
                className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
              >
                ◀
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide} 
                className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
              >
                ▶
              </motion.button>
            </div>
          </div>

          {/* Text Below Image */}
          <div className="mt-4">
            <motion.h3 
              key={slides[currentIndex].title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold text-white tracking-wide"
            >
              {slides[currentIndex].title}
            </motion.h3>
            <motion.p 
              key={slides[currentIndex].text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 text-md tracking-wide"
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
