// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getReportData } from '../data/mockReportsData';
// import { AiOutlineArrowLeft, AiOutlineLineChart, AiOutlinePieChart, AiOutlineCheckCircle, AiOutlineBarChart, AiOutlineWarning, AiOutlineUser, AiOutlineAreaChart, AiOutlineDashboard } from 'react-icons/ai';

// // Helper component for KPI cards in Performance Metrics
// const KpiCard = ({ icon: Icon, value, label, bgColor, textColor }) => (
//     <div className={`p-4 rounded-lg shadow-sm ${bgColor}`}>
//         <Icon className={`text-3xl ${textColor} mb-2`} />
//         <p className="text-2xl font-bold text-gray-900">{value}</p>
//         <p className="text-sm text-gray-600">{label}</p>
//     </div>
// );

// const ReportDetailView = () => {
//     const { level, viewType } = useParams();
//     const navigate = useNavigate();
//     const [reportData, setReportData] = useState(null);

//     useEffect(() => {
//         setReportData(getReportData(level));
//     }, [level]);

//     const getTitle = () => {
//         if (viewType === 'detailed') return 'Detailed Report View';
//         if (viewType === 'compliance') return 'Compliance Dashboard';
//         if (viewType === 'performance') return 'Performance Metrics';
//         return 'Detailed View';
//     };

//     const renderContent = () => {
//         if (!reportData) return <p>Loading data...</p>;
//         const dataLabel = reportData.dataLabel;
//         const regions = reportData.regions;

//         // --- View 1: Detailed Report View (Matches image_08947a.png / Page 2) ---
//         if (viewType === 'detailed') {
//             return (
//                 <div className="space-y-6">
//                     <h4 className="text-xl font-semibold text-gray-800">Key Metrics Across All {dataLabel}s</h4>
//                     <div className="grid grid-cols-4 gap-4">
//                         <div className="p-4 bg-blue-50 rounded-lg"><p className="text-sm">Total Cases</p><p className="text-2xl font-bold">45,000</p></div>
//                         <div className="p-4 bg-green-50 rounded-lg"><p className="text-sm">Avg. Compliance</p><p className="text-2xl font-bold">90.8%</p></div>
//                         <div className="p-4 bg-red-50 rounded-lg"><p className="text-sm">Critical Violations</p><p className="text-2xl font-bold">128</p></div>
//                         <div className="p-4 bg-yellow-50 rounded-lg"><p className="text-sm">Total Vets</p><p className="text-2xl font-bold">5,300</p></div>
//                     </div>

//                     <h4 className="text-xl font-semibold text-gray-800 pt-4 border-t">Breakdown by {dataLabel}</h4>
//                     {regions.map((region, index) => (
//                         <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
//                             <div className="grid grid-cols-5 gap-4 items-center">
//                                 <h4 className="text-lg font-semibold text-gray-800 col-span-1">{region.name}</h4>
//                                 <div className="text-sm">
//                                     <p className="font-medium text-gray-700">Comp. Rate:</p> 
//                                     <p className="font-bold text-green-600">{region.compliance}%</p>
//                                 </div>
//                                 <div className="text-sm">
//                                     <p className="font-medium text-gray-700">AMR Score:</p>
//                                     <p className="font-bold text-orange-600">{region.amrScore}</p>
//                                 </div>
//                                 <div className="text-sm">
//                                     <p className="font-medium text-gray-700">Violations:</p>
//                                     <p className="font-bold text-red-600">{region.violationCount}</p>
//                                 </div>
//                                 <div className="text-sm">
//                                     <p className="font-medium text-gray-700">Pending Vets:</p>
//                                     <p className="font-bold text-yellow-600">{region.pendingVets}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                     <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
//                         <AiOutlineLineChart className="text-4xl text-gray-500" /> Overall Trend Chart Placeholder
//                     </div>
//                 </div>
//             );
//         }

