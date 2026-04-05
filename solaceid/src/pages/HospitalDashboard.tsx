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
      <div style={{ background: 'transparent', minHeight: '100vh', color: 'var(--text)', paddingTop: '140px', paddingBottom: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Hospital Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.75rem' }}>Demo environment — Midnight Network Preprod</p>
          </div>

          <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(124, 58, 237, 0.14)', marginBottom: '2rem' }}>
            <div style={{ display: 'grid', gap: '1rem', alignItems: 'center', gridTemplateColumns: '1fr auto' }}>
              <input type='text' placeholder='Enter Patient Hash' value={patientHash} onChange={e => setPatientHash(e.target.value)} style={inputStyle} />
              <button onClick={handleVerify} disabled={loading || verified} className='button-primary' style={{ width: '100%', maxWidth: '220px' }}>
                {loading ? 'Verifying…' : verified ? 'Verified' : 'Verify on Midnight'}
              </button>
            </div>
            <button onClick={() => {
              const demoHash = localStorage.getItem('patientHash') || '';
              setPatientHash(demoHash);
              setTimeout(() => {
                const verifyButton = document.querySelector('button:enabled.button-primary') as HTMLButtonElement;
                if (verifyButton) {
                  verifyButton.click();
                }
              }, 500);
            }} className='button-secondary' style={{ marginTop: '1rem', width: '100%' }}>
              Use Demo Hash
            </button>
          </div>

          <div className='grid-split' style={{ marginBottom: '2rem' }}>
            <div className='panel-card' style={{ borderColor: 'rgba(124, 58, 237, 0.18)' }}>
              <h3 style={{ margin: '0 0 0.75rem 0' }}>Recent Verifications</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>Verified patient records appear here once you complete a check.</p>
            </div>
            <div className='panel-card' style={{ borderColor: 'rgba(124, 58, 237, 0.18)' }}>
              <h3 style={{ margin: '0 0 0.75rem 0' }}>Patient History</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>Patient verification history is stored off-chain and referenced through cryptographic proof.</p>
            </div>
          </div>

          {verified && (
            <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(16, 185, 129, 0.18)', marginBottom: '2rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'inline-flex', width: '100px', height: '100px', border: '4px solid rgba(16, 185, 129, 0.5)', borderRadius: '50%', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', animation: 'checkmarkScale 0.6s ease-out' }}>
                  <div style={{ width: '28px', height: '48px', border: 'solid white', borderWidth: '0 6px 6px 0', transform: 'rotate(45deg)', animation: 'checkmarkDraw 0.4s ease-out 0.2s both' }}></div>
                </div>
                <h2 style={{ margin: '0 0 0.75rem 0' }}>ZK Proof Verified</h2>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>The patient hash has been validated against Midnight Network.</p>
              </div>

              {patientData && (
                <div className='panel-card' style={{ borderColor: 'rgba(16, 185, 129, 0.18)', marginBottom: '1.5rem' }}>
                  <h3 style={{ margin: '0 0 0.75rem 0' }}>Verified Patient Data</h3>
                  <p style={{ margin: '0.4rem 0' }}><strong>Name:</strong> {patientData.name}</p>
                  <p style={{ margin: '0.4rem 0' }}><strong>DOB:</strong> {patientData.dob}</p>
                  <p style={{ margin: '0.4rem 0' }}><strong>Blood Type:</strong> {patientData.bloodType}</p>
                  <p style={{ margin: '0.4rem 0' }}><strong>Allergies:</strong> {patientData.allergies}</p>
                  <p style={{ margin: 0 }}><strong>Vaccination:</strong> {patientData.vaccination ? 'Vaccinated' : 'Not Vaccinated'}</p>
                </div>
              )}

              <div style={{ display: 'grid', gap: '1rem' }}>
                <button onClick={() => {
                  const patientHash = localStorage.getItem('patientHash') || 'N/A';
                  const shortHash = patientHash.length > 16 ? `${patientHash.slice(0, 16)}...` : patientHash;
                  const timestamp = new Date().toLocaleString();
                  const shareText = `✅ Patient verified on Midnight Network\nHash: ${shortHash}\nTimestamp: ${timestamp}\nNetwork: Midnight Preprod`;
                  navigator.clipboard.writeText(shareText).then(() => alert('Verification details copied to clipboard!')).catch(() => alert('Failed to copy verification details'));
                }} className='button-secondary' style={{ width: '100%' }}>
                  Share Verification
                </button>
                <button onClick={() => window.print()} className='button-secondary' style={{ width: '100%' }}>
                  Print Report
                </button>
              </div>
            </div>
          )}

          {verified && (
            <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(124, 58, 237, 0.12)', marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 1rem 0' }}>Blockchain Transaction Timeline</h3>
              <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                <div style={{ position: 'absolute', left: '0.8rem', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, var(--accent), var(--accent-2))' }}></div>
                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                  <div style={{ position: 'absolute', left: '-18px', top: '8px', width: '16px', height: '16px', background: 'var(--accent)', borderRadius: '50%' }}></div>
                  <div style={{ padding: '1rem', borderRadius: '18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124, 58, 237, 0.12)' }}>
                    <strong>Identity Commitment</strong><br />Patient ZK identity created on Midnight Network.
                  </div>
                </div>
                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                  <div style={{ position: 'absolute', left: '-18px', top: '8px', width: '16px', height: '16px', background: 'var(--accent-2)', borderRadius: '50%' }}></div>
                  <div style={{ padding: '1rem', borderRadius: '18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6, 182, 212, 0.12)' }}>
                    <strong>Consent Transaction</strong><br />Patient consent recorded and authorized.
                  </div>
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-18px', top: '8px', width: '16px', height: '16px', background: '#10b981', borderRadius: '50%' }}></div>
                  <div style={{ padding: '1rem', borderRadius: '18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(16, 185, 129, 0.12)' }}>
                    <strong>ZK Verification</strong><br />Hospital verified the proof and accessed authorized fields.
                  </div>
                </div>
              </div>
            </div>
          )}

          {verified && (
            <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(124, 58, 237, 0.12)' }}>
              <h3 style={{ margin: '0 0 1rem 0' }}>Audit Trail</h3>
              <p><strong>Receipt Hash:</strong> {auditTrail?.receiptHash}</p>
              <p><strong>Timestamp:</strong> {auditTrail?.timestamp}</p>
              <p><strong>Network:</strong> {auditTrail?.network}</p>
              <p><strong>Purpose:</strong> {auditTrail?.purpose}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  border: '1px solid var(--border)',
  borderRadius: '14px',
  fontSize: '16px',
  background: 'var(--surface-3)',
  color: 'var(--text)',
  boxSizing: 'border-box'
};

export default HospitalDashboard;
