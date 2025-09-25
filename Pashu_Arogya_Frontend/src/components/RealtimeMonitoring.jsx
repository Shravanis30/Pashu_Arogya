// import React, { useState, useEffect } from 'react';
// import { AiOutlineBarChart, AiOutlineFileText, AiOutlineWarning, AiOutlineSchedule, AiOutlineRight, AiOutlineEnvironment, AiOutlineAlert, AiOutlineSetting } from 'react-icons/ai'; 
// // Use Leaflet components for free mapping
// import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'; 

// // Path to the GeoJSON file (must be in your public folder)
// const districtBoundariesGeoJSON = "/geoBoundaries-IND-ADM2.geojson"; 

// // Helper function to calculate initial map position [Latitude, Longitude, Zoom]
// const getMapPosition = (state) => {
//     // Note: Add precise coordinates for all states here for accurate centering.
//     if (state === 'Maharashtra') return [19.5, 75.5, 6]; 
//     if (state === 'Gujarat') return [22.2587, 71.1924, 6];
//     return [20.5937, 78.9629, 4]; // Center of India (Default)
// };

// // Function to style the GeoJSON polygons (District Boundaries)
// const geoJsonStyle = (feature) => {
//     // This function simulates linking the boundary data to a risk score.
//     // In a final application, you would link feature.properties.shapeName 
//     // to your fetched risk data.
    
//     // Mock risk coloring based on a random score for visual proof
//     const mockRiskScore = Math.random(); 

//     let color = '#34a853'; // Low Risk (Green)
//     if (mockRiskScore > 0.8) color = '#d73027'; // Critical Risk (Red)
//     else if (mockRiskScore > 0.5) color = '#fe9929'; // High Risk (Orange)

//     return {
//         fillColor: color,
//         weight: 1.5,
//         opacity: 1,
//         color: '#444', // Outline color
//         fillOpacity: 0.5,
//     };
// };

// const RealtimeMonitoring = () => {
//     const [activeTab, setActiveTab] = useState('overview');
//     const [selectedState, setSelectedState] = useState('Maharashtra'); 
//     const [mapPosition, setMapPosition] = useState(getMapPosition('Maharashtra')); 
//     // State to hold the parsed GeoJSON object
//     const [geoJsonData, setGeoJsonData] = useState(null); 

//     // --- Data Fetching Logic (FIXES THE GEOJSON ERROR) ---
//     useEffect(() => {
//         // Fetch the GeoJSON file from the public folder
//         fetch(districtBoundariesGeoJSON)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 // Set the parsed JSON object to state
//                 setGeoJsonData(data); 
//             })
//             .catch(error => {
//                 console.error("Could not load GeoJSON file:", error);
//             });
//     }, []); // Run only once on mount

//     // Update map view when selectedState changes
//     React.useEffect(() => {
//         setMapPosition(getMapPosition(selectedState));
//     }, [selectedState]);


//     // Mock data for State Selection and Alerts (expanded)
//     const states = ['Maharashtra', 'Gujarat', 'Punjab', 'Karnataka', 'All India'];
    
//     // Mock data for tabs
//     const overviewData = {
//         totalCases: '2,847',
//         complianceRate: '94.2%',
//         activeViolations: 23,
//         farmsMonitored: 156,
//     };
//     const speciesData = [
//         { name: 'Cattle', cases: 1245, trend: '-5.2% decrease', compliance: '96.1%' },
//         { name: 'Buffalo', cases: 856, trend: '-12.4% decrease', compliance: '92.8%' },
//     ];
//     const regionData = [
//         { name: 'Maharashtra', alerts: 3, cases: 1456, trend: '-7.2% decrease' },
//         { name: 'Gujarat', alerts: 1, cases: 678, trend: '-10.5% decrease' },
//     ];
//     const riskData = [
//         { name: 'Ramesh Patil', risk: 'High Risk', score: '8.5/10', farmId: 'FRM-2024-158', region: 'Maharashtra-Pune', issues: ['High AMU frequency', 'Withdrawal violations'] },
//         { name: 'Suresh Kale', risk: 'Medium Risk', score: '7.8/10', farmId: 'FRM-2024-234', region: 'Maharashtra-Nashik', issues: ['Overdose incidents', 'Missing documentation'] },
//     ];


