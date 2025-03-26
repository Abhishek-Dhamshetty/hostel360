import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-gray-900 text-white shadow-2xl rounded-lg animate-fade-in">
      
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-500 to-green-400 text-transparent bg-clip-text">
        About Hostel360
      </h1>

      {/* Introduction */}
      <p className="mt-6 text-lg text-white text-center leading-relaxed">
        Welcome to <span className="font-bold text-indigo-400">Hostel360</span>, your ultimate platform for managing hostel accommodations, meal planning, and student services. We provide an efficient and seamless experience for both students and administrators.
      </p>

      {/* Mission Section */}
      <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-inner">
        <h2 className="text-2xl font-bold text-center text-green-400">Our Mission</h2>
        <p className="mt-3 text-white text-center">
          Our mission is to create a user-friendly environment that simplifies hostel management while ensuring a hassle-free stay for students.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center text-indigo-400">Why Choose Hostel360?</h2>
        <ul className="mt-4 space-y-3 text-white text-lg text-center">
          <li>✅ Efficient Hostel Management – Easy room allocation and tracking.</li>
          <li>✅ Digital Meal Planning – View and choose meals in advance.</li>
          <li>✅ Real-Time Notifications – Stay updated with important announcements.</li>
          <li>✅ Secure & Fast – Built with security and efficiency in mind.</li>
        </ul>
      </div>

      {/* CTA Button */}
      <div className="mt-10 text-center">
        <p className="text-white text-lg">Get started with Hostel360 today!</p>
        <a
          href="/login"
          className="mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-md shadow-lg text-lg font-semibold 
          hover:bg-indigo-700 transition transform hover:scale-105"
        >
          Join Now
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
