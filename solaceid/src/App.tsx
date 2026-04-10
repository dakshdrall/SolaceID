import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import PatientWallet from './pages/PatientWallet';
import ConsentPage from './pages/ConsentPage';
import HospitalDashboard from './pages/HospitalDashboard';
import PatientDashboard from './pages/PatientDashboard';
import AboutPage from './pages/AboutPage';
import HospitalLogin from './pages/HospitalLogin';
import PatientLogin from './pages/PatientLogin';
import ContractsPage from './pages/ContractsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Marketplace from './pages/Marketplace';
import TransactionHistory from './pages/TransactionHistory';
import NotFound from './pages/NotFound';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/wallet" element={<PatientWallet />} />
        <Route path="/consent" element={<ConsentPage />} />
        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/hospital-login" element={<HospitalLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