//     const renderContent = () => {
//         switch (activeTab) {
//             case 'overview':
//                 return (
//                     <div className="space-y-6">
//                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                             {/* Summary Metrics (kept simple for this component) */}
//                             <div className="bg-gray-50 p-4 rounded-lg">
//                                 <p className="text-2xl font-bold">{overviewData.totalCases}</p>
//                                 <p className="text-sm text-gray-500">Total AMU Cases</p>
//                                 <span className="text-sm text-green-500 font-semibold flex items-center">
//                                     <AiOutlineBarChart className="mr-1" /> 8.9% decrease
//                                 </span>
//                             </div>
//                             <div className="bg-gray-50 p-4 rounded-lg">
//                                 <p className="text-2xl font-bold">{overviewData.complianceRate}</p>
//                                 <p className="text-sm text-gray-500">Compliance Rate</p>
//                                 <span className="text-sm text-green-500 font-semibold">vs 93.1% last month</span>
//                             </div>
//                             <div className="bg-gray-50 p-4 rounded-lg">
//                                 <p className="text-2xl font-bold">{overviewData.activeViolations}</p>
//                                 <p className="text-sm text-gray-500">Active Violations</p>
//                                 <span className="text-sm text-red-500 font-semibold">Requires attention</span>
//                             </div>
//                             <div className="bg-gray-50 p-4 rounded-lg">
//                                 <p className="text-2xl font-bold">{overviewData.farmsMonitored}</p>
//                                 <p className="text-sm text-gray-500">Farms Monitored</p>
//                                 <span className="text-sm text-green-500 font-semibold">+12 new this month</span>
//                             </div>
//                         </div>
//                         <div className="bg-gray-200 h-64 rounded-lg flex flex-col items-center justify-center">
//                             <AiOutlineBarChart className="text-4xl text-gray-500 mb-2" />
//                             <span className="text-gray-600">AMU Trend Visualization</span>
//                             <p className="text-xs text-gray-500">Interactive charts showing usage patterns over time</p>
//                             <button className="mt-4 px-4 py-2 bg-white rounded-md border border-gray-300 text-gray-700 text-sm">
//                                 View Detailed Charts
//                             </button>
//                         </div>
//                     </div>
//                 );
//             case 'bySpecies':
//                 return (
//                     <div className="space-y-4">
//                         {speciesData.map((species, index) => (
//                             <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
//                                 <div className="flex items-center space-x-4">
//                                     <div className="flex flex-col">
//                                         <h3 className="text-lg font-semibold">{species.name}</h3>
//                                         <span className={`text-sm ${species.trend.includes('decrease') ? 'text-red-500' : 'text-green-500'}`}>{species.trend}</span>
//                                     </div>
//                                     <span className="text-sm text-gray-500">Compliance: {species.compliance}</span>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                     <span className="text-sm font-bold text-blue-600">{species.cases} cases</span>
//                                     <AiOutlineRight className="text-gray-400" />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 );
//             case 'byRegion':
//                 return (
//                     <div className="space-y-4">
//                         {regionData.map((region, index) => (
//                             <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
//                                 <div className="flex items-center space-x-4">
//                                     <div className="flex flex-col">
//                                         <h3 className="text-lg font-semibold">{region.name}</h3>
//                                         <span className={`text-sm ${region.trend.includes('decrease') ? 'text-red-500' : 'text-green-500'}`}>{region.trend}</span>
//                                     </div>
//                                     {region.alerts > 0 && <span className="text-sm font-bold text-red-500 px-2 py-1 bg-red-100 rounded-full">{region.alerts} alerts</span>}
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                     <span className="text-sm font-bold text-gray-600">{region.cases} cases</span>
//                                     <AiOutlineRight className="text-gray-400" />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 );
//             case 'riskAnalysis':
//                 return (
//                     <div className="space-y-4">
//                         <p className="text-gray-600 mb-4">High-Risk Farms Requiring Attention</p>
//                         {riskData.map((farm, index) => (
//                             <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-start">
//                                 <div className="flex-1">
//                                     <div className="flex items-center space-x-2 mb-2">
//                                         <h3 className="text-lg font-semibold">{farm.name}</h3>
//                                         <span className={`px-2 py-1 rounded-full text-xs font-bold ${farm.risk.includes('High') ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>{farm.risk.toUpperCase()}</span>
//                                         <span className="text-sm text-gray-500">Score: {farm.score}</span>
//                                     </div>
//                                     <p className="text-xs text-gray-500">Farm ID: {farm.farmId}</p>
//                                     <p className="text-xs text-gray-500">Region: {farm.region}</p>
//                                     <div className="mt-2">
//                                         <p className="text-sm font-semibold mb-1">Identified issues:</p>
//                                         <div className="flex flex-wrap gap-2">
//                                             {farm.issues.map((issue, i) => (
//                                                 <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">{issue}</span>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="flex-shrink-0 flex flex-col space-y-2">
//                                     <button className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-semibold">Schedule Inspection</button>
//                                     <button className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 text-sm font-semibold">View Details</button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold text-gray-800 flex items-center">
//                     <AiOutlineBarChart className="mr-2 text-xl" />
//                     Real-time Monitoring
//                 </h2>
//                 <div className="flex items-center space-x-2">
//                     {/* State Selection Dropdown */}
//                     <select 
//                         className="border rounded-md text-sm p-2"
//                         value={selectedState}
//                         onChange={(e) => setSelectedState(e.target.value)}
//                     >
//                         {states.map((state) => (
//                             <option key={state} value={state}>{state}</option>
//                         ))}
//                     </select>

//                     <button className="flex items-center text-blue-600 text-sm px-3 py-1 border rounded-md">
//                         <AiOutlineFileText className="mr-1" />Export Data
//                     </button>
//                 </div>
//             </div>
            
//             {/* Map Visualization and Red Alerts Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//                 {/* Map Component - 2/3 width */}
//                 <div className="lg:col-span-2 rounded-lg relative overflow-hidden h-96 shadow-lg border border-gray-200">
//                     <MapContainer 
//                         key={selectedState} // Key change forces re-render/re-centering when state changes
//                         center={[mapPosition[0], mapPosition[1]]} // Latitude, Longitude
//                         zoom={mapPosition[2]} 
//                         scrollWheelZoom={true}
//                         className="h-full w-full z-0" 
//                     >
//                         {/* OpenStreetMap Tile Layer (The actual map background) */}
//                         <TileLayer
//                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                         />

//                         {/* RENDER GEOJSON ONLY WHEN DATA IS LOADED */}
//                         {geoJsonData ? (
//                             <GeoJSON 
//                                 data={geoJsonData} // Pass the parsed object
//                                 style={geoJsonStyle} 
//                             />
//                         ) : (
//                             <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center">
//                                 <AiOutlineEnvironment className="text-8xl text-gray-400" />
//                                 <span className="text-lg text-gray-600">Loading District Boundaries...</span>
//                             </div>
//                         )}
                        
