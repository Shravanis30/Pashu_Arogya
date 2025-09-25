import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReportData } from '../data/mockReportsData';
import { AiOutlineFileText, AiOutlineBarChart, AiOutlineDashboard, AiOutlineAreaChart, AiOutlineSchedule } from 'react-icons/ai';

const ReportsAnalytics = () => {
    const { level } = useParams();
    const navigate = useNavigate();
    const [reportData, setReportData] = useState(null);

    // --- Data Fetching and Access Control Logic ---
    useEffect(() => {
        const data = getReportData(level);
        setReportData(data);
    }, [level]);

    const handleNavigation = (viewType) => {
        // Navigate to the detail view using a nested route
        navigate(`/dashboard/${level}/reports-analytics/${viewType}`);
    };
    
    // Cards data corresponding to image_089460.png
    const reportCards = [
        { title: "Detailed Report View", desc: `View comprehensive data showing all metrics across categorized ${reportData?.dataLabel || 'Region'}.`, icon: AiOutlineAreaChart, viewType: 'detailed' },
        { title: "Compliance Dashboard", desc: `Visualize MRL/AMU adherence, trends, and violation severity across ${reportData?.dataLabel || 'Region'}.`, icon: AiOutlineDashboard, viewType: 'compliance' },
        { title: "Performance Metrics", desc: `Track key operational indicators like vet verification status and inspection rates.`, icon: AiOutlineBarChart, viewType: 'performance' },
    ];

    if (!reportData) return <div className="p-8 text-center">Loading reports...</div>;

    return (
        <div className="p-8 bg-white rounded-lg shadow-md min-h-[70vh]">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-2">
                <AiOutlineFileText className="mr-2 text-orange-500" /> Reports & Analytics
            </h2>
            <p className="text-gray-600 mb-8">{reportData.summary}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reportCards.map((card, index) => (
                    <div 
                        key={index}
                        onClick={() => handleNavigation(card.viewType)}
                        className="bg-gray-50 p-6 rounded-xl shadow-lg border-t-4 border-orange-500 cursor-pointer hover:shadow-2xl hover:bg-white transition-all duration-300"
                    >
                        <card.icon className="text-4xl text-orange-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                        <p className="text-gray-600 text-sm">{card.desc}</p>
                        <span className="mt-4 inline-flex items-center text-sm text-blue-600 font-medium">
                            Go to Report <AiOutlineSchedule className="ml-1" />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportsAnalytics;