import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [walletAddress, setWalletAddress] = useState('');
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress') || '';
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const connectWallet = async () => {
    const lace = (window as any).midnight?.mnLace;

    if (!lace) {
      setShowInstallModal(true);
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
      setShowInstallModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowInstallModal(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        backgroundColor: '#0a0f1e',
        borderBottom: '1px solid rgba(124, 58, 237, 0.3)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '0 1rem' : '0 24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to='/' style={{ color: 'white', textDecoration: 'none', fontSize: '1.4rem', fontWeight: 'bold' }}>SolaceID</Link>
          {!isMobile && (
            <>
              <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
              <Link to='/wallet' style={{ color: 'white', textDecoration: 'none' }}>Patient Portal</Link>
              <Link to='/dashboard' style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
              <Link to='/hospital' style={{ color: 'white', textDecoration: 'none' }}>Hospital</Link>
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
        <button onClick={connectWallet} style={{
          background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 14px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          {walletAddress || 'Connect Wallet'}
        </button>
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
          <Link to='/' style={{ color: 'white', textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to='/wallet' style={{ color: 'white', textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>Patient Portal</Link>
          <Link to='/dashboard' style={{ color: 'white', textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to='/hospital' style={{ color: 'white', textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>Hospital</Link>
        </div>
      )}

      {showInstallModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            maxWidth: '450px',
            background: '#10162a',
            border: '1px solid rgba(124, 58, 237, 0.6)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white'
          }}>
            <h3 style={{ marginTop: 0 }}>Install Lace Wallet to connect</h3>
            <p>To connect your wallet, please install Lace Midnight Preview and refresh the page.</p>
            <a href='https://chrome.google.com/webstore' target='_blank' rel='noreferrer' style={{ color: '#7c3aed', display: 'inline-block', marginBottom: '12px' }}>Go to Chrome Web Store</a>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button onClick={handleCloseModal} style={{ backgroundColor: '#444a70', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
