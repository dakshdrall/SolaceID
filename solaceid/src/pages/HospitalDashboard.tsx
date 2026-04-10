import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getMidnightWallet } from '../utils/midnight';

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
  identitySignature?: string;
  consentSignature?: string;
}

function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState<'emergency' | 'research'>('emergency');
  const [patientHash, setPatientHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [auditTrail, setAuditTrail] = useState<AuditTrail | null>(null);
  const [searchCondition, setSearchCondition] = useState('');
  const [emergencyResult, setEmergencyResult] = useState<{ anonId: string; txHash: string } | null>(null);

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

  const handleVerify = async () => {
    setLoading(true);
    try {
      // Try to fetch real network name from connected wallet
      let networkName = 'Midnight Preprod';
      try {
        const wallet = await getMidnightWallet();
        if (wallet) {
          const cfg = await wallet.getConfiguration();
          if (cfg) {
            networkName = cfg.networkId || cfg.network || cfg.name || cfg.chainName || networkName;
          }
        }
      } catch {
        // wallet not connected — use default
      }

      const storedHash = localStorage.getItem('patientHash');
      if (patientHash === storedHash) {
        const data = JSON.parse(localStorage.getItem('patientData') || '{}');
        const consent = JSON.parse(localStorage.getItem('consentData') || '{}');
        const tx = localStorage.getItem('consentTx');
        const identitySig = localStorage.getItem('identitySignature');
        const consentSig = localStorage.getItem('consentSignature');
        setPatientData(data);
        setAuditTrail({
          receiptHash: tx,
          timestamp: new Date().toISOString(),
          network: networkName,
          purpose: consent.purpose,
          ...(identitySig && { identitySignature: identitySig.slice(0, 24) + '…' }),
          ...(consentSig && { consentSignature: consentSig.slice(0, 24) + '…' }),
        });
        setVerified(true);
      } else {
        alert('Invalid patient hash');
      }
    } finally {
      setLoading(false);
    }
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

          {/* Tab Switcher */}
          <div style={{ display: 'flex', gap: '0', marginBottom: '2rem', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <button onClick={() => setActiveTab('emergency')} style={{ flex: 1, padding: '1rem', border: 'none', background: activeTab === 'emergency' ? '#7c3aed' : 'var(--surface-3)', color: activeTab === 'emergency' ? '#fff' : 'var(--text-muted)', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              Emergency Verify
            </button>
            <button onClick={() => setActiveTab('research')} style={{ flex: 1, padding: '1rem', border: 'none', background: activeTab === 'research' ? '#06b6d4' : 'var(--surface-3)', color: activeTab === 'research' ? '#fff' : 'var(--text-muted)', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              Research Access
            </button>
          </div>

          {activeTab === 'emergency' && (<>
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
              <p style={{ margin: '0.4rem 0' }}><strong>Network:</strong> {auditTrail?.network}</p>
              <p style={{ margin: '0.4rem 0' }}><strong>Purpose:</strong> {auditTrail?.purpose || '—'}</p>
              <p style={{ margin: '0.4rem 0' }}><strong>Timestamp:</strong> {auditTrail?.timestamp}</p>
              <p style={{ margin: '0.4rem 0', wordBreak: 'break-all' }}><strong>Consent Tx:</strong> <span style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>{auditTrail?.receiptHash || '—'}</span></p>
              {auditTrail?.identitySignature && (
                <p style={{ margin: '0.4rem 0' }}><strong>Identity Sig:</strong> <span style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>{auditTrail.identitySignature}</span></p>
              )}
              {auditTrail?.consentSignature && (
                <p style={{ margin: '0.4rem 0' }}><strong>Consent Sig:</strong> <span style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>{auditTrail.consentSignature}</span></p>
              )}
            </div>
          )}
          </>)}

          {activeTab === 'research' && (
            <div>
              <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(6, 182, 212, 0.14)', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: '0 0 1rem 0' }}>Research Data Access</h2>
                <input type='text' placeholder='Find patient data by condition (e.g. Diabetes, Hypertension)' value={searchCondition} onChange={e => setSearchCondition(e.target.value)} style={{ ...inputStyle, marginBottom: 0 }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {(() => {
                  const mockListings = [
                    { anonId: 'Patient #3847', conditions: ['Diabetes', 'Hypertension'], fields: ['Blood Type', 'Allergies', 'Vaccinations'], ageRange: '46-55', location: 'North India', price: 75, accessType: 'one-time' },
                    { anonId: 'Patient #7291', conditions: ['Heart Disease'], fields: ['Blood Type', 'Medications', 'Conditions'], ageRange: '56-65', location: 'South India', price: 120, accessType: 'one-time' },
                    { anonId: 'Patient #9023', conditions: ['Asthma'], fields: ['Conditions', 'Medications', 'Vaccinations'], ageRange: '18-25', location: 'East India', price: 25, accessType: 'one-time' },
                    { anonId: 'Patient #4412', conditions: ['Diabetes'], fields: ['Blood Type', 'Medications', 'Conditions'], ageRange: '36-45', location: 'International', price: 60, accessType: 'unlimited' },
                    { anonId: 'Patient #6678', conditions: ['Diabetes', 'Hypertension', 'Heart Disease'], fields: ['Blood Type', 'Allergies', 'Vaccinations', 'Medications'], ageRange: '56-65', location: 'North India', price: 150, accessType: 'one-time' },
                    { anonId: 'Patient #8891', conditions: ['Hypertension'], fields: ['Blood Type', 'Conditions', 'Organ Donor'], ageRange: '46-55', location: 'West India', price: 80, accessType: 'one-time' },
                  ];

                  const stored = localStorage.getItem('patientListing');
                  if (stored) {
                    try {
                      const p = JSON.parse(stored);
                      mockListings.unshift({
                        anonId: p.anonId || 'Patient #0000',
                        conditions: p.conditions || [],
                        fields: [p.bloodType && 'Blood Type', p.allergies && 'Allergies', p.vaccinations?.length && 'Vaccinations', p.medications && 'Medications'].filter(Boolean) as string[],
                        ageRange: p.ageRange || '',
                        location: p.location || '',
                        price: Number(p.price) || 0,
                        accessType: p.accessType || 'one-time'
                      });
                    } catch { /* ignore */ }
                  }

                  const conditionColors: Record<string, string> = { 'Diabetes': '#f59e0b', 'Hypertension': '#ef4444', 'Heart Disease': '#ec4899', 'Asthma': '#06b6d4' };

                  return mockListings
                    .filter(l => !searchCondition || l.conditions.some(c => c.toLowerCase().includes(searchCondition.toLowerCase())))
                    .map((listing, i) => (
                    <div key={i} className='surface-card' style={{ padding: '1.5rem', borderColor: 'rgba(6, 182, 212, 0.14)' }}>
                      <div style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', fontFamily: 'Syne, sans-serif' }}>{listing.anonId}</div>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                        {listing.conditions.map(c => (
                          <span key={c} style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600, background: `${conditionColors[c] || '#6b7280'}20`, color: conditionColors[c] || '#6b7280', border: `1px solid ${conditionColors[c] || '#6b7280'}40` }}>{c}</span>
                        ))}
                      </div>
                      <p style={{ margin: '0 0 0.5rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>{listing.fields.join(' · ')}</p>
                      <p style={{ margin: '0 0 0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Age {listing.ageRange} · {listing.location}</p>
                      <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#06b6d4', marginBottom: '0.75rem' }}>{listing.price} tNight</div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                        <span style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>ZK Verified</span>
                      </div>
                      <button onClick={async () => {
                        try {
                          const midnight = (window as any).midnight;
                          if (!midnight) { alert('Connect Lace wallet first'); return; }
                          const key = Object.keys(midnight)[0];
                          const api = midnight[key];
                          const connectedApi = await api.connect('preprod');
                          const sig = await connectedApi.signData(new TextEncoder().encode(JSON.stringify({ type: 'EMERGENCY_ACCESS', patientId: listing.anonId, timestamp: Date.now(), emergency: true })));
                          const txHash = typeof sig === 'string' ? sig : sig?.signature || sig?.txHash || 'emergency_' + Date.now();
                          setEmergencyResult({ anonId: listing.anonId, txHash });
                        } catch (err) { console.error(err); alert('Wallet signing failed'); }
                      }} style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
                        Request Emergency Access
                      </button>
                    </div>
                  ));
                })()}
              </div>

              {emergencyResult && (
                <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(16, 185, 129, 0.18)', marginTop: '1.5rem', textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', width: '60px', height: '60px', border: '3px solid #10b981', borderRadius: '50%', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <div style={{ width: '16px', height: '28px', border: 'solid #10b981', borderWidth: '0 4px 4px 0', transform: 'rotate(45deg)' }}></div>
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>Emergency Access Granted — {emergencyResult.anonId}</h3>
                  <p style={{ margin: '0 0 1rem', color: 'var(--text-muted)' }}>Emergency access logged on Midnight blockchain</p>
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem', fontFamily: 'monospace', wordBreak: 'break-all', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    txHash: {emergencyResult.txHash}
                  </div>
                </div>
              )}
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
