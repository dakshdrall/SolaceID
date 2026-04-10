import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [walletAddress, setWalletAddress] = useState('');
  const [walletError, setWalletError] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tNightBalance, setTNightBalance] = useState<number | null>(null);

  const refreshBalance = () => {
    const bal = localStorage.getItem('walletBalance');
    if (bal !== null) setTNightBalance(Number(bal));
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress') || '';
    if (savedAddress) {
      setWalletAddress(`${savedAddress.slice(0, 10)}...${savedAddress.slice(-6)}`);
    }
    refreshBalance();

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
    window.addEventListener('balanceUpdate', refreshBalance);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('balanceUpdate', refreshBalance);
      document.head.removeChild(style);
    };
  }, []);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      
      const midnight = (window as any).midnight;
      if (!midnight) {
        setWalletError('Please install Lace wallet with Midnight enabled');
        setIsConnecting(false);
        return;
      }
      
      const walletKey = Object.keys(midnight)[0];
      const walletApi = midnight[walletKey];

      const serviceUriConfig = {
        proverServerUri: 'https://proof-server.preprod.midnight.network',
        indexerUri: 'https://indexer.preprod.midnight.network/api/v3/graphql',
        indexerWsUri: 'wss://indexer.preprod.midnight.network/api/v3/graphql',
        nodeUri: 'https://rpc.preprod.midnight.network',
      };

      const enabledApi = await walletApi.enable(serviceUriConfig);
      const connectedApi = enabledApi.state
        ? enabledApi
        : await walletApi.connect('preprod');
      const addressResult = await connectedApi.getUnshieldedAddress();
      const address = addressResult?.unshieldedAddress || 'Connected';
      
      const shortAddress = address.length > 16
        ? address.slice(0, 12) + '...' + address.slice(-6)
        : address;

      setWalletAddress(shortAddress);
      localStorage.setItem('walletAddress', address);
      setIsConnecting(false);
      setWalletError('');

    } catch (err: any) {
      setIsConnecting(false);
      console.error('Wallet error:', err);
      setWalletError('Failed: ' + (err?.message || 'Please approve in Lace wallet'));
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
        <div style={{ width: isMobile ? 'auto' : '220px', display: 'flex', alignItems: 'center' }}>
          <Link
            to='/'
            style={{
              color: '#7c3aed',
              textDecoration: 'none',
              fontFamily: 'Syne',
              fontWeight: 700,
              fontSize: '1.5rem'
            }}
          >
            SolaceID
          </Link>
        </div>

        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flex: 1 }}>
            <Link to='/' style={getLinkStyle('/')}>Home</Link>
            <Link to='/patient-login' style={getLinkStyle('/patient-login')}>Patient Portal</Link>
            <Link to='/dashboard' style={getLinkStyle('/dashboard')}>Dashboard</Link>
            <Link to='/marketplace' style={getLinkStyle('/marketplace')}>Marketplace</Link>
            <Link to='/transactions' style={getLinkStyle('/transactions')}>Transactions</Link>
            <Link to='/hospital-login' style={getLinkStyle('/hospital-login')}>Hospital</Link>
            <Link to='/about' style={getLinkStyle('/about')}>About</Link>
            <Link to='/contracts' style={getLinkStyle('/contracts')}>Contracts</Link>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {localStorage.getItem('patientName') && (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Hi, {localStorage.getItem('patientName')}
            </span>
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

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
            <button onClick={connectWallet} disabled={isConnecting} style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '999px',
              padding: '10px 18px',
              cursor: isConnecting ? 'not-allowed' : 'pointer',
              opacity: isConnecting ? 0.8 : 1,
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
                    backgroundColor: '#e9d5ff',
                    animation: 'pulse 1.8s infinite'
                  }}></span>
                  {walletAddress}
                  {tNightBalance !== null && (
                    <span style={{ borderLeft: '1px solid rgba(255,255,255,0.25)', paddingLeft: '10px', color: '#06b6d4', fontSize: '0.82rem' }}>
                      {tNightBalance} tNight
                    </span>
                  )}
                </>
              ) : (
                isConnecting ? 'Connecting...' : 'Connect Wallet'
              )}
            </button>
            {walletError && (
              <span style={{ color: '#f87171', fontSize: '0.78rem', textAlign: 'right', maxWidth: '200px' }}>
                {walletError}
              </span>
            )}
          </div>
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
          <Link to='/marketplace' style={getLinkStyle('/marketplace')} onClick={() => setMenuOpen(false)}>Marketplace</Link>
          <Link to='/transactions' style={getLinkStyle('/transactions')} onClick={() => setMenuOpen(false)}>Transactions</Link>
          <Link to='/hospital-login' style={getLinkStyle('/hospital-login')} onClick={() => setMenuOpen(false)}>Hospital</Link>
          <Link to='/about' style={getLinkStyle('/about')} onClick={() => setMenuOpen(false)}>About</Link>
          <Link to='/contracts' style={getLinkStyle('/contracts')} onClick={() => setMenuOpen(false)}>Contracts</Link>
        </div>
      )}
    </>
  );
}

export default Navbar;
