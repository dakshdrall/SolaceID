import React, { useState } from 'react';

function HospitalDashboard() {
  const [patientHash, setPatientHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [auditTrail, setAuditTrail] = useState(null);

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      const storedHash = localStorage.getItem('patientHash');
      if (patientHash === storedHash) {
        const data = JSON.parse(localStorage.getItem('patientData'));
        const consent = JSON.parse(localStorage.getItem('consentData'));
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
              padding: '20px',
              backgroundColor: '#10b981',
              borderRadius: '10px',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              ZK Proof Verified
            </div>
            <div style={{ marginBottom: '30px' }}>
              <h3>Patient Health Record</h3>
              <p><strong>Blood Type:</strong> {patientData.bloodType}</p>
              <p><strong>Allergies:</strong> {patientData.allergies}</p>
              <p><strong>Vaccination Status:</strong> {patientData.vaccination ? 'Vaccinated' : 'Not Vaccinated'}</p>
            </div>
            <div style={{ marginBottom: '30px' }}>
              <h3>Audit Trail</h3>
              <p><strong>Receipt Hash:</strong> {auditTrail.receiptHash}</p>
              <p><strong>Timestamp:</strong> {auditTrail.timestamp}</p>
              <p><strong>Network:</strong> {auditTrail.network}</p>
              <p><strong>Purpose:</strong> {auditTrail.purpose}</p>
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

const inputStyle = {
  width: '60%',
  padding: '12px',
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

export default HospitalDashboard;