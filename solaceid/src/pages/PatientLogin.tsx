import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function PatientLogin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (activeTab === 'signup') {
        localStorage.setItem('patientName', form.name);
      }
      navigate('/wallet');
    }, 2000);
  };

  const handleGuest = () => {
    navigate('/wallet');
  };

  return (
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', paddingTop: '100px' }}>
      <Navbar />
      <div style={{ padding: '40px 1rem', maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ background: '#11182e', border: '1px solid #444a70', borderRadius: '10px', padding: '30px', boxShadow: '0 0 20px rgba(124, 58, 237, 0.15)' }}>
          <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid #444a70' }}>
            <button
              onClick={() => setActiveTab('signin')}
              style={{
                flex: 1,
                padding: '10px',
                background: activeTab === 'signin' ? '#7c3aed' : 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '5px 5px 0 0'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              style={{
                flex: 1,
                padding: '10px',
                background: activeTab === 'signup' ? '#7c3aed' : 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '5px 5px 0 0'
              }}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {activeTab === 'signup' && (
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: '#0a0f1e',
                    border: '1px solid #444a70',
                    borderRadius: '5px',
                    color: 'white',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            )}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#0a0f1e',
                  border: '1px solid #444a70',
                  borderRadius: '5px',
                  color: 'white',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#0a0f1e',
                  border: '1px solid #444a70',
                  borderRadius: '5px',
                  color: 'white',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            {activeTab === 'signup' && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Confirm Password</label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: '#0a0f1e',
                    border: '1px solid #444a70',
                    borderRadius: '5px',
                    color: 'white',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                background: loading ? '#444a70' : 'linear-gradient(to right, #7c3aed, #06b6d4)',
                border: 'none',
                borderRadius: '5px',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                marginBottom: '15px'
              }}
            >
              {loading ? 'Processing...' : activeTab === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <button
            onClick={handleGuest}
            style={{
              width: '100%',
              padding: '10px',
              background: 'transparent',
              border: '1px solid #444a70',
              borderRadius: '5px',
              color: '#ccc',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Continue as Guest
          </button>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#888' }}>
            Privacy first - your data never leaves your device
          </p>
        </div>
      </div>
    </div>
  );
}

export default PatientLogin;