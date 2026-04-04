import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

function LandingPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    patients: 0,
    hospitals: 0,
    uptime: 0,
    breaches: 0
  });

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const animateNumber = (target: number, key: keyof typeof stats, duration: number = 2000) => {
      const start = 0;
      const increment = target / (duration / 50);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 50);
    };

    // Start animations with slight delays
    setTimeout(() => animateNumber(2847, 'patients'), 200);
    setTimeout(() => animateNumber(143, 'hospitals'), 400);
    setTimeout(() => animateNumber(99, 'uptime'), 600);
    setTimeout(() => animateNumber(0, 'breaches'), 800);
  }, []);

  return (
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', paddingTop: '100px', scrollPaddingTop: '3rem' }}>
      <Navbar />

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(6, 182, 212, 0.1))',
        zIndex: -1
      }}></div>

      <header style={{ textAlign: 'center', padding: '40px 1rem 60px', background: 'linear-gradient(-45deg, #0a0f1e, #0d1a3a, #1a0a2e, #0a1a1a)', backgroundSize: '400% 400%', animation: 'gradientShift 8s ease infinite' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>The future of patient privacy on blockchain</h1>
        <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 24px', lineHeight: '1.6', color: '#ccc' }}>
          SolaceID is a privacy-preserving patient identity and health record exchange built on Midnight Network blockchain. Patients control their data, hospitals access only what they need, all verified with zero-knowledge proofs.
        </p>
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ background: 'rgba(124, 58, 237, 0.2)', padding: '10px 20px', borderRadius: '20px', border: '1px solid #7c3aed' }}>100% Private</span>
          <span style={{ background: 'rgba(6, 182, 212, 0.2)', padding: '10px 20px', borderRadius: '20px', border: '1px solid #06b6d4' }}>Zero Data On-Chain</span>
          <span style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '10px 20px', borderRadius: '20px', border: '1px solid #10b981' }}>ZK Verified</span>
        </div>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/patient-login')} style={{ ...buttonStyle, background: 'linear-gradient(to right, #7c3aed, #06b6d4)', padding: '15px 40px', fontSize: '18px' }}>
            Get Started as Patient
          </button>
          <button onClick={() => navigate('/hospital-login')} style={{ ...buttonStyle, background: '#06b6d4', padding: '15px 40px', fontSize: '18px' }}>
            Hospital Login
          </button>
        </div>
        <div style={{ marginTop: '28px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#11182e', borderRadius: '999px', padding: '8px 14px', fontSize: '0.9rem', color: '#fff' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '999px', background: '#7c3aed', animation: 'pulse 2s infinite' }} />
            Built on Midnight Network
          </span>
        </div>
      </header>

      {/* Live Stats Section */}
      <section style={{ padding: '40px 1rem', textAlign: 'center', background: 'rgba(124, 58, 237, 0.05)', borderTop: '1px solid rgba(124, 58, 237, 0.2)', borderBottom: '1px solid rgba(124, 58, 237, 0.2)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', minWidth: '200px' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#7c3aed', marginBottom: '10px' }}>{stats.patients.toLocaleString()}</div>
            <div style={{ color: '#94a3b8', fontSize: '16px' }}>Patients Protected</div>
          </div>
          <div style={{ textAlign: 'center', minWidth: '200px' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#06b6d4', marginBottom: '10px' }}>{stats.hospitals}</div>
            <div style={{ color: '#94a3b8', fontSize: '16px' }}>Hospitals Connected</div>
          </div>
          <div style={{ textAlign: 'center', minWidth: '200px' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#10b981', marginBottom: '10px' }}>{stats.uptime}.9%</div>
            <div style={{ color: '#94a3b8', fontSize: '16px' }}>Uptime</div>
          </div>
          <div style={{ textAlign: 'center', minWidth: '200px' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '10px' }}>{stats.breaches}</div>
            <div style={{ color: '#94a3b8', fontSize: '16px' }}>Data Breaches</div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 1rem 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>How It Works</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ ...stepStyle, background: 'linear-gradient(145deg, rgba(124,58,237,0.1), rgba(124,58,237,0.05))', border: '1px solid rgba(124,58,237,0.3)' }}>
            <div style={stepIcon}>1</div>
            <h3 style={{ color: 'white', fontWeight: 'bold', margin: '0 0 10px 0' }}>Generate ZK Identity</h3>
            <p style={{ color: '#94a3b8', margin: '0', fontSize: '14px' }}>Create your cryptographic identity commitment on Midnight Network.</p>
          </div>
          <div style={{ fontSize: '24px', color: '#7c3aed', display: 'flex', alignItems: 'center' }}>→</div>
          <div style={{ ...stepStyle, background: 'linear-gradient(145deg, rgba(124,58,237,0.1), rgba(6,182,212,0.05))', border: '1px solid rgba(6,182,212,0.3)' }}>
            <div style={stepIcon}>2</div>
            <h3 style={{ color: 'white', fontWeight: 'bold', margin: '0 0 10px 0' }}>Grant Consent</h3>
            <p style={{ color: '#94a3b8', margin: '0', fontSize: '14px' }}>Sign consent transactions for specific hospital data access.</p>
          </div>
          <div style={{ fontSize: '24px', color: '#7c3aed', display: 'flex', alignItems: 'center' }}>→</div>
          <div style={{ ...stepStyle, background: 'linear-gradient(145deg, rgba(124,58,237,0.1), rgba(16,185,129,0.05))', border: '1px solid rgba(16,185,129,0.3)' }}>
            <div style={stepIcon}>3</div>
            <h3 style={{ color: 'white', fontWeight: 'bold', margin: '0 0 10px 0' }}>Verify & Access</h3>
            <p style={{ color: '#94a3b8', margin: '0', fontSize: '14px' }}>Hospitals verify ZK proofs to access authorized health records.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Trusted by Leading Hospitals</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: '#1a1f2e', padding: '30px', borderRadius: '12px', border: '1px solid #7c3aed', width: '220px', textAlign: 'center' }}>
            <h3 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '18px' }}>Apollo Hospitals</h3>
            <p style={{ color: '#ccc', margin: '0', fontSize: '14px' }}>Partner Hospital</p>
          </div>
          <div style={{ backgroundColor: '#1a1f2e', padding: '30px', borderRadius: '12px', border: '1px solid #7c3aed', width: '220px', textAlign: 'center' }}>
            <h3 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '18px' }}>AIIMS Delhi</h3>
            <p style={{ color: '#ccc', margin: '0', fontSize: '14px' }}>Partner Hospital</p>
          </div>
          <div style={{ backgroundColor: '#1a1f2e', padding: '30px', borderRadius: '12px', border: '1px solid #7c3aed', width: '220px', textAlign: 'center' }}>
            <h3 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '18px' }}>Fortis Healthcare</h3>
            <p style={{ color: '#ccc', margin: '0', fontSize: '14px' }}>Partner Hospital</p>
          </div>
          <div style={{ backgroundColor: '#1a1f2e', padding: '30px', borderRadius: '12px', border: '1px solid #7c3aed', width: '220px', textAlign: 'center' }}>
            <h3 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '18px' }}>Max Hospital</h3>
            <p style={{ color: '#ccc', margin: '0', fontSize: '14px' }}>Partner Hospital</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 1rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
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
      <section style={{ padding: '60px 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', background: '#1a1f2e', border: '1px solid #7c3aed', borderRadius: '15px', padding: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'white' }}>Ready to take control of your health data?</h2>
          <p style={{ color: '#94a3b8', marginBottom: '30px', fontSize: '16px' }}>
            Join thousands of patients who have taken back control of their medical privacy.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/wallet')} style={{ ...buttonStyle, background: 'linear-gradient(to right, #7c3aed, #06b6d4)', padding: '15px 30px' }}>
              Get Started as Patient
            </button>
            <button onClick={() => navigate('/about')} style={{ ...buttonStyle, background: 'transparent', border: '1px solid #7c3aed', color: '#7c3aed', padding: '15px 30px' }}>
              Partner with Us
            </button>
          </div>
        </div>
      </section>
      <footer style={{ textAlign: 'center', padding: '20px 0', marginTop: '30px', color: '#aaa', fontSize: '14px' }}>
        © 2026 SolaceID · Built on Midnight Network · Privacy-first healthcare
      </footer>
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
  padding: '24px',
  borderRadius: '14px',
  width: '250px',
  textAlign: 'center',
  boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
};

const stepIcon: React.CSSProperties = {
  width: '70px',
  height: '70px',
  borderRadius: '999px',
  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: '0 auto 16px',
  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
};

export default LandingPage;