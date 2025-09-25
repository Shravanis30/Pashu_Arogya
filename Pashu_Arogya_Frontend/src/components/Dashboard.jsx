// import React from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import Header from './Header';
// import Sidebar from './Sidebar';
// import DashboardContent from './DashboardContent'; // Import the new component

// const Dashboard = () => {
//   const { level } = useParams();
//   const location = useLocation();
//   const { region, district } = location.state || {};

//   const getTitle = () => {
//     if (level === 'state') return 'State Authority Dashboard';
//     if (level === 'district') return 'District Authority Dashboard';
//     return 'Central Authority Dashboard';
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       <Header />
//       <Sidebar />
      
//       <main className="flex-1 pl-64 pt-24 pb-8 pr-8 mt-8 ml-2">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-10">{getTitle()}</h1>
        
//         <DashboardContent /> 
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';
import { useParams, useLocation, Outlet } from 'react-router-dom'; // Import Outlet
import Header from './Header';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const { level } = useParams();
  const location = useLocation();
  const { region, district } = location.state || {};

  const getTitle = () => {
    if (level === 'state') return 'State Authority Dashboard';
    if (level === 'district') return 'District Authority Dashboard';
    return 'Central Authority Dashboard';
  };
  
  // Adjusted padding for fixed header/sidebar
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Header />
      <Sidebar />
      
      <main className="flex-1 pl-64 pt-24 pb-8 pr-8 ml-2">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-12">{getTitle()}</h1>
        
        <Outlet /> {/* CHANGED: Renders either Overview (index) or RealtimeMonitoring (monitoring) */}
      </main>
    </div>
  );
};

export default Dashboard;