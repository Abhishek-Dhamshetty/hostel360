import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import { FaSun, FaMoon } from 'react-icons/fa';
import logo from '../../assets/logo.png';

function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [typewriterText, setTypewriterText] = useState('');
  const location = useLocation();
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [isRegularUser, setIsRegularUser] = useState(false);

  useEffect(() => {
    if (user) {
      const email = user.emailAddresses?.[0]?.emailAddress; // Ensure `emailAddress` exists
      if (email !== 'abhishekdhamshetty@gmail.com' && email !== 'bhargavdhamshetty@gmail.com') {
        setIsRegularUser(true);
      } else {
        setIsRegularUser(false);
      }
    }
  }, [user]); // Run this whenever `user` updates

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const text = 'Hostel360';
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
        setTimeout(typeWriterEffect, 250);
      }
    };

    typeWriterEffect();
  }, []);
  
  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setDarkMode(!darkMode);
  };

  async function handleSignOut() {
    await signOut();
    toggleNavbar();
  }

  return (
    <nav className={`fixed top-0 left-0 w-full h-15 z-50 shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`} style={{height:"80px",paddingTop:"10px",paddingBottom:"10px"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">

          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="Logo" className="h-9 w-9" />
            <span className={`text-xl font-bold tracking-wider transition-all duration-300 ${darkMode ? 'text-white' : 'text-black'}`}>
              {typewriterText}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center ml-auto" style={{ gap: "20px" }}>
            {!isSignedIn ? (
              <>
                <NavLink to="/" className={`nav-btn ${location.pathname === '/' ? 'active-btn' : ''}`}>Home</NavLink>
                <NavLink to="/login" className={`nav-btn ${location.pathname === '/login' ? 'active-btn' : ''}`}>Login</NavLink>
                <NavLink to="/register" className={`nav-btn ${location.pathname === '/register' ? 'active-btn' : ''}`}>Register</NavLink>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2" style={{ gap: "10px" }}>
                  {user?.emailAddresses?.[0]?.emailAddress === 'abhishekdhamshetty@gmail.com' && (
                    <>
                    <NavLink 
                      to={`admin-profile/${user.emailAddresses[0].emailAddress}/`} 
                      className={`nav-btn ${location.pathname === `/admin-profile/${user.emailAddresses[0].emailAddress}/` ? 'active-btn' : ''}`}
                    >
                      Profile
                    </NavLink>
                    <NavLink 
                      to={`admin-profile/${user.emailAddresses[0].emailAddress}/employees-list`} 
                      className={`nav-btn ${location.pathname === `/admin-profile/${user.emailAddresses[0].emailAddress}/employees-list` ? 'active-btn' : ''}`}
                    >
                      Employees List
                    </NavLink>
                    <NavLink 
                      to={`admin-profile/${user.emailAddresses[0].emailAddress}/payments`} 
                      className={`nav-btn ${location.pathname === `/admin-profile/${user.emailAddresses[0].emailAddress}/payments` ? 'active-btn' : ''}`}
                    >
                      Transaction History
                    </NavLink>
                    <NavLink 
                      to={`admin-profile/${user.emailAddresses[0].emailAddress}/users-list`} 
                      className={`nav-btn ${location.pathname === `/admin-profile/${user.emailAddresses[0].emailAddress}/users-list` ? 'active-btn' : ''}`}
                    >
                      Hostelers List
                    </NavLink>
                  </>
                  )}
                  {user?.emailAddresses?.[0]?.emailAddress === 'bhargavdhamshetty@gmail.com' && (
                    <>
                    <NavLink 
                      to={`warden-profile/${user.emailAddresses[0].emailAddress}/`} 
                      className={`nav-btn ${location.pathname === `/warden-profile/${user.emailAddresses[0].emailAddress}/` ? 'active-btn' : ''}`}
                    >
                      Profile
                    </NavLink>
                    <NavLink 
                      to={`warden-profile/${user.emailAddresses[0].emailAddress}/resolve-complaints`} 
                      className={`nav-btn ${location.pathname === `/warden-profile/${user.emailAddresses[0].emailAddress}/resolve-complaints` ? 'active-btn' : ''}`}
                    >
                      Complaints
                    </NavLink>
                  </>
                  )}
                  {isRegularUser && (
                    <>
                    <NavLink 
                      to={`user-profile/${user.emailAddresses[0].emailAddress}/`} 
                      className={`nav-btn ${location.pathname === `/user-profile/${user.emailAddresses[0].emailAddress}/` ? 'active-btn' : ''}`}
                    >
                      Profile
                    </NavLink>
                    <NavLink 
                      to={`user-profile/${user.emailAddresses[0].emailAddress}/payment-page`} 
                      className={`nav-btn ${location.pathname === `/user-profile/${user.emailAddresses[0].emailAddress}/payment-page` ? 'active-btn' : ''}`}
                    >
                      Payment Page
                    </NavLink>
                    <NavLink 
                      to={`user-profile/${user.emailAddresses[0].emailAddress}/raise-complaint`} 
                      className={`nav-btn ${location.pathname === `/user-profile/${user.emailAddresses[0].emailAddress}/raise-complaint` ? 'active-btn' : ''}`}
                    >
                      Raise Complaint
                    </NavLink>
                  </>
                  )}
                  <img src={user.imageUrl} alt={user.firstName} className="h-9 w-9 rounded-full border-2 border-gray-600" />
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                    {user.firstName}
                  </span>
                </div>
                <NavLink 
                    to="/food-menu" 
                    className={`nav-btn ${location.pathname === '/food-menu' ? 'active-btn' : ''}`}
                  >
                    Food Menu
                  </NavLink>
                  <NavLink 
                    to="/hostel-layout" 
                    className={`nav-btn ${location.pathname === '/hostel-layout' ? 'active-btn' : ''}`}
                  >
                    Hostel Bookings
                  </NavLink>
                <button onClick={handleSignOut} className="nav-btn bg-red-500 hover:bg-red-600 text-white" style={{ marginLeft: "0px" }}>
                  Sign Out
                </button>
              </div>
            )}

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="theme-toggle">
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-600" />}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .nav-btn {
          padding: 6px 12px;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          color: white;
          background: linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153));
          border-radius: 6px;
          transition: all 0.3s ease-in-out;
        }
        .nav-btn:hover {
          transform: scale(1.05);
        }
        .active-btn {
          background: linear-gradient(135deg, rgb(255, 182, 72), rgb(255, 94, 98));
          font-weight: bold;
          transform: scale(1.05);
        }
      `}</style>
    </nav>
  );
}

export default Header;
