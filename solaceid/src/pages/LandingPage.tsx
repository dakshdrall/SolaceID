import { useState } from 'react';

function LandingPage() {
  const [email, setEmail] = useState('');

  const handleWaitlist = () => {
    // Handle waitlist signup
    console.log('Waitlist signup:', email);
  };

  return (
    <div style={{
      background: '#0a0a0a',
      color: '#ffffff',
      fontFamily: 'Inter, sans-serif',
      minHeight: '100vh',
      lineHeight: 1.6
    }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: '#0a0a0a',
        borderBottom: '1px solid #222222',
        zIndex: 1000,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Syne, sans-serif' }}>
          SolaceID
        </div>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <a href="#how-it-works" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.9rem' }}>How It Works</a>
          <a href="#why-midnight" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.9rem' }}>Why Midnight</a>
          <a href="#about" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.9rem' }}>About</a>
        </div>
        <button style={{
          background: '#ffffff',
          color: '#000000',
          border: 'none',
          padding: '12px 24px',
          fontSize: '0.9rem',
          fontWeight: 500,
          cursor: 'pointer'
        }}>
          Join Waitlist
        </button>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '120px 40px 80px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '60px' }}>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            color: '#666666',
            letterSpacing: '0.15em',
            marginBottom: '40px'
          }}>
            &gt; ZK-HEALTH · MIDNIGHT NETWORK · EST. 2026
          </div>
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            fontWeight: 800,
            lineHeight: 1.0,
            margin: 0,
            marginBottom: '40px'
          }}>
            Patient identity,<br />
            locked with zero-<br />
            knowledge proofs.
          </h1>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '60px' }}>
            <button style={{
              background: '#ffffff',
              color: '#000000',
              border: 'none',
              padding: '16px 32px',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Join Waitlist →
            </button>
            <button style={{
              background: 'transparent',
              color: '#ffffff',
              border: '1px solid #ffffff',
              padding: '16px 32px',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              How It Works →
            </button>
          </div>
          <div style={{ display: 'flex', gap: '40px', fontSize: '0.9rem', color: '#666666' }}>
            <div>ZK Proofs | ZERO KNOWLEDGE</div>
            <div>Smart Contracts | CODE-ENFORCED</div>
            <div>Midnight Network | PRIVACY L1</div>
          </div>
        </div>
      </section>

      {/* Market Section */}
      <section style={{ padding: '80px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '60px' }}>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            color: '#666666',
            letterSpacing: '0.15em',
            marginBottom: '20px'
          }}>
            &gt; MARKET CONTEXT
          </div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0
          }}>
            The problem is real.<br />
            The solution is now.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#111111', padding: '30px', border: '1px solid #222222' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>$10.9M</div>
            <div style={{ fontSize: '0.9rem', color: '#666666' }}>Average healthcare breach cost</div>
          </div>
          <div style={{ background: '#111111', padding: '30px', border: '1px solid #222222' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>1 in 3</div>
            <div style={{ fontSize: '0.9rem', color: '#666666' }}>Patients have had data exposed</div>
          </div>
          <div style={{ background: '#111111', padding: '30px', border: '1px solid #222222' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>0</div>
            <div style={{ fontSize: '0.9rem', color: '#666666' }}>Cryptographic consent systems today</div>
          </div>
          <div style={{ background: '#111111', padding: '30px', border: '1px solid #222222' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>100%</div>
            <div style={{ fontSize: '0.9rem', color: '#666666' }}>Patient control with SolaceID</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" style={{ padding: '80px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '60px' }}>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            color: '#666666',
            letterSpacing: '0.15em',
            marginBottom: '20px'
          }}>
            &gt; PATIENT JOURNEY
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0
            }}>
              How SolaceID<br />
              protects you.
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#cccccc', lineHeight: 1.7 }}>
              Patients generate zero-knowledge proofs of their identity and medical data locally.
              Hospitals verify eligibility without accessing sensitive information. Every interaction
              is cryptographically enforced through smart contracts on Midnight Network.
            </p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#111111', padding: '40px', border: '1px solid #222222' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#666666', marginBottom: '20px' }}>01 CREATE</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '15px' }}>Generate ZK Identity</h3>
            <p style={{ color: '#cccccc', lineHeight: 1.6 }}>
              Create a cryptographic commitment to your identity that proves eligibility
              without revealing personal details.
            </p>
          </div>
          <div style={{ background: '#111111', padding: '40px', border: '1px solid #222222' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#666666', marginBottom: '20px' }}>02 CONSENT</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '15px' }}>Authorise Access</h3>
            <p style={{ color: '#cccccc', lineHeight: 1.6 }}>
              Grant specific permissions to hospitals for defined time periods,
              enforced by smart contracts.
            </p>
          </div>
          <div style={{ background: '#111111', padding: '40px', border: '1px solid #222222' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#666666', marginBottom: '20px' }}>03 VERIFY</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '15px' }}>Hospital Confirms</h3>
            <p style={{ color: '#cccccc', lineHeight: 1.6 }}>
              Healthcare providers verify your identity and consent through
              zero-knowledge proofs, maintaining complete privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Why Midnight Section */}
      <section id="why-midnight" style={{ padding: '80px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '60px' }}>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            color: '#666666',
            letterSpacing: '0.15em',
            marginBottom: '20px'
          }}>
            &gt; PROTOCOL
          </div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0,
            marginBottom: '60px'
          }}>
            Why only Midnight<br />
            can do this.
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'start' }}>
            <div style={{ borderLeft: '2px solid #ffffff', paddingLeft: '30px' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '15px' }}>Privacy-First Architecture</h3>
              <p style={{ color: '#cccccc', lineHeight: 1.7 }}>
                Midnight Network's zero-knowledge virtual machine enables computation
                on encrypted data, ensuring patient privacy while maintaining
                cryptographic verifiability.
              </p>
            </div>
            <div></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', alignItems: 'start' }}>
            <div></div>
            <div style={{ borderLeft: '2px solid #ffffff', paddingLeft: '30px' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '15px' }}>Regulatory Compliance</h3>
              <p style={{ color: '#cccccc', lineHeight: 1.7 }}>
                Built for healthcare compliance with minimum necessary disclosure
                and patient control at the protocol level, supporting HIPAA
                and GDPR requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            color: '#666666',
            letterSpacing: '0.15em',
            marginBottom: '20px'
          }}>
            &gt; EARLY ACCESS
          </div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0,
            marginBottom: '40px'
          }}>
            Your health data,<br />
            your control.<br />
            Starting now.
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                background: '#111111',
                border: '1px solid #222222',
                color: '#ffffff',
                padding: '16px 20px',
                fontSize: '1rem'
              }}
            />
            <button
              onClick={handleWaitlist}
              style={{
                background: '#ffffff',
                color: '#000000',
                border: 'none',
                padding: '16px 32px',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Join Waitlist
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', fontSize: '0.8rem', color: '#666666' }}>
            <div>ZERO-KNOWLEDGE PROOFS</div>
            <div>PATIENT CONTROLLED</div>
            <div>CODE-ENFORCED</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #222222',
        padding: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ color: '#666666', fontSize: '0.9rem' }}>
          © 2026 SolaceID. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <a href="#" style={{ color: '#666666', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy</a>
          <a href="#" style={{ color: '#666666', textDecoration: 'none', fontSize: '0.9rem' }}>Terms</a>
          <a href="#" style={{ color: '#666666', textDecoration: 'none', fontSize: '0.9rem' }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
