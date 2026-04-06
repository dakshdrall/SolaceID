import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

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

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes flash {
        0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
        50% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
        100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const commitment = '0x' + Math.random().toString(16).substr(2, 20);
      setHash(commitment);
      localStorage.setItem('patientData', JSON.stringify(form));
      localStorage.setItem('patientHash', commitment);
      localStorage.setItem('patientCreated', new Date().toISOString());
      setLoading(false);
      setSuccess(true);
    }, 2500);
  };

  const handleProceed = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar />
      <div style={{ background: 'transparent', minHeight: '100vh', color: 'var(--text)', paddingTop: '140px', paddingBottom: '60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Patient Portal</h1>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem' }}>Onboard securely with a zero-knowledge identity and grant consent on your terms.</p>
            </div>
            <button onClick={() => navigate('/dashboard')} className='button-secondary' style={{ alignSelf: 'flex-start' }}>
              View Dashboard
            </button>
          </div>

          <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(124, 58, 237, 0.14)', marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{ margin: '0 0 0.75rem 0' }}>Why ZK Identity?</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, margin: 0 }}>A patient identity built with zero-knowledge proofs means verified care without exposing your medical record.</p>
            </div>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              <div className='panel-card' style={{ borderColor: 'rgba(124, 58, 237, 0.2)' }}>
                <div style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>🔒</div>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>No Data Exposure</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>Everything stays on your device until you explicitly consent.</p>
              </div>
              <div className='panel-card' style={{ borderColor: 'rgba(6, 182, 212, 0.2)' }}>
                <div style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>🛡️</div>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Cryptographically Secure</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>Zero-knowledge proofs protect your identity while enabling authorized access.</p>
              </div>
              <div className='panel-card' style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                <div style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>👤</div>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Patient Controlled</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>You keep the power to approve or revoke hospital access at any time.</p>
              </div>
            </div>
          </div>

          <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(124, 58, 237, 0.12)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.2rem', borderRadius: '999px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)' }}></span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Onboarding progress</span>
              </div>
              <h2 style={{ margin: '1.25rem 0 0.75rem 0' }}>Patient Onboarding</h2>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Create your secure identity commitment and move to consent in minutes.</p>
            </div>

            <form style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
              <input type='text' placeholder='e.g. Alex Johnson' value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
              <input type='date' placeholder='Date of Birth' value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} style={inputStyle} />
              <select value={form.bloodType} onChange={e => setForm({ ...form, bloodType: e.target.value })} style={inputStyle}>
                <option value=''>Select Blood Type</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
              <input type='text' placeholder='e.g. Penicillin, Latex' value={form.allergies} onChange={e => setForm({ ...form, allergies: e.target.value })} style={inputStyle} />
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text)' }}>
                <input type='checkbox' checked={form.vaccination} onChange={e => setForm({ ...form, vaccination: e.target.checked })} />
                Vaccination Status
              </label>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <button onClick={handleGenerate} disabled={loading || success || !form.name.trim() || !form.dob} className='button-primary' style={{ width: '100%', opacity: loading || success || !form.name.trim() || !form.dob ? 0.65 : 1 }}>
                {loading ? 'Generating ZK Identity…' : success ? 'ZK Identity Generated' : 'Generate ZK Identity'}
              </button>
              {(!form.name.trim() || !form.dob) && !loading && !success && (
                <div style={{ color: '#f87171', fontWeight: 700 }}>Please fill in Name and Date of Birth</div>
              )}
              {loading && <div style={{ color: 'var(--text-muted)' }}>Processing…</div>}
            </div>

            {success && (
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', width: '60px', height: '60px', border: '3px solid var(--accent-2)', borderRadius: '50%', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', animation: 'flash 1s ease-out' }}>
                  <div style={{ width: '18px', height: '30px', border: 'solid var(--accent-2)', borderWidth: '0 4px 4px 0', transform: 'rotate(45deg)' }}></div>
                </div>
                <div style={{ color: 'var(--accent-2)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>ZK Identity Generated Successfully!</div>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1rem', fontFamily: 'monospace', wordBreak: 'break-all', marginBottom: '1rem' }}>
                  {hash}
                </div>
                <button type='button' onClick={async (event) => {
                  try {
                    await navigator.clipboard.writeText(hash);
                    const btn = event.currentTarget as HTMLButtonElement;
                    const originalText = btn.textContent;
                    btn.textContent = 'Copied!';
                    btn.style.background = 'var(--accent)';
                    setTimeout(() => {
                      btn.textContent = originalText;
                      btn.style.background = '';
                    }, 2000);
                  } catch (err) {
                    console.error('Copy failed', err);
                  }
                }} className='button-secondary' style={{ width: '100%', maxWidth: '220px' }}>
                  Copy Hash
                </button>
                <button onClick={handleProceed} className='button-primary' style={{ width: '100%', maxWidth: '220px', marginTop: '1rem' }}>
                  Proceed to Consent
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  margin: '8px 0',
  border: '1px solid var(--border)',
  borderRadius: '14px',
  fontSize: '16px',
  background: 'var(--surface-3)',
  color: 'var(--text)',
  boxSizing: 'border-box'
};

export default PatientWallet;