//         // --- View 2: Compliance Dashboard (Matches image_089723.png / image_089726.png - Pages 3 & 4) ---
//         if (viewType === 'compliance') {
//             return (
//                 <div className="space-y-6">
//                     <h4 className="text-xl font-semibold text-gray-800">Compliance & Violation Summary</h4>
//                     <div className="grid grid-cols-4 gap-4">
//                         <KpiCard icon={AiOutlineCheckCircle} value="94.2%" label="AMU Compliance" bgColor="bg-green-100" textColor="text-green-600" />
//                         <KpiCard icon={AiOutlineWarning} value="23" label="Active Violations" bgColor="bg-red-100" textColor="text-red-600" />
//                         <KpiCard icon={AiOutlinePieChart} value="5,600" label="Total MRL Tests" bgColor="bg-blue-100" textColor="text-blue-600" />
//                         <KpiCard icon={AiOutlineUser} value="85%" label="Vet Prescription Rate" bgColor="bg-purple-100" textColor="text-purple-600" />
//                     </div>

//                     <h4 className="text-xl font-semibold text-gray-800 pt-4 border-t">Violation Breakdown by {dataLabel}</h4>
//                     {regions.map((region, index) => (
//                         <div key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
//                             <div>
//                                 <p className="font-semibold text-gray-800">{region.name}</p>
//                                 <p className="text-sm text-gray-600">Compliance Rate: {region.compliance}%</p>
//                             </div>
//                             <div className="flex items-center space-x-4">
//                                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${region.violationCount > 10 ? 'bg-red-500' : 'bg-green-500'} text-white`}>
//                                     {region.violationCount} Violations
//                                 </span>
//                                 <AiOutlineDashboard className="text-blue-500 cursor-pointer" title="View Dashboard" />
//                             </div>
//                         </div>
//                     ))}
//                     <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
//                         <AiOutlineBarChart className="text-4xl text-gray-500" /> Violation Type Trend Chart Placeholder
//                     </div>
//                 </div>
//             );
//         }
        
//         // --- View 3: Performance Metrics (Matches image_08972c.png / image_089744.png - Pages 5 & 6) ---
//         if (viewType === 'performance') {
//             const totalVetsSum = regions.reduce((sum, r) => sum + r.totalVets, 0);

//             return (
//                 <div className="space-y-6">
//                     <h4 className="text-xl font-semibold text-gray-800">Operational Performance Summary</h4>
//                     <div className="grid grid-cols-4 gap-4">
//                         <KpiCard icon={AiOutlineUser} value={totalVetsSum.toLocaleString()} label="Total Verified Vets" bgColor="bg-blue-100" textColor="text-blue-600" />
//                         <KpiCard icon={AiOutlineCheckCircle} value="98%" label="Avg. Inspection Rate" bgColor="bg-green-100" textColor="text-green-600" />
//                         <KpiCard icon={AiOutlineAreaChart} value={`${regions[0].amrScore}%`} label="Highest AMR Risk Score" bgColor="bg-red-100" textColor="text-red-600" />
//                         <KpiCard icon={AiOutlineDashboard} value={`${regions.reduce((sum, r) => sum + r.pendingVets, 0)}`} label="Vets Pending Verification" bgColor="bg-yellow-100" textColor="text-yellow-600" />
//                     </div>

//                     <h4 className="text-xl font-semibold text-gray-800 pt-4 border-t">Performance Breakdown by {dataLabel}</h4>
//                     {regions.map((region, index) => (
//                         <div key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
//                             <div>
//                                 <p className="font-semibold text-gray-800">{region.name}</p>
//                                 <p className="text-sm text-gray-600">Pending Vets: {region.pendingVets}</p>
//                             </div>
//                             <div className="w-1/4">
//                                 <p className="text-xs font-medium mb-1">AMR Score: {region.amrScore}</p>
//                                 {/* Progress Bar simulation */}
//                                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                                     <div className="h-2.5 rounded-full" 
//                                          style={{ width: `${region.amrScore}%`, backgroundColor: region.amrScore > 80 ? '#d73027' : '#2563eb' }}>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                     <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
//                         <AiOutlineBarChart className="text-4xl text-gray-500" /> Operational Metrics Comparison Chart Placeholder
//                     </div>
//                 </div>
//             );
//         }
//     };

//     return (
//         <div className="p-8 bg-white rounded-lg shadow-md min-h-[70vh]">
//             <button 
//                 onClick={() => navigate(-1)}
//                 className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
//             >
//                 <AiOutlineArrowLeft className="mr-2" /> Back to Reports Home
//             </button>
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">{getTitle()}</h2>
//             <p className="text-gray-600 mb-6">Showing **{level.toUpperCase()}** Authority data categorized by **{reportData?.dataLabel || 'Region'}**.</p>
            
