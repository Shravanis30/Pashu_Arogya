import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Landing from './components/Landing';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Overview from './components/DashboardContent';
import RealtimeMonitoring from './components/RealtimeMonitoring';
import VetVerification from './components/VetVerification';
import AlertsCompliance from './components/AlertsCompliance';
import ReportsAnalytics from './components/ReportsAnalytics';
import ReportDetailView from './components/ReportDetailView';
import Settings from './components/Settings';
import SettingDetail from './components/SettingDetail';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/auth/:level" element={<Auth />} />
      <Route path="/dashboard/:level" element={<Dashboard />} >
        <Route index element={<Overview />} />
        <Route path="monitoring" element={<RealtimeMonitoring />} />
        <Route path="vet-verification" element={<VetVerification />} />
        <Route path="alerts-compliance" element={<AlertsCompliance />} />
        <Route path="reports-analytics" element={<ReportsAnalytics />} />
        <Route path="reports-analytics/:viewType" element={<ReportDetailView />} />
        
        {/* CORRECTED: Nested routes for Settings component */}
        <Route path="settings" element={<Settings />} >
          <Route index element={<SettingDetail viewType="overview" />} />
          <Route path=":viewType" element={<SettingDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;