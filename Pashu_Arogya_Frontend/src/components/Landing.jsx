// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from './Header';

// const Landing = () => {
//   const navigate = useNavigate();

//   const authorityLevels = [
//     { title: 'Central Authority', desc: 'National level oversight and policy management', level: 'central', icon: 'M10 2a8 8 0 100 16 8 8 0 000-16zM5 8a5 5 0 1110 0 5 5 0 01-10 0z', color: 'text-orange-500 bg-orange-100' },
//     { title: 'State Authority', desc: 'State-wide livestock management and compliance', level: 'state', icon: 'M16 12a4 4 0 10-8 0 4 4 0 008 0z', color: 'text-blue-500 bg-blue-100' },
//     { title: 'District Authority', desc: 'District level farm monitoring and field operations', level: 'district', icon: 'M10 12a2 2 0 100-4 2 2 0 000 4z', color: 'text-green-500 bg-green-100' },
//   ];

//   const handleSelect = (level) => {
//     navigate(`/auth/${level}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <main className="pt-24 flex items-center justify-center">
//         <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Select Your Authority Level</h2>
//           <p className="text-center text-gray-600 mb-10">Choose your authority level to access the appropriate dashboard and monitoring tools</p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {authorityLevels.map((item) => (
//               <div
//                 key={item.level}
//                 onClick={() => handleSelect(item.level)}
//                 className="bg-white p-6 rounded-lg border border-gray-200 text-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
//               >
//                 <div className={`mx-auto mb-4 p-4 rounded-full ${item.color} inline-block`}>
//                   <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path d={item.icon} /></svg>
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
//                 <p className="text-sm text-gray-600">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Landing;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { AiOutlineBarChart, AiOutlineAreaChart, AiOutlineEnvironment, AiOutlineLogin } from 'react-icons/ai';

const Landing = () => {
  const navigate = useNavigate();

  const authorityLevels = [
    { 
      title: 'Central Authority', 
      desc: 'National level oversight and policy management', 
      level: 'central', 
      icon: AiOutlineAreaChart, 
      color: 'text-red-600', 
      bg: 'bg-red-50',
      features: ['National AMU/AMR Forecasting', 'All-State Compliance Metrics', 'Policy Insight Generation']
    },
    { 
      title: 'State Authority', 
      desc: 'State-wide livestock management and compliance', 
      level: 'state', 
      icon: AiOutlineBarChart, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      features: ['District-level AMU Trend Analysis', 'Vet Verification Workflow', 'State-specific Compliance Audits']
    },
    { 
      title: 'District Authority', 
      desc: 'District level farm monitoring and field operations', 
      level: 'district', 
      icon: AiOutlineEnvironment, 
      color: 'text-green-600', 
      bg: 'bg-green-50',
      features: ['Real-time Farm/Village Monitoring', 'Emergency Response Coordination', 'Local Residue Anomaly Alerts']
    },
  ];

  const handleSelect = (level) => {
    navigate(`/auth/${level}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-32 pb-16 flex flex-col items-center justify-center">
        
        {/* Title Section with Animation */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3 animate-fade-in-down">
            Select Your Authority Level
          </h2>
          <p className="text-lg text-gray-600 animate-fade-in-down delay-200">
            Access role-based monitoring dashboards and compliance tools based on your administrative jurisdiction.
          </p>
        </div>

        {/* Authority Cards Grid */}
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {authorityLevels.map((item, index) => (
            <div
              key={item.level}
              onClick={() => handleSelect(item.level)}
              className={`
                bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center cursor-pointer 
                hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out
                transform hover:z-10 animate-fade-in-up delay-${index * 200}
              `}
              style={{ animationDelay: `${index * 0.2}s` }} // Custom delay for staggered entry
            >
              
              {/* Icon and Title */}
              <div className={`mx-auto mb-6 p-5 rounded-full ${item.bg} inline-block transition-colors duration-300`}>
                <item.icon className={`h-10 w-10 ${item.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-md text-gray-500 mb-6">{item.desc}</p>

              {/* Specific Features List */}
              <ul className="text-left space-y-2 mb-8 border-t pt-4">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <span className="text-green-500 mr-3 text-lg">•</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Call to Action Button */}
              <button 
                className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-white font-semibold 
                            bg-orange-500 hover:bg-orange-600 transition-colors duration-200 shadow-md`}
              >
                <AiOutlineLogin className="text-lg" />
                <span>Click to Access Portal</span>
              </button>
            </div>
          ))}
        </div>
      </main>
      
      {/* Global CSS for Animations (You should add these classes to your src/App.css or src/index.css) */}
      {/* <style>
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fadeInDown 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .delay-200 { animation-delay: 0.2s; }
      </style>
      */}
    </div>
  );
};

export default Landing;