//             {renderContent()}
//         </div>
//     );
// };

// export default ReportDetailView;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReportData } from '../data/mockReportsData';
import { AiOutlineArrowLeft, AiOutlineLineChart, AiOutlinePieChart, AiOutlineCheckCircle, AiOutlineBarChart, AiOutlineWarning, AiOutlineUser, AiOutlineAreaChart, AiOutlineDashboard, AiOutlineSchedule } from 'react-icons/ai';

// Helper component for uniform KPI cards (used in Compliance and Performance)
const KpiCard = ({ icon: Icon, value, label, bgColor, textColor }) => (
    <div className={`p-4 rounded-xl shadow-md ${bgColor} transition-shadow duration-300 hover:shadow-lg`}>
        <Icon className={`text-3xl ${textColor} mb-2`} />
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
    </div>
);

// Helper for Chart Placeholders with titles and simulated data
const ChartPlaceholder = ({ title, height = 96, icon: Icon }) => (
    <div className={`bg-white p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center shadow-inner h-${height} transition-shadow duration-300 hover:shadow-md`}>
        <Icon className="text-4xl text-gray-400 mb-2" />
        <p className="text-gray-700 font-semibold">{title}</p>
        <p className="text-xs text-gray-500 mt-1">Simulated chart data based on API metrics.</p>
    </div>
);


