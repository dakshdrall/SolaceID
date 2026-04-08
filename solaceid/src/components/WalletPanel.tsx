import { useEffect, useState } from 'react';
import { getMidnightWallet } from '../utils/midnight';

interface WalletPanelProps {
  compact?: boolean;
}

interface TxEntry {
  txHash?: string;
  hash?: string;
  timestamp?: string | number;
  type?: string;
  amount?: number | string;
  status?: string;
  [key: string]: any;
}

function formatBalance(raw: any): string {
  if (raw === null || raw === undefined) return '—';
  if (typeof raw === 'number') return (raw / 1_000_000).toFixed(6) + ' tDUST';
  if (typeof raw === 'string') {
    const n = Number(raw);
    return isNaN(n) ? raw : (n / 1_000_000).toFixed(6) + ' tDUST';
  }
  // object: find tDUST key or first numeric value
  if (typeof raw === 'object') {
    const key = Object.keys(raw).find(k => k.toLowerCase().includes('tdust') || k.toLowerCase().includes('dust'));
    const val = key ? raw[key] : Object.values(raw)[0];
    if (typeof val === 'number') return (val / 1_000_000).toFixed(6) + ' tDUST';
    if (typeof val === 'string') {
      const n = Number(val);
      return isNaN(n) ? String(val) : (n / 1_000_000).toFixed(6) + ' tDUST';
    }
    return JSON.stringify(raw);
  }
  return String(raw);
}

function formatTxHash(hash: string): string {
  return hash.length > 20 ? hash.slice(0, 10) + '...' + hash.slice(-8) : hash;
}

function formatTxTime(ts: string | number | undefined): string {
  if (!ts) return 'Unknown time';
  const d = new Date(typeof ts === 'number' && ts < 1e12 ? ts * 1000 : ts);
  return isNaN(d.getTime()) ? String(ts) : d.toLocaleString();
}

function WalletPanel({ compact = false }: WalletPanelProps) {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState<any>(null);
  const [txHistory, setTxHistory] = useState<TxEntry[]>([]);
  const [network, setNetwork] = useState('Midnight Preprod');
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('walletAddress') || '';
    if (saved) {
      setAddress(saved);
      fetchWalletData();
    }
  }, []);

  const fetchWalletData = async () => {
    setLoading(true);
    setError('');
    try {
      const wallet = await getMidnightWallet();
      if (!wallet) {
        setError('Connect your Lace wallet using the button above');
        return;
      }

      const [balRes, histRes, cfgRes] = await Promise.allSettled([
        wallet.getUnshieldedBalances(),
        wallet.getTxHistory(),
        wallet.getConfiguration(),
      ]);

      if (balRes.status === 'fulfilled') setBalance(balRes.value);
      if (histRes.status === 'fulfilled') {
        const hist = histRes.value;
        setTxHistory(Array.isArray(hist) ? hist : []);
      }
      if (cfgRes.status === 'fulfilled' && cfgRes.value) {
        const cfg = cfgRes.value;
        const netName =
          cfg.networkId || cfg.network || cfg.name || cfg.chainName || 'Midnight Preprod';
        setNetwork(String(netName));
      }
      setFetched(true);
    } catch (err: any) {
      setError('Failed to load wallet data — ' + (err?.message || 'unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const shortAddress = address.length > 16 ? address.slice(0, 12) + '...' + address.slice(-6) : address;
  const isConnected = !!address;

  if (!isConnected) {
    return (
      <div className='surface-card' style={{ padding: '1.5rem', borderColor: 'rgba(124, 58, 237, 0.14)', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#6b7280', flexShrink: 0 }} />
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>Midnight Wallet</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Connect your Lace wallet to see live balance and transaction history.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='surface-card' style={{ padding: '2rem', borderColor: 'rgba(124, 58, 237, 0.18)', marginBottom: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.4rem 0' }}>Midnight Wallet</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{network}</span>
          </div>
        </div>
        <button
          onClick={fetchWalletData}
          disabled={loading}
          className='button-secondary'
          style={{ fontSize: '0.85rem', padding: '8px 14px', opacity: loading ? 0.6 : 1 }}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      {/* Address + Balance row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className='panel-card' style={{ borderColor: 'rgba(124, 58, 237, 0.18)' }}>
          <p style={{ margin: '0 0 0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Address</p>
          <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.95rem', wordBreak: 'break-all' }}>{shortAddress}</p>
        </div>
        <div className='panel-card' style={{ borderColor: 'rgba(6, 182, 212, 0.18)' }}>
          <p style={{ margin: '0 0 0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Balance</p>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-2)' }}>
            {loading ? '…' : fetched ? formatBalance(balance) : '—'}
          </p>
        </div>
        <div className='panel-card' style={{ borderColor: 'rgba(16, 185, 129, 0.18)' }}>
          <p style={{ margin: '0 0 0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Transactions</p>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
            {loading ? '…' : fetched ? txHistory.length : '—'}
          </p>
        </div>
      </div>

      {error && (
        <p style={{ color: '#f87171', fontSize: '0.875rem', margin: '0 0 1rem' }}>{error}</p>
      )}

      {/* Transaction history */}
      {!compact && fetched && (
        <div>
          <h3 style={{ margin: '0 0 1rem' }}>Transaction History</h3>
          {txHistory.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>No transactions found on Preprod.</p>
          ) : (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {txHistory.slice(0, 10).map((tx, i) => {
                const hash = tx.txHash || tx.hash || tx.id || '';
                const type = tx.type || tx.direction || 'Transaction';
                const time = formatTxTime(tx.timestamp || tx.time || tx.slot);
                const amount = tx.amount !== undefined ? formatBalance(tx.amount) : '';
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '0.875rem 1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(124, 58, 237, 0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: type.toLowerCase().includes('receive') || type.toLowerCase().includes('in') ? '#10b981' : '#7c3aed', flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', textTransform: 'capitalize' }}>{type}</p>
                        {hash && <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'monospace' }}>{formatTxHash(hash)}</p>}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      {amount && <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>{amount}</p>}
                      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.78rem' }}>{time}</p>
                    </div>
                  </div>
                );
              })}
              {txHistory.length > 10 && (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>+ {txHistory.length - 10} more transactions</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WalletPanel;
