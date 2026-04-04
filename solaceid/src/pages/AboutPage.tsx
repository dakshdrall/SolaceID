import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';

function AboutPage() {
  const navigate = useNavigate();

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
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', paddingTop: '120px', scrollPaddingTop: '3rem' }}>
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
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(145deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))', border: '1px solid #ef4444', borderRadius: '15px', padding: '30px', width: '280px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '10px' }}>1 in 3</div>
            <div style={{ fontSize: '16px', color: '#ccc' }}>patients have had medical data breached</div>
          </div>
          <div style={{ background: 'linear-gradient(145deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))', border: '1px solid #ef4444', borderRadius: '15px', padding: '30px', width: '280px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '10px' }}>$10.9M</div>
            <div style={{ fontSize: '16px', color: '#ccc' }}>average cost of healthcare data breach</div>
          </div>
          <div style={{ background: 'linear-gradient(145deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))', border: '1px solid #ef4444', borderRadius: '15px', padding: '30px', width: '280px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '10px' }}>0%</div>
            <div style={{ fontSize: '16px', color: '#ccc' }}>of patients control their own EHR data today</div>
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
    </div>
  );
}

export default AboutPage;