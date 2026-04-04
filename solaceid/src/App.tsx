import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PatientWallet from './pages/PatientWallet';
import ConsentPage from './pages/ConsentPage';
import HospitalDashboard from './pages/HospitalDashboard';
import PatientDashboard from './pages/PatientDashboard';
import AboutPage from './pages/AboutPage';
import HospitalLogin from './pages/HospitalLogin';
import PatientLogin from './pages/PatientLogin';
import ContractsPage from './pages/ContractsPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/wallet" element={<PatientWallet />} />
        <Route path="/consent" element={<ConsentPage />} />
        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/hospital-login" element={<HospitalLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
