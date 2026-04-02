import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ConsentPage() {
  const navigate = useNavigate();
  const patientHash = localStorage.getItem('patientHash') || '';
  const [consent, setConsent] = useState({
    bloodType: false,
    vaccination: false,
    allergies: false,
    purpose: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [txHash, setTxHash] = useState('');

  // Navbar handles wallet connection now.

  const handleSign = () => {
    setLoading(true);
    setTimeout(() => {
      const transaction = '0x' + Math.random().toString(16).substr(2, 20);
      setTxHash(transaction);
      localStorage.setItem('consentData', JSON.stringify(consent));
      localStorage.setItem('consentTx', transaction);

      const flatFields = {
        bloodType: consent.bloodType,
        vaccination: consent.vaccination,
        allergies: consent.allergies
      };

      const consents = JSON.parse(localStorage.getItem('consents') || '[]');
      consents.push({
        hospital: 'City General Hospital',
        purpose: consent.purpose,
        date: new Date().toISOString(),
        status: 'Active',
        fields: flatFields
      });
      localStorage.setItem('consents', JSON.stringify(consents));

      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  const handleProceed = () => {
    navigate('/hospital');
  };

  return (
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', padding: '20px', paddingTop: '100px', scrollPaddingTop: '3rem' }}>
      <Navbar />
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
        <h2>Patient Consent</h2>
      </div>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #7c3aed', borderRadius: '10px' }}>
          <p><strong>Patient Hash:</strong> {patientHash}</p>
        </div>
        <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #06b6d4', borderRadius: '10px' }}>
          <h3>Hospital</h3>
          <p>City General Hospital, Mumbai</p>
        </div>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', color: '#7c3aed' }}>🔒</div>
          <p style={{ color: '#ccc', fontSize: '14px' }}>This is cryptographically secure</p>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h3>Fields to Share</h3>
          <label style={{ display: 'block', margin: '10px 0' }}>
            <input
              type="checkbox"
              checked={consent.bloodType}
              onChange={e => setConsent({ ...consent, bloodType: e.target.checked })}
            /> Blood Type
          </label>
          <label style={{ display: 'block', margin: '10px 0' }}>
            <input
              type="checkbox"
              checked={consent.vaccination}
              onChange={e => setConsent({ ...consent, vaccination: e.target.checked })}
            /> Vaccination Status
          </label>
          <label style={{ display: 'block', margin: '10px 0' }}>
            <input
              type="checkbox"
              checked={consent.allergies}
              onChange={e => setConsent({ ...consent, allergies: e.target.checked })}
            /> Allergies
          </label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Purpose
            <select
              value={consent.purpose}
              onChange={e => setConsent({ ...consent, purpose: e.target.value })}
              style={inputStyle}
            >
              <option value="">Select Purpose</option>
              <option>Emergency Admission</option>
              <option>Routine Transfer</option>
              <option>Specialist Referral</option>
            </select>
          </label>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleSign}
            disabled={loading || success}
            style={{
              ...buttonStyle,
              background: loading ? '#666' : 'linear-gradient(to right, #7c3aed, #06b6d4)',
              opacity: loading || success ? 0.6 : 1
            }}
          >
            {loading ? 'Signing Consent...' : success ? 'Consent Signed' : 'Sign Consent on Midnight'}
          </button>
          {loading && <div style={{ marginTop: '10px', fontSize: '14px' }}>Processing...</div>}
          {success && (
            <div style={{ marginTop: '20px', color: '#10b981', fontSize: '18px' }}>
              Success! Transaction Hash: {txHash}
            </div>
          )}
          {success && (
            <button onClick={handleProceed} style={{ ...buttonStyle, background: '#10b981', marginTop: '20px' }}>
              Proceed to Hospital
            </button>
          )}
        </div>
      </div>
    </div>
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

export default ConsentPage;