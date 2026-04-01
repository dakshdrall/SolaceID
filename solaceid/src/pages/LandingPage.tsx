import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', paddingTop: '3rem', scrollPaddingTop: '3rem' }}>
      <header style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h1 style={{
          fontSize: '3.5rem',
          background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0'
        }}>
          SolaceID
        </h1>
        <p style={{ fontSize: '24px', margin: '10px 0 20px' }}>Prove your health, not your history.</p>
        <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          SolaceID is a privacy-preserving patient identity and health record exchange built on Midnight Network blockchain.
          Patients control their data, hospitals access only what they need, all verified with zero-knowledge proofs.
        </p>
      </header>
      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={cardStyle}>
            <h3>ZK-Patient ID</h3>
            <p>Create a zero-knowledge identity that proves your eligibility without revealing personal details.</p>
          </div>
          <div style={cardStyle}>
            <h3>Confidential EHR Exchange</h3>
            <p>Share health records securely with hospitals, maintaining privacy through cryptographic proofs.</p>
          </div>
          <div style={cardStyle}>
            <h3>Patient-Controlled Consent</h3>
            <p>Grant and revoke consent for data sharing on your terms, with full transparency and control.</p>
          </div>
        </div>
      </section>
      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <button onClick={() => navigate('/wallet')} style={{ ...buttonStyle, background: 'linear-gradient(to right, #7c3aed, #06b6d4)', marginRight: '20px' }}>
          Get Started as Patient
        </button>
        <button onClick={() => navigate('/hospital')} style={{ ...buttonStyle, background: '#06b6d4' }}>
          Hospital Login
        </button>
      </section>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: '#1a1f2e',
  padding: '20px',
  borderRadius: '10px',
  border: '1px solid #7c3aed',
  width: '300px',
  textAlign: 'center'
};

const buttonStyle: React.CSSProperties = {
  padding: '15px 30px',
  border: 'none',
  borderRadius: '5px',
  color: 'white',
  cursor: 'pointer',
  fontSize: '18px',
  fontWeight: 'bold'
};

export default LandingPage;