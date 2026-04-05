import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0a0f1e',
      borderTop: '1px solid #444a70',
      padding: '40px 1rem 20px',
      color: '#e2e8f0',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        marginBottom: '30px'
      }}>
        {/* Product Column */}
        <div>
          <h3 style={{
            color: '#7c3aed',
            marginBottom: '15px',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            Product
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '8px' }}>
              <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
                Home
              </Link>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <Link to="/patient-login" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
                Patient Portal
              </Link>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <Link to="/dashboard" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
                Dashboard
              </Link>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <Link to="/hospital-login" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
                Hospital Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Technology Column */}
        <div>
          <h3 style={{
            color: '#06b6d4',
            marginBottom: '15px',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            Technology
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '8px' }}>
              <Link to="/about" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
                About SolaceID
              </Link>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <Link to="/contracts" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
                Smart Contracts
              </Link>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <span style={{ color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>
                Midnight Network
              </span>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <span style={{ color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>
                Zero Knowledge
              </span>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h3 style={{
            color: '#10b981',
            marginBottom: '15px',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            Legal
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '8px' }}>
              <Link to="/privacy" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
                Privacy Policy
              </Link>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <span style={{ color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>
                Terms of Service
              </span>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <span style={{ color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>
                HIPAA Compliance
              </span>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <span style={{ color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>
                Security
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{
        borderTop: '1px solid #444a70',
        paddingTop: '20px',
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        © 2026 SolaceID · Built on Midnight Network
      </div>
    </footer>
  );
}

export default Footer;