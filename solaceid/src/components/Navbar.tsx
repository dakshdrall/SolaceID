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
      color: isActive ? 'var(--accent)' : 'var(--text-muted)',
      fontWeight: isActive ? 700 : 400,
      textDecoration: 'none',
      fontSize: '0.95rem',
      marginLeft: '2rem',
      transition: 'color 0.2s ease'
    };
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '72px',
        background: 'rgba(7, 12, 25, 0.92)',
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(124, 58, 237, 0.18)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '0 1rem' : '0 28px',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.28)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <Link to='/' style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '0.08em' }}>SolaceID</Link>
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
              gap: '5px',
              padding: 0
            }}>
              <div style={{ width: '22px', height: '2px', backgroundColor: 'white' }}></div>
              <div style={{ width: '22px', height: '2px', backgroundColor: 'white' }}></div>
              <div style={{ width: '22px', height: '2px', backgroundColor: 'white' }}></div>
            </button>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {localStorage.getItem('patientName') && (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Hi, {localStorage.getItem('patientName')}
            </span>
          )}
          <button onClick={connectWallet} style={{
            background: walletAddress ? 'rgba(16, 185, 129, 0.1)' : 'linear-gradient(135deg, var(--accent), var(--accent-2))',
            color: walletAddress ? 'var(--accent-2)' : '#fff',
            border: walletAddress ? '1px solid rgba(16, 185, 129, 0.7)' : 'none',
            borderRadius: '999px',
            padding: '10px 18px',
            cursor: 'pointer',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            minWidth: '160px',
            justifyContent: 'center'
          }}>
            {walletAddress ? (
              <>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  animation: 'pulse 1.8s infinite'
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
          top: '72px',
          left: 0,
          right: 0,
          backgroundColor: 'rgba(7, 12, 25, 0.96)',
          borderBottom: '1px solid rgba(124, 58, 237, 0.18)',
          zIndex: 999,
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
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
