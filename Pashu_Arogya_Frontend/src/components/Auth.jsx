// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Header from './Header';

// const Auth = () => {
//   const { level } = useParams();
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [region, setRegion] = useState('');
//   const [district, setDistrict] = useState('');

//   const states = ['Maharashtra', 'Gujarat', 'Punjab', 'Karnataka', 'Tamil Nadu'];
//   const districts = {
//     Maharashtra: ['Pune', 'Mumbai', 'Kolhapur'],
//     Gujarat: ['Ahmedabad', 'Surat'],
//     Punjab: ['Ludhiana', 'Amritsar'],
//     // ... add more districts
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // In a real app, you would send this to an API for verification
//     if (username && password) {
//       navigate(`/dashboard/${level}`, { state: { username, region, district } });
//     } else {
//       alert('Please enter username and password.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <main className="pt-24 flex items-center justify-center">
//         <div className="w-full max-w-sm mx-auto p-8 bg-white rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Authentication</h2>
//           <p className="text-center text-gray-600 mb-4">Enter your credentials to access the portal</p>
//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Username</label>
//               <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Password</label>
//               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
//             </div>
//             {level !== 'central' && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Region</label>
//                 <select value={region} onChange={(e) => setRegion(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
//                   <option value="">Select your region</option>
//                   {states.map((state) => (
//                     <option key={state} value={state}>{state}</option>
//                   ))}
//                 </select>
//               </div>
//             )}
//             {level === 'district' && region && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">District</label>
//                 <select value={district} onChange={(e) => setDistrict(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
//                   <option value="">Select your district</option>
//                   {districts[region]?.map((d) => (
//                     <option key={d} value={d}>{d}</option>
//                   ))}
//                 </select>
//               </div>
//             )}
//             <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//               Access Portal
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Auth;



import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineLock, AiOutlineUser, AiOutlineArrowRight } from 'react-icons/ai';
import { FaShieldAlt } from 'react-icons/fa'; // Using FaShieldAlt as a placeholder for the form logo

const Auth = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  
  // State for all form fields
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [otp, setOtp] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const states = ['Maharashtra', 'Gujarat', 'Punjab', 'Karnataka', 'Tamil Nadu'];
  const districts = {
    Maharashtra: ['Pune', 'Mumbai', 'Kolhapur'],
    Gujarat: ['Ahmedabad', 'Surat'],
    Punjab: ['Ludhiana', 'Amritsar'],
    // ... add more districts
  };

  const getLevelTitle = () => {
    if (level === 'central') return 'Central Authority';
    if (level === 'state') return 'State Authority';
    return 'District Authority';
  };

  const getDashboardButtonText = () => {
    return `Sign in to ${getLevelTitle()} Dashboard`;
  };

  const getSubtitleText = () => {
    if (level === 'central') return 'National level access to all states data';
    if (level === 'state') return 'State level access to district data';
    return 'District level access to village data';
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you would send this to an API for verification
    if (employeeId && password) {
      navigate(`/dashboard/${level}`, { state: { employeeId, region, district } });
    } else {
      alert('Please enter Employee ID and Password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <main className="flex items-center justify-center w-full">
        <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-xl">
          
          {/* Form Header (Matches image style) */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 p-3 bg-white rounded-full inline-block border border-gray-200">
              <FaShieldAlt className="text-orange-500 text-3xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{getLevelTitle()} Login</h2>
            <p className="text-sm text-gray-500">{getSubtitleText()}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Employee ID Field (Replaces Username) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee ID *</label>
              <div className="relative mt-1">
                <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={employeeId} 
                  onChange={(e) => setEmployeeId(e.target.value)} 
                  placeholder="Enter your employee ID"
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                  required
                />
              </div>
            </div>
            
            {/* Conditional Region (State) Field */}
            {level !== 'central' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">State *</label>
                <div className="relative mt-1">
                  <select 
                    value={region} 
                    onChange={(e) => setRegion(e.target.value)} 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                    required
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            
            {/* Conditional District Field */}
            {level === 'district' && region && (
              <div>
                <label className="block text-sm font-medium text-gray-700">District *</label>
                <div className="relative mt-1">
                  <select 
                    value={district} 
                    onChange={(e) => setDistrict(e.target.value)} 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                    required
                  >
                    <option value="">Select District</option>
                    {districts[region]?.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password *</label>
              <div className="relative mt-1">
                <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter your password"
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                  required
                />
              </div>
            </div>

            {/* OTP Section (Two-Factor Authentication) */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">OTP (Two-Factor Authentication)</label>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  placeholder="Enter 6-digit OTP"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                />
                <button type="button" className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600">
                  Send OTP
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <input 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-gray-900">
                  Remember me
                </label>
              </div>
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>

            <button type="submit" className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white 
              ${level === 'central' ? 'bg-indigo-700 hover:bg-indigo-800' : level === 'state' ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700'} 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors space-x-2`}
            >
              <AiOutlineArrowRight className="text-xl" />
              <span>{getDashboardButtonText()}</span>
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-md text-sm">
            <h3 className="font-semibold">Security Notice</h3>
            <p>This is a secure government portal. All activities are logged and monitored.</p>
          </div>

          <div className="mt-4 text-center text-sm">
            <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
              ← Back to Home
            </a>
            <span className="mx-2">|</span>
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Need Help?
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;