//                         {/* Static text overlay for map context */}
//                         <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-md text-sm z-10">
//                             Showing risk map for **{selectedState}**
//                         </div>
//                     </MapContainer>
//                 </div>

//                 {/* Red Alerts Summary - 1/3 width */}
//                 <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-lg">
//                     <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//                          <AiOutlineWarning className="text-red-500 mr-2" /> Active Red Alerts ({regionData.find(r => r.name === selectedState)?.alerts || 0})
//                     </h3>
//                     <div className="space-y-3 max-h-80 overflow-y-auto">
//                         {/* Mock Alert Items (for visualization) */}
//                         <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-md">
//                             <p className="text-sm font-semibold text-red-700">Withdrawal Period Violation</p>
//                             <p className="text-xs text-gray-600">Pune District - Sunrise Dairy</p>
//                         </div>
//                          <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-md">
//                             <p className="text-sm font-semibold text-red-700">Drug Overdose Case</p>
//                             <p className="text-xs text-gray-600">Nashik District - Green Valley</p>
//                         </div>
//                          <div className="p-3 border-l-4 border-orange-500 bg-orange-50 rounded-md">
//                             <p className="text-sm font-semibold text-orange-700">Vet License Expiring Soon</p>
//                             <p className="text-xs text-gray-600">Mumbai District - Dr. S. Verma</p>
//                         </div>
//                          <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-md">
//                             <p className="text-sm font-semibold text-red-700">New High-Risk Farm Detected</p>
//                             <p className="text-xs text-gray-600">Kolhapur District - Multiple Farms</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//             {/* AMU Trend Tabs (Original Content) */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//                 <div className="flex space-x-2 mb-4">
//                     <button
//                         className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'overview' ? 'bg-gray-200' : 'bg-gray-100'}`}
//                         onClick={() => setActiveTab('overview')}
//                     >
//                         Overview
//                     </button>
//                     <button
//                         className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'bySpecies' ? 'bg-gray-200' : 'bg-gray-100'}`}
//                         onClick={() => setActiveTab('bySpecies')}
//                     >
//                         By Species
//                     </button>
//                     <button
//                         className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'byRegion' ? 'bg-gray-200' : 'bg-gray-100'}`}
//                         onClick={() => setActiveTab('byRegion')}
//                     >
//                         By Region
//                     </button>
//                     <button
//                         className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'riskAnalysis' ? 'bg-gray-200' : 'bg-gray-100'}`}
//                         onClick={() => setActiveTab('riskAnalysis')}
//                     >
//                         Risk Analysis
//                     </button>
//                 </div>

//                 {renderContent()}
//             </div>
//         </div>
//     );
// };

// export default RealtimeMonitoring;




// src/components/RealtimeMonitoring.jsx
import React, { useState } from 'react';
import { AiOutlineBarChart, AiOutlineFileText, AiOutlineWarning, AiOutlineSchedule, AiOutlineRight, AiOutlineEnvironment, AiOutlineAlert, AiOutlineSetting } from 'react-icons/ai'; 
// Import the new IndiaHeatmap component
import IndiaHeatmap from './IndiaHeatmap'; 


// Mock data for tabs
const overviewData = {
    totalCases: '2,847',
    complianceRate: '94.2%',
    activeViolations: 23,
    farmsMonitored: 156,
};
const speciesData = [
    { name: 'Cattle', cases: 1245, trend: '-5.2% decrease', compliance: '96.1%' },
    { name: 'Buffalo', cases: 856, trend: '-12.4% decrease', compliance: '92.8%' },
    { name: 'Goat', cases: 543, trend: '+2.1% increase', compliance: '95.4%' },
    { name: 'Sheep', cases: 203, trend: '-15.6% decrease', compliance: '88.9%' },
];
const regionData = [
    { name: 'Maharashtra', alerts: 3, cases: 1456, trend: '-7.2% decrease' },
    { name: 'Gujarat', alerts: 1, cases: 678, trend: '-10.5% decrease' },
    { name: 'Punjab', alerts: 2, cases: 445, trend: '-5.8% decrease' },
    { name: 'Karnataka', alerts: 0, cases: 268, trend: '-12.1% decrease' },
];
const riskData = [
    { name: 'Ramesh Patil', risk: 'High Risk', score: '8.5/10', farmId: 'FRM-2024-158', region: 'Maharashtra-Pune', issues: ['High AMU frequency', 'Withdrawal violations'] },
    { name: 'Suresh Kale', risk: 'Medium Risk', score: '7.8/10', farmId: 'FRM-2024-234', region: 'Maharashtra-Nashik', issues: ['Overdose incidents', 'Missing documentation'] },
    { name: 'Prakash Jadhav', risk: 'Medium Risk', score: '6.9/10', farmId: 'FRM-2024-087', region: 'Maharashtra-Satara', issues: ['Irregular vet consultations'] },
];

