// import React, { useState, useEffect, useCallback } from 'react';
// // Corrected imports: Using valid icons and aliasing Fa icons to avoid name conflicts.
// import { AiOutlineSearch, AiOutlineDownload, AiOutlineFilter } from 'react-icons/ai'; 
// import { FaCheckCircle, FaTimesCircle, FaUserCheck } from 'react-icons/fa'; 

// // Mock Data for the Vet List (Re-insert this data into your file)
// const initialVetData = [
//     {
//         id: 'VET001',
//         name: 'Dr. Rajesh Kumar',
//         status: 'Pending',
//         email: 'rajesh.kumar@email.com',
//         phone: '+91 98765-43210',
//         education: 'BVSC & AH, MVSC (Animal Nutrition)',
//         experience: '5 years',
//         license: 'MH/VET/2020/001234',
//         region: 'Maharashtra - Pune District',
//         submitted: '2024-01-15',
//         documents: ['License Certificate', 'Degree Certificate', 'Experience Letter'],
//     },
//     {
//         id: 'VET002',
//         name: 'Dr. Priya Sharma',
//         status: 'Approved',
//         email: 'priya.sharma@email.com',
//         phone: '+91 98765-43211',
//         education: 'BVSC & AH, PhD (Veterinary Medicine)',
//         experience: '12 years',
//         license: 'GJ/VET/2012/05678',
//         region: 'Gujarat - Ahmedabad District',
//         submitted: '2023-07-18',
//         documents: ['License Certificate', 'Degree Certificate', 'Research Papers'],
//     },
//     {
//         id: 'VET003',
//         name: 'Dr. Amit Patel',
//         status: 'Rejected',
//         email: 'amit.patel@email.com',
//         phone: '+91 98765-43212',
//         education: 'BVSC & AH',
//         experience: '3 years',
//         license: 'PB/VET/2021/009876',
//         region: 'Punjab - Ludhiana District',
//         submitted: '2024-01-08',
//         documents: ['License Certificate', 'Degree Certificate'],
//     },
// ];

// // Mock data for a new incoming application
// const newVetApplication = {
//     id: 'VET004',
//     name: 'Dr. Sonal Gupta',
//     status: 'Pending',
//     email: 'sonal.gupta@email.com',
//     phone: '+91 99999-00000',
//     education: 'BVSC & AH, MVSC (Surgery)',
//     experience: '8 years',
//     license: 'DL/VET/2016/10101',
//     region: 'Delhi - Central District',
//     submitted: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }),
//     documents: ['License Certificate', 'Degree Certificate', 'NOC'],
// };

// const VetVerification = () => {
//     const [vetList, setVetList] = useState(initialVetData);
//     const [newAlert, setNewAlert] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');

//     // --- Dynamic Action Handlers ---
//     const handleAction = useCallback((id, actionType) => {
//         setVetList(prevList => 
//             prevList.map(vet => {
//                 if (vet.id === id) {
//                     let newStatus = vet.status;
//                     if (actionType === 'approve') newStatus = 'Approved';
//                     if (actionType === 'reject') newStatus = 'Rejected';
//                     // In a real app, you'd call an API here.
//                     alert(`${vet.name} Status set to ${newStatus}.`);
//                     return { ...vet, status: newStatus };
//                 }
//                 return vet;
//             })
//         );
//     }, []);

//     // --- Real-time Notification Logic (runs every 10 seconds) ---
//     useEffect(() => {
//         const interval = setInterval(() => {
//             // 1. Simulate new vet application arrival
//             setVetList(prevList => [newVetApplication, ...prevList]);
            
//             // 2. Trigger the notification animation
//             setNewAlert(true);
//             setTimeout(() => setNewAlert(false), 8000); // Hide alert after 8 seconds
//         }, 10000); // 10 seconds interval

//         return () => clearInterval(interval);
//     }, []);

//     // Filter logic
//     const filteredVets = vetList.filter(vet =>
//         vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         vet.id.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="p-8 bg-gray-100 min-h-screen">
            
//             {/* Real-time Notification Banner (Animated) */}
//             {newAlert && (
//                 <div 
//                     className="fixed right-5 top-28 z-50 p-4 bg-green-500 text-white rounded-lg shadow-xl flex items-center space-x-3 transition-transform duration-500 animate-slide-in-right"
//                 >
//                     <FaCheckCircle className="text-xl" />
//                     <span className="font-semibold">New Vet Application Received! (VET004)</span>
//                 </div>
//             )}
            
