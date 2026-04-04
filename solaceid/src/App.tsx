import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PatientWallet from './pages/PatientWallet';
import ConsentPage from './pages/ConsentPage';
import HospitalDashboard from './pages/HospitalDashboard';
import PatientDashboard from './pages/PatientDashboard';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/wallet" element={<PatientWallet />} />
        <Route path="/consent" element={<ConsentPage />} />
        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
