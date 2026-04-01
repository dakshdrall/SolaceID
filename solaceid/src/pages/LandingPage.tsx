import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', paddingTop: '80px', scrollPaddingTop: '3rem' }}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(10,15,30,0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #7c3aed',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem'
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          SolaceID
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/wallet" style={{ color: 'white', textDecoration: 'none' }}>Patient Portal</a>
          <a href="/hospital" style={{ color: 'white', textDecoration: 'none' }}>Hospital Dashboard</a>
        </div>
        <button style={{
          background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Connect Wallet
        </button>
      </div>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(6, 182, 212, 0.1))',
        zIndex: -1
      }}></div>
      <header style={{ textAlign: 'center', padding: '20px 20px 40px' }}>
  <p style={{ fontSize: '2rem', margin: '0 0 20px', color: '#ccc', fontWeight: '600' }}>The future of patient privacy on blockchain</p>
        <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 20px', lineHeight: '1.6' }}>
          SolaceID is a privacy-preserving patient identity and health record exchange built on Midnight Network blockchain.
          Patients control their data, hospitals access only what they need, all verified with zero-knowledge proofs.
        </p>
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <span style={{ background: 'rgba(124, 58, 237, 0.2)', padding: '10px 20px', borderRadius: '20px', border: '1px solid #7c3aed' }}>100% Private</span>
          <span style={{ background: 'rgba(6, 182, 212, 0.2)', padding: '10px 20px', borderRadius: '20px', border: '1px solid #06b6d4' }}>Zero Data On-Chain</span>
          <span style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '10px 20px', borderRadius: '20px', border: '1px solid #10b981' }}>ZK Verified</span>
        </div>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/wallet')} style={{ ...buttonStyle, background: 'linear-gradient(to right, #7c3aed, #06b6d4)', padding: '15px 40px', fontSize: '18px' }}>
            Get Started as Patient
          </button>
          <button onClick={() => navigate('/hospital')} style={{ ...buttonStyle, background: '#06b6d4', padding: '15px 40px', fontSize: '18px' }}>
            Hospital Login
          </button>
        </div>
      </header>

      <section style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>How It Works</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ ...stepStyle, background: 'rgba(124, 58, 237, 0.1)', border: '1px solid #7c3aed' }}>
            <div style={{ fontSize: '3rem', color: '#7c3aed', marginBottom: '20px' }}>1</div>
            <h3>Generate ZK Identity</h3>
            <p>Create your cryptographic identity commitment on Midnight Network</p>
          </div>
          <div style={{ ...stepStyle, background: 'rgba(6, 182, 212, 0.1)', border: '1px solid #06b6d4' }}>
            <div style={{ fontSize: '3rem', color: '#06b6d4', marginBottom: '20px' }}>2</div>
            <h3>Grant Consent</h3>
            <p>Sign consent transactions for specific hospital data access</p>
          </div>
          <div style={{ ...stepStyle, background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981' }}>
            <div style={{ fontSize: '3rem', color: '#10b981', marginBottom: '20px' }}>3</div>
            <h3>Verify & Access</h3>
            <p>Hospitals verify ZK proofs to access authorized health records</p>
          </div>
        </div>
      </section>
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

const stepStyle: React.CSSProperties = {
  padding: '30px',
  borderRadius: '15px',
  width: '250px',
  textAlign: 'center'
};

export default LandingPage;