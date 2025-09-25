import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { AiOutlineBarChart, AiOutlineDashboard, AiOutlineUser, AiOutlineAlert, AiOutlineFileText, AiOutlineSetting } from 'react-icons/ai';

const Sidebar = () => {
  const { level } = useParams();
  const location = useLocation();

  // Base path for all dashboard links (e.g., /dashboard/state)
  const basePath = `/dashboard/${level}`;

  // Function to determine if a link is active based on the current URL pathname
  const isActive = (path) => {
    // For the Overview (index) route: check if the pathname exactly matches the base path
    if (path === basePath) {
      return location.pathname === basePath || location.pathname === `${basePath}/`;
    }
    return location.pathname.includes(path);
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg pt-24 mt-10">
      <nav className="p-4 space-y-2">

        {/* 1. Overview Link (Dashboard Index) */}
        <Link
          to={basePath}
          className={`flex items-center space-x-3 p-3 rounded-lg font-medium shadow-md transition-colors 
            ${isActive(basePath) ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <AiOutlineDashboard className="h-5 w-5" />
          <span>Overview</span>
        </Link>

        {/* 2. Real-time Monitoring Link */}
        <Link
          to={`${basePath}/monitoring`}
          className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors 
            ${isActive('/monitoring') ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <AiOutlineBarChart className="h-5 w-5" />
          <span>Real-time Monitoring</span>
        </Link>

        {/* 3. Vet Verification Link (Placeholder) */}
        <Link
          to={`${basePath}/vet-verification`} // CHANGED PATH
          className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors 
        ${isActive('/vet-verification') ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <AiOutlineUser className="h-5 w-5" />
          <span>Vet Verification</span>
        </Link>

        {/* 4. Alerts & Compliance Link (Placeholder) */}
        <Link
          to={`${basePath}/alerts-compliance`} // CHANGED PATH
          className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors 
            ${isActive('/alerts-compliance') ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <AiOutlineAlert className="h-5 w-5" />
          <span>Alerts & Compliance</span>
        </Link>

        {/* 5. Reports & Analytics Link (Placeholder) */}
        <Link
          to={`${basePath}/reports-analytics`}
          className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors 
            ${isActive('/reports-analytics') ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <AiOutlineFileText className="h-5 w-5" />
          <span>Reports & Analytics</span>
        </Link>

        {/* 6. Settings Link (Placeholder) */}
        <Link
          to={`${basePath}/settings`}
          className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors 
            ${isActive('/settings') ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <AiOutlineSetting className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;