//             {/* Header and Controls */}
//             <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold text-gray-800 flex items-center">
//                         <FaUserCheck className="mr-2 text-2xl text-orange-500" /> {/* CORRECTED ICON */}
//                         Veterinarian Verification System
//                     </h2>
//                     <div className="flex space-x-3">
//                         <button className="flex items-center space-x-2 px-3 py-1.5 border rounded-lg text-gray-700 hover:bg-gray-50">
//                             <AiOutlineDownload /> <span>Export Report</span>
//                         </button>
//                         <button className="flex items-center space-x-2 px-3 py-1.5 border rounded-lg text-gray-700 hover:bg-gray-50">
//                             <AiOutlineFilter /> <span>Advanced Filter</span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Search and Status Filter */}
//                 <div className="flex space-x-4">
//                     <input
//                         type="text"
//                         placeholder="Search by name or ID..."
//                         className="flex-1 px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-shadow duration-200"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <div className="flex items-center space-x-2">
//                         <span className="text-gray-600">All Status ({filteredVets.length})</span>
//                     </div>
//                 </div>
//             </div>

//             {/* Vet List Cards */}
//             <div className="space-y-4">
//                 {filteredVets.map((vet) => (
//                     <div key={vet.id} className="bg-white p-6 rounded-lg shadow-md grid grid-cols-5 gap-4 items-start border-l-4 border-gray-200 animate-fade-in">
                        
//                         {/* 1. Basic Info & Status */}
//                         <div className="col-span-1 border-r pr-4">
//                             <h3 className="text-lg font-semibold text-gray-900">{vet.name}</h3>
//                             <p className="text-sm text-gray-500">ID: {vet.id}</p>
//                             <p className="text-sm text-gray-500">Email: {vet.email}</p>
//                             <p className="text-sm text-gray-500">Phone: {vet.phone}</p>
                            
//                             <div className="mt-3">
//                                 {vet.status === 'Pending' && (
//                                     <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full animate-pulse">Pending</span>
//                                 )}
//                                 {vet.status === 'Approved' && (
//                                     <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
//                                         <FaCheckCircle className="mr-1" /> Approved
//                                     </span>
//                                 )}
//                                 {vet.status === 'Rejected' && (
//                                     <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
//                                         <FaTimesCircle className="mr-1" /> Rejected
//                                     </span>
//                                 )}
//                             </div>
//                         </div>

//                         {/* 2. Qualifications */}
//                         <div className="col-span-2 border-r pr-4">
//                             <h4 className="text-sm font-semibold text-gray-600 mb-1">Qualifications</h4>
//                             <p className="text-base font-medium">{vet.education}</p>
//                             <p className="text-sm text-gray-700">Experience: {vet.experience}</p>
//                             <p className="text-sm text-gray-700">License: {vet.license}</p>
//                             <p className="text-sm text-gray-700">Region: {vet.region}</p>
//                         </div>

//                         {/* 3. Documents */}
//                         <div className="col-span-1 border-r pr-4">
//                             <h4 className="text-sm font-semibold text-gray-600 mb-1">Documents</h4>
//                             {vet.documents.map((doc, i) => (
//                                 <p key={i} className="text-sm text-blue-600 hover:underline cursor-pointer">
//                                     {doc} <span className="text-gray-500 ml-1">View</span>
//                                 </p>
//                             ))}
//                         </div>

//                         {/* 4. Actions & Submission Details */}
//                         <div className="col-span-1 flex flex-col items-end space-y-2">
//                             {vet.status === 'Pending' ? (
//                                 <>
//                                     <button 
//                                         onClick={() => handleAction(vet.id, 'approve')}
//                                         className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm"
//                                     >
//                                         <FaCheckCircle className="inline mr-1" /> Approve
//                                     </button>
//                                     <button 
//                                         onClick={() => handleAction(vet.id, 'reject')}
//                                         className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-sm"
//                                     >
//                                         <FaTimesCircle className="inline mr-1" /> Reject
//                                     </button>
//                                     <button className="w-full text-sm text-blue-600 hover:text-blue-800">Request Info</button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <button className="w-full text-sm text-blue-600 hover:text-blue-800">View Certificate</button>
//                                     <button className="w-full text-sm text-gray-600 hover:text-gray-800">View Details</button>
//                                 </>
//                             )}
//                             <p className="text-xs text-gray-400 mt-2 text-right">Submitted: {vet.submitted}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Add these keyframes to your src/App.css or src/index.css */}
//             <style>
//                 {`
//                 @keyframes slideInRight {
//                     from { transform: translateX(100%); opacity: 0; }
//                     to { transform: translateX(0); opacity: 1; }
//                 }
//                 @keyframes fadeIn {
//                     from { opacity: 0; }
//                     to { opacity: 1; }
//                 }
//                 .animate-slide-in-right {
//                     animation: slideInRight 0.5s ease-out forwards;
//                 }
//                 .animate-fade-in {
//                     animation: fadeIn 0.4s ease-out;
//                 }
//                 `}
//             </style>
//         </div>
//     );
// };

