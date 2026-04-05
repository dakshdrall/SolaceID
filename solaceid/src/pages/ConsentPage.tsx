import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ConsentPage() {
  const navigate = useNavigate();
  const patientHash = localStorage.getItem('patientHash') || '';
  const hasIdentity = !!patientHash;
  const [consent, setConsent] = useState({
    bloodType: true,
    vaccination: true,
    allergies: true,
    purpose: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [txHash, setTxHash] = useState('');

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

  return (
    <>
      <Navbar />
      <div style={{ background: 'transparent', minHeight: '100vh', color: 'var(--text)', paddingTop: '140px', paddingBottom: '60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
          {!hasIdentity ? (
            <div style={{ maxWidth: '620px', margin: '0 auto' }}>
              <div className='surface-card' style={{ padding: '2.5rem', borderColor: 'rgba(244, 71, 110, 0.18)' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
                  <h2 style={{ color: '#f87171', marginBottom: '1rem' }}>No ZK Identity Found</h2>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.75rem' }}>Please create your identity before granting consent.</p>
                  <button onClick={() => navigate('/wallet')} className='button-primary' style={{ minWidth: '200px' }}>
                    Create Identity →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className='surface-card' style={{ padding: '2.5rem', borderColor: 'rgba(124, 58, 237, 0.14)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end', marginBottom: '2rem' }}>
                <div>
                  <h1 style={{ fontSize: '2.3rem', margin: 0 }}>Patient Consent</h1>
                  <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem' }}>Grant hospitals access to the minimum required health data, secured by ZK proofs.</p>
                </div>
                <span className='status-chip success' style={{ alignSelf: 'flex-start' }}>Patient Verified</span>
              </div>

              <div style={{ display: 'grid', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Patient Hash</span>
                  <div className='panel-card' style={{ padding: '1rem', borderColor: 'rgba(124, 58, 237, 0.18)' }}>{patientHash}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Hospital</span>
                  <div className='panel-card' style={{ padding: '1rem', borderColor: 'rgba(6, 182, 212, 0.18)' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0' }}>City General Hospital</h3>
                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>Mumbai Care Network</p>
                  </div>
                </div>
              </div>

              <section style={{ margin: '2rem 0' }}>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span className='status-chip primary'>Secure on Midnight</span>
                  <span className='status-chip info'>Auditable Consent</span>
                </div>
              </section>

              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button onClick={() => setConsent({ ...consent, bloodType: true, vaccination: true, allergies: true })} className='button-secondary'>Select All</button>
                  <button onClick={() => setConsent({ ...consent, bloodType: false, vaccination: false, allergies: false })} className='button-secondary'>Deselect All</button>
                </div>
                <span style={{ color: 'var(--text-muted)' }}>You are sharing {Object.values(consent).filter(v => typeof v === 'boolean' && v).length} of 3 fields.</span>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text)' }}>
                  <input type='checkbox' checked={consent.bloodType} onChange={e => setConsent({ ...consent, bloodType: e.target.checked })} /> Blood Type
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text)' }}>
                  <input type='checkbox' checked={consent.vaccination} onChange={e => setConsent({ ...consent, vaccination: e.target.checked })} /> Vaccination Status
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text)' }}>
                  <input type='checkbox' checked={consent.allergies} onChange={e => setConsent({ ...consent, allergies: e.target.checked })} /> Allergies
                </label>
              </div>

              <div style={{ margin: '2rem 0', display: 'grid', gap: '1rem' }}>
                <label style={{ display: 'grid', gap: '0.5rem', color: 'var(--text)' }}>
                  Purpose
                  <select value={consent.purpose} onChange={e => setConsent({ ...consent, purpose: e.target.value })} style={{ ...inputStyle, margin: 0 }}>
                    <option value=''>Select Purpose</option>
                    <option>Emergency Admission</option>
                    <option>Routine Transfer</option>
                    <option>Specialist Referral</option>
                  </select>
                </label>
              </div>

              <div className='surface-card' style={{ padding: '1.5rem', borderColor: 'rgba(124, 58, 237, 0.12)' }}>
                <h3 style={{ margin: '0 0 0.75rem 0' }}>Consent Preview</h3>
                <div style={{ display: 'grid', gap: '0.75rem', color: 'var(--text-muted)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text)' }}>Will be shared:</h4>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
                      {consent.bloodType && <li>Blood Type</li>}
                      {consent.vaccination && <li>Vaccination Status</li>}
                      {consent.allergies && <li>Allergies</li>}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text)' }}>Will NOT be shared:</h4>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
                      {!consent.bloodType && <li>Blood Type</li>}
                      {!consent.vaccination && <li>Vaccination Status</li>}
                      {!consent.allergies && <li>Allergies</li>}
                    </ul>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    This is the minimum necessary disclosure for {consent.purpose || 'the selected purpose'}.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1.5rem' }}>
                <button onClick={handleSign} disabled={loading || success} className='button-primary' style={{ minWidth: '220px' }}>
                  {loading ? 'Signing Consent…' : success ? 'Consent Signed' : 'Sign Consent on Midnight'}
                </button>
                {success && (
                  <button onClick={() => navigate('/dashboard')} className='button-secondary' style={{ minWidth: '220px' }}>
                    View Dashboard
                  </button>
                )}
                {success && (
                  <button onClick={() => navigate('/hospital')} className='button-secondary' style={{ minWidth: '220px' }}>
                    Hospital Dashboard
                  </button>
                )}
              </div>

              {loading && <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Processing…</p>}
              {success && <p style={{ color: '#10b981', marginTop: '1rem' }}>Success! Transaction Hash: {txHash}</p>}
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
  margin: 0,
  border: '1px solid var(--border)',
  borderRadius: '14px',
  fontSize: '16px',
  background: 'var(--surface-3)',
  color: 'var(--text)',
  boxSizing: 'border-box'
};

export default ConsentPage;
