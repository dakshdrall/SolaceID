import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function LandingPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'Is my medical data stored on the blockchain?',
      answer: 'No. Only cryptographic commitments and zero-knowledge proofs are stored on-chain. Your medical records remain private and never leave your device without your consent.'
    },
    {
      question: 'What is a ZK-Patient ID?',
      answer: 'A ZK-Patient ID is a privacy-preserving identity commitment that proves your eligibility without revealing your personal data.'
    },
    {
      question: 'Can I revoke access?',
      answer: 'Yes. Consent can be revoked instantly from your dashboard, and access is cryptographically blocked for hospitals immediately.'
    },
    {
      question: 'Which hospitals are supported?',
      answer: 'Any hospital that integrates the SolaceID API can verify your identity while preserving privacy.'
    },
    {
      question: 'Is this HIPAA compliant?',
      answer: 'Yes. SolaceID is designed around minimum necessary disclosure and patient control, which supports HIPAA privacy principles.'
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
    <div style={{ background: 'transparent', minHeight: '100vh', color: 'var(--text)', paddingTop: '100px', paddingBottom: '80px' }}>
      <Navbar />

      <main style={{ padding: '0 1rem' }}>
        <section className='hero-banner' style={{ marginTop: '80px' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
            <p className='badge-pill' style={{ marginBottom: '1.5rem', letterSpacing: '0.12em' }}>MEDICAL-GRADE PRIVACY • CYBERPUNK-GRADE SECURITY</p>
            <h1 className='hero-title'>Medical identity, locked with zero-knowledge cryptography.</h1>
            <p className='hero-copy'>SolaceID gives patients control over their health records, while hospitals verify identity and consent without ever seeing private data.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '2rem' }}>
              <button onClick={() => navigate('/patient-login')} className='button-primary' style={{ minWidth: '220px', padding: '16px 32px', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}>
                Patient Onboarding
              </button>
              <button onClick={() => navigate('/hospital-login')} className='button-secondary' style={{ minWidth: '220px' }}>
                Hospital Login
              </button>
            </div>
          </div>
          <div style={{ display: 'grid', gap: '1rem', marginTop: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))' }}>
            <div className='feature-card' style={{ borderColor: 'rgba(124, 58, 237, 0.2)' }}>
              <h3 style={{ marginTop: 0 }}>Zero Data On-Chain</h3>
              <p className='step-detail'>Your medical facts stay private. Only hashed proofs live on Midnight Network.</p>
            </div>
            <div className='feature-card' style={{ borderColor: 'rgba(6, 182, 212, 0.2)' }}>
              <h3 style={{ marginTop: 0 }}>Patient-Centric Consent</h3>
              <p className='step-detail'>You choose what gets shared, for how long, and with which hospital.</p>
            </div>
            <div className='feature-card' style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}>
              <h3 style={{ marginTop: 0 }}>ZK Verified Access</h3>
              <p className='step-detail'>Hospitals verify identity without learning your underlying health information.</p>
            </div>
          </div>
        </section>

        <section style={{ padding: '6rem 0 0', textAlign: 'center' }}>
          <h2 className='section-heading'>How it works</h2>
          <p className='section-subtitle'>A patient generates a ZK identity, signs consent, and a verified hospital receives access only to the data fields you've approved.</p>
          <div className='grid-3' style={{ marginTop: '2.5rem', gap: '1.5rem' }}>
            <div className='flow-step'>
              <div className='flow-step-number'>1</div>
              <h3>Create ZK identity</h3>
              <p className='step-detail'>Patients generate a private cryptographic commitment locally, then publish a proof to Midnight Network.</p>
            </div>
            <div className='flow-step'>
              <div className='flow-step-number'>2</div>
              <h3>Grant consent</h3>
              <p className='step-detail'>Select which fields hospitals can access and sign the transaction with your identity.</p>
            </div>
            <div className='flow-step'>
              <div className='flow-step-number'>3</div>
              <h3>Verify with ZK proof</h3>
              <p className='step-detail'>Hospitals verify your consent and identity cryptographically—without reading your full health record.</p>
            </div>
          </div>
        </section>

        <section style={{ padding: '4rem 0' }}>
          <div className='surface-card' style={{ padding: '2.5rem', maxWidth: '980px', margin: '0 auto', borderColor: 'rgba(124, 58, 237, 0.12)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
              <h2 className='section-heading'>Secure patient identity for hospital workflows</h2>
              <p className='section-subtitle'>SolaceID is built for trusted care teams that need verification without risking patient privacy.</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <span className='badge-pill status-chip primary'>100% Private</span>
                <span className='badge-pill status-chip info'>ZK-Proof Verified</span>
                <span className='badge-pill status-chip success'>Patient Controlled</span>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h2 className='section-heading'>Frequently Asked Questions</h2>
          <div style={{ display: 'grid', gap: '1rem', maxWidth: '860px', margin: '0 auto' }}>
            {faqs.map((faq, index) => (
              <div key={index} className='surface-card' style={{ padding: '1.4rem' }}>
                <button onClick={() => toggleFaq(index)} style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text)',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  padding: 0
                }}>
                  <span>{faq.question}</span>
                  <span style={{ color: 'var(--accent)' }}>{expandedFaq === index ? '−' : '+'}</span>
                </button>
                {expandedFaq === index && (
                  <p style={{ marginTop: '1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;