// export default VetVerification;



import React, { useState, useEffect, useCallback } from 'react';
// Corrected imports: Using valid icons and aliasing Fa icons to avoid name conflicts.
import { AiOutlineSearch, AiOutlineDownload, AiOutlineFilter } from 'react-icons/ai'; 
import { FaCheckCircle, FaTimesCircle, FaUserCheck } from 'react-icons/fa'; 

// Mock Data for the Vet List
const initialVetData = [
    {
        id: 'VET001',
        name: 'Dr. Rajesh Kumar',
        status: 'Pending',
        email: 'rajesh.kumar@email.com',
        phone: '+91 98765-43210',
        education: 'BVSC & AH, MVSC (Animal Nutrition)',
        experience: '5 years',
        license: 'MH/VET/2020/001234',
        region: 'Maharashtra - Pune District',
        submitted: '2024-01-15',
        documents: ['License Certificate', 'Degree Certificate', 'Experience Letter'],
    },
    {
        id: 'VET002',
        name: 'Dr. Priya Sharma',
        status: 'Approved',
        email: 'priya.sharma@email.com',
        phone: '+91 98765-43211',
        education: 'BVSC & AH, PhD (Veterinary Medicine)',
        experience: '12 years',
        license: 'GJ/VET/2012/05678',
        region: 'Gujarat - Ahmedabad District',
        submitted: '2023-07-18',
        documents: ['License Certificate', 'Degree Certificate', 'Research Papers'],
    },
    {
        id: 'VET003',
        name: 'Dr. Amit Patel',
        status: 'Rejected',
        email: 'amit.patel@email.com',
        phone: '+91 98765-43212',
        education: 'BVSC & AH',
        experience: '3 years',
        license: 'PB/VET/2021/009876',
        region: 'Punjab - Ludhiana District',
        submitted: '2024-01-08',
        documents: ['License Certificate', 'Degree Certificate'],
    },
    // VET004 is now added to the initial list instead of by the timer
    {
        id: 'VET004',
        name: 'Dr. Sonal Gupta',
        status: 'Pending',
        email: 'sonal.gupta@email.com',
        phone: '+91 99999-00000',
        education: 'BVSC & AH, MVSC (Surgery)',
        experience: '8 years',
        license: 'DL/VET/2016/10101',
        region: 'Delhi - Central District',
        submitted: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }),
        documents: ['License Certificate', 'Degree Certificate', 'NOC'],
    },
];

