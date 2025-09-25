import React, { useState } from 'react';
import { AiOutlineSearch, AiOutlineDownload, AiOutlineWarning, AiOutlineSchedule, AiOutlineAudit, AiOutlineFileSearch, AiOutlineBell } from 'react-icons/ai';
import { FaShieldAlt, FaTimesCircle, FaCheckCircle } from 'react-icons/fa'; 

// --- Mock Data ---
const mockAlertsData = {
    'Withdrawal Violations': [
        { id: 'WPV-01', status: 'CRITICAL', type: 'Withdrawal Period Violation', farm: 'Sunrise Dairy', district: 'Pune', animal: 'COW-2024-001', submitted: '2024-09-20 14:30', action: 'Schedule Follow-up Audit', complianceStatus: 'Active', color: 'red' },
        { id: 'WPV-02', status: 'HIGH', type: 'Withdrawal Period Violation', farm: 'Ganga Farm', district: 'Nashik', animal: 'BUF-2024-045', submitted: '2024-09-18 10:15', action: 'Immediate Milk Halt Required', complianceStatus: 'Pending', color: 'red' },
        { id: 'WPV-03', status: 'MEDIUM', type: 'Withdrawal Period Violation', farm: 'Jadhav Dairy', district: 'Satara', animal: 'BUF-2024-087', submitted: '2024-09-15 16:00', action: 'Regional Compliance Audit', complianceStatus: 'Resolved', color: 'green' },
    ],
    'Overdose Cases': [
        { id: 'ODC-10', status: 'CRITICAL', type: 'Drug Overdose Detected', farm: 'Green Valley', district: 'Nashik', animal: 'BUF-2024-234', submitted: '2024-09-19 13:15', action: 'Urgent Vet Review', complianceStatus: 'Active', color: 'red' },
        { id: 'ODC-11', status: 'HIGH', type: 'Excessive Dosage Alert', farm: 'Patel Farm', district: 'Ahmedabad', animal: 'COW-2024-010', submitted: '2024-09-17 09:00', action: 'Schedule Inspection', complianceStatus: 'Pending', color: 'red' },
    ],
    'Prescription Anomalies': [
        { id: 'PMA-22', status: 'MEDIUM', type: 'Unusual Prescription Pattern', farm: 'Multiple Farms', district: 'Kolhapur', vet: 'Dr. S. Kulkarni', submitted: '2024-09-16 11:20', action: 'Vet Practice Audit', complianceStatus: 'Active', color: 'orange' },
    ],
    'Expired Certificates': [
        { id: 'EXP-33', status: 'MEDIUM', type: 'Vet Certificate Expired', vet: 'Dr. Amit Sharma', region: 'Pune District', submitted: '2024-09-10 10:00', action: 'Renewal Notification Sent', complianceStatus: 'Pending', color: 'orange' },
    ]
};

const AlertsCompliance = () => {
    const [activeTab, setActiveTab] = useState('Withdrawal Violations');
    const [searchTerm, setSearchTerm] = useState('');
    const currentAlerts = mockAlertsData[activeTab] || [];

    const tabs = Object.keys(mockAlertsData);
    const totalActiveAlerts = Object.values(mockAlertsData).flat().filter(a => a.complianceStatus === 'Active' || a.complianceStatus === 'Pending').length;

    const filteredAlerts = currentAlerts.filter(alert => 
        alert.farm?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusStyle = (status) => {
        if (status === 'CRITICAL') return 'bg-red-600';
        if (status === 'HIGH') return 'bg-orange-500';
        return 'bg-blue-500';
    };

    const handleAction = (alertId, action) => {
        // In a real application, this triggers an API call (e.g., updating compliance status, creating an inspection record)
        alert(`Action taken on ${alertId}: ${action}`);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            
            {/* Header and Controls */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <AiOutlineWarning className="mr-2 text-2xl text-red-500" />
                        Alerts & Compliance System
                    </h2>
                    <div className="flex space-x-3">
                        <button className="flex items-center space-x-2 px-3 py-1.5 border rounded-lg text-gray-700 hover:bg-gray-50">
                            <AiOutlineDownload /> <span>Export Report</span>
                        </button>
                        <button className="flex items-center space-x-2 px-3 py-1.5 border rounded-lg text-gray-700 hover:bg-gray-50">
                            <AiOutlineFileSearch /> <span>Schedule Audit</span>
                        </button>
                    </div>
                </div>

                {/* Search and Global Status */}
                <div className="flex justify-between items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search by Farm, District, or Case ID..."
                        className="flex-1 max-w-lg px-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500 transition-shadow duration-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex items-center space-x-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                        <AiOutlineBell className="text-red-600 text-xl" />
                        <span className="text-sm font-semibold text-red-600">Total Active Alerts: {totalActiveAlerts}</span>
                    </div>
                </div>
            </div>

            {/* Tabs and Alert List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                
                {/* Tabs Navigation */}
                <div className="flex border-b border-gray-200 mb-6">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 text-sm font-medium transition-colors ${
                                activeTab === tab 
                                ? 'border-b-2 border-orange-600 text-orange-600' 
                                : 'text-gray-600 hover:text-orange-500'
                            }`}
                        >
                            {tab} ({mockAlertsData[tab].length})
                        </button>
                    ))}
                </div>

                {/* Alert Cards */}
                <div className="space-y-4">
                    {filteredAlerts.length > 0 ? (
                        filteredAlerts.map(alert => (
                            <div key={alert.id} className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 grid grid-cols-4 gap-6 items-center hover:shadow-xl transition-shadow duration-300 animate-fade-in">
                                
                                {/* 1. Status & ID */}
                                <div className="col-span-1">
                                    <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full ${getStatusStyle(alert.status)}`}>
                                        {alert.status}
                                    </span>
                                    <h3 className="text-lg font-semibold text-gray-900 mt-2">{alert.type}</h3>
                                    <p className="text-sm text-gray-500">Case ID: {alert.id}</p>
                                    <p className="text-sm text-gray-500">{alert.animal || alert.vet}</p>
                                </div>

                                {/* 2. Location & Details */}
                                <div className="col-span-2 space-y-1">
                                    <p className="text-sm font-medium text-gray-700">Farm: **{alert.farm}**</p>
                                    <p className="text-sm text-gray-600">District: {alert.district}</p>
                                    <p className="text-sm text-gray-600">Submitted: {alert.submitted}</p>
                                </div>

                                {/* 3. Actions */}
                                <div className="col-span-1 flex flex-col items-end space-y-2">
                                    <button 
                                        onClick={() => handleAction(alert.id, 'View Details')}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                                    >
                                        <AiOutlineFileSearch className="mr-1" /> View Details
                                    </button>
                                    {alert.complianceStatus !== 'Resolved' && (
                                        <button 
                                            onClick={() => handleAction(alert.id, alert.action)}
                                            className={`w-full px-4 py-2 text-white rounded-lg font-semibold text-sm shadow-md 
                                                        ${alert.action.includes('Audit') ? 'bg-purple-600 hover:bg-purple-700' : 'bg-red-600 hover:bg-red-700'}`}
                                        >
                                            <AiOutlineAudit className="inline mr-1" /> {alert.action}
                                        </button>
                                    )}
                                    {alert.complianceStatus === 'Resolved' && (
                                        <span className="text-green-600 text-sm font-semibold flex items-center"><FaCheckCircle className="mr-1" /> Case Resolved</span>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-10">No active alerts found for this category.</p>
                    )}
                </div>
            </div>
            
            {/* Ensure you have the fade-in animation CSS in your global stylesheet */}
        </div>
    );
};

export default AlertsCompliance;