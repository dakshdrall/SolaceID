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
            Hospital Dashboard
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', margin: '10px 0 0 0' }}>
            Demo Environment — Midnight Network Preprod
          </p>
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
              // Auto-trigger verification after 500ms delay
              setTimeout(() => {
                const verifyButton = document.querySelector('button[children*="Verify on Midnight"]') as HTMLButtonElement;
                if (verifyButton && !verifyButton.disabled) {
                  verifyButton.click();
                }
              }, 500);
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
          <div style={{ padding: '40px', border: '1px solid #374151', borderRadius: '8px', background: 'rgba(55, 65, 81, 0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px', color: '#6b7280' }}>📋</div>
            <h4 style={{ color: '#e2e8f0', margin: '0 0 10px 0', fontSize: '18px' }}>No verifications yet</h4>
            <p style={{ color: '#94a3b8', margin: '0', fontSize: '14px' }}>Verified patient records will appear here</p>
            <p style={{ color: '#6b7280', margin: '10px 0 0 0', fontSize: '12px', fontStyle: 'italic' }}>This is a demo environment</p>
          </div>
        </div>
        <div style={{ marginBottom: '30px' }}>
          <h3>Patient History</h3>
          <div style={{ padding: '40px', border: '1px solid #374151', borderRadius: '8px', background: 'rgba(55, 65, 81, 0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px', color: '#6b7280' }}>📊</div>
            <h4 style={{ color: '#e2e8f0', margin: '0 0 10px 0', fontSize: '18px' }}>No patient history yet</h4>
            <p style={{ color: '#94a3b8', margin: '0', fontSize: '14px' }}>Patient verification records will appear here</p>
            <p style={{ color: '#6b7280', margin: '10px 0 0 0', fontSize: '12px', fontStyle: 'italic' }}>This is a demo environment</p>
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
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={() => {
                    const patientHash = localStorage.getItem('solaceIdHash') || 'N/A';
                    const verifiedFields = JSON.parse(localStorage.getItem('ehrData') || '[]').join(', ') || 'N/A';
                    const timestamp = new Date().toISOString();
                    const receiptHash = '0x' + Math.random().toString(16).substr(2, 64);
                    
                    const reportContent = `SolaceID Verification Report
================================

Patient Hash: ${patientHash}
Verified Fields: ${verifiedFields}
Timestamp: ${timestamp}
Receipt Hash: ${receiptHash}

Verified by Midnight Network
================================`;

                    const blob = new Blob([reportContent], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `solaceid-report-${Date.now()}.txt`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  style={{
                    background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
                    border: 'none',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Download Report
                </button>
                <button
                  onClick={() => window.print()}
                  style={{
                    background: 'linear-gradient(to right, #06b6d4, #7c3aed)',
                    border: 'none',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Print Report
                </button>
                <button
                  onClick={() => {
                    setPatientHash('');
                    setVerified(false);
                    setPatientData(null);
                    setAuditTrail(null);
                  }}
                  style={{
                    background: 'linear-gradient(to right, #374151, #6b7280)',
                    border: 'none',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  New Verification
                </button>
                <button
                  onClick={async () => {
                    const patientHash = localStorage.getItem('solaceIdHash') || 'N/A';
                    const shortHash = patientHash.length > 16 ? `${patientHash.slice(0, 16)}...` : patientHash;
                    const timestamp = new Date().toLocaleString();
                    
                    const shareText = `✅ Patient verified on Midnight Network
Hash: ${shortHash}
Timestamp: ${timestamp}
Network: Midnight Preprod`;

                    try {
                      await navigator.clipboard.writeText(shareText);
                      alert('Verification details copied to clipboard!');
                    } catch (err) {
                      console.error('Copy failed', err);
                      alert('Failed to copy verification details');
                    }
                  }}
                  style={{
                    background: 'linear-gradient(to right, #10b981, #059669)',
                    border: 'none',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Share Verification
                </button>
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
  </>
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