const ReportDetailView = () => {
    const { level, viewType } = useParams();
    const navigate = useNavigate();
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        setReportData(getReportData(level));
    }, [level]);

    const getTitle = () => {
        if (viewType === 'detailed') return 'Detailed Report View';
        if (viewType === 'compliance') return 'Compliance Dashboard';
        if (viewType === 'performance') return 'Performance Metrics';
        return 'Detailed View';
    };

    const renderContent = () => {
        if (!reportData) return <p>Loading data...</p>;
        const dataLabel = reportData.dataLabel;
        const regions = reportData.regions;

        // --- View 1: Detailed Report View (Matches image_08947a.png / Page 2) ---
        if (viewType === 'detailed') {
            return (
                <div className="space-y-6 animate-fade-in-up">
                    <h4 className="text-xl font-semibold text-gray-800">Key Metrics Across All {dataLabel}s</h4>
                    <div className="grid grid-cols-4 gap-4">
                        <KpiCard icon={AiOutlineLineChart} value="45,000" label="Total Cases" bgColor="bg-blue-50" textColor="text-blue-600" />
                        <KpiCard icon={AiOutlineCheckCircle} value="90.8%" label="Avg. Compliance" bgColor="bg-green-50" textColor="text-green-600" />
                        <KpiCard icon={AiOutlineWarning} value="128" label="Critical Violations" bgColor="bg-red-50" textColor="text-red-600" />
                        <KpiCard icon={AiOutlineUser} value="5,300" label="Total Vets" bgColor="bg-yellow-50" textColor="text-yellow-600" />
                    </div>

                    <h4 className="text-xl font-semibold text-gray-800 pt-4 border-t">Breakdown by {dataLabel}</h4>
                    {regions.map((region, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 transition-all duration-200">
                            <div className="grid grid-cols-5 gap-4 items-center">
                                <h4 className="text-lg font-semibold text-gray-800 col-span-1">{dataLabel}: {region.name}</h4>
                                <div className="text-sm">
                                    <p className="font-medium text-gray-700">Comp. Rate:</p> 
                                    <p className="font-bold text-green-600">{region.compliance}%</p>
                                </div>
                                <div className="text-sm">
                                    <p className="font-medium text-gray-700">AMR Score:</p>
                                    <p className="font-bold text-orange-600">{region.amrScore}</p>
                                </div>
                                <div className="text-sm">
                                    <p className="font-medium text-gray-700">Violations:</p>
                                    <p className="font-bold text-red-600">{region.violationCount}</p>
                                </div>
                                <div className="text-sm">
                                    <p className="font-medium text-gray-700">Pending Vets:</p>
                                    <p className="font-bold text-yellow-600">{region.pendingVets}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <ChartPlaceholder title="Overall Monthly Trend" icon={AiOutlineLineChart} height="72" />
                </div>
            );
        }

        // --- View 2: Compliance Dashboard (Matches image_089723.png / image_089726.png - Pages 3 & 4) ---
        if (viewType === 'compliance') {
            return (
                <div className="space-y-6 animate-fade-in-up">
                    <h4 className="text-xl font-semibold text-gray-800">Compliance & Violation Summary</h4>
                    <div className="grid grid-cols-4 gap-4">
                        <KpiCard icon={AiOutlineCheckCircle} value="94.2%" label="AMU Compliance" bgColor="bg-green-100" textColor="text-green-700" />
                        <KpiCard icon={AiOutlineWarning} value="23" label="Active Violations" bgColor="bg-red-100" textColor="text-red-700" />
                        <KpiCard icon={AiOutlinePieChart} value="5,600" label="Total MRL Tests" bgColor="bg-blue-100" textColor="text-blue-700" />
                        <KpiCard icon={AiOutlineUser} value="85%" label="Vet Prescription Rate" bgColor="bg-purple-100" textColor="text-purple-700" />
                    </div>

                    <ChartPlaceholder title="Violation Type Trend Analysis" icon={AiOutlineBarChart} height="72" />

                    <h4 className="text-xl font-semibold text-gray-800 pt-4 border-t">Violation Breakdown by {dataLabel}</h4>
                    {regions.map((region, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-200">
                            <div>
                                <p className="font-semibold text-gray-800">{dataLabel}: {region.name}</p>
                                <p className="text-sm text-gray-600">Compliance Rate: {region.compliance}%</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${region.violationCount > 10 ? 'bg-red-500' : 'bg-green-500'} text-white`}>
                                    {region.violationCount} Violations
                                </span>
                                <AiOutlineDashboard className="text-blue-500 cursor-pointer text-xl" title="View Dashboard" />
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        
        // --- View 3: Performance Metrics (Matches image_08972c.png / image_089744.png - Pages 5 & 6) ---
        if (viewType === 'performance') {
            const totalVetsSum = regions.reduce((sum, r) => sum + r.totalVets, 0);

            return (
                <div className="space-y-6 animate-fade-in-up">
                    <h4 className="text-xl font-semibold text-gray-800">Operational Performance Summary</h4>
                    <div className="grid grid-cols-4 gap-4">
                        <KpiCard icon={AiOutlineUser} value={totalVetsSum.toLocaleString()} label="Total Verified Vets" bgColor="bg-blue-100" textColor="text-blue-700" />
                        <KpiCard icon={AiOutlineCheckCircle} value="98%" label="Avg. Inspection Rate" bgColor="bg-green-100" textColor="text-green-700" />
                        <KpiCard icon={AiOutlineAreaChart} value={`${regions[0].amrScore}%`} label="Highest AMR Risk Score" bgColor="bg-red-100" textColor="text-red-700" />
                        <KpiCard icon={AiOutlineDashboard} value={`${regions.reduce((sum, r) => sum + r.pendingVets, 0)}`} label="Vets Pending Verification" bgColor="bg-yellow-100" textColor="text-yellow-700" />
                    </div>

                    <ChartPlaceholder title="Performance History Comparison" icon={AiOutlineLineChart} height="72" />

                    <h4 className="text-xl font-semibold text-gray-800 pt-4 border-t">Performance Breakdown by {dataLabel}</h4>
                    {regions.map((region, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-200">
                            <div>
                                <p className="font-semibold text-gray-800">{dataLabel}: {region.name}</p>
                                <p className="text-sm text-gray-600">Pending Vets: {region.pendingVets}</p>
                            </div>
                            <div className="w-1/4">
                                <p className="text-xs font-medium mb-1">AMR Score: {region.amrScore}</p>
                                {/* Progress Bar simulation based on AMR Risk */}
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="h-2.5 rounded-full transition-all duration-500" 
                                         style={{ width: `${region.amrScore}%`, backgroundColor: region.amrScore > 80 ? '#d73027' : '#2563eb' }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                        <AiOutlineBarChart className="text-4xl text-gray-500" /> Operational Metrics Comparison Chart Placeholder
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow-md min-h-[70vh]">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium transition-colors"
            >
                <AiOutlineArrowLeft className="mr-2" /> Back to Reports Home
            </button>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{getTitle()}</h2>
            <p className="text-gray-600 mb-6">Showing **{level.toUpperCase()}** Authority data categorized by **{reportData?.dataLabel || 'Region'}**.</p>
            
            {renderContent()}
        </div>
    );
};

export default ReportDetailView;