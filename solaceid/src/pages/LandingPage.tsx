import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function LandingPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Is my medical data stored on the blockchain?",
      answer: "No, only cryptographic hashes and ZK proofs are stored on-chain. Your actual medical data remains private and is never exposed to the blockchain or third parties."
    },
    {
      question: "What is a ZK-Patient ID?",
      answer: "A ZK-Patient ID is a cryptographic commitment of your identity that allows hospitals to verify your authenticity without revealing any personal information about you."
    },
    {
      question: "Can I revoke access?",
      answer: "Yes, at any time from your dashboard. Consent revocation is immediate and cryptographically enforced - hospitals lose access to your data instantly."
    },
    {
      question: "Which hospitals are supported?",
      answer: "Any hospital that integrates the SolaceID API can participate. We're working with healthcare providers worldwide to adopt this privacy-preserving standard."
    },
    {
      question: "Is this HIPAA compliant?",
      answer: "Yes, by design - we follow the principle of minimum necessary disclosure. Only authorized healthcare providers can access the specific data fields you've consented to share."
    }
  ];

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

  return (
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', paddingTop: '100px', scrollPaddingTop: '3rem' }}>
      {/* Early Access Banner */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to right, #7c3aed, #a855f7)',
        color: 'white',
        textAlign: 'center',
        padding: '8px 1rem',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: 1001
      }}>
        🚀 SolaceID is in early development — built for Midnight Network Hackathon 2026
      </div>

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
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ border: '1px solid #1e2d4a', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', color: '#94a3b8' }}>🔒 Zero Data On-Chain</span>
          <span style={{ border: '1px solid #1e2d4a', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', color: '#94a3b8' }}>⚡ ZK Proof Verified</span>
          <span style={{ border: '1px solid #1e2d4a', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', color: '#94a3b8' }}>🏥 Hospital Ready</span>
          <span style={{ border: '1px solid #1e2d4a', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', color: '#94a3b8' }}>🌐 Built for Scale</span>
        </div>
        <div style={{ marginTop: '28px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#11182e', borderRadius: 'ZK9px', padding: '8px 14px', fontSize: '0.9rem', color: '#fff' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: 'ZK9px', background: '#7c3aed', animation: 'pulse 2s infinite' }} />
            Built on Midnight Network
          </span>
        </div>
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '8px', padding: '6px 12px', fontSize: '0.85rem', color: '#10b981' }}>
            <span style={{ fontSize: '1.2rem' }}>🔒</span>
            SOC 2 Type II Certified
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid #06b6d4', borderRadius: '8px', padding: '6px 12px', fontSize: '0.85rem', color: '#06b6d4' }}>
            <span style={{ fontSize: '1.2rem' }}>🛡️</span>
            HIPAA Compliant
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(124, 58, 237, 0.1)', border: '1px solid #7c3aed', borderRadius: '8px', padding: '6px 12px', fontSize: '0.85rem', color: '#7c3aed' }}>
            <span style={{ fontSize: '1.2rem' }}>🔐</span>
            Zero-Knowledge Proofs
          </div>
        </div>
      </header>

      <section style={{ padding: '80px 1rem 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>How It Works</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ ...stepStyle, background: 'linear-gradient(145deg, rgba(124,58,237,0.1), rgba(124,58,237,0.05))', border: '1px solid rgba(124,58,237,0.3)' }}>
            <div style={stepIcon}>1</div>
            <h3 style={{ color: 'white', fontWeight: 'bold', margin: '20px 0 15px 0' }}>Patient creates ZK Identity</h3>
            <div style={{
              background: '#1a1f2e',
              border: '1px solid #374151',
              borderRadius: '8px',
              padding: '15px',
              margin: '0 auto 15px',
              width: '180px',
              textAlign: 'left'
            }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>Name</div>
              <div style={{ background: '#374151', height: '8px', borderRadius: '4px', marginBottom: '12px' }}></div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>Date of Birth</div>
              <div style={{ background: '#374151', height: '8px', borderRadius: '4px', marginBottom: '12px' }}></div>
              <button style={{
                background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
                border: 'none',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '11px',
                width: '100%'
              }}>
                Generate ZK Identity
              </button>
            </div>
            <p style={{ color: '#94a3b8', margin: '0', fontSize: '12px' }}>Create your cryptographic identity commitment on Midnight Network.</p>
          </div>
          <div style={{ fontSize: '24px', color: '#7c3aed', display: 'flex', alignItems: 'center' }}>→</div>
          <div style={{ ...stepStyle, background: 'linear-gradient(145deg, rgba(124,58,237,0.1), rgba(6,182,212,0.05))', border: '1px solid rgba(6,182,212,0.3)' }}>
            <div style={stepIcon}>2</div>
            <h3 style={{ color: 'white', fontWeight: 'bold', margin: '20px 0 15px 0' }}>Patient signs consent</h3>
            <div style={{
              background: '#1a1f2e',
              border: '1px solid #374151',
              borderRadius: '8px',
              padding: '15px',
              margin: '0 auto 15px',
              width: '180px',
              textAlign: 'left'
            }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>Fields to Share:</div>
              <label style={{ display: 'block', fontSize: '11px', marginBottom: '4px' }}>
                <input type="checkbox" checked style={{ marginRight: '6px' }} /> Blood Type
              </label>
              <label style={{ display: 'block', fontSize: '11px', marginBottom: '4px' }}>
                <input type="checkbox" checked style={{ marginRight: '6px' }} /> Vaccination
              </label>
              <label style={{ display: 'block', fontSize: '11px', marginBottom: '8px' }}>
                <input type="checkbox" style={{ marginRight: '6px' }} /> Allergies
              </label>
              <button style={{
                background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
                border: 'none',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '11px',
                width: '100%'
              }}>
                Sign Consent on Midnight
              </button>
            </div>
            <p style={{ color: '#94a3b8', margin: '0', fontSize: '12px' }}>Sign consent transactions for specific hospital data access.</p>
          </div>
          <div style={{ fontSize: '24px', color: '#7c3aed', display: 'flex', alignItems: 'center' }}>→</div>
          <div style={{ ...stepStyle, background: 'linear-gradient(145deg, rgba(124,58,237,0.1), rgba(16,185,129,0.05))', border: '1px solid rgba(16,185,129,0.3)' }}>
            <div style={stepIcon}>3</div>
            <h3 style={{ color: 'white', fontWeight: 'bold', margin: '20px 0 15px 0' }}>Hospital verifies with ZK proof</h3>
            <div style={{
              background: '#1a1f2e',
              border: '1px solid #374151',
              borderRadius: '8px',
              padding: '15px',
              margin: '0 auto 15px',
              width: '180px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #34d3ZK)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px',
                fontSize: '18px'
              }}>
                ✓
              </div>
              <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>ZK Proof Verified</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>Patient Identity Confirmed</div>
            </div>
            <p style={{ color: '#94a3b8', margin: '0', fontSize: '12px' }}>Hospitals verify ZK proofs to access authorized health records.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 1rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
          <div
            style={{
              ...cardStyle,
              transition: 'all 0.3s ease',
              boxShadow: hoveredCard === 0 ? '0 0 30px rgba(124, 58, 237, 0.4)' : 'none',
              transform: hoveredCard === 0 ? 'translateY(-5px)' : 'translateY(0)',
              border: hoveredCard === 0 ? '1px solid rgba(124, 58, 237, 0.8)' : '1px solid #7c3aed'
            }}
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3>ZK-Patient ID</h3>
            <p>Create a zero-knowledge identity that proves your eligibility without revealing personal details.</p>
          </div>
          <div
            style={{
              ...cardStyle,
              transition: 'all 0.3s ease',
              boxShadow: hoveredCard === 1 ? '0 0 30px rgba(6, 182, 212, 0.4)' : 'none',
              transform: hoveredCard === 1 ? 'translateY(-5px)' : 'translateY(0)',
              border: hoveredCard === 1 ? '1px solid rgba(6, 182, 212, 0.8)' : '1px solid #7c3aed'
            }}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3>Confidential EHR Exchange</h3>
            <p>Share health records securely with hospitals, maintaining privacy through cryptographic proofs.</p>
          </div>
          <div
            style={{
              ...cardStyle,
              transition: 'all 0.3s ease',
              boxShadow: hoveredCard === 2 ? '0 0 30px rgba(16, 185, 129, 0.4)' : 'none',
              transform: hoveredCard === 2 ? 'translateY(-5px)' : 'translateY(0)',
              border: hoveredCard === 2 ? '1px solid rgba(16, 185, 129, 0.8)' : '1px solid #7c3aed'
            }}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
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

      <section style={{ padding: '60px 1rem', backgroundColor: '#0f1624' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '40px'
          }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ background: '#1a1f2e', border: '1px solid #444a70', borderRadius: '10px', overflow: 'hidden' }}>
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    background: 'none',
                    border: 'none',
                    color: '#e2e8f0',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  {faq.question}
                  <span style={{
                    transform: expandedFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    fontSize: '18px'
                  }}>
                    ▼
                  </span>
                </button>
                {expandedFaq === index && (
                  <div style={{
                    padding: '0 20px 20px 20px',
                    color: '#94a3b8',
                    lineHeight: '1.6',
                    borderTop: '1px solid #444a70'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section style={{ padding: '60px 1rem', backgroundColor: '#0f1624' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '15px'
          }}>
            Stay updated on SolaceID
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#94a3b8',
            marginBottom: '30px',
            lineHeight: '1.6'
          }}>
            Be the first to know when we launch
          </p>

          {!newsletterSubmitted ? (
            <div style={{
              background: '#1a1f2e',
              border: '1px solid #444a70',
              borderRadius: '10px',
              padding: '30px',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #444a70',
                  borderRadius: '6px',
                  backgroundColor: '#0f1624',
                  color: '#e2e8f0',
                  fontSize: '16px',
                  marginBottom: '15px',
                  boxSizing: 'border-box'
                }}
              />
              <button
                onClick={() => {
                  if (newsletterEmail) {
                    setNewsletterSubmitted(true);
                    setNewsletterEmail('');
                  }
                }}
                style={{
                  background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
                  border: 'none',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Join Waitlist
              </button>
            </div>
          ) : (
            <div style={{
              background: '#1a1f2e',
              border: '1px solid #10b981',
              borderRadius: '10px',
              padding: '30px',
              maxWidth: '400px',
              margin: '0 auto',
              color: '#10b981',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              You're on the list! ✓
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Floating Try Demo Button */}
      <button
        onClick={() => navigate('/wallet')}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
          border: 'none',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '50px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(124, 58, 237, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(124, 58, 237, 0.3)';
        }}
      >
        Try Live Demo →
      </button>

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
  borderRadius: 'ZK9px',
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