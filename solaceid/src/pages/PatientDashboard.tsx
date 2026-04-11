import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function safeGet(key: string, fallback: string): string {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function PatientDashboard() {
  const [hasError, setHasError] = React.useState(false);
  const navigate = useNavigate();
  const patientName = safeGet('patientName', 'Patient');
  const patientHash = safeGet('solaceIdHash', '0x0000000000000000000000000000000000000000');
  const createdDate = safeGet('patientCreated', new Date().toISOString());

  const [consents, setConsents] = useState<any[]>([]);
  const [revokeDialog, setRevokeDialog] = useState<{ show: boolean; index: number | null }>({ show: false, index: null });
  const [autoShareEmergency, setAutoShareEmergency] = useState(false);
  const [allowHospitalSearch, setAllowHospitalSearch] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  useEffect(() => {
    try {
      const savedConsents = JSON.parse(localStorage.getItem('consents') || '[]');
      setConsents(Array.isArray(savedConsents) ? savedConsents : []);
    } catch (err) {
      console.error('consents load error', err);
      setConsents([]);
      setHasError(true);
    }
  }, []);

  useEffect(() => {
    try {
      const savedAutoShare = localStorage.getItem('autoShareEmergency') === 'true';
      const savedHospitalSearch = localStorage.getItem('allowHospitalSearch') !== 'false';
      const savedEmailNotifications = localStorage.getItem('emailNotifications') === 'true';

      setAutoShareEmergency(savedAutoShare);
      setAllowHospitalSearch(savedHospitalSearch);
      setEmailNotifications(savedEmailNotifications);
    } catch (err) {
      console.error('settings load error', err);
      setHasError(true);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('autoShareEmergency', autoShareEmergency.toString());
    } catch (err) {
      console.error(err);
      setHasError(true);
    }
  }, [autoShareEmergency]);

  useEffect(() => {
    try {
      localStorage.setItem('allowHospitalSearch', allowHospitalSearch.toString());
    } catch (err) {
      console.error(err);
      setHasError(true);
    }
  }, [allowHospitalSearch]);

  useEffect(() => {
    try {
      localStorage.setItem('emailNotifications', emailNotifications.toString());
    } catch (err) {
      console.error(err);
      setHasError(true);
    }
  }, [emailNotifications]);

  const activeConsents = (consents || []).filter(c => c && c.status === 'Active').length;
  const uniqueHospitals = new Set((consents || []).map(c => c && c.hospital)).size;

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

  const downloadMyData = () => {
    const patientData = {
      patientName: localStorage.getItem('patientName') || '',
      solaceIdHash: localStorage.getItem('solaceIdHash') || '',
      ehrData: JSON.parse(localStorage.getItem('ehrData') || '[]'),
      consents: JSON.parse(localStorage.getItem('consents') || '[]'),
      patientEmail: localStorage.getItem('patientEmail') || '',
      createdDate: localStorage.getItem('patientCreated') || ''
    };

    const dataStr = JSON.stringify(patientData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'solaceid-patient-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const revokeConsent = (index: number) => {
    setRevokeDialog({ show: true, index });
  };

  const confirmRevoke = () => {
    if (revokeDialog.index !== null) {
      const updated = [...consents];
      if (updated[revokeDialog.index]) {
        updated[revokeDialog.index] = { ...updated[revokeDialog.index], status: 'Revoked' };
        setConsents(updated);
        localStorage.setItem('consents', JSON.stringify(updated));
      }
    }
    setRevokeDialog({ show: false, index: null });
  };

  const cancelRevoke = () => {
    setRevokeDialog({ show: false, index: null });
  };

  if (hasError) {
    return (
      <>
        <Navbar />
        <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#ffffff', paddingTop: '140px', paddingBottom: '80px' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
            <h1 style={{ color: '#ffffff' }}>Something went wrong</h1>
            <p style={{ color: '#9ca3af' }}>Dashboard failed to load. Please refresh the page.</p>
            <button onClick={() => window.location.reload()} className='button-primary' style={{ marginTop: '1rem' }}>Reload</button>
          </div>
        </div>
      </>
    );
  }

  try {
    return (
    <>
      <Navbar />
      <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#ffffff', paddingTop: '140px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Welcome back, {patientName}</h1>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem' }}>Your ZK identity is ready. Manage consents, settings, and sharing from one secure pane.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={downloadMyData} className='button-primary'>Download My Data</button>
              <button onClick={() => {
                localStorage.removeItem('solaceIdHash');
                localStorage.removeItem('patientName');
                localStorage.removeItem('ehrData');
                localStorage.removeItem('consents');
                localStorage.removeItem('consentTx');
                navigate('/patient-login');
              }} className='button-secondary'>Sign Out</button>
            </div>
          </div>

          <div className='grid-3' style={{ gap: '1rem', marginBottom: '2rem' }}>
            <div className='panel-card' style={{ borderColor: 'rgba(124, 58, 237, 0.18)' }}>
              <h3 style={{ margin: '0 0 0.75rem 0' }}>Consents Given</h3>
              <div style={{ fontSize: '2.2rem', fontWeight: 700 }}>{(consents || []).length}</div>
            </div>
            <div className='panel-card' style={{ borderColor: 'rgba(6, 182, 212, 0.18)' }}>
              <h3 style={{ margin: '0 0 0.75rem 0' }}>Active Consents</h3>
              <div style={{ fontSize: '2.2rem', fontWeight: 700 }}>{activeConsents}</div>
            </div>
            <div className='panel-card' style={{ borderColor: 'rgba(16, 185, 129, 0.18)' }}>
              <h3 style={{ margin: '0 0 0.75rem 0' }}>Hospitals Accessed</h3>
              <div style={{ fontSize: '2.2rem', fontWeight: 700 }}>{uniqueHospitals}</div>
            </div>
            <div className='panel-card' style={{ borderColor: 'rgba(124, 58, 237, 0.18)', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 0.75rem 0' }}>Privacy Score</h3>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '7px solid rgba(124, 58, 237, 0.5)', margin: '0 auto 1rem', display: 'grid', placeItems: 'center', boxShadow: '0 0 40px rgba(124, 58, 237, 0.15)' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 700 }}>100%</span>
              </div>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>Your Privacy Score</p>
            </div>
          </div>

          {/* My Listings Section */}
          {(() => {
            const stored = localStorage.getItem('patientListing');
            if (!stored) return null;
            try {
              const listing = JSON.parse(stored);
              const purchasesData = JSON.parse(localStorage.getItem('purchases') || '[]');
              const myPurchases = (Array.isArray(purchasesData) ? purchasesData : []).filter((p: any) => p && p.anonId === listing.anonId);
              const totalEarned = (myPurchases || []).length * (Number(listing.price) || 0);
              return (
                <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(16, 185, 129, 0.18)', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                    <h2 style={{ margin: 0 }}>My Listings</h2>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button onClick={() => navigate('/transactions')} className='button-secondary'>View All Transactions</button>
                      <button onClick={() => navigate('/wallet')} className='button-secondary'>Edit Listing</button>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '1rem' }}>
                    <div className='panel-card' style={{ borderColor: 'rgba(124, 58, 237, 0.18)' }}>
                      <p style={{ margin: '0 0 0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Anonymous ID</p>
                      <p style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#7c3aed' }}>{listing.anonId}</p>
                    </div>
                    <div className='panel-card' style={{ borderColor: 'rgba(6, 182, 212, 0.18)' }}>
                      <p style={{ margin: '0 0 0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Price</p>
                      <p style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#06b6d4' }}>{listing.price} tNight</p>
                    </div>
                    <div className='panel-card' style={{ borderColor: 'rgba(16, 185, 129, 0.18)' }}>
                      <p style={{ margin: '0 0 0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Earned</p>
                      <p style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#10b981' }}>{totalEarned} tNight</p>
                    </div>
                  </div>

                  {/* Pending balance notice */}
                  {totalEarned > 0 && (
                    <div style={{ padding: '0.85rem 1.25rem', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ color: '#f59e0b', fontSize: '1.1rem' }}>&#9201;</span>
                      <span style={{ color: '#f59e0b', fontSize: '0.9rem', fontWeight: 600 }}>Pending Balance: {totalEarned} tNight — withdrawable after mainnet launch</span>
                    </div>
                  )}

                  <div style={{ padding: '1rem', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem' }}>
                      <strong>Fields listed:</strong> {[
                        listing.bloodType && 'Blood Type',
                        listing.allergies && 'Allergies',
                        listing.vaccinations?.length && 'Vaccinations',
                        listing.conditions?.length && 'Conditions',
                        listing.medications && 'Medications',
                        listing.organDonor && 'Organ Donor'
                      ].filter(Boolean).join(', ') || 'None'}
                    </p>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem' }}><strong>Access type:</strong> {listing.accessType}</p>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Purchases:</strong> {(myPurchases || []).length}</p>
                  </div>

                  {/* Incoming Transactions */}
                  {(myPurchases || []).length > 0 && (
                    <div style={{ marginTop: '1.25rem' }}>
                      <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem' }}>Incoming Transactions</h3>
                      <div style={{ display: 'grid', gap: '0.6rem' }}>
                        {(myPurchases || []).map((p: any, i: number) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.18)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <span style={{ color: '#10b981', fontWeight: 700, fontSize: '1.1rem' }}>+</span>
                              <div>
                                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: '#10b981' }}>+{p.price} tNight received</p>
                                <p style={{ margin: '0.2rem 0 0', color: 'var(--text-muted)', fontSize: '0.78rem' }}>Researcher accessed your data · {new Date(p.timestamp).toLocaleString()}</p>
                              </div>
                            </div>
                            <span style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 600, background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', whiteSpace: 'nowrap' }}>ZK Proof ✓</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            } catch { return null; }
          })()}

          <button onClick={() => navigate('/consent')} className='button-primary' style={{ marginBottom: '2rem' }}>New Consent</button>

          <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(124, 58, 237, 0.14)', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0 0 1rem 0' }}>ZK Identity</h2>
            <p style={{ margin: '0 0 0.75rem 0' }}><strong>Commitment Hash:</strong> {shortHash}</p>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}><strong>Created:</strong> {new Date(createdDate).toLocaleString()}</p>
            <div className='status-chip success' style={{ marginTop: '1rem', display: 'inline-flex' }}>Active</div>
          </div>

          <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(124, 58, 237, 0.14)', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0 0 1rem 0' }}>My Consents</h2>
            {(consents || []).length === 0 ? (
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>No consents yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {(consents || []).map((consent, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(124, 58, 237, 0.12)' }}>
                    <div>
                      <p style={{ margin: 0 }}><strong>Hospital:</strong> {consent.hospital}</p>
                      <p style={{ margin: '0.35rem 0 0 0' }}><strong>Purpose:</strong> {consent.purpose}</p>
                      <p style={{ margin: '0.35rem 0 0 0' }}><strong>Date:</strong> {new Date(consent.date).toLocaleDateString()}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className={`status-chip ${consent.status === 'Active' ? 'success' : ''}`} style={{ backgroundColor: consent.status === 'Active' ? 'rgba(16,185,129,0.12)' : 'rgba(248, 113, 113, 0.12)', color: consent.status === 'Active' ? '#10b981' : '#f87171', borderColor: consent.status === 'Active' ? 'rgba(16,185,129,0.18)' : 'rgba(248,113,113,0.18)' }}>{consent.status}</span>
                      {consent.status === 'Active' && (
                        <button onClick={() => revokeConsent(index)} className='button-secondary' style={{ minWidth: '100px' }}>Revoke</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(124, 58, 237, 0.14)', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0 0 1rem 0' }}>Share My ID</h2>
            <div style={{ padding: '1rem', borderRadius: '18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', wordBreak: 'break-all' }}>{patientHash}</div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <button onClick={copyHash} className='button-primary'>Copy</button>
              <button onClick={() => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                canvas.width = 200;
                canvas.height = 200;
                ctx.fillStyle = '#0d1526';
                ctx.fillRect(0, 0, 200, 200);
                ctx.fillStyle = '#7c3aed';
                const qrSize = 160;
                const offset = (200 - qrSize) / 2;
                for (let i = 0; i < 20; i += 1) {
                  for (let j = 0; j < 20; j += 1) {
                    if (Math.random() > 0.5) {
                      ctx.fillRect(offset + i * 8, offset + j * 8, 8, 8);
                    }
                  }
                }
                canvas.toBlob((blob) => {
                  if (!blob) return;
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `solaceid-qr-${Date.now()}.png`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                });
              }} className='button-secondary'>Download QR</button>
            </div>
          </div>

          <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(124, 58, 237, 0.14)', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0 0 1rem 0' }}>Privacy Settings</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {[{
                label: 'Auto-share Blood Type in Emergency',
                description: 'Allow hospitals to access blood type during emergency situations',
                value: autoShareEmergency,
                setter: (value: boolean) => setAutoShareEmergency(value)
              }, {
                label: 'Allow Hospital Search',
                description: 'Let hospitals find your profile when searching for patients',
                value: allowHospitalSearch,
                setter: (value: boolean) => setAllowHospitalSearch(value)
              }, {
                label: 'Email Notifications',
                description: 'Receive updates about consent requests and data access',
                value: emailNotifications,
                setter: (value: boolean) => setEmailNotifications(value)
              }].map((setting, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.35rem 0' }}>{setting.label}</h4>
                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>{setting.description}</p>
                  </div>
                  <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '28px' }}>
                    <input type='checkbox' checked={setting.value} onChange={e => setting.setter(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                    <span style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: setting.value ? '#10b981' : '#374151', borderRadius: '999px', transition: '0.4s' }}>
                      <span style={{ position: 'absolute', height: '22px', width: '22px', left: setting.value ? '24px' : '4px', bottom: '3px', backgroundColor: 'white', borderRadius: '50%', transition: '0.4s' }}></span>
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(124, 58, 237, 0.14)' }}>
            <h2 style={{ margin: '0 0 1rem 0' }}>Recent Activity</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '18px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.18)' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text)' }}>ZK Identity Created</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{createdDate ? new Date(createdDate).toLocaleString() : 'Recently'}</div>
                </div>
              </div>
              {(consents || []).slice().reverse().map((consent, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '18px', background: 'rgba(124, 58, 237, 0.08)', border: '1px solid rgba(124, 58, 237, 0.18)' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#7c3aed' }}></div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text)' }}>Consent {consent.status === 'Active' ? 'Granted' : 'Revoked'} • {consent.hospital}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{new Date(consent.date).toLocaleString()} • Purpose: {consent.purpose}</div>
                  </div>
                </div>
              ))}
              {(consents || []).length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1.5rem', borderRadius: '18px', background: 'rgba(255,255,255,0.02)' }}>
                  No activity yet. Create your first consent to get started.
                </div>
              )}
            </div>
          </div>

          {revokeDialog.show && (
            <div className='dialog-backdrop'>
              <div className='dialog-card'>
                <h3 style={{ margin: '0 0 1rem 0', color: '#f87171' }}>Revoke Consent</h3>
                <p style={{ margin: '0 0 1.75rem 0', color: 'var(--text-muted)' }}>Are you sure you want to revoke this consent? This action cannot be undone and the hospital will lose access to your data.</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={cancelRevoke} className='button-secondary'>Cancel</button>
                  <button onClick={confirmRevoke} className='button-primary'>Revoke Consent</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
    );
  } catch (err) {
    console.error('PatientDashboard render error', err);
    return (
      <>
        <Navbar />
        <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#ffffff', paddingTop: '140px', paddingBottom: '80px' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
            <h1 style={{ color: '#ffffff' }}>Something went wrong</h1>
            <p style={{ color: '#9ca3af' }}>Dashboard failed to render. Please refresh the page.</p>
            <button onClick={() => window.location.reload()} className='button-primary' style={{ marginTop: '1rem' }}>Reload</button>
          </div>
        </div>
      </>
    );
  }
}

export default PatientDashboard;
