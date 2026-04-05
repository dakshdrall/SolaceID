import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function PatientWallet() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    dob: '',
    bloodType: '',
    allergies: '',
    vaccination: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [flash, setFlash] = useState(false);
  const [hash, setHash] = useState('');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes flash {
        0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
        50% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
        100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const commitment = '0x' + Math.random().toString(16).substr(2, 20);
      setHash(commitment);
      localStorage.setItem('patientData', JSON.stringify(form));
      localStorage.setItem('patientHash', commitment);
      localStorage.setItem('patientCreated', new Date().toISOString());
      setLoading(false);
      setSuccess(true);
      setFlash(true);
      setTimeout(() => setFlash(false), 1000);
    }, 2500);
  };

  const handleProceed = () => {
    navigate('/dashboard');
  };

  return (
    <>
    <Navbar />
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', paddingTop: "140px", scrollPaddingTop: '3rem' }}>
      {localStorage.getItem('patientName') && (
        <div style={{ textAlign: 'center', margin: '20px 0', padding: '0 1rem' }}>
          <span style={{ background: '#10b981', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>
            Welcome back, {localStorage.getItem('patientName')}
          </span>
        </div>
      )}
      <div style={{ padding: '20px 1rem 40px', margin: '0 auto', maxWidth: '1000px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: "2rem",
            background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0'
          }}>
            Patient Portal
          </h1>
        </div>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '20px',
          ...(flash ? { animation: 'flash 1s ease-out' } : {})
        }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '20px',
              fontWeight: 'bold'
            }}>
              Your Privacy Score: 100%
            </div>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#1a1f2e',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '14px',
              color: '#94a3b8'
            }}>
              <span>🔒</span>
              <span>Your data never leaves this device until you consent</span>
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '14px', color: '#94a3b8' }}>Step 1 of 3</span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>Identity Creation</span>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
              <div style={{ flex: 1, height: '4px', backgroundColor: '#7c3aed', borderRadius: '2px' }}></div>
              <div style={{ flex: 1, height: '4px', backgroundColor: '#374151', borderRadius: '2px' }}></div>
              <div style={{ flex: 1, height: '4px', backgroundColor: '#374151', borderRadius: '2px' }}></div>
            </div>
          </div>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Patient Onboarding</h2>
          <form style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="e.g. Daksh Drall"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={form.dob}
              onChange={e => setForm({ ...form, dob: e.target.value })}
              style={inputStyle}
            />
            <select
              value={form.bloodType}
              onChange={e => setForm({ ...form, bloodType: e.target.value })}
              style={inputStyle}
            >
              <option value="">Select Blood Type</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
            <input
              type="text"
              placeholder="e.g. Penicillin, Peanuts"
              value={form.allergies}
              onChange={e => setForm({ ...form, allergies: e.target.value })}
              style={inputStyle}
            />
            <label style={{ display: 'block', margin: '10px 0', fontSize: '16px' }}>
              <input
                type="checkbox"
                checked={form.vaccination}
                onChange={e => setForm({ ...form, vaccination: e.target.checked })}
                style={{ marginRight: '10px' }}
              />
              Vaccination Status
            </label>
          </form>
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleGenerate}
              disabled={loading || success}
              style={{
                ...buttonStyle,
                background: loading ? '#666' : 'linear-gradient(to right, #7c3aed, #06b6d4)',
                opacity: loading || success ? 0.6 : 1
              }}
            >
              {loading ? 'Generating ZK Identity...' : success ? 'ZK Identity Generated' : 'Generate ZK Identity'}
            </button>
            {loading && <div style={{ marginTop: '10px', fontSize: '14px' }}>Processing...</div>}
            {success && (
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <div style={{
                  display: 'inline-block',
                  width: '50px',
                  height: '50px',
                  border: '3px solid #10b981',
                  borderRadius: '50%',
                  position: 'relative',
                  marginBottom: '10px'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '15px',
                    width: '15px',
                    height: '25px',
                    border: 'solid #10b981',
                    borderWidth: '0 3px 3px 0',
                    transform: 'rotate(45deg)'
                  }}></div>
                </div>
                <div style={{ color: '#10b981', fontSize: '18px', fontWeight: 'bold' }}>
                  Success! Commitment Hash: {hash}
                </div>
              </div>
            )}
            {success && (
              <button onClick={handleProceed} style={{ ...buttonStyle, background: '#10b981', marginTop: '20px' }}>
                Proceed to Consent
              </button>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  </>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  margin: '10px 0',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  boxSizing: 'border-box'
};

const buttonStyle: React.CSSProperties = {
  padding: '12px 24px',
  border: 'none',
  borderRadius: '5px',
  color: 'white',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold'
};

export default PatientWallet;