const RealtimeMonitoring = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedState, setSelectedState] = useState('Maharashtra'); 
    
    const states = ['Maharashtra', 'Gujarat', 'Punjab', 'Karnataka', 'All India'];
    
    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Summary Metrics */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-2xl font-bold">{overviewData.totalCases}</p>
                                <p className="text-sm text-gray-500">Total AMU Cases</p>
                                <span className="text-sm text-green-500 font-semibold flex items-center">
                                    <AiOutlineBarChart className="mr-1" /> 8.9% decrease
                                </span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-2xl font-bold">{overviewData.complianceRate}</p>
                                <p className="text-sm text-gray-500">Compliance Rate</p>
                                <span className="text-sm text-green-500 font-semibold">vs 93.1% last month</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-2xl font-bold">{overviewData.activeViolations}</p>
                                <p className="text-sm text-gray-500">Active Violations</p>
                                <span className="text-sm text-red-500 font-semibold">Requires attention</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-2xl font-bold">{overviewData.farmsMonitored}</p>
                                <p className="text-sm text-gray-500">Farms Monitored</p>
                                <span className="text-sm text-green-500 font-semibold">+12 new this month</span>
                            </div>
                        </div>
                        <div className="bg-gray-200 h-64 rounded-lg flex flex-col items-center justify-center">
                            <AiOutlineBarChart className="text-4xl text-gray-500 mb-2" />
                            <span className="text-gray-600">AMU Trend Visualization</span>
                            <p className="text-xs text-gray-500">Interactive charts showing usage patterns over time</p>
                            <button className="mt-4 px-4 py-2 bg-white rounded-md border border-gray-300 text-gray-700 text-sm">
                                View Detailed Charts
                            </button>
                        </div>
                    </div>
                );
            case 'bySpecies':
                return (
                    <div className="space-y-4">
                        {speciesData.map((species, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-semibold">{species.name}</h3>
                                        <span className={`text-sm ${species.trend.includes('decrease') ? 'text-red-500' : 'text-green-500'}`}>{species.trend}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">Compliance: {species.compliance}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-bold text-blue-600">{species.cases} cases</span>
                                    <AiOutlineRight className="text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'byRegion':
                return (
                    <div className="space-y-4">
                        {regionData.map((region, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-semibold">{region.name}</h3>
                                        <span className={`text-sm ${region.trend.includes('decrease') ? 'text-red-500' : 'text-green-500'}`}>{region.trend}</span>
                                    </div>
                                    {region.alerts > 0 && <span className="text-sm font-bold text-red-500 px-2 py-1 bg-red-100 rounded-full">{region.alerts} alerts</span>}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-bold text-gray-600">{region.cases} cases</span>
                                    <AiOutlineRight className="text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'riskAnalysis':
                return (
                    <div className="space-y-4">
                        <p className="text-gray-600 mb-4">High-Risk Farms Requiring Attention</p>
                        {riskData.map((farm, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <h3 className="text-lg font-semibold">{farm.name}</h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${farm.risk.includes('High') ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>{farm.risk.toUpperCase()}</span>
                                        <span className="text-sm text-gray-500">Score: {farm.score}</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Farm ID: {farm.farmId}</p>
                                    <p className="text-xs text-gray-500">Region: {farm.region}</p>
                                    <div className="mt-2">
                                        <p className="text-sm font-semibold mb-1">Identified issues:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {farm.issues.map((issue, i) => (
                                                <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">{issue}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 flex flex-col space-y-2">
                                    <button className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-semibold">Schedule Inspection</button>
                                    <button className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 text-sm font-semibold">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <AiOutlineBarChart className="mr-2 text-xl" />
                    Real-time Monitoring
                </h2>
                <div className="flex items-center space-x-2">
                    {/* State Selection Dropdown (Now only controls Alerts Summary and Export button) */}
                    <select 
                        className="border rounded-md text-sm p-2"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                    >
                        {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>

                    <button className="flex items-center text-blue-600 text-sm px-3 py-1 border rounded-md">
                        <AiOutlineFileText className="mr-1" />Export Data
                    </button>
                </div>
            </div>
            
            {/* Map Visualization and Red Alerts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Map Component - 2/3 width */}
                <div className="lg:col-span-2 rounded-lg relative overflow-hidden h-[600px] shadow-lg border border-gray-200">
                    <IndiaHeatmap />
                </div>

                {/* Red Alerts Summary - 1/3 width */}
                <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                         <AiOutlineWarning className="text-red-500 mr-2" /> Active Red Alerts ({regionData.find(r => r.name === selectedState)?.alerts || 0})
                    </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        {/* Mock Alert Items (for visualization) */}
                        <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-md">
                            <p className="text-sm font-semibold text-red-700">Withdrawal Period Violation</p>
                            <p className="text-xs text-gray-600">Pune District - Sunrise Dairy</p>
                        </div>
                         <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-md">
                            <p className="text-sm font-semibold text-red-700">Drug Overdose Case</p>
                            <p className="text-xs text-gray-600">Nashik District - Green Valley</p>
                        </div>
                         <div className="p-3 border-l-4 border-orange-500 bg-orange-50 rounded-md">
                            <p className="text-sm font-semibold text-orange-700">Vet License Expiring Soon</p>
                            <p className="text-xs text-gray-600">Mumbai District - Dr. S. Verma</p>
                        </div>
                         <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-md">
                            <p className="text-sm font-semibold text-red-700">New High-Risk Farm Detected</p>
                            <p className="text-xs text-gray-600">Kolhapur District - Multiple Farms</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* AMU Trend Tabs (Original Content) */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex space-x-2 mb-4">
                    <button
                        className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'overview' ? 'bg-gray-200' : 'bg-gray-100'}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'bySpecies' ? 'bg-gray-200' : 'bg-gray-100'}`}
                        onClick={() => setActiveTab('bySpecies')}
                    >
                        By Species
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'byRegion' ? 'bg-gray-200' : 'bg-gray-100'}`}
                        onClick={() => setActiveTab('byRegion')}
                    >
                        By Region
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'riskAnalysis' ? 'bg-gray-200' : 'bg-gray-100'}`}
                        onClick={() => setActiveTab('riskAnalysis')}
                    >
                        Risk Analysis
                    </button>
                </div>

                {renderContent()}
            </div>
        </div>
    );
};

export default RealtimeMonitoring;

// import React, { useState } from 'react';
// import { AiOutlineBarChart, AiOutlineFileText, AiOutlineWarning, AiOutlineSchedule, AiOutlineRight, AiOutlineEnvironment, AiOutlineAlert, AiOutlineSetting } from 'react-icons/ai'; 

// // IMPORTANT: This component assumes you have created src/components/IndiaHeatmap.jsx 
// // and installed the necessary dependencies (react-simple-maps, d3-scale, axios).
// import IndiaHeatmap from './IndiaHeatmap'; 


// // Mock data for tabs
// const overviewData = {
//     totalCases: '2,847',
//     complianceRate: '94.2%',
//     activeViolations: 23,
//     farmsMonitored: 156,
// };
// const speciesData = [
//     { name: 'Cattle', cases: 1245, trend: '-5.2% decrease', compliance: '96.1%' },
//     { name: 'Buffalo', cases: 856, trend: '-12.4% decrease', compliance: '92.8%' },
//     { name: 'Goat', cases: 543, trend: '+2.1% increase', compliance: '95.4%' },
//     { name: 'Sheep', cases: 203, trend: '-15.6% decrease', compliance: '88.9%' },
// ];
// const regionData = [
//     { name: 'Maharashtra', alerts: 3, cases: 1456, trend: '-7.2% decrease' },
//     { name: 'Gujarat', alerts: 1, cases: 678, trend: '-10.5% decrease' },
//     { name: 'Punjab', alerts: 2, cases: 445, trend: '-5.8% decrease' },
//     { name: 'Karnataka', alerts: 0, cases: 268, trend: '-12.1% decrease' },
// ];
// const riskData = [
//     { name: 'Ramesh Patil', risk: 'High Risk', score: '8.5/10', farmId: 'FRM-2024-158', region: 'Maharashtra-Pune', issues: ['High AMU frequency', 'Withdrawal violations'] },
//     { name: 'Suresh Kale', risk: 'Medium Risk', score: '7.8/10', farmId: 'FRM-2024-234', region: 'Maharashtra-Nashik', issues: ['Overdose incidents', 'Missing documentation'] },
//     { name: 'Prakash Jadhav', risk: 'Medium Risk', score: '6.9/10', farmId: 'FRM-2024-087', region: 'Maharashtra-Satara', issues: ['Irregular vet consultations'] },
// ];

// const RealtimeMonitoring = () => {
//     const [activeTab, setActiveTab] = useState('overview');
//     const [selectedState, setSelectedState] = useState('Maharashtra'); 
    
//     const states = ['Maharashtra', 'Gujarat', 'Punjab', 'Karnataka', 'All India'];
    
//     const renderContent = () => {
//         switch (activeTab) {
//             case 'overview':
//                 return (
//                     <div className="space-y-6">
//                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                             {/* Summary Metrics */}
//                             <div className="bg-gray-50 p-4 rounded-lg">
//                                 <p className="text-2xl font-bold">{overviewData.totalCases}</p>
//                                 <p className="text-sm text-gray-500">Total AMU Cases</p>
//                                 <span className="text-sm text-green-500 font-semibold flex items-center">
//                                     <AiOutlineBarChart className="mr-1" /> 8.9% decrease
//                                 </span>
//                             </div>
//                             <div className="bg-gray-50 p-4 rounded-lg">
//                                 <p className="text-2xl font-bold">{overviewData.complianceRate}</p>
//                                 <p className="text-sm text-gray-500">Compliance Rate</p>
//                                 <span className="text-sm text-green-500 font-semibold">vs 93.1% last month</span>
//                             </div>
//                             <div className="bg-gray-50 p-4 rounded-lg">
//                                 <p className="text-2xl font-bold">{overviewData.activeViolations}</p>
//                                 <p className="text-sm text-gray-500">Active Violations</p>
//                                 <span className="text-sm text-red-500 font-semibold">Requires attention</span>
//                             </div>
//                             <div className="bg-gray-50 p-4 rounded-lg">
//                                 <p className="text-2xl font-bold">{overviewData.farmsMonitored}</p>
//                                 <p className="text-sm text-gray-500">Farms Monitored</p>
//                                 <span className="text-sm text-green-500 font-semibold">+12 new this month</span>
//                             </div>
//                         </div>
//                         <div className="bg-gray-200 h-64 rounded-lg flex flex-col items-center justify-center">
//                             <AiOutlineBarChart className="text-4xl text-gray-500 mb-2" />
//                             <span className="text-gray-600">AMU Trend Visualization</span>
//                             <p className="text-xs text-gray-500">Interactive charts showing usage patterns over time</p>
//                             <button className="mt-4 px-4 py-2 bg-white rounded-md border border-gray-300 text-gray-700 text-sm">
//                                 View Detailed Charts
//                             </button>
//                         </div>
//                     </div>
//                 );
//             case 'bySpecies':
//                 return (
//                     <div className="space-y-4">
//                         {speciesData.map((species, index) => (
//                             <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
//                                 <div className="flex items-center space-x-4">
//                                     <div className="flex flex-col">
//                                         <h3 className="text-lg font-semibold">{species.name}</h3>
//                                         <span className={`text-sm ${species.trend.includes('decrease') ? 'text-red-500' : 'text-green-500'}`}>{species.trend}</span>
//                                     </div>
//                                     <span className="text-sm text-gray-500">Compliance: {species.compliance}</span>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                     <span className="text-sm font-bold text-blue-600">{species.cases} cases</span>
//                                     <AiOutlineRight className="text-gray-400" />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 );
//             case 'byRegion':
//                 return (
//                     <div className="space-y-4">
//                         {regionData.map((region, index) => (
//                             <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
//                                 <div className="flex items-center space-x-4">
//                                     <div className="flex flex-col">
//                                         <h3 className="text-lg font-semibold">{region.name}</h3>
//                                         <span className={`text-sm ${region.trend.includes('decrease') ? 'text-red-500' : 'text-green-500'}`}>{region.trend}</span>
//                                     </div>
//                                     {region.alerts > 0 && <span className="text-sm font-bold text-red-500 px-2 py-1 bg-red-100 rounded-full">{region.alerts} alerts</span>}
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                     <span className="text-sm font-bold text-gray-600">{region.cases} cases</span>
//                                     <AiOutlineRight className="text-gray-400" />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 );
//             case 'riskAnalysis':
//                 return (
//                     <div className="space-y-4">
//                         <p className="text-gray-600 mb-4">High-Risk Farms Requiring Attention</p>
//                         {riskData.map((farm, index) => (
//                             <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-start">
//                                 <div className="flex-1">
//                                     <div className="flex items-center space-x-2 mb-2">
//                                         <h3 className="text-lg font-semibold">{farm.name}</h3>
//                                         <span className={`px-2 py-1 rounded-full text-xs font-bold ${farm.risk.includes('High') ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>{farm.risk.toUpperCase()}</span>
//                                         <span className="text-sm text-gray-500">Score: {farm.score}</span>
//                                     </div>
//                                     <p className="text-xs text-gray-500">Farm ID: {farm.farmId}</p>
//                                     <p className="text-xs text-gray-500">Region: {farm.region}</p>
//                                     <div className="mt-2">
//                                         <p className="text-sm font-semibold mb-1">Identified issues:</p>
//                                         <div className="flex flex-wrap gap-2">
//                                             {farm.issues.map((issue, i) => (
//                                                 <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">{issue}</span>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="flex-shrink-0 flex flex-col space-y-2">
//                                     <button className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-semibold">Schedule Inspection</button>
//                                     <button className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 text-sm font-semibold">View Details</button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold text-gray-800 flex items-center">
//                     <AiOutlineBarChart className="mr-2 text-xl" />
//                     Real-time Monitoring
//                 </h2>
//                 <div className="flex items-center space-x-2">
//                     {/* State Selection Dropdown (Used for Alerts Summary and Export button) */}
//                     <select 
//                         className="border rounded-md text-sm p-2"
//                         value={selectedState}
//                         onChange={(e) => setSelectedState(e.target.value)}
//                     >
//                         {states.map((state) => (
//                             <option key={state} value={state}>{state}</option>
//                         ))}
//                     </select>

//                     <button className="flex items-center text-blue-600 text-sm px-3 py-1 border rounded-md">
//                         <AiOutlineFileText className="mr-1" />Export Data
//                     </button>
//                 </div>
//             </div>
            
//             {/* Map Visualization and Red Alerts Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//                 {/* Map Component - 2/3 width */}
//                 <div className="lg:col-span-2 rounded-lg relative overflow-hidden h-[600px] shadow-lg border border-gray-200">
//                     <IndiaHeatmap />
//                 </div>

//                 {/* Red Alerts Summary - 1/3 width */}
//                 <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-lg">
//                     <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//                          <AiOutlineWarning className="text-red-500 mr-2" /> Active Red Alerts ({regionData.find(r => r.name === selectedState)?.alerts || 0})
//                     </h3>
//                     <div className="space-y-3 max-h-80 overflow-y-auto">
//                         {/* Mock Alert Items (for visualization) */}
//                         <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-md">
//                             <p className="text-sm font-semibold text-red-700">Withdrawal Period Violation</p>
//                             <p className="text-xs text-gray-600">Pune District - Sunrise Dairy</p>
//                         </div>
//                          <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-md">
//                             <p className="text-sm font-semibold text-red-700">Drug Overdose Case</p>
//                             <p className="text-xs text-gray-600">Nashik District - Green Valley</p>
//                         </div>
//                          <div className="p-3 border-l-4 border-orange-500 bg-orange-50 rounded-md">
//                             <p className="text-sm font-semibold text-orange-700">Vet License Expiring Soon</p>
//                             <p className="text-xs text-gray-600">Mumbai District - Dr. S. Verma</p>
//                         </div>
//                          <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-md">
//                             <p className="text-sm font-semibold text-red-700">New High-Risk Farm Detected</p>
//                             <p className="text-xs text-gray-600">Kolhapur District - Multiple Farms</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//             {/* AMU Trend Tabs (Original Content) */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//                 <div className="flex space-x-2 mb-4">
//                     <button
//                         className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'overview' ? 'bg-gray-200' : 'bg-gray-100'}`}
//                         onClick={() => setActiveTab('overview')}
//                     >
//                         Overview
//                     </button>
//                     <button
//                         className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'bySpecies' ? 'bg-gray-200' : 'bg-gray-100'}`}
//                         onClick={() => setActiveTab('bySpecies')}
//                     >
//                         By Species
//                     </button>
//                     <button
//                         className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'byRegion' ? 'bg-gray-200' : 'bg-gray-100'}`}
//                         onClick={() => setActiveTab('byRegion')}
//                     >
//                         By Region
//                     </button>
//                     <button
//                         className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'riskAnalysis' ? 'bg-gray-200' : 'bg-gray-100'}`}
//                         onClick={() => setActiveTab('riskAnalysis')}
//                     >
//                         Risk Analysis
//                     </button>
//                 </div>

//                 {renderContent()}
//             </div>
//         </div>
//     );
// };

// export default RealtimeMonitoring;

// import React, { useState } from 'react';
// import { AiOutlineBarChart, AiOutlineFileText, AiOutlineWarning, AiOutlineSchedule, AiOutlineRight, AiOutlineEnvironment, AiOutlineAlert, AiOutlineSetting } from 'react-icons/ai'; 
// // Import the new IndiaHeatmap component
// import IndiaHeatmap from './IndiaHeatmap'; 


// // Mock data for tabs
// const overviewData = {
//     totalCases: '2,847',
//     complianceRate: '94.2%',
//     activeViolations: 23,
//     farmsMonitored: 156,
// };
// const speciesData = [
//     { name: 'Cattle', cases: 1245, trend: '-5.2% decrease', compliance: '96.1%' },
//     { name: 'Buffalo', cases: 856, trend: '-12.4% decrease', compliance: '92.8%' },
//     { name: 'Goat', cases: 543, trend: '+2.1% increase', compliance: '95.4%' },
//     { name: 'Sheep', cases: 203, trend: '-15.6% decrease', compliance: '88.9%' },
// ];
// const regionData = [
//     { name: 'Maharashtra', alerts: 3, cases: 1456, trend: '-7.2% decrease' },
//     { name: 'Gujarat', alerts: 1, cases: 678, trend: '-10.5% decrease' },
//     { name: 'Punjab', alerts: 2, cases: 445, trend: '-5.8% decrease' },
//     { name: 'Karnataka', alerts: 0, cases: 268, trend: '-12.1% decrease' },
// ];
// const riskData = [
//     { name: 'Ramesh Patil', risk: 'High Risk', score: '8.5/10', farmId: 'FRM-2024-158', region: 'Maharashtra-Pune', issues: ['High AMU frequency', 'Withdrawal violations'] },
//     { name: 'Suresh Kale', risk: 'Medium Risk', score: '7.8/10', farmId: 'FRM-2024-234', region: 'Maharashtra-Nashik', issues: ['Overdose incidents', 'Missing documentation'] },
//     { name: 'Prakash Jadhav', risk: 'Medium Risk', score: '6.9/10', farmId: 'FRM-2024-087', region: 'Maharashtra-Satara', issues: ['Irregular vet consultations'] },
// ];

// const RealtimeMonitoring = () => {
//     const [activeTab, setActiveTab] = useState('overview');
//     const [selectedState, setSelectedState] = useState('Maharashtra'); 
    
//     const states = ['Maharashtra', 'Gujarat', 'Punjab', 'Karnataka', 'All India'];
    
//     const renderContent = () => {
//         switch (activeTab) {
//             case 'overview':
//                 return (
//                     <div className="space-y-6">
//                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                             {/* Summary Metrics */}
//                             <div className="bg-gray-50 p-4 rounded-lg">
//                                 <p className="text-2xl font-bold">{overviewData.totalCases}</p>
//                                 <p className="text-sm text-gray-500">Total AMU Cases</p>
//                                 <span className="text-sm text-green-500 font-semibold flex items-center">
//                                     <AiOutlineBarChart className="mr-1" /> 8.9% decrease
//                                 </span>
//                             </div>
//                             <div className="bg-gray-50 p-4 rounded-lg">
//                                 <p className="text-2xl font-bold">{overviewData.complianceRate}</p>
//                                 <p className="text-sm text-gray-500">Compliance Rate</p>
//                                 <span className="text-sm text-green-500 font-semibold">vs 93.1% last month</span>
//                             </div>
//                             <div className="bg-gray-50 p-4 rounded-lg">
//                                 <p className="text-2xl font-bold">{overviewData.activeViolations}</p>
//                                 <p className="text-sm text-gray-500">Active Violations</p>
//                                 <span className="text-sm text-red-500 font-semibold">Requires attention</span>
//                             </div>
//                             <div className="bg-gray-50 p-4 rounded-lg">
//                                 <p className="text-2xl font-bold">{overviewData.farmsMonitored}</p>
//                                 <p className="text-sm text-gray-500">Farms Monitored</p>
//                                 <span className="text-sm text-green-500 font-semibold">+12 new this month</span>
//                             </div>
//                         </div>
//                         <div className="bg-gray-200 h-64 rounded-lg flex flex-col items-center justify-center">
//                             <AiOutlineBarChart className="text-4xl text-gray-500 mb-2" />
//                             <span className="text-gray-600">AMU Trend Visualization</span>
//                             <p className="text-xs text-gray-500">Interactive charts showing usage patterns over time</p>
//                             <button className="mt-4 px-4 py-2 bg-white rounded-md border border-gray-300 text-gray-700 text-sm">
//                                 View Detailed Charts
//                             </button>
//                         </div>
//                     </div>
//                 );
//             case 'bySpecies':
//                 return (
//                     <div className="space-y-4">
//                         {speciesData.map((species, index) => (
//                             <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
//                                 <div className="flex items-center space-x-4">
//                                     <div className="flex flex-col">
//                                         <h3 className="text-lg font-semibold">{species.name}</h3>
//                                         <span className={`text-sm ${species.trend.includes('decrease') ? 'text-red-500' : 'text-green-500'}`}>{species.trend}</span>
//                                     </div>
//                                     <span className="text-sm text-gray-500">Compliance: {species.compliance}</span>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                     <span className="text-sm font-bold text-blue-600">{species.cases} cases</span>
//                                     <AiOutlineRight className="text-gray-400" />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 );
//             case 'byRegion':
//                 return (
//                     <div className="space-y-4">
//                         {regionData.map((region, index) => (
//                             <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
//                                 <div className="flex items-center space-x-4">
//                                     <div className="flex flex-col">
//                                         <h3 className="text-lg font-semibold">{region.name}</h3>
//                                         <span className={`text-sm ${region.trend.includes('decrease') ? 'text-red-500' : 'text-green-500'}`}>{region.trend}</span>
//                                     </div>
//                                     {region.alerts > 0 && <span className="text-sm font-bold text-red-500 px-2 py-1 bg-red-100 rounded-full">{region.alerts} alerts</span>}
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                     <span className="text-sm font-bold text-gray-600">{region.cases} cases</span>
//                                     <AiOutlineRight className="text-gray-400" />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 );
//             case 'riskAnalysis':
//                 return (
//                     <div className="space-y-4">
//                         <p className="text-gray-600 mb-4">High-Risk Farms Requiring Attention</p>
//                         {riskData.map((farm, index) => (
//                             <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-start">
//                                 <div className="flex-1">
//                                     <div className="flex items-center space-x-2 mb-2">
//                                         <h3 className="text-lg font-semibold">{farm.name}</h3>
//                                         <span className={`px-2 py-1 rounded-full text-xs font-bold ${farm.risk.includes('High') ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>{farm.risk.toUpperCase()}</span>
//                                         <span className="text-sm text-gray-500">Score: {farm.score}</span>
//                                     </div>
//                                     <p className="text-xs text-gray-500">Farm ID: {farm.farmId}</p>
//                                     <p className="text-xs text-gray-500">Region: {farm.region}</p>
//                                     <div className="mt-2">
//                                         <p className="text-sm font-semibold mb-1">Identified issues:</p>
//                                         <div className="flex flex-wrap gap-2">
//                                             {farm.issues.map((issue, i) => (
//                                                 <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">{issue}</span>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="flex-shrink-0 flex flex-col space-y-2">
//                                     <button className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-semibold">Schedule Inspection</button>
//                                     <button className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 text-sm font-semibold">View Details</button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold text-gray-800 flex items-center">
//                     <AiOutlineBarChart className="mr-2 text-xl" />
//                     Real-time Monitoring
//                 </h2>
//                 <div className="flex items-center space-x-2">
//                     {/* State Selection Dropdown (Used for Alerts Summary and Export button) */}
//                     <select 
//                         className="border rounded-md text-sm p-2"
//                         value={selectedState}
//                         onChange={(e) => setSelectedState(e.target.value)}
//                     >
//                         {states.map((state) => (
//                             <option key={state} value={state}>{state}</option>
//                         ))}
//                     </select>

//                     <button className="flex items-center text-blue-600 text-sm px-3 py-1 border rounded-md">
//                         <AiOutlineFileText className="mr-1" />Export Data
//                     </button>
//                 </div>
//             </div>
            
//             {/* Map Visualization and Red Alerts Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//                 {/* Map Component - 2/3 width */}
//                 <div className="lg:col-span-2 rounded-lg relative overflow-hidden h-[600px] shadow-lg border border-gray-200">
//                     <IndiaHeatmap />
//                 </div>

//                 {/* Red Alerts Summary - 1/3 width */}
//                 <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-lg">
//                     <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//                          <AiOutlineWarning className="text-red-500 mr-2" /> Active Red Alerts ({regionData.find(r => r.name === selectedState)?.alerts || 0})
//                     </h3>
//                     <div className="space-y-3 max-h-80 overflow-y-auto">
//                         {/* Mock Alert Items (for visualization) */}
//                         <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-md">
//                             <p className="text-sm font-semibold text-red-700">Withdrawal Period Violation</p>
//                             <p className="text-xs text-gray-600">Pune District - Sunrise Dairy</p>
//                         </div>
//                          <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-md">
//                             <p className="text-sm font-semibold text-red-700">Drug Overdose Case</p>
//                             <p className="text-xs text-gray-600">Nashik District - Green Valley</p>
//                         </div>
//                          <div className="p-3 border-l-4 border-orange-500 bg-orange-50 rounded-md">
//                             <p className="text-sm font-semibold text-orange-700">Vet License Expiring Soon</p>
//                             <p className="text-xs text-gray-600">Mumbai District - Dr. S. Verma</p>
//                         </div>
//                          <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded-md">
//                             <p className="text-sm font-semibold text-red-700">New High-Risk Farm Detected</p>
//                             <p className="text-xs text-gray-600">Kolhapur District - Multiple Farms</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//             {/* AMU Trend Tabs (Original Content) */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//                 <div className="flex space-x-2 mb-4">
//                     <button
//                         className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'overview' ? 'bg-gray-200' : 'bg-gray-100'}`}
//                         onClick={() => setActiveTab('overview')}
//                     >
//                         Overview
//                     </button>
//                     <button
//                         className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'bySpecies' ? 'bg-gray-200' : 'bg-gray-100'}`}
//                         onClick={() => setActiveTab('bySpecies')}
//                     >
//                         By Species
//                     </button>
//                     <button
//                         className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'byRegion' ? 'bg-gray-200' : 'bg-gray-100'}`}
//                         onClick={() => setActiveTab('byRegion')}
//                     >
//                         By Region
//                     </button>
//                     <button
//                         className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'riskAnalysis' ? 'bg-gray-200' : 'bg-gray-100'}`}
//                         onClick={() => setActiveTab('riskAnalysis')}
//                     >
//                         Risk Analysis
//                     </button>
//                 </div>

//                 {renderContent()}
//             </div>
//         </div>
//     );
// };

// export default RealtimeMonitoring;