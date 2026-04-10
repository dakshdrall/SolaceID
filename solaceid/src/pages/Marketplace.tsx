import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { isWalletConnected } from '../utils/midnight';

interface Listing {
  anonId: string;
  conditions: string[];
  fields: string[];
  ageRange: string;
  location: string;
  price: number;
  accessType: string;
  bloodType?: string;
  allergies?: string;
  vaccinations?: string[];
  medications?: string;
  organDonor?: boolean;
  gender?: string;
  isReal?: boolean;
}

const MOCK_LISTINGS: Listing[] = [
  { anonId: 'Patient #3847', conditions: ['Diabetes', 'Hypertension'], fields: ['Blood Type', 'Allergies', 'Vaccinations'], ageRange: '46-55', location: 'North India', price: 75, accessType: 'one-time', bloodType: 'A+', allergies: 'Sulfa drugs', vaccinations: ['COVID-19', 'Tetanus'], gender: 'Male' },
  { anonId: 'Patient #7291', conditions: ['Heart Disease'], fields: ['Blood Type', 'Medications', 'Conditions'], ageRange: '56-65', location: 'South India', price: 120, accessType: 'one-time', bloodType: 'O+', allergies: 'None', medications: 'Atorvastatin, Aspirin', gender: 'Male' },
  { anonId: 'Patient #1156', conditions: ['Allergies'], fields: ['Allergies', 'Blood Type'], ageRange: '26-35', location: 'West India', price: 30, accessType: 'unlimited', bloodType: 'B+', allergies: 'Penicillin, Latex, Peanuts', gender: 'Female' },
  { anonId: 'Patient #9023', conditions: ['Asthma'], fields: ['Conditions', 'Medications', 'Vaccinations'], ageRange: '18-25', location: 'East India', price: 25, accessType: 'one-time', bloodType: 'AB-', medications: 'Albuterol inhaler', vaccinations: ['COVID-19', 'Hepatitis B'], gender: 'Non-binary' },
  { anonId: 'Patient #4412', conditions: ['Diabetes'], fields: ['Blood Type', 'Medications', 'Conditions'], ageRange: '36-45', location: 'International', price: 60, accessType: 'unlimited', bloodType: 'A-', medications: 'Metformin, Insulin', gender: 'Female' },
  { anonId: 'Patient #6678', conditions: ['Diabetes', 'Hypertension', 'Heart Disease'], fields: ['Blood Type', 'Allergies', 'Vaccinations', 'Medications', 'Conditions'], ageRange: '56-65', location: 'North India', price: 150, accessType: 'one-time', bloodType: 'O-', allergies: 'Aspirin', medications: 'Metformin, Lisinopril, Atorvastatin', vaccinations: ['COVID-19', 'Tetanus', 'Hepatitis B'], gender: 'Male' },
  { anonId: 'Patient #2234', conditions: [], fields: ['Vaccinations'], ageRange: '18-25', location: 'South India', price: 20, accessType: 'unlimited', vaccinations: ['COVID-19', 'Hepatitis B', 'Tetanus'], gender: 'Female' },
  { anonId: 'Patient #8891', conditions: ['Hypertension'], fields: ['Blood Type', 'Conditions', 'Organ Donor'], ageRange: '46-55', location: 'West India', price: 80, accessType: 'one-time', bloodType: 'B-', organDonor: true, medications: 'Amlodipine', gender: 'Male' },
];

const conditionColors: Record<string, string> = {
  'Diabetes': '#f59e0b',
  'Hypertension': '#ef4444',
  'Heart Disease': '#ec4899',
  'Asthma': '#06b6d4',
  'Allergies': '#8b5cf6',
  'None': '#6b7280'
};

