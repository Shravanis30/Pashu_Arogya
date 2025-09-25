import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaShieldAlt, FaCheckCircle, FaTimesCircle, FaUserLock, FaDatabase, FaCog, FaLock, FaUsers, FaClipboardList, FaPlus, FaBell, FaSync } from 'react-icons/fa';
import { AiOutlineWarning, AiOutlineUser, AiOutlineHistory } from 'react-icons/ai';

const SettingDetail = ({ viewType: initialViewType }) => {
    const { viewType: paramViewType } = useParams();
    const viewType = paramViewType || initialViewType || 'overview';
    const { level } = useParams();
    const targetLabel = level === 'central' ? 'States' : level === 'state' ? 'Districts' : 'Villages';

    const [isSaving, setIsSaving] = useState(false);
    const [thresholdValue, setThresholdValue] = useState(85); // For old range slider
    const [securityTab, setSecurityTab] = useState('password'); // New state for security tabs

    // Mock data for the components
    const mockUsers = [
        { name: 'Dr. Rajesh Kumar', email: 'rajesh.kumar@gov.in', role: 'Central Authority', status: 'active', lastLogin: '2024-01-15', canEdit: true },
        { name: 'Dr. Priya Sharma', email: 'priya.sharma@state.gov.in', role: 'State Authority', status: 'active', lastLogin: '2024-01-14', canEdit: true },
        { name: 'Dr. Amit Patel', email: 'amit.patel@district.gov.in', role: 'District Authority', status: 'inactive', lastLogin: '2024-01-10', canEdit: false },
    ];

    const mockPermissions = [
        { name: 'View AMU Reports', central: true, state: true, district: true },
        { name: 'Modify Alert Thresholds', central: true, state: false, district: false },
        { name: 'Manage Users', central: true, state: true, district: false },
        { name: 'Export Data', central: true, state: true, district: true },
        { name: 'System Configuration', central: true, state: false, district: false },
        { name: 'Vet Verification', central: true, state: true, district: false },
    ];

    const mockRecentChanges = [
        { id: 1, type: 'Alert threshold updated', detail: 'AMU critical level changed to 90% by Dr. Rajesh Kumar', time: '2 hours ago', icon: FaBell, color: 'text-orange-500' },
        { id: 2, type: 'New user added', detail: `Dr. Amit Patel granted District Authority access`, time: '1 day ago', icon: AiOutlineUser, color: 'text-green-500' },
        { id: 3, type: 'Security policy updated', detail: 'Password expiry set to 90 days', time: '3 days ago', icon: FaLock, color: 'text-blue-500' },
    ];

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert(`Settings for ${viewType} saved successfully!`);
        }, 1500);
    };

    // Helper to render the permission toggle switch
    const renderToggle = (isAllowed) => (
        <div className={`flex items-center justify-center`}>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked={isAllowed} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
        </div>
    );

    // --- Content for Security Tab View ---
    const renderSecurityContent = () => {
        if (securityTab === 'password') {
            return (
                <div className="space-y-6">
                    <h4 className="text-xl font-semibold mb-4 border-b pb-2">Password Policy</h4>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Minimum Password Length</label>
                            <input type="number" defaultValue="8" className="w-full p-2 border rounded-lg focus:ring-orange-500" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Password Expiry (Days)</label>
                            <input type="number" defaultValue="90" className="w-full p-2 border rounded-lg focus:ring-orange-500" />
                        </div>
                        <div className="col-span-2 space-y-3 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-700">Require Uppercase Letters</span>
                                {renderToggle(true)}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-700">Require Numbers</span>
                                {renderToggle(true)}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-700">Require Special Characters</span>
                                {renderToggle(true)}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if (securityTab === 'session') {
            return (
                <div className="space-y-6">
                    <h4 className="text-xl font-semibold mb-4 border-b pb-2">Session Management</h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-700">Session Timeout (Minutes)</span>
                            <input type="number" defaultValue="30" className="w-24 p-2 border rounded-lg" />
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-700">Require Two-Factor Authentication (MFA)</span>
                            {renderToggle(true)}
                        </div>
                    </div>
                </div>
            );
        }
        if (securityTab === 'audit') {
            return (
                <div className="space-y-6">
                    <h4 className="text-xl font-semibold mb-4 border-b pb-2">Audit & Logging</h4>
                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg flex items-center justify-between">
                            <span className="font-medium text-green-700 flex items-center"><FaDatabase className="mr-2" /> Blockchain Sync Status: Active</span>
                            <span className="text-sm text-green-600">Last Sync: Real-Time</span>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg flex items-center justify-between">
                            <span className="font-medium text-blue-700 flex items-center"><AiOutlineHistory className="mr-2" /> Log Retention Policy</span>
                            <span className="text-sm text-blue-600">7 Years (Immutable)</span>
                        </div>
                    </div>
                </div>
            );
        }
    };


    // --- Main View Renderer ---
    const renderView = () => {
        // --- Settings Overview (Matching image_082ae3.png) ---
        if (viewType === 'overview') {
            return (
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">System Settings Overview</h2>
                    <p className="text-gray-600">Configure portal preferences, security settings, and user management for **{level.toUpperCase()}** Authority.</p>
                    
                    {/* Summary Cards */}
                    <div className="grid grid-cols-3 gap-6">
                        {/* Card 1: Alert Thresholds */}
                        <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                            <div className="flex justify-between items-start mb-2">
                                <FaBell className="text-3xl text-orange-600" />
                                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center"><FaCheckCircle className="mr-1" /> Active</span>
                            </div>
                            <h4 className="font-semibold text-lg text-gray-800">Alert Thresholds</h4>
                            <p className="text-sm text-gray-500 mt-1">AMU Critical Level: **90%**</p>
                            <p className="text-sm text-gray-500">Compliance Warning: **60%**</p>
                        </div>
                        
                        {/* Card 2: User Management */}
                        <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex justify-between items-start mb-2">
                                <FaUsers className="text-3xl text-blue-600" />
                                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center"><FaCheckCircle className="mr-1" /> 2 Active</span>
                            </div>
                            <h4 className="font-semibold text-lg text-gray-800">User Management</h4>
                            <p className="text-sm text-gray-500 mt-1">Total Users: **3**</p>
                            <p className="text-sm text-gray-500">Active Sessions: **2**</p>
                        </div>

                        {/* Card 3: Security Protocols */}
                        <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex justify-between items-start mb-2">
                                <FaLock className="text-3xl text-red-600" />
                                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center"><FaCheckCircle className="mr-1" /> Secure</span>
                            </div>
                            <h4 className="font-semibold text-lg text-gray-800">Security Protocols</h4>
                            <p className="text-sm text-gray-500 mt-1">MFA Enabled: **Yes**</p>
                            <p className="text-sm text-gray-500">Session Timeout: **30min**</p>
                        </div>
                    </div>
                    
                    {/* Recent System Changes */}
                    <div className="pt-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                            <FaClipboardList className="mr-2 text-gray-500" /> Recent System Changes
                        </h3>
                        <div className="space-y-3">
                            {mockRecentChanges.map(change => (
                                <div key={change.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                                    <change.icon className={`text-xl ${change.color} flex-shrink-0`} />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">{change.type}</p>
                                        <p className="text-sm text-gray-600">{change.detail}</p>
                                    </div>
                                    <span className="text-xs text-gray-400 flex-shrink-0">{change.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        // --- Alert Thresholds (Matching image_082aa3.png) ---
        if (viewType === 'threshold') {
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">Alert Threshold Configuration</h2>
                    <p className="text-gray-600">Set threshold levels for different types of alerts and notifications.</p>
                    
                    <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
                        <h4 className="font-semibold text-lg mb-4">AMU Usage Monitoring</h4>
                        <table className="min-w-full divide-y divide-gray-300 border border-gray-300 rounded-lg overflow-hidden">
                            <thead className="bg-white">
                                <tr>
                                    <th className="px-4 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider border-r"></th>
                                    <th className="px-4 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider border-r">Critical Level (%)</th>
                                    <th className="px-4 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider border-r">Warning Level (%)</th>
                                    <th className="px-4 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Normal Level (%)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border-r">AMU Usage</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center border-r">90</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center border-r">75</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center">50</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border-r">Compliance</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-xs text-center border-r text-red-600 font-semibold">Immediate action required</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-xs text-center border-r text-orange-600 font-semibold">Caution advised</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-xs text-center text-green-600 font-semibold">Acceptable range</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div className="flex items-center p-4 mt-4 bg-yellow-100 rounded-lg">
                            <AiOutlineWarning className="text-xl text-yellow-600 mr-3 flex-shrink-0" />
                            <p className="text-sm text-yellow-800">System will send notifications when usage exceeds these thresholds.</p>
                        </div>
                    </div>
                </div>
            );
        }

        // --- User Permissions (Matching image_082a48.png, image_082a4c.png) ---
        if (viewType === 'permissions') {
            return (
                <div className="space-y-6">
                    <div className="flex justify-between items-center border-b pb-3">
                        <h2 className="text-2xl font-bold text-gray-800">User Management & Permissions</h2>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                            <FaPlus className="text-sm" /> <span>Add New User</span>
                        </button>
                    </div>
                    <p className="text-gray-600">Manage user accounts, roles, and access permissions.</p>

                    {/* User Table */}
                    <div className="mt-6">
                         <div className="flex justify-between items-center mb-4">
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="px-4 py-2 border rounded-lg max-w-sm"
                            />
                            <select className="border rounded-lg p-2 text-sm">
                                <option>Filter by role</option>
                            </select>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {mockUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                            <AiOutlineUser className="mr-2 text-blue-500" /> {user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                            <button className="text-gray-500 hover:text-indigo-900"><FaCog /></button>
                                            <button className="text-gray-500 hover:text-red-900"><FaLock /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Role Permissions Matrix */}
                    <div className="mt-8 pt-6 border-t">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Role Permissions Matrix</h3>
                        <p className="text-gray-600 mb-6">Configure access permissions for different user roles</p>

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Central Authority</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">State Authority</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">District Authority</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {mockPermissions.map((permission, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{permission.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{renderToggle(permission.central)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{renderToggle(permission.state)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{renderToggle(permission.district)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8 pt-4 flex justify-end">
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-200 shadow-lg 
                                       ${isSaving ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'}`}
                        >
                            {isSaving ? 'Updating...' : 'Update Permissions'}
                        </button>
                    </div>
                </div>
            );
        }

        // --- Security Protocols (Matching image_082745.png) ---
        if (viewType === 'security') {
            return (
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">Security Protocol Configuration</h2>
                    <p className="text-gray-600">Configure authentication, password policies, and security measures.</p>

                    {/* Security Tabs */}
                    <div className="bg-white p-6 rounded-lg shadow-md border">
                         <div className="flex border-b border-gray-200 mb-6">
                            <button
                                onClick={() => setSecurityTab('password')}
                                className={`px-4 py-2 font-medium text-sm ${securityTab === 'password' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Password Policy
                            </button>
                            <button
                                onClick={() => setSecurityTab('session')}
                                className={`px-4 py-2 font-medium text-sm ${securityTab === 'session' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Session Management
                            </button>
                            <button
                                onClick={() => setSecurityTab('audit')}
                                className={`px-4 py-2 font-medium text-sm ${securityTab === 'audit' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Audit & Logging
                            </button>
                        </div>
                        
                        {renderSecurityContent()}

                        <div className="mt-6 pt-4 border-t flex justify-end">
                            <button 
                                onClick={handleSave}
                                disabled={isSaving}
                                className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-200 shadow-lg 
                                           ${isSaving ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'}`}
                            >
                                {isSaving ? 'Updating...' : 'Update Security Settings'}
                            </button>
                        </div>
                    </div>


                    {/* Security Status Overview */}
                    <div className="pt-6 border-t">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Security Status Overview</h3>
                        <div className="grid grid-cols-3 gap-6">
                             {/* Security Score */}
                            <div className="p-4 bg-white rounded-lg shadow-md border-t-4 border-green-500">
                                <p className="text-sm text-gray-500">System Security</p>
                                <p className="text-3xl font-bold text-gray-900">98%</p>
                                <span className="text-sm font-semibold text-green-600">Secure</span>
                            </div>
                            {/* Failed Logins */}
                            <div className="p-4 bg-white rounded-lg shadow-md border-t-4 border-red-500">
                                <p className="text-sm text-gray-500">Failed Logins</p>
                                <p className="text-3xl font-bold text-gray-900">3</p>
                                <span className="text-sm font-semibold text-red-600">Low</span>
                            </div>
                            {/* Active Sessions */}
                            <div className="p-4 bg-white rounded-lg shadow-md border-t-4 border-blue-500">
                                <p className="text-sm text-gray-500">Active Sessions</p>
                                <p className="text-3xl font-bold text-gray-900">12</p>
                                <span className="text-sm font-semibold text-blue-600">Normal</span>
                            </div>
                        </div>
                        
                        <h4 className="font-semibold text-lg pt-6 mt-4 border-t">Recent Security Events</h4>
                        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 mt-4">
                            <li className="flex items-center space-x-2">
                                <FaCheckCircle className="text-green-500" /> 
                                <span>Successful Login - Dr. Rajesh Kumar - 5 min ago</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <AiOutlineWarning className="text-red-500" /> 
                                <span>Failed login attempt - Unknown user - 1 hour ago</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaLock className="text-blue-500" /> 
                                <span>Password policy updated - System Administrator - 2 hours ago</span>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="animate-fade-in-up w-full">
            {renderView()}
            
            {/* The individual view sections now handle their own save buttons */}
        </div>
    );
};

export default SettingDetail;