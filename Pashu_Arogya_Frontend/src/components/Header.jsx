import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineBell, AiOutlineLogout } from 'react-icons/ai';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // In a real application, you would clear authentication tokens here
    navigate('/');
  };

  const isDashboardPage = location.pathname.startsWith('/dashboard');

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar - Black */}
      <div className="bg-gray-800 text-white text-sm px-6 py-1 flex justify-between items-center">
        <span>भारत सरकार | Government of India</span>
        <span>Our Toll Free Number: 1800 115 565 (10:00 AM to 05:30 PM)</span>
      </div>

      {/* Bottom Bar - White (Conditionally rendered) */}
      {isDashboardPage && (
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center">
              <img src="/logo.jpg" alt="Portal Logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <span className="text-xl font-semibold text-gray-800">Authority Dashboard</span>
              <p className="text-sm text-gray-500">Digital Farm Management Portal</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search here"
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <button className="p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <AiOutlineBell className="text-lg" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-green-700 bg-white hover:bg-gray-100 transition-colors">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>System Online</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-red-500 hover:bg-gray-100 transition-colors"
            >
              <AiOutlineLogout className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;