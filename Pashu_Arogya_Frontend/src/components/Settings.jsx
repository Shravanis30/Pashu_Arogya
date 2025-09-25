import React, { useState } from 'react';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { AiOutlineSetting, AiOutlineAlert, AiOutlineSafety, AiOutlineUser, AiOutlineDashboard } from 'react-icons/ai';

const Settings = () => {
    const { level } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    // Define the setting links based on the design
    const settingsLinks = [
        { path: 'overview', name: 'Settings Overview', icon: AiOutlineDashboard },
        { path: 'threshold', name: 'Alert Thresholds', icon: AiOutlineAlert },
        { path: 'permissions', name: 'User Permissions', icon: AiOutlineUser },
        { path: 'security', name: 'Security Protocols', icon: AiOutlineSafety },
    ];

    const basePath = `/dashboard/${level}/settings`;
    
    return (
        <div className="flex bg-white rounded-lg shadow-md min-h-[70vh]">
            
            {/* Left Panel: Internal Settings Sidebar */}
            <aside className="w-64 border-r p-6 bg-gray-50 flex-shrink-0">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <AiOutlineSetting className="text-orange-500" />
                    <span>Portal Settings</span>
                </h3>
                
                <nav className="space-y-1">
                    {settingsLinks.map((link) => {
                        const isCurrent = location.pathname.endsWith(link.path) || 
                                          (link.path === 'overview' && location.pathname === basePath);
                        
                        return (
                            <button
                                key={link.path}
                                onClick={() => navigate(`${basePath}/${link.path === 'overview' ? '' : link.path}`)}
                                className={`w-full text-left flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors 
                                            ${isCurrent ? 'bg-orange-500 text-white shadow-md animate-scale-up' : 'text-gray-700 hover:bg-orange-100'}`}
                            >
                                <link.icon className="h-5 w-5" />
                                <span>{link.name}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>
            
            {/* Right Panel: Detail Content (Renders SettingDetail) */}
            <section className="flex-1 p-8">
                <Outlet />
            </section>
            
            {/* Add custom CSS for animations to your src/App.css */}
            <style>
                {`
                @keyframes scaleUp {
                    from { transform: scale(0.98); opacity: 0.8; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-up {
                    animation: scaleUp 0.3s ease-out forwards;
                }
                `}
            </style>
        </div>
    );
};

export default Settings;