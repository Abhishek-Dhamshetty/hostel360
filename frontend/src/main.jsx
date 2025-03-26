import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import RootLayout from './components/common/RootLayout.jsx';
import Home from './components/common/Home.jsx';
import Login from './components/common/Login.jsx';
import Register from './components/common/Register.jsx';
import FoodMenu from './components/common/FoodMenu.jsx';
import HostelLayout from './components/common/HostelLayout.jsx';
import Profile from './components/warden/Profile.jsx';
import ResolveComplaintPage from './components/warden/ResolveComplaintPage.jsx';
import PaymentPage from './components/user/PaymentPage.jsx';
import ProfilePage from './components/user/ProfilePage.jsx';
import RaiseComplaintPage from './components/user/RaiseComplaintPage.jsx';
import EmployeesList from './components/owner/EmployeesList.jsx';
import PaymentsHistory from './components/owner/PaymentsHistory.jsx';
import ProfileOwner from './components/owner/Profile.jsx';
import UsersList from './components/owner/UsersList.jsx';
import ContactUs from './components/common/ContactUs';
import AboutUs from './components/common/AboutUs';
const browserRouterObj = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true, // This replaces path: ''
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'aboutus',
        element: <AboutUs />,
      },{
        path: 'food-menu',
        element: <FoodMenu />,
      },
      {
        path: 'hostel-layout',
        element: <HostelLayout />,
      },
      {
        path: 'contactus',
        element: <ContactUs />,
      },
      {
        path: 'user-profile/:email',
        children: [
          {
            index: true, // Fix for nested route
            element: <ProfilePage />,
          },
          {
            path: 'payment-page',
            element: <PaymentPage />,
          },
          {
            path: 'raise-complaint',
            element: <RaiseComplaintPage />,
          }
        ],
      },
      {
        path: 'warden-profile/:email',
        children: [
          {
            index: true, // Fix for nested route
            element: <Profile />,
          },
          {
            path: 'resolve-complaints',
            element: <ResolveComplaintPage />,
          }
        ],
      },
      {
        path: 'admin-profile/:email',
        children: [
          {
            index: true, // Fix for nested route
            element: <ProfileOwner />,
          },
          {
            path: 'employees-list',
            element: <EmployeesList />,
          },
          {
            path: 'payments',
            element: <PaymentsHistory />,
          },
          {
            path: 'users-list',
            element: <UsersList />,
          },
        ],
      }
    ],
  },
]);


createRoot(document.getElementById('root')).render(
    <RouterProvider router={browserRouterObj} future={{
      v7_startTransition: true,
    }} />
);