import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [walletAddress, setWalletAddress] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress') || '';
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }

    // Add pulse animation for connected wallet indicator
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.head.removeChild(style);
    };
  }, []);

  const connectWallet = async () => {
    const lace = (window as any).midnight?.mnLace;

    if (!lace) {
      // Temporarily change button text
      const button = document.querySelector('button[onclick*="connectWallet"]') as HTMLButtonElement;
      if (button) {
        const originalText = button.textContent;
        button.textContent = 'Wallet Not Found';
        setTimeout(() => {
          button.textContent = originalText;
        }, 3000);
      }
      return;
    }

    try {
      const enabled = await lace.enable();
      const state = await enabled.state();
      const address = state?.address || state?.unshieldedAddress || state?.coinPublicKey || '';
      if (address) {
        const short = typeof address === 'string' ? `${address.slice(0, 10)}...${address.slice(-6)}` : 'Connected';
        setWalletAddress(short);
        localStorage.setItem('walletAddress', short);
      }
    } catch (err) {
      console.error('Wallet connection error:', err);
      // Temporarily change button text on error too
      const button = document.querySelector('button[onclick*="connectWallet"]') as HTMLButtonElement;
      if (button) {
        const originalText = button.textContent;
        button.textContent = 'Wallet Not Found';
        setTimeout(() => {
          button.textContent = originalText;
        }, 3000);
      }
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getLinkStyle = (path: string) => {
    const isActive = location.pathname === path;
    return {
      color: isActive ? '#7c3aed' : '#e2e8f0',
      fontWeight: isActive ? 700 : 400,
      textDecoration: 'none',
      fontSize: '15px',
      marginLeft: '2rem'
    };
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        background: 'rgba(10, 15, 30, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(124, 58, 237, 0.3)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '0 1rem' : '0 24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to='/' style={{ color: '#7c3aed', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 700 }}>SolaceID</Link>
          {!isMobile && (
            <>
              <Link to='/' style={getLinkStyle('/')}>Home</Link>
              <Link to='/patient-login' style={getLinkStyle('/patient-login')}>Patient Portal</Link>
              <Link to='/dashboard' style={getLinkStyle('/dashboard')}>Dashboard</Link>
              <Link to='/hospital-login' style={getLinkStyle('/hospital-login')}>Hospital</Link>
              <Link to='/about' style={getLinkStyle('/about')}>About</Link>
              <Link to='/contracts' style={getLinkStyle('/contracts')}>Contracts</Link>
            </>
          )}
          {isMobile && (
            <button onClick={toggleMenu} style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ width: '20px', height: '2px', backgroundColor: 'white' }}></div>
              <div style={{ width: '20px', height: '2px', backgroundColor: 'white' }}></div>
              <div style={{ width: '20px', height: '2px', backgroundColor: 'white' }}></div>
            </button>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {localStorage.getItem('patientName') && (
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>
              Hi, {localStorage.getItem('patientName')}
            </span>
          )}
          <button onClick={connectWallet} style={{
            background: walletAddress ? 'rgba(16, 185, 129, 0.1)' : 'linear-gradient(to right, #7c3aed, #06b6d4)',
            color: walletAddress ? '#10b981' : '#fff',
            border: walletAddress ? '1px solid #10b981' : 'none',
            borderRadius: '6px',
            padding: '8px 14px',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {walletAddress ? (
              <>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  animation: 'pulse 2s infinite'
                }}></span>
                {walletAddress}
              </>
            ) : (
              'Connect Wallet'
            )}
          </button>
        </div>
      </nav>

      {menuOpen && isMobile && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          backgroundColor: '#0a0f1e',
          borderBottom: '1px solid rgba(124, 58, 237, 0.3)',
          zIndex: 999,
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <Link to='/' style={getLinkStyle('/')} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to='/patient-login' style={getLinkStyle('/patient-login')} onClick={() => setMenuOpen(false)}>Patient Portal</Link>
          <Link to='/dashboard' style={getLinkStyle('/dashboard')} onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to='/hospital-login' style={getLinkStyle('/hospital-login')} onClick={() => setMenuOpen(false)}>Hospital</Link>
          <Link to='/about' style={getLinkStyle('/about')} onClick={() => setMenuOpen(false)}>About</Link>
          <Link to='/contracts' style={getLinkStyle('/contracts')} onClick={() => setMenuOpen(false)}>Contracts</Link>
        </div>
      )}

    </>
  );
}

export default Navbar;
