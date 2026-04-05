import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', paddingTop: "140px" }}>
        <div style={{ padding: '20px 1rem 40px', margin: '0 auto', maxWidth: '1000px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontSize: "2.5rem",
              background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 10px'
            }}>
              Privacy Policy
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Last updated: April 2026</p>
          </div>

          <div style={{ background: '#11182e', border: '1px solid #444a70', borderRadius: '10px', padding: '30px', marginBottom: '30px' }}>
            <h2 style={{ color: '#7c3aed', marginBottom: '20px' }}>Data We Collect</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
              SolaceID collects minimal personal health information necessary for secure medical data sharing. We only store cryptographic commitments and zero-knowledge proofs, never raw medical data.
            </p>
            <p style={{ lineHeight: '1.6', color: '#94a3b8' }}>
              <strong>ZK Protection:</strong> Your actual medical data is never stored in our systems. Instead, we use zero-knowledge proofs on the Midnight Network to verify data authenticity without revealing sensitive information.
            </p>
          </div>

          <div style={{ background: '#11182e', border: '1px solid #444a70', borderRadius: '10px', padding: '30px', marginBottom: '30px' }}>
            <h2 style={{ color: '#7c3aed', marginBottom: '20px' }}>How We Use It</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
              Your data is used exclusively to facilitate secure, privacy-preserving healthcare interactions between patients and authorized medical institutions.
            </p>
            <p style={{ lineHeight: '1.6', color: '#94a3b8' }}>
              <strong>ZK Protection:</strong> Hospitals can verify your medical data through zero-knowledge proofs without ever seeing the actual information. This ensures complete privacy while maintaining medical necessity.
            </p>
          </div>

          <div style={{ background: '#11182e', border: '1px solid #444a70', borderRadius: '10px', padding: '30px', marginBottom: '30px' }}>
            <h2 style={{ color: '#7c3aed', marginBottom: '20px' }}>Your Rights</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
              You have complete control over your medical data. You can grant, revoke, and modify consent at any time through our secure dashboard.
            </p>
            <p style={{ lineHeight: '1.6', color: '#94a3b8' }}>
              <strong>ZK Protection:</strong> Consent revocation is immediate and cryptographically enforced. Once revoked, hospitals cannot access your data even with previous zero-knowledge proofs.
            </p>
          </div>

          <div style={{ background: '#11182e', border: '1px solid #444a70', borderRadius: '10px', padding: '30px', marginBottom: '30px' }}>
            <h2 style={{ color: '#7c3aed', marginBottom: '20px' }}>Zero Knowledge Architecture</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
              SolaceID is built on the Midnight Network, a privacy-focused blockchain that enables zero-knowledge cryptography for healthcare applications.
            </p>
            <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
              Our zero-knowledge proofs allow hospitals to verify:
            </p>
            <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
              <li>Patient identity authenticity</li>
              <li>Medical data validity</li>
              <li>Consent authorization</li>
              <li>Data freshness and integrity</li>
            </ul>
            <p style={{ lineHeight: '1.6', marginTop: '15px', color: '#94a3b8' }}>
              <strong>Key Benefit:</strong> Medical professionals get the verification they need while patients maintain complete privacy. No sensitive data ever leaves your control.
            </p>
          </div>

          <div style={{ background: '#11182e', border: '1px solid #444a70', borderRadius: '10px', padding: '30px', marginBottom: '30px' }}>
            <h2 style={{ color: '#7c3aed', marginBottom: '20px' }}>Contact</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
              If you have questions about your privacy or data rights, please contact our privacy team.
            </p>
            <p style={{ lineHeight: '1.6' }}>
              <strong>Email:</strong> privacy@solaceid.com<br />
              <strong>Response Time:</strong> Within 24 hours for privacy-related inquiries
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={() => navigate('/')}
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
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;