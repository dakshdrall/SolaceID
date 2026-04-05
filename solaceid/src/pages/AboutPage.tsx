import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

function AboutPage() {
  const navigate = useNavigate();
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', paddingTop: '100px', scrollPaddingTop: '3rem' }}>
      <Navbar />

      {/* Header Section */}
      <header style={{ textAlign: 'center', padding: '60px 1rem 40px', background: 'linear-gradient(-45deg, #0a0f1e, #0d1a3a, #1a0a2e, #0a1a1a)', backgroundSize: '400% 400%', animation: 'gradientShift 8s ease infinite' }}>
        <h1 style={{
          fontSize: '2.5rem',
          background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 20px 0'
        }}>
          How SolaceID Works
        </h1>
        <p style={{
          fontSize: '18px',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6',
          color: '#ccc'
        }}>
          Built on Midnight Network's zero-knowledge infrastructure
        </p>
      </header>

      {/* The Privacy Problem Section */}
      <section style={{ padding: '60px 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', color: '#ef4444' }}>The Privacy Problem</h2>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '30px' }}>
            Healthcare data is siloed, paper-based, and insecure. Patients have zero control over who sees their medical history. Every hospital visit requires sharing your entire medical record, and there's no cryptographic proof of consent.
          </p>
          <div style={{ background: 'linear-gradient(145deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))', border: '1px solid #ef4444', borderRadius: '15px', padding: '30px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '15px' }}>No Cryptographic Consent</div>
            <div style={{ fontSize: '16px', color: '#ccc' }}>Current systems rely on policy, not cryptography</div>
          </div>
        </div>
      </section>

      {/* The ZK Solution Section */}
      <section style={{ padding: '60px 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', color: '#10b981' }}>The ZK Solution</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1))', border: '1px solid #10b981', borderRadius: '15px', padding: '30px', width: '350px', textAlign: 'center' }}>
            <h3 style={{ color: '#10b981', margin: '0 0 15px 0', fontSize: '1.5rem' }}>ZK-Patient ID</h3>
            <p style={{ color: '#94a3b8', margin: '0', fontSize: '16px', lineHeight: '1.6' }}>
              A cryptographic commitment of your identity. Prove who you are without revealing what you are.
            </p>
          </div>
          <div style={{ background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1))', border: '1px solid #10b981', borderRadius: '15px', padding: '30px', width: '350px', textAlign: 'center' }}>
            <h3 style={{ color: '#10b981', margin: '0 0 15px 0', fontSize: '1.5rem' }}>Confidential Exchange</h3>
            <p style={{ color: '#94a3b8', margin: '0', fontSize: '16px', lineHeight: '1.6' }}>
              Hospital-to-hospital transfer with mathematical proof. Only hashes on-chain, never raw data.
            </p>
          </div>
          <div style={{ background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1))', border: '1px solid #10b981', borderRadius: '15px', padding: '30px', width: '350px', textAlign: 'center' }}>
            <h3 style={{ color: '#10b981', margin: '0 0 15px 0', fontSize: '1.5rem' }}>Patient Consent</h3>
            <p style={{ color: '#94a3b8', margin: '0', fontSize: '16px', lineHeight: '1.6' }}>
              Every access requires your signature. Consent is cryptographic, not just a checkbox.
            </p>
          </div>
        </div>
      </section>

      {/* Why Midnight Network Section */}
      <section style={{ padding: '60px 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', color: '#7c3aed' }}>Why Midnight Network</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(124, 58, 237, 0.1)', border: '1px solid #7c3aed', borderRadius: '15px', padding: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #7c3aed' }}>
                <th style={{ padding: '15px', textAlign: 'left', fontSize: '18px', fontWeight: 'bold' }}>Feature</th>
                <th style={{ padding: '15px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>Ethereum</th>
                <th style={{ padding: '15px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>Solana</th>
                <th style={{ padding: '15px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>Midnight</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(124, 58, 237, 0.3)', backgroundColor: '#0a0f1e' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>Private State</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#ef4444', fontSize: '20px' }}>❌</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#ef4444', fontSize: '20px' }}>❌</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#10b981', fontSize: '20px' }}>✅</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(124, 58, 237, 0.3)', backgroundColor: '#0d1526' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>Native ZK Proofs</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#ef4444', fontSize: '20px' }}>❌</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#ef4444', fontSize: '20px' }}>❌</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#10b981', fontSize: '20px' }}>✅</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(124, 58, 237, 0.3)', backgroundColor: '#0a0f1e' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>Shielded Computation</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#ef4444', fontSize: '20px' }}>❌</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#ef4444', fontSize: '20px' }}>❌</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#10b981', fontSize: '20px' }}>✅</td>
              </tr>
              <tr style={{ backgroundColor: '#0d1526' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>Public Auditability</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#10b981', fontSize: '20px' }}>✅</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#10b981', fontSize: '20px' }}>✅</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#10b981', fontSize: '20px' }}>✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Smart Contracts Section */}
      <section style={{ padding: '60px 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', color: '#06b6d4' }}>Smart Contracts</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ background: '#1a1f2e', border: '1px solid #06b6d4', borderRadius: '10px', padding: '25px', width: '280px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '16px', color: '#06b6d4', marginBottom: '10px', fontWeight: 'bold' }}>identity.compact</div>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>ZK identity commitment circuit</div>
          </div>
          <div style={{ background: '#1a1f2e', border: '1px solid #06b6d4', borderRadius: '10px', padding: '25px', width: '280px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '16px', color: '#06b6d4', marginBottom: '10px', fontWeight: 'bold' }}>consent.compact</div>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>Patient consent verification circuit</div>
          </div>
          <div style={{ background: '#1a1f2e', border: '1px solid #06b6d4', borderRadius: '10px', padding: '25px', width: '280px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '16px', color: '#06b6d4', marginBottom: '10px', fontWeight: 'bold' }}>exchange.compact</div>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>Confidential data exchange circuit</div>
          </div>
        </div>
        <div style={{ marginTop: '30px' }}>
          <button onClick={() => navigate('/contracts')} style={{
            background: 'transparent',
            border: '1px solid #06b6d4',
            color: '#06b6d4',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            View Contracts →
          </button>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ padding: '40px 1rem', textAlign: 'center' }}>
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/wallet')} style={{
            background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
            border: 'none',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Try SolaceID
          </button>
          <button onClick={() => navigate('/')} style={{
            background: 'transparent',
            border: '1px solid #7c3aed',
            color: '#7c3aed',
            padding: '15px 30px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Learn More
          </button>
        </div>
      </section>

      {/* Team & Vision Section */}
      <section style={{ padding: '60px 1rem', backgroundColor: '#0f1624' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '40px'
          }}>
            Team & Vision
          </h2>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: '#7c3aed', fontSize: '1.8rem', marginBottom: '15px' }}>Our Vision</h3>
            <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#e2e8f0', marginBottom: '30px' }}>
              A world where patients control their health data
            </p>

            <h3 style={{ color: '#06b6d4', fontSize: '1.8rem', marginBottom: '15px' }}>Our Mission</h3>
            <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#e2e8f0', marginBottom: '40px' }}>
              Build privacy-preserving infrastructure for healthcare on blockchain
            </p>
          </div>

          {!showWaitlist ? (
            <button
              onClick={() => setShowWaitlist(true)}
              style={{
                background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
                border: 'none',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Join the Waitlist
            </button>
          ) : (
            <div style={{ background: '#1a1f2e', border: '1px solid #444a70', borderRadius: '10px', padding: '30px', maxWidth: '400px', margin: '0 auto' }}>
              <h3 style={{ color: '#7c3aed', marginBottom: '20px' }}>Join Our Waitlist</h3>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #444a70',
                  borderRadius: '6px',
                  backgroundColor: '#0f1624',
                  color: '#e2e8f0',
                  fontSize: '16px',
                  marginBottom: '15px'
                }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => {
                    if (email) {
                      alert('Thank you for joining our waitlist!');
                      setShowWaitlist(false);
                      setEmail('');
                    }
                  }}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
                    border: 'none',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '6px',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  Subscribe
                </button>
                <button
                  onClick={() => {
                    setShowWaitlist(false);
                    setEmail('');
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid #666',
                    color: '#ccc',
                    padding: '12px',
                    borderRadius: '6px',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

export default AboutPage;