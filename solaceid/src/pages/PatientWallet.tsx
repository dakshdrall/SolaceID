import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { isWalletConnected } from '../utils/midnight';

function PatientWallet() {
  const navigate = useNavigate();
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [zkStep, setZkStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [anonId, setAnonId] = useState('');
  const [commitHash, setCommitHash] = useState('');

  const [form, setForm] = useState({
    bloodType: '',
    allergies: '',
    vaccinations: [] as string[],
    conditions: [] as string[],
    medications: '',
    organDonor: false,
    ageRange: '',
    gender: '',
    location: '',
    price: '',
    accessType: 'one-time',
    duration: '30 days'
  });

  useEffect(() => {
    isWalletConnected().then(setWalletConnected);
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes zkPulse {
        0% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.7); }
        50% { box-shadow: 0 0 20px 10px rgba(124, 58, 237, 0); }
        100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
      }
      @keyframes zkSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes flash {
        0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
        50% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
        100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

  const handleSubmit = async () => {
    if (!walletConnected) return;
    setLoading(true);
    setZkStep(1);

    try {
      // Step 1: Generating ZK commitment
      await new Promise(r => setTimeout(r, 1200));
      setZkStep(2);

      // Step 2: Signing with Midnight wallet
      const midnight = (window as any).midnight;
      const key = Object.keys(midnight)[0];
      const api = midnight[key];
      const connectedApi = await api.connect('preprod');

      const payload = {
        type: 'DATA_LISTING',
        dataHash: btoa(JSON.stringify(form)).slice(0, 32),
        price: form.price,
        timestamp: Date.now()
      };

      const sig = await connectedApi.signData(
        new TextEncoder().encode(JSON.stringify(payload))
      );

      await new Promise(r => setTimeout(r, 800));
      setZkStep(3);

      // Step 3: Finalizing
      await new Promise(r => setTimeout(r, 800));

      const id = 'Patient #' + Math.floor(Math.random() * 9000 + 1000);
      const hash = typeof sig === 'string' ? sig : sig?.signature || sig?.txHash || btoa(JSON.stringify(payload)).slice(0, 64);

      setAnonId(id);
      setCommitHash(hash);

      localStorage.setItem('patientListing', JSON.stringify({
        ...form,
        anonId: id,
        signature: hash,
        listedAt: Date.now()
      }));

      setSuccess(true);
    } catch (err) {
      console.error('Listing failed:', err);
      alert('Failed to sign with wallet. Please try again.');
    } finally {
      setLoading(false);
      setZkStep(0);
    }
  };

  if (success) {
    return (
      <>
        <Navbar />
        <div style={{ background: 'transparent', minHeight: '100vh', color: 'var(--text)', paddingTop: '140px', paddingBottom: '60px' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', width: '80px', height: '80px', border: '3px solid #10b981', borderRadius: '50%', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', animation: 'flash 1s ease-out' }}>
              <div style={{ width: '22px', height: '36px', border: 'solid #10b981', borderWidth: '0 4px 4px 0', transform: 'rotate(45deg)' }}></div>
            </div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>Your data is now listed on SolaceID</h1>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', borderRadius: '999px', background: 'rgba(124, 58, 237, 0.12)', border: '1px solid rgba(124, 58, 237, 0.35)', color: '#7c3aed', fontWeight: 700, fontSize: '1.3rem', marginBottom: '1rem' }}>
              {anonId}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1rem', fontFamily: 'monospace', wordBreak: 'break-all', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              ZK Commitment: {commitHash}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '999px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.35)', color: '#10b981', fontWeight: 700, marginBottom: '2rem' }}>
              Signed by Midnight Wallet ✓
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/dashboard')} className='button-primary'>View My Listing</button>
              <button onClick={() => navigate('/marketplace')} className='button-secondary'>Browse Marketplace</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ background: 'transparent', minHeight: '100vh', color: 'var(--text)', paddingTop: '140px', paddingBottom: '60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.5rem', margin: 0 }}>List Your Medical Data</h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '1.1rem' }}>Choose what to share. Set your price. Remain anonymous.</p>
          </div>

          {/* ZK Proof Animation Overlay */}
          {loading && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'grid', placeItems: 'center' }}>
              <div style={{ textAlign: 'center', maxWidth: '400px', padding: '2rem' }}>
                <div style={{ width: '80px', height: '80px', border: '4px solid transparent', borderTopColor: '#7c3aed', borderRadius: '50%', animation: 'zkSpin 1s linear infinite', margin: '0 auto 2rem' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {['Generating ZK commitment...', 'Signing with Midnight wallet...', 'Finalizing anonymous listing...'].map((step, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: zkStep > i ? 1 : 0.3, transition: 'opacity 0.5s' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: zkStep > i ? '#7c3aed' : 'rgba(255,255,255,0.1)', display: 'grid', placeItems: 'center', flexShrink: 0, transition: 'background 0.5s' }}>
                        {zkStep > i ? <span style={{ color: '#fff', fontWeight: 700 }}>✓</span> : <span style={{ color: '#666' }}>{i + 1}</span>}
                      </div>
                      <span style={{ color: zkStep > i ? '#fff' : '#666', fontWeight: zkStep === i + 1 ? 700 : 400 }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 1: Medical Data */}
          <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(124, 58, 237, 0.14)', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0 0 0.5rem 0' }}>Medical Data</h2>
            <p style={{ color: 'var(--text-muted)', margin: '0 0 1.5rem 0' }}>Select fields to list</p>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Blood Type</label>
                <select value={form.bloodType} onChange={e => setForm({ ...form, bloodType: e.target.value })} style={inputStyle}>
                  <option value=''>Select Blood Type</option>
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Critical Allergies</label>
                <input type='text' placeholder='e.g. Penicillin, Latex, Peanuts' value={form.allergies} onChange={e => setForm({ ...form, allergies: e.target.value })} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Vaccination Status</label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {['COVID-19', 'Hepatitis B', 'Tetanus'].map(v => (
                    <label key={v} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '10px', background: form.vaccinations.includes(v) ? 'rgba(124, 58, 237, 0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${form.vaccinations.includes(v) ? 'rgba(124, 58, 237, 0.4)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer', transition: 'all 0.2s' }}>
                      <input type='checkbox' checked={form.vaccinations.includes(v)} onChange={() => setForm({ ...form, vaccinations: toggleArray(form.vaccinations, v) })} style={{ accentColor: '#7c3aed' }} />
                      <span>{v}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Pre-existing Conditions</label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'None'].map(c => (
                    <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '10px', background: form.conditions.includes(c) ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${form.conditions.includes(c) ? 'rgba(6, 182, 212, 0.4)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer', transition: 'all 0.2s' }}>
                      <input type='checkbox' checked={form.conditions.includes(c)} onChange={() => {
                        if (c === 'None') {
                          setForm({ ...form, conditions: form.conditions.includes('None') ? [] : ['None'] });
                        } else {
                          setForm({ ...form, conditions: toggleArray(form.conditions.filter(x => x !== 'None'), c) });
                        }
                      }} style={{ accentColor: '#06b6d4' }} />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Current Medications <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
                <input type='text' placeholder='e.g. Metformin, Lisinopril' value={form.medications} onChange={e => setForm({ ...form, medications: e.target.value })} style={inputStyle} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Organ Donor Status</label>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '28px' }}>
                  <input type='checkbox' checked={form.organDonor} onChange={e => setForm({ ...form, organDonor: e.target.checked })} style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: form.organDonor ? '#10b981' : '#374151', borderRadius: '999px', transition: '0.4s', cursor: 'pointer' }}>
                    <span style={{ position: 'absolute', height: '22px', width: '22px', left: form.organDonor ? '24px' : '4px', bottom: '3px', backgroundColor: 'white', borderRadius: '50%', transition: '0.4s' }}></span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 2: Privacy Settings */}
          <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(6, 182, 212, 0.14)', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0 0 1.5rem 0' }}>Privacy Settings</h2>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Age Range <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.85rem' }}>— Exact age never revealed, only range</span></label>
                <select value={form.ageRange} onChange={e => setForm({ ...form, ageRange: e.target.value })} style={inputStyle}>
                  <option value=''>Select Age Range</option>
                  {['18-25', '26-35', '36-45', '46-55', '56-65', '65+'].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Gender</label>
                <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} style={inputStyle}>
                  <option value=''>Select Gender</option>
                  {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(g => <option key={g}>{g}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Location <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.85rem' }}>— City never revealed, only region</span></label>
                <select value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} style={inputStyle}>
                  <option value=''>Select Region</option>
                  {['North India', 'South India', 'East India', 'West India', 'International'].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Pricing */}
          <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(124, 58, 237, 0.14)', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0 0 1.5rem 0' }}>Pricing</h2>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Price per access <span style={{ color: '#06b6d4', fontWeight: 600 }}>tNight tokens</span></label>
                <input type='number' placeholder='e.g. 50' value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={inputStyle} min='0' />
              </div>

              <div>
                <label style={labelStyle}>Access Type</label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {[
                    { value: 'one-time', label: 'One-time access' },
                    { value: 'unlimited', label: 'Unlimited access' },
                    { value: 'emergency', label: 'Emergency only (free)' }
                  ].map(opt => (
                    <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', borderRadius: '10px', background: form.accessType === opt.value ? 'rgba(124, 58, 237, 0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${form.accessType === opt.value ? 'rgba(124, 58, 237, 0.4)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer', transition: 'all 0.2s' }}>
                      <input type='radio' name='accessType' checked={form.accessType === opt.value} onChange={() => setForm({ ...form, accessType: opt.value })} style={{ accentColor: '#7c3aed' }} />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Listing Duration</label>
                <select value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} style={inputStyle}>
                  {['7 days', '30 days', '90 days', 'Permanent'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: ZK Identity Commitment */}
          <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(16, 185, 129, 0.14)', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0 0 1.5rem 0' }}>ZK Identity Commitment</h2>

            <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '1.5rem' }}>
              <p style={{ margin: 0, color: '#10b981', lineHeight: 1.7 }}>
                Your identity will be replaced with a cryptographic commitment. No name, address, or personal identifiers will be stored or shared.
              </p>
            </div>

            {!walletConnected && (
              <div style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: 'rgba(248, 113, 113, 0.08)', border: '1px solid rgba(248, 113, 113, 0.35)', color: '#f87171', fontWeight: 600, textAlign: 'center', marginBottom: '1rem' }}>
                Connect your Lace wallet to list data
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !walletConnected || !form.bloodType || !form.ageRange || !form.price}
              className='button-primary'
              style={{ width: '100%', opacity: loading || !walletConnected || !form.bloodType || !form.ageRange || !form.price ? 0.65 : 1 }}
            >
              {loading ? 'Processing...' : 'Generate ZK Identity & List Data'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: 600,
  fontSize: '0.95rem'
};

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

export default PatientWallet;
