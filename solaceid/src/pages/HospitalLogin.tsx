import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function HospitalLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    hospitalName: '',
    hospitalId: '',
    adminEmail: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/hospital');
    }, 2000);
  };

  const handleDemo = () => {
    navigate('/hospital');
  };

  return (
    <>
    <Navbar />
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', paddingTop: "140px", scrollPaddingTop: '3rem' }}>
      <div style={{ padding: '20px 1rem 40px', margin: '0 auto', maxWidth: '1000px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: "2rem",
            background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0'
          }}>
            Hospital Portal
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', margin: '10px 0 0 0' }}>
            Secure access for verified healthcare institutions
          </p>
        </div>

        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          {/* Step Indicator */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '14px', color: '#94a3b8' }}>Hospital Access</span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>Entry Point</span>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
              <div style={{ flex: 1, height: '4px', backgroundColor: '#7c3aed', borderRadius: '2px' }}></div>
            </div>
          </div>

          {/* Login Form */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '15px',
            padding: '40px',
            marginBottom: '20px'
          }}>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontSize: '14px' }}>
                  Hospital Name
                </label>
                <input
                  type="text"
                  value={form.hospitalName}
                  onChange={e => setForm({ ...form, hospitalName: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. City General Hospital"
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontSize: '14px' }}>
                  Hospital ID
                </label>
                <input
                  type="text"
                  value={form.hospitalId}
                  onChange={e => setForm({ ...form, hospitalId: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. HOSP-2024-001"
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontSize: '14px' }}>
                  Admin Email
                </label>
                <input
                  type="email"
                  value={form.adminEmail}
                  onChange={e => setForm({ ...form, adminEmail: e.target.value })}
                  style={inputStyle}
                  placeholder="admin@hospital.com"
                  required
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontSize: '14px' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  style={inputStyle}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading ? '#666' : 'linear-gradient(to right, #7c3aed, #06b6d4)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '15px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginBottom: '15px'
                }}
              >
                {loading ? 'Authenticating...' : 'Login to Hospital Portal'}
              </button>
            </form>

            <button
              onClick={handleDemo}
              style={{
                width: '100%',
                background: 'transparent',
                color: '#7c3aed',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Try demo without login →
            </button>
          </div>

          {/* Security Notice */}
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid #10b981',
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔒</div>
            <p style={{ margin: '0', color: '#94a3b8', fontSize: '14px' }}>
              All hospital accounts are verified by SolaceID team
            </p>
          </div>

          {/* New Hospital Link */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', margin: '0' }}>
              New Hospital? <a href="#" style={{ color: '#7c3aed', textDecoration: 'none' }}>Apply for access →</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '8px',
  background: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  fontSize: '16px',
  boxSizing: 'border-box'
};

export default HospitalLogin;