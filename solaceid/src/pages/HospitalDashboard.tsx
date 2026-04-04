import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

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
  const [patientHash, setPatientHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [auditTrail, setAuditTrail] = useState<AuditTrail | null>(null);

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes checkmarkScale {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1.2); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes checkmarkDraw {
        0% { opacity: 0; transform: rotate(45deg) scale(0); }
        100% { opacity: 1; transform: rotate(45deg) scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Navbar handles wallet connection now.

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
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', paddingTop: '100px', scrollPaddingTop: '3rem' }}>
      <Navbar />
      <div style={{ padding: '140px 1rem 40px', margin: '0 auto', maxWidth: '1000px', width: '100%' }}>
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
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => {
              const demoHash = localStorage.getItem('solaceIdHash') || '';
              setPatientHash(demoHash);
            }}
            style={{
              ...buttonStyle,
              background: 'transparent',
              border: '2px solid #7c3aed',
              color: 'white',
              width: '100%',
              padding: '12px',
              cursor: 'pointer'
            }}
          >
            Use Demo Hash
          </button>
        </div>
        <div style={{ marginBottom: '30px' }}>
          <h3>Recent Verifications</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '15px', border: '1px solid #7c3aed', borderRadius: '8px', background: 'rgba(124, 58, 237, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#ccc' }}>Patient: 0x1a2b3c...def456</span>
                <span style={{ backgroundColor: '#10b981', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>Verified</span>
              </div>
              <div style={{ fontSize: '14px', color: '#ddd' }}>
                <p style={{ margin: '4px 0' }}><strong>Hospital:</strong> Apollo Hospital, Delhi</p>
                <p style={{ margin: '4px 0' }}><strong>Purpose:</strong> Emergency Admission</p>
                <p style={{ margin: '4px 0' }}><strong>Timestamp:</strong> 2 hours ago</p>
              </div>
            </div>
            <div style={{ padding: '15px', border: '1px solid #7c3aed', borderRadius: '8px', background: 'rgba(124, 58, 237, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#ccc' }}>Patient: 0x4d5e6f...abc789</span>
                <span style={{ backgroundColor: '#10b981', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>Verified</span>
              </div>
              <div style={{ fontSize: '14px', color: '#ddd' }}>
                <p style={{ margin: '4px 0' }}><strong>Hospital:</strong> Apollo Hospital, Delhi</p>
                <p style={{ margin: '4px 0' }}><strong>Purpose:</strong> Routine Transfer</p>
                <p style={{ margin: '4px 0' }}><strong>Timestamp:</strong> 1 day ago</p>
              </div>
            </div>
            <div style={{ padding: '15px', border: '1px solid #7c3aed', borderRadius: '8px', background: 'rgba(124, 58, 237, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#ccc' }}>Patient: 0x7h8i9j...xyz012</span>
                <span style={{ backgroundColor: '#10b981', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>Verified</span>
              </div>
              <div style={{ fontSize: '14px', color: '#ddd' }}>
                <p style={{ margin: '4px 0' }}><strong>Hospital:</strong> Apollo Hospital, Delhi</p>
                <p style={{ margin: '4px 0' }}><strong>Purpose:</strong> Specialist Referral</p>
                <p style={{ margin: '4px 0' }}><strong>Timestamp:</strong> 3 days ago</p>
              </div>
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
                width: '80px',
                height: '80px',
                border: '4px solid white',
                borderRadius: '50%',
                position: 'relative',
                marginBottom: '15px',
                animation: 'checkmarkScale 0.6s ease-out'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '28px',
                  width: '24px',
                  height: '40px',
                  border: 'solid white',
                  borderWidth: '0 6px 6px 0',
                  transform: 'rotate(45deg)',
                  animation: 'checkmarkDraw 0.4s ease-out 0.2s both'
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
                Verified by Midnight Network
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
              <div style={{ marginTop: '15px', padding: '10px', background: 'rgba(124, 58, 237, 0.1)', borderRadius: '8px', border: '1px solid #7c3aed' }}>
                <p style={{ margin: '0', fontSize: '14px' }}><strong>Blockchain Transaction:</strong> 0x8f7e6d5c4b3a2910...fedcba9876543210</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>Verified on Midnight Network - Block #1,247,893</p>
              </div>
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