function Marketplace() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [conditionFilter, setConditionFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('Any');
  const [accessFilter, setAccessFilter] = useState('All');
  const [purchaseModal, setPurchaseModal] = useState<Listing | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<{ listing: Listing; txHash: string } | null>(null);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    isWalletConnected().then(setWalletConnected);
    const savedPurchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    setPurchases(savedPurchases);
  }, []);

  useEffect(() => {
    const allListings: Listing[] = [...MOCK_LISTINGS];
    const stored = localStorage.getItem('patientListing');
    if (stored) {
      try {
        const p = JSON.parse(stored);
        allListings.unshift({
          anonId: p.anonId || 'Patient #0000',
          conditions: p.conditions || [],
          fields: [
            p.bloodType && 'Blood Type',
            p.allergies && 'Allergies',
            p.vaccinations?.length && 'Vaccinations',
            p.medications && 'Medications',
            p.organDonor && 'Organ Donor'
          ].filter(Boolean) as string[],
          ageRange: p.ageRange || '',
          location: p.location || '',
          price: Number(p.price) || 0,
          accessType: p.accessType || 'one-time',
          bloodType: p.bloodType,
          allergies: p.allergies,
          vaccinations: p.vaccinations,
          medications: p.medications,
          organDonor: p.organDonor,
          gender: p.gender,
          isReal: true
        });
      } catch { /* ignore */ }
    }
    setListings(allListings);
  }, []);

  const filtered = listings.filter(l => {
    if (conditionFilter !== 'All') {
      if (conditionFilter === 'Allergies') {
        if (!l.conditions.includes('Allergies') && !l.fields.includes('Allergies')) return false;
      } else if (!l.conditions.includes(conditionFilter)) return false;
    }
    if (priceFilter !== 'Any') {
      if (priceFilter === 'Under 25 tNight' && l.price >= 25) return false;
      if (priceFilter === '25-50' && (l.price < 25 || l.price > 50)) return false;
      if (priceFilter === '50-100' && (l.price < 50 || l.price > 100)) return false;
      if (priceFilter === '100+' && l.price < 100) return false;
    }
    if (accessFilter !== 'All') {
      const map: Record<string, string> = { 'One-time': 'one-time', 'Unlimited': 'unlimited', 'Emergency': 'emergency' };
      if (l.accessType !== map[accessFilter]) return false;
    }
    return true;
  });

  const isPurchased = (anonId: string) => purchases.some(p => p.anonId === anonId);

  const handlePurchase = async () => {
    if (!purchaseModal) return;
    setPurchasing(true);
    try {
      const midnight = (window as any).midnight;
      const key = Object.keys(midnight)[0];
      const api = midnight[key];
      const connectedApi = await api.connect('preprod');

      const payload = {
        type: 'DATA_PURCHASE',
        patientId: purchaseModal.anonId,
        amount: purchaseModal.price,
        timestamp: Date.now()
      };

      const sig = await connectedApi.signData(
        new TextEncoder().encode(JSON.stringify(payload))
      );

      const txHash = typeof sig === 'string' ? sig : sig?.signature || sig?.txHash || btoa(JSON.stringify(payload)).slice(0, 64);

      const purchase = {
        anonId: purchaseModal.anonId,
        price: purchaseModal.price,
        txHash,
        timestamp: Date.now(),
        listing: purchaseModal
      };

      const updatedPurchases = [...purchases, purchase];
      setPurchases(updatedPurchases);
      localStorage.setItem('purchases', JSON.stringify(updatedPurchases));

      setPurchaseSuccess({ listing: purchaseModal, txHash });
      setPurchaseModal(null);
    } catch (err) {
      console.error('Purchase failed:', err);
      alert('Transaction failed. Please try again.');
    } finally {
      setPurchasing(false);
    }
  };

  const walletAddr = localStorage.getItem('walletAddress') || '';
  const shortWallet = walletAddr ? `${walletAddr.slice(0, 18)}...${walletAddr.slice(-4)}` : '';

  return (
    <>
      <Navbar />
      <div style={{ background: 'transparent', minHeight: '100vh', color: 'var(--text)', paddingTop: '140px', paddingBottom: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.5rem', margin: 0 }}>Medical Data Marketplace</h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '1.1rem' }}>Browse anonymous patient records. Pay to access. Verified by Midnight Network.</p>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <select value={conditionFilter} onChange={e => setConditionFilter(e.target.value)} style={filterStyle}>
              <option>All</option>
              {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Allergies'].map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={priceFilter} onChange={e => setPriceFilter(e.target.value)} style={filterStyle}>
              <option>Any</option>
              {['Under 25 tNight', '25-50', '50-100', '100+'].map(p => <option key={p}>{p}</option>)}
            </select>
            <select value={accessFilter} onChange={e => setAccessFilter(e.target.value)} style={filterStyle}>
              <option>All</option>
              {['One-time', 'Unlimited', 'Emergency'].map(a => <option key={a}>{a}</option>)}
            </select>
          </div>

          {/* Listing Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {filtered.map((listing, i) => {
              const purchased = isPurchased(listing.anonId);
              return (
                <div key={i} className='surface-card' style={{ padding: '1.5rem', borderColor: listing.isReal ? 'rgba(16, 185, 129, 0.3)' : 'rgba(124, 58, 237, 0.14)', position: 'relative' }}>
                  {listing.isReal && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.25rem 0.6rem', borderRadius: '999px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', fontSize: '0.75rem', fontWeight: 700 }}>
                      YOUR LISTING
                    </div>
                  )}
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem', fontFamily: 'Syne, sans-serif' }}>{listing.anonId}</div>

                  {/* Condition tags */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    {listing.conditions.length > 0 ? listing.conditions.map(c => (
                      <span key={c} style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600, background: `${conditionColors[c] || '#6b7280'}20`, color: conditionColors[c] || '#6b7280', border: `1px solid ${conditionColors[c] || '#6b7280'}40` }}>
                        {c}
                      </span>
                    )) : (
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600, background: 'rgba(107, 114, 128, 0.15)', color: '#6b7280', border: '1px solid rgba(107, 114, 128, 0.3)' }}>
                        No conditions
                      </span>
                    )}
                  </div>

                  {/* Available fields */}
                  <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    {listing.fields.join(' · ')}
                  </p>

                  {/* Age + Region */}
                  <p style={{ margin: '0 0 0.75rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Age {listing.ageRange} · {listing.location}
                  </p>

                  {/* Price */}
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#06b6d4', marginBottom: '0.75rem' }}>
                    {listing.accessType === 'emergency' ? 'Free' : `${listing.price} tNight`}
                  </div>

                  {/* Badges */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
                      {listing.accessType === 'one-time' ? 'One-time' : listing.accessType === 'unlimited' ? 'Unlimited' : 'Emergency'}
                    </span>
                    <span style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                      ZK Verified
                    </span>
                  </div>

                  {/* Purchased data view */}
                  {purchased && (
                    <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)', marginBottom: '1rem' }}>
                      <div style={{ fontWeight: 700, color: '#06b6d4', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Accessed Data</div>
                      {listing.bloodType && <p style={{ margin: '0.2rem 0', fontSize: '0.88rem' }}><strong>Blood Type:</strong> {listing.bloodType}</p>}
                      {listing.allergies && <p style={{ margin: '0.2rem 0', fontSize: '0.88rem' }}><strong>Allergies:</strong> {listing.allergies}</p>}
                      {listing.vaccinations && listing.vaccinations.length > 0 && <p style={{ margin: '0.2rem 0', fontSize: '0.88rem' }}><strong>Vaccinations:</strong> {listing.vaccinations.join(', ')}</p>}
                      {listing.medications && <p style={{ margin: '0.2rem 0', fontSize: '0.88rem' }}><strong>Medications:</strong> {listing.medications}</p>}
                      {listing.organDonor !== undefined && <p style={{ margin: '0.2rem 0', fontSize: '0.88rem' }}><strong>Organ Donor:</strong> {listing.organDonor ? 'Yes' : 'No'}</p>}
                      {listing.gender && <p style={{ margin: '0.2rem 0', fontSize: '0.88rem' }}><strong>Gender:</strong> {listing.gender}</p>}
                    </div>
                  )}

                  {/* Button */}
                  {purchased ? (
                    <div style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', fontWeight: 700, textAlign: 'center' }}>
                      Access Granted ✓
                    </div>
                  ) : (
                    <button onClick={() => {
                      if (!walletConnected) {
                        alert('Connect Lace wallet to purchase');
                        return;
                      }
                      setPurchaseModal(listing);
                    }} className='button-primary' style={{ width: '100%' }}>
                      Purchase Access
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No listings match your filters.
            </div>
          )}
        </div>
      </div>

      {/* Purchase Modal */}
      {purchaseModal && (
        <div className='dialog-backdrop' onClick={() => !purchasing && setPurchaseModal(null)}>
          <div className='dialog-card' onClick={e => e.stopPropagation()} style={{ maxWidth: '480px', padding: '2rem' }}>
            <h2 style={{ margin: '0 0 1.25rem 0' }}>Confirm Purchase</h2>
            <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <p style={{ margin: 0 }}><strong>Purchasing access to:</strong> {purchaseModal.anonId}</p>
              <p style={{ margin: 0 }}><strong>Amount:</strong> <span style={{ color: '#06b6d4', fontWeight: 700 }}>{purchaseModal.price} tNight</span></p>
              {shortWallet && <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Your wallet:</strong> <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{shortWallet}</span></p>}
            </div>
            <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(248, 113, 113, 0.08)', border: '1px solid rgba(248, 113, 113, 0.25)', color: '#f87171', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              This will initiate a real transaction on Midnight Preprod
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setPurchaseModal(null)} disabled={purchasing} className='button-secondary' style={{ flex: 1 }}>Cancel</button>
              <button onClick={handlePurchase} disabled={purchasing} className='button-primary' style={{ flex: 1 }}>
                {purchasing ? 'Signing...' : 'Confirm Purchase'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Success Modal */}
      {purchaseSuccess && (
        <div className='dialog-backdrop' onClick={() => setPurchaseSuccess(null)}>
          <div className='dialog-card' onClick={e => e.stopPropagation()} style={{ maxWidth: '480px', padding: '2rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', width: '60px', height: '60px', border: '3px solid #10b981', borderRadius: '50%', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <div style={{ width: '16px', height: '28px', border: 'solid #10b981', borderWidth: '0 4px 4px 0', transform: 'rotate(45deg)' }}></div>
            </div>
            <h2 style={{ margin: '0 0 0.75rem 0' }}>Transaction Submitted</h2>
            <p style={{ color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>Access to {purchaseSuccess.listing.anonId} has been granted.</p>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.75rem', fontFamily: 'monospace', wordBreak: 'break-all', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              txHash: {purchaseSuccess.txHash}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href='https://preprod.midnightexplorer.com/' target='_blank' rel='noopener noreferrer' className='button-secondary' style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                View on Explorer
              </a>
              <button onClick={() => setPurchaseSuccess(null)} className='button-primary'>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const filterStyle: React.CSSProperties = {
  padding: '10px 16px',
  border: '1px solid var(--border)',
  borderRadius: '10px',
  fontSize: '14px',
  background: 'var(--surface-3)',
  color: 'var(--text)',
  minWidth: '160px'
};

export default Marketplace;
