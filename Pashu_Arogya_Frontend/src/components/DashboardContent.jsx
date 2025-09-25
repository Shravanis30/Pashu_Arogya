import React from 'react';
import { AiOutlineBarChart, AiOutlineUser, AiOutlineCheckCircle, AiOutlineDashboard, AiOutlineAlert, AiOutlineFileText, AiOutlineSetting, AiOutlineMedicineBox, AiOutlineWarning, AiOutlineTeam, AiOutlineClockCircle } from 'react-icons/ai';

const DashboardContent = () => {
    // This is mock data that represents what you would fetch from your API
    const keyMetrics = [
        { title: 'Total Farmers', value: '12,500', trend: '+5.2%', trendType: 'increase', icon: <AiOutlineUser className="text-orange-500" />, color: 'bg-orange-100' },
        { title: 'Active Treatments', value: '842', trend: '-2.1%', trendType: 'decrease', icon: <AiOutlineMedicineBox className="text-blue-500" />, color: 'bg-blue-100' },
        { title: 'Verified Veterinarians', value: '1,560', trend: '+12.5%', trendType: 'increase', icon: <AiOutlineCheckCircle className="text-green-500" />, color: 'bg-green-100' },
        { title: 'Compliance Rate', value: '94.2%', trend: '+0.8%', trendType: 'increase', icon: <AiOutlineCheckCircle className="text-green-500" />, color: 'bg-green-100' },
    ];

    const criticalMetrics = [
        { title: 'Critical Alerts', value: '5', priority: 'High Priority', icon: <AiOutlineWarning className="text-red-500" /> },
        { title: 'Pending Verifications', value: '24', priority: 'Pending', icon: <AiOutlineTeam className="text-orange-500" /> },
        { title: 'System Health', value: null, icon: <AiOutlineDashboard className="text-green-500" />, details: { 'API Response Time': '142ms', 'Database Performance': 'Optimal', 'Blockchain Sync': '99.9%' } },
    ];
    
    const alertData = [
        { type: 'Critical', title: 'Withdrawal Period Violation', farm: 'Sunrise Dairy', district: 'Pune', date: '2024-01-20', time: '14:30', involvedParty: 'Ramesh Patil', id: 'FRM-2024-158', actionRequired: 'Immediate milk collection halt required' },
        { type: 'High', title: 'Drug Overdose Detected', farm: 'Green Valley', district: 'Nashik', date: '2024-01-20', time: '13:15', involvedParty: 'Suresh Kale', id: 'BUF-2024-234', actionRequired: 'Vet consultation and treatment review needed' },
        { type: 'High', title: 'Emergency Veterinary Request', farm: 'Anand Dairy', district: 'Satara', date: '2024-01-20', time: '12:45', involvedParty: 'Prakash Jadhav', id: 'FRM-2024-087', actionRequired: 'Assign nearest available veterinarian' },
        { type: 'Medium', title: 'Compliance Pattern Anomaly', farm: 'Multiple Farms', district: 'Kolhapur', date: '2024-01-20', time: '11:20', involvedParty: 'Multiple farmers', id: 'Multiple', actionRequired: 'Regional compliance audit recommended' },
        { type: 'Medium', title: 'Vet Certificate Expiring', farm: null, district: 'Pune District', date: '2024-01-20', time: '10:00', involvedParty: 'Dr. Amit Sharma', id: 'VET-2024-156', actionRequired: 'Renewal notification sent' },
    ];

    return (
        <div className="bg-gray-100 p-10">
            {/* Top Metrics Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {keyMetrics.map((metric, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                        <div className={`p-3 rounded-full ${metric.color}`}>
                            {React.cloneElement(metric.icon, { className: 'h-6 w-6' })}
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-sm font-semibold text-gray-500">{metric.title}</h3>
                            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                            <div className="flex items-center text-xs font-semibold mt-1">
                                <span className={metric.trendType === 'increase' ? 'text-green-500' : 'text-red-500'}>{metric.trend}</span>
                                <span className="text-gray-500 ml-1">vs last month</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Critical Metrics and System Health Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {criticalMetrics.map((metric, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">{metric.title}</h3>
                        {metric.value !== null ? (
                            <div className="flex items-center space-x-2">
                                <span className="text-5xl font-bold text-red-500">{metric.value}</span>
                                <span className="text-sm font-semibold text-gray-600">{metric.priority}</span>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {Object.keys(metric.details).map((key, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">{key}</span>
                                        <span className={key === 'Database Performance' ? 'text-green-500' : 'text-orange-500'}>{metric.details[key]}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            {/* AMU Trends and Real-time Alerts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* AMU Trends Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                            <AiOutlineBarChart className="mr-2 text-xl" />
                            AMU Trends & Analytics
                        </h2>
                        <div className="flex items-center space-x-2">
                            <select className="border rounded-md text-sm p-1">
                                <option>Current Month</option>
                            </select>
                            <button className="flex items-center text-blue-600 text-sm">
                                <AiOutlineFileText className="mr-1" />Export
                            </button>
                        </div>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <button className="px-4 py-2 rounded-lg bg-gray-200 font-semibold text-sm">Overview</button>
                        <button className="px-4 py-2 rounded-lg font-semibold text-sm">By Species</button>
                        <button className="px-4 py-2 rounded-lg font-semibold text-sm">By Region</button>
                        <button className="px-4 py-2 rounded-lg font-semibold text-sm">Risk Analysis</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold">2,847</p>
                            <p className="text-sm text-gray-500">Total AMU Cases</p>
                            <span className="text-sm text-green-500 font-semibold flex items-center">
                                <AiOutlineBarChart className="mr-1" /> 8.9% decrease
                            </span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold">94.2%</p>
                            <p className="text-sm text-gray-500">Compliance Rate</p>
                            <span className="text-sm text-green-500 font-semibold">vs 93.1% last month</span>
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

                {/* Real-time Alerts Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                            <AiOutlineAlert className="mr-2 text-xl" />
                            Real-time Alerts & Compliance Monitoring
                        </h2>
                        <button className="flex items-center text-sm text-blue-600">
                            <AiOutlineSetting className="mr-1" /> Configure Alerts
                        </button>
                    </div>
                    <div className="grid grid-cols-4 text-center mb-4">
                        <div className="p-2">
                            <p className="text-2xl font-bold text-red-500">1</p>
                            <p className="text-sm text-gray-500">Critical</p>
                        </div>
                        <div className="p-2">
                            <p className="text-2xl font-bold text-orange-500">2</p>
                            <p className="text-sm text-gray-500">High Priority</p>
                        </div>
                        <div className="p-2">
                            <p className="text-2xl font-bold text-blue-500">2</p>
                            <p className="text-sm text-gray-500">Medium</p>
                        </div>
                        <div className="p-2">
                            <p className="text-2xl font-bold">5</p>
                            <p className="text-sm text-gray-500">Total Active</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {alertData.map((alert, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex space-x-4 items-start">
                                {/* Left side: Alert Details */}
                                <div className="flex-shrink-0">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${alert.type === 'Critical' ? 'bg-red-500 text-white' : alert.type === 'High' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'}`}>{alert.type.toUpperCase()}</span>
                                    <h3 className="text-lg font-semibold mt-1">{alert.title}</h3>
                                    <p className="text-sm text-gray-500">Farm: {alert.farm} {alert.district ? `, District: ${alert.district}` : ''}</p>
                                    <p className="text-xs text-gray-400 mt-1">{alert.date} {alert.time}</p>
                                </div>
                                {/* Right side: Involved Party & Actions */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-sm text-gray-500">Involved Party</p>
                                            <p className="text-sm font-semibold">{alert.involvedParty}</p>
                                            <p className="text-xs text-gray-400">ID: {alert.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 text-right">Actions</p>
                                            <button className="mt-1 px-3 py-1 bg-orange-500 text-white rounded-md text-xs font-semibold">Assign & Investigate</button>
                                            <button className="mt-1 flex items-center space-x-1 text-xs text-gray-500">
                                                <AiOutlineCheckCircle />
                                                <span>Mark Resolved</span>
                                            </button>
                                            <button className="mt-1 flex items-center space-x-1 text-xs text-blue-500">
                                                <span>View Full Details</span>
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Action Required: {alert.actionRequired}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;