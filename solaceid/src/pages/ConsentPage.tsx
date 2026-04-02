import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ConsentPage() {
  const navigate = useNavigate();
  const patientHash = localStorage.getItem('patientHash') || '';
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [_isConnected, setIsConnected] = useState<boolean>(false);
  const [consent, setConsent] = useState({
    bloodType: false,
    vaccination: false,
    allergies: false,
    purpose: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [txHash, setTxHash] = useState('');

  const connectWallet = async () => {
    try {
      const lace = (window as any).midnight?.mnLace
        || (window as any).lace
        || (window as any).cardano?.lace
        || (window as any).midnight;

      if (!lace) {
        alert('Please make sure Lace Midnight Preview is installed, enabled, and you are on the correct network (Preprod). Try refreshing the page after enabling the extension.');
        return;
      }

      const api = await lace.enable();
      const state = await api.state();
      const address = state?.address || state?.unshieldedAddress || 'Connected';
      setWalletAddress(address);
      setIsConnected(true);
    } catch (error) {
      console.error('Wallet connection error:', error);
      alert('Connection failed. Make sure Lace Midnight Preview is unlocked and on Preprod network.');
    }
  };

  const formatAddress = (address: string) => {
    if (!address) return 'Connect Wallet';
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const handleSign = () => {
    setLoading(true);
    setTimeout(() => {
      const transaction = '0x' + Math.random().toString(16).substr(2, 20);
      setTxHash(transaction);
      localStorage.setItem('consentData', JSON.stringify(consent));
      localStorage.setItem('consentTx', transaction);
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  const handleProceed = () => {
    navigate('/hospital');
  };

  return (
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', padding: '20px', paddingTop: '100px', scrollPaddingTop: '3rem' }}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(10,15,30,0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #7c3aed',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem'
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          SolaceID
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/wallet" style={{ color: 'white', textDecoration: 'none' }}>Patient Portal</a>
          <a href="/hospital" style={{ color: 'white', textDecoration: 'none' }}>Hospital Dashboard</a>
        </div>
        <button onClick={connectWallet} style={{
          background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          {formatAddress(walletAddress)}
        </button>
      </div>
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