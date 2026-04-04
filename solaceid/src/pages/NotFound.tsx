import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', paddingTop: '100px', scrollPaddingTop: '3rem' }}>
      <Navbar />
      <div style={{ padding: '140px 1rem 40px', margin: '0 auto', maxWidth: '1000px', width: '100%', textAlign: 'center' }}>
        <div style={{
          fontSize: '120px',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #7c3aed, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '20px'
        }}>
          404
        </div>

        <h1 style={{ fontSize: '36px', marginBottom: '10px', color: 'white' }}>
          Page not found
        </h1>

        <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '40px' }}>
          The page you're looking for doesn't exist
        </p>

        <button
          onClick={() => navigate('/')}
          style={{
            background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '15px 30px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;