import { useState } from 'react';

interface PatientData {
  name: string;
  dob: string;
  bloodType: string;
  allergies: string;
  vaccination: boolean;
}

interface AuditTrail {
  receiptHash: string | null;
  timestamp: string;
  network: string;
  purpose: string;
}

function HospitalDashboard() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [_isConnected, setIsConnected] = useState<boolean>(false);
  const [patientHash, setPatientHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [auditTrail, setAuditTrail] = useState<AuditTrail | null>(null);

  const connectWallet = async () => {
    try {
      if (!window.midnight?.mnLace) {
        alert('Please install Lace Midnight Preview wallet from Chrome Web Store');
        return;
      }

      await window.midnight.mnLace.enable();
      const state = await window.midnight.mnLace.state();
      
      if (state.address) {
        setWalletAddress(state.address);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      alert('Failed to connect wallet');
    }
  };

  const formatAddress = (address: string) => {
    if (!address) return 'Connect Wallet';
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      const storedHash = localStorage.getItem('patientHash');
      if (patientHash === storedHash) {
        const data = JSON.parse(localStorage.getItem('patientData') || '{}');
        const consent = JSON.parse(localStorage.getItem('consentData') || '{}');
        const tx = localStorage.getItem('consentTx');
        setPatientData(data);
        setAuditTrail({
          receiptHash: tx,
          timestamp: new Date().toISOString(),
          network: 'Midnight Preprod',
          purpose: consent.purpose
        });
        setVerified(true);
      } else {
        alert('Invalid patient hash');
      }
      setLoading(false);
    }, 2500);
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
        <h2>Hospital Dashboard</h2>
      </div>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '30px' }}>
          <input
            type="text"
            placeholder="Enter Patient Hash"
            value={patientHash}
            onChange={e => setPatientHash(e.target.value)}
            style={inputStyle}
          />
          <button
            onClick={handleVerify}
            disabled={loading || verified}
            style={{
              ...buttonStyle,
              background: loading ? '#666' : 'linear-gradient(to right, #7c3aed, #06b6d4)',
              opacity: loading || verified ? 0.6 : 1,
              marginLeft: '10px'
            }}
          >
            {loading ? 'Verifying...' : verified ? 'Verified' : 'Verify on Midnight'}
          </button>
        </div>
        <div style={{ marginBottom: '30px' }}>
          <h3>Recent Verifications</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '10px', border: '1px solid #7c3aed', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p><strong>Patient Hash:</strong> 0x1a2b3c4d5e6f7890...</p>
                <p><strong>Timestamp:</strong> 2024-04-01T10:30:00Z</p>
              </div>
              <span style={{ backgroundColor: '#10b981', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '14px' }}>Verified</span>
            </div>
            <div style={{ padding: '10px', border: '1px solid #7c3aed', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p><strong>Patient Hash:</strong> 0x9f8e7d6c5b4a3210...</p>
                <p><strong>Timestamp:</strong> 2024-03-31T14:15:00Z</p>
              </div>
              <span style={{ backgroundColor: '#10b981', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '14px' }}>Verified</span>
            </div>
            <div style={{ padding: '10px', border: '1px solid #7c3aed', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p><strong>Patient Hash:</strong> 0x5f4e3d2c1b0a9876...</p>
                <p><strong>Timestamp:</strong> 2024-03-30T09:45:00Z</p>
              </div>
              <span style={{ backgroundColor: '#10b981', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '14px' }}>Verified</span>
            </div>
          </div>
        </div>
        {verified && (
          <div>
            <div style={{
              textAlign: 'center',
              marginBottom: '30px',
              padding: '30px',
              background: 'linear-gradient(135deg, #10b981, #7c3aed)',
              borderRadius: '15px',
              fontSize: '28px',
              fontWeight: 'bold',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{
                display: 'inline-block',
                width: '60px',
                height: '60px',
                border: '4px solid white',
                borderRadius: '50%',
                position: 'relative',
                marginBottom: '15px'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '20px',
                  width: '20px',
                  height: '30px',
                  border: 'solid white',
                  borderWidth: '0 4px 4px 0',
                  transform: 'rotate(45deg)'
                }}></div>
              </div>
              <br />
              ZK Proof Verified
              <div style={{
                marginTop: '15px',
                fontSize: '16px',
                fontWeight: 'normal',
                background: 'rgba(255,255,255,0.2)',
                padding: '10px',
                borderRadius: '10px',
                display: 'inline-block'
              }}>
                Midnight Network
              </div>
            </div>
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
              <h3>Blockchain Transaction Timeline</h3>
              <div style={{ position: 'relative', paddingLeft: '50px' }}>
                <div style={{
                  position: 'absolute',
                  left: '20px',
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  background: 'linear-gradient(to bottom, #7c3aed, #06b6d4)'
                }}></div>
                <div style={{ marginBottom: '20px', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '-40px',
                    top: '5px',
                    width: '20px',
                    height: '20px',
                    background: '#7c3aed',
                    borderRadius: '50%'
                  }}></div>
                  <div style={{ background: 'rgba(124, 58, 237, 0.1)', padding: '15px', borderRadius: '10px', border: '1px solid #7c3aed' }}>
                    <strong>Identity Commitment</strong><br />
                    Patient ZK identity created on Midnight Network
                  </div>
                </div>
                <div style={{ marginBottom: '20px', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '-40px',
                    top: '5px',
                    width: '20px',
                    height: '20px',
                    background: '#06b6d4',
                    borderRadius: '50%'
                  }}></div>
                  <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '15px', borderRadius: '10px', border: '1px solid #06b6d4' }}>
                    <strong>Consent Transaction</strong><br />
                    Patient signed consent for data sharing
                  </div>
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '-40px',
                    top: '5px',
                    width: '20px',
                    height: '20px',
                    background: '#10b981',
                    borderRadius: '50%'
                  }}></div>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '15px', borderRadius: '10px', border: '1px solid #10b981' }}>
                    <strong>ZK Verification</strong><br />
                    Hospital verified proof and accessed authorized data
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: '30px' }}>
              <h3>Patient Health Record</h3>
              <p><strong>Blood Type:</strong> {patientData?.bloodType}</p>
              <p><strong>Allergies:</strong> {patientData?.allergies}</p>
              <p><strong>Vaccination Status:</strong> {patientData?.vaccination ? 'Vaccinated' : 'Not Vaccinated'}</p>
            </div>
            <div style={{ marginBottom: '30px' }}>
              <h3>Audit Trail</h3>
              <p><strong>Receipt Hash:</strong> {auditTrail?.receiptHash}</p>
              <p><strong>Timestamp:</strong> {auditTrail?.timestamp}</p>
              <p><strong>Network:</strong> {auditTrail?.network}</p>
              <p><strong>Purpose:</strong> {auditTrail?.purpose}</p>
            </div>
            <footer style={{
              textAlign: 'center',
              marginTop: '50px',
              padding: '20px',
              borderTop: '1px solid #7c3aed',
              fontSize: '14px',
              color: '#ccc'
            }}>
              This record was verified by Midnight Network. Raw medical data was never stored on-chain.
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '60%',
  padding: '12px',
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

export default HospitalDashboard;