const VetVerification = () => {
    const [vetList, setVetList] = useState(initialVetData);
    // Keeping newAlert state, although it won't be triggered automatically now.
    const [newAlert, setNewAlert] = useState(false); 
    const [searchTerm, setSearchTerm] = useState('');

    // --- Dynamic Action Handlers ---
    const handleAction = useCallback((id, actionType) => {
        setVetList(prevList => 
            prevList.map(vet => {
                if (vet.id === id) {
                    let newStatus = vet.status;
                    if (actionType === 'approve') newStatus = 'Approved';
                    if (actionType === 'reject') newStatus = 'Rejected';
                    // In a real app, you'd call an API here.
                    alert(`${vet.name} Status set to ${newStatus}.`);
                    return { ...vet, status: newStatus };
                }
                return vet;
            })
        );
    }, []);

    // --- Real-time Notification Logic (REMOVED: The periodic interval simulation) ---
    // The previous useEffect block containing setInterval has been removed.

    // Filter logic
    const filteredVets = vetList.filter(vet =>
        vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vet.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            
            {/* Real-time Notification Banner (Animated) */}
            {newAlert && (
                <div 
                    className="fixed right-5 top-28 z-50 p-4 bg-green-500 text-white rounded-lg shadow-xl flex items-center space-x-3 transition-transform duration-500 animate-slide-in-right"
                >
                    <FaCheckCircle className="text-xl" />
                    <span className="font-semibold">New Vet Application Received! (VET004)</span>
                </div>
            )}
            
            {/* Header and Controls */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <FaUserCheck className="mr-2 text-2xl text-orange-500" />
                        Veterinarian Verification System
                    </h2>
                    <div className="flex space-x-3">
                        <button className="flex items-center space-x-2 px-3 py-1.5 border rounded-lg text-gray-700 hover:bg-gray-50">
                            <AiOutlineDownload /> <span>Export Report</span>
                        </button>
                        <button className="flex items-center space-x-2 px-3 py-1.5 border rounded-lg text-gray-700 hover:bg-gray-50">
                            <AiOutlineFilter /> <span>Advanced Filter</span>
                        </button>
                    </div>
                </div>

                {/* Search and Status Filter */}
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search by name or ID..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-shadow duration-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600">All Status ({filteredVets.length})</span>
                    </div>
                </div>
            </div>

            {/* Vet List Cards */}
            <div className="space-y-4">
                {filteredVets.map((vet) => (
                    <div key={vet.id} className="bg-white p-6 rounded-lg shadow-md grid grid-cols-5 gap-4 items-start border-l-4 border-gray-200 animate-fade-in">
                        
                        {/* 1. Basic Info & Status */}
                        <div className="col-span-1 border-r pr-4">
                            <h3 className="text-lg font-semibold text-gray-900">{vet.name}</h3>
                            <p className="text-sm text-gray-500">ID: {vet.id}</p>
                            <p className="text-sm text-gray-500">Email: {vet.email}</p>
                            <p className="text-sm text-gray-500">Phone: {vet.phone}</p>
                            
                            <div className="mt-3">
                                {vet.status === 'Pending' && (
                                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full animate-pulse">Pending</span>
                                )}
                                {vet.status === 'Approved' && (
                                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                        <FaCheckCircle className="mr-1" /> Approved
                                    </span>
                                )}
                                {vet.status === 'Rejected' && (
                                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                                        <FaTimesCircle className="mr-1" /> Rejected
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* 2. Qualifications */}
                        <div className="col-span-2 border-r pr-4">
                            <h4 className="text-sm font-semibold text-gray-600 mb-1">Qualifications</h4>
                            <p className="text-base font-medium">{vet.education}</p>
                            <p className="text-sm text-gray-700">Experience: {vet.experience}</p>
                            <p className="text-sm text-gray-700">License: {vet.license}</p>
                            <p className="text-sm text-gray-700">Region: {vet.region}</p>
                        </div>

                        {/* 3. Documents */}
                        <div className="col-span-1 border-r pr-4">
                            <h4 className="text-sm font-semibold text-gray-600 mb-1">Documents</h4>
                            {vet.documents.map((doc, i) => (
                                <p key={i} className="text-sm text-blue-600 hover:underline cursor-pointer">
                                    {doc} <span className="text-gray-500 ml-1">View</span>
                                </p>
                            ))}
                        </div>

                        {/* 4. Actions & Submission Details */}
                        <div className="col-span-1 flex flex-col items-end space-y-2">
                            {vet.status === 'Pending' ? (
                                <>
                                    <button 
                                        onClick={() => handleAction(vet.id, 'approve')}
                                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm"
                                    >
                                        <FaCheckCircle className="inline mr-1" /> Approve
                                    </button>
                                    <button 
                                        onClick={() => handleAction(vet.id, 'reject')}
                                        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-sm"
                                    >
                                        <FaTimesCircle className="inline mr-1" /> Reject
                                    </button>
                                    <button className="w-full text-sm text-blue-600 hover:text-blue-800">Request Info</button>
                                </>
                            ) : (
                                <>
                                    <button className="w-full text-sm text-blue-600 hover:text-blue-800">View Certificate</button>
                                    <button className="w-full text-sm text-gray-600 hover:text-gray-800">View Details</button>
                                </>
                            )}
                            <p className="text-xs text-gray-400 mt-2 text-right">Submitted: {vet.submitted}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add these keyframes to your src/App.css or src/index.css */}
            <style>
                {`
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-slide-in-right {
                    animation: slideInRight 0.5s ease-out forwards;
                }
                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out;
                }
                `}
            </style>
        </div>
    );
};

export default VetVerification;