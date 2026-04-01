import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [hash, setHash] = useState('');

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const commitment = '0x' + Math.random().toString(16).substr(2, 20);
      setHash(commitment);
      localStorage.setItem('patientData', JSON.stringify(form));
      localStorage.setItem('patientHash', commitment);
      setLoading(false);
      setSuccess(true);
    }, 2500);
  };

  const handleProceed = () => {
    navigate('/consent');
  };

  return (
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', padding: '20px', paddingTop: '3rem', scrollPaddingTop: '3rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '48px',
          background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0'
        }}>
          SolaceID
        </h1>
      </div>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Patient Onboarding</h2>
        <form style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Full Name"
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
            placeholder="Allergies"
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
            <div style={{ marginTop: '20px', color: '#10b981', fontSize: '18px' }}>
              Success! Commitment Hash: {hash}
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
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  margin: '10px 0',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  boxSizing: 'border-box'
};

const buttonStyle = {
  padding: '12px 24px',
  border: 'none',
  borderRadius: '5px',
  color: 'white',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold'
};

export default PatientWallet;