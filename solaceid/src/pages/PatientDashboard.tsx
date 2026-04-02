import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

function PatientDashboard() {
  const patientName = localStorage.getItem('patientName') || 'Patient';
  const patientHash = localStorage.getItem('patientHash') || '0x0000000000000000000000000000000000000000';
  const createdDate = localStorage.getItem('patientCreated') || new Date().toISOString();

  const [consents, setConsents] = useState<any[]>([]);

  useEffect(() => {
    const savedConsents = JSON.parse(localStorage.getItem('consents') || '[]');
    setConsents(Array.isArray(savedConsents) ? savedConsents : []);
  }, []);

  const activeConsents = consents.filter(c => c.status === 'Active').length;
  const uniqueHospitals = new Set(consents.map(c => c.hospital)).size;

  const shortHash = `${patientHash.slice(0, 8)}...${patientHash.slice(-6)}`;

  const copyHash = async () => {
    try {
      await navigator.clipboard.writeText(patientHash);
      alert('Patient hash copied to clipboard');
    } catch (err) {
      console.error('Copy error', err);
      alert('Failed to copy hash');
    }
  };

  const revokeConsent = (index: number) => {
    const updated = [...consents];
    if (updated[index]) {
      updated[index] = { ...updated[index], status: 'Revoked' };
      setConsents(updated);
      localStorage.setItem('consents', JSON.stringify(updated));
    }
  };

  return (
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', paddingTop: '100px', scrollPaddingTop: '3rem' }}>
      <Navbar />
      <div style={{ padding: '140px 20px 40px', margin: '0 auto', maxWidth: '1000px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Welcome back, {patientName}</h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
          <div style={{ background: '#11182e', border: '1px solid #444a70', boxShadow: '0 0 20px rgba(124, 58, 237, 0.15)', borderRadius: '10px', padding: '20px', flex: '1 1 220px' }}>
            <h3 style={{ margin: '0 0 10px', color: '#7c3aed' }}>Consents Given</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{consents.length}</div>
          </div>
          <div style={{ background: '#11182e', border: '1px solid #444a70', boxShadow: '0 0 20px rgba(124, 58, 237, 0.15)', borderRadius: '10px', padding: '20px', flex: '1 1 220px' }}>
            <h3 style={{ margin: '0 0 10px', color: '#7c3aed' }}>Active Consents</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{activeConsents}</div>
          </div>
          <div style={{ background: '#11182e', border: '1px solid #444a70', boxShadow: '0 0 20px rgba(124, 58, 237, 0.15)', borderRadius: '10px', padding: '20px', flex: '1 1 220px' }}>
            <h3 style={{ margin: '0 0 10px', color: '#7c3aed' }}>Hospitals Accessed</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{uniqueHospitals}</div>
          </div>
        </div>

        <button onClick={() => window.location.assign('/consent')} style={{ marginBottom: '24px', background: 'linear-gradient(to right, #7c3aed, #06b6d4)', border: 'none', color: 'white', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer' }}>
          New Consent
        </button>

        <div style={{ background: '#11182e', border: '1px solid #444a70', borderRadius: '10px', padding: '20px', marginBottom: '30px' }}>
          <h2 style={{ margin: '0 0 10px' }}>ZK Identity</h2>
          <p style={{ margin: '0 0 6px' }}><strong>Commitment Hash:</strong> {shortHash}</p>
          <p style={{ margin: '0 0 6px' }}><strong>Created:</strong> {new Date(createdDate).toLocaleString()}</p>
          <span style={{ color: '#10b981', backgroundColor: 'rgba(16,185,129,0.15)', padding: '4px 10px', borderRadius: '999px', fontSize: '0.9rem', fontWeight: 'bold' }}>Active</span>
        </div>

        <div style={{ background: '#11182e', border: '1px solid #444a70', borderRadius: '10px', padding: '20px', marginBottom: '30px' }}>
          <h2 style={{ margin: '0 0 10px' }}>My Consents</h2>
          {consents.length === 0 ? (
            <p>No consents yet.</p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {consents.map((consent, index) => (
                <div key={index} style={{ border: '1px solid #2b3171', borderRadius: '10px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  <div>
                    <p style={{ margin: '0' }}><strong>Hospital:</strong> {consent.hospital}</p>
                    <p style={{ margin: '0' }}><strong>Purpose:</strong> {consent.purpose}</p>
                    <p style={{ margin: '0' }}><strong>Date:</strong> {new Date(consent.date).toLocaleDateString()}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: consent.status === 'Active' ? '#10b981' : '#ef4444', backgroundColor: consent.status === 'Active' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', padding: '4px 10px', borderRadius: '999px', fontSize: '0.85rem' }}>{consent.status}</span>
                    {consent.status === 'Active' && (
                      <button onClick={() => revokeConsent(index)} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}>Revoke</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#11182e', border: '1px solid #444a70', borderRadius: '10px', padding: '20px' }}>
          <h2 style={{ margin: '0 0 10px' }}>Share My ID</h2>
          <div style={{ background: '#0b1226', border: '1px dashed #7c3aed', borderRadius: '10px', padding: '16px', marginBottom: '12px', wordBreak: 'break-all' }}>
            {patientHash}
          </div>
          <button onClick={copyHash} style={{ backgroundColor: '#7c3aed', color: 'white', border: 'none', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer' }}>Copy</button>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
