import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  const [typewriterText, setTypewriterText] = useState('Hostel360');
  const [index, setIndex] = useState(0);
  const [isIncreasing, setIsIncreasing] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    const text = 'Hostel360';
    let interval = setInterval(() => {
      if (isIncreasing) {
        if (index < text.length) {
          setIndex(index + 1);
        } else {
          setIsIncreasing(false); // Start decreasing once the full text is typed
        }
      } else {
        if (index > 0) {
          setIndex(index - 1);
        } else {
          setIsIncreasing(true); // Start increasing once the text is back at the start
        }
      }
    }, 150);

    return () => clearInterval(interval);
  }, [index, isIncreasing]);

  return (
    <div className="bg-gray-900 text-white py-6 mt-12 shadow-lg">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        
        <a className="text-xl font-bold tracking-wider transition-all duration-300" href="/">
          {typewriterText.slice(0, index)}
          <span className="animated-zero">o</span>
          {typewriterText.slice(index)}
        </a>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link to="/aboutus" className="hover:text-blue-400 transition duration-300">About Us</Link>
          <Link to="/contactus" className="hover:text-green-400 transition duration-300">Contact Us</Link>
          <Link to="/" className="hover:text-yellow-400 transition duration-300">Privacy Policy</Link>
          <Link to="/" className="hover:text-red-400 transition duration-300">Terms of Service</Link>
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:scale-110 transition">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:scale-110 transition">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:scale-110 transition">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:scale-110 transition">
            <i className="fab fa-github"></i>
          </a>
        </div>

        {/* Copyright Text */}
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Hostel360. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
