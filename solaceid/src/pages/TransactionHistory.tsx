import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

interface Transaction {
  txId: string;
  from: string;
  to: string;
  amount: string;
  timestamp: string;
  status: string;
  network: string;
  type: string;
}

function TransactionHistory() {
  const [filter, setFilter] = useState<'all' | 'purchases' | 'sales'>('all');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [salesTxs, setSalesTxs] = useState<Transaction[]>([]);

  useEffect(() => {
    // Load purchases (outgoing)
    const txs: Transaction[] = JSON.parse(localStorage.getItem('transactions') || '[]');
    setTransactions(txs);

    // Build sales from purchases array against my listing
    const listing = localStorage.getItem('patientListing');
    if (listing) {
      try {
        const l = JSON.parse(listing);
        const purchases: any[] = JSON.parse(localStorage.getItem('purchases') || '[]');
        const myPurchases = purchases.filter(p => p.anonId === l.anonId);
        const sales: Transaction[] = myPurchases.map(p => ({
          txId: (p.txHash || '').slice(0, 16),
          from: 'Researcher (anonymous)',
          to: l.anonId + ' (you)',
          amount: p.price + ' tNight',
          timestamp: new Date(p.timestamp).toISOString(),
          status: 'Confirmed',
          network: 'Midnight Preprod',
          type: 'DATA_SALE'
        }));
        setSalesTxs(sales);
      } catch { /* ignore */ }
    }
  }, []);

  const allTxs = [...transactions.map(t => ({ ...t, _kind: 'purchase' as const })), ...salesTxs.map(t => ({ ...t, _kind: 'sale' as const }))]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const displayed = filter === 'all' ? allTxs : filter === 'purchases' ? allTxs.filter(t => t._kind === 'purchase') : allTxs.filter(t => t._kind === 'sale');

  const totalSpent = transactions.reduce((sum, t) => sum + parseFloat(t.amount) || 0, 0);
  const totalEarned = salesTxs.reduce((sum, t) => sum + parseFloat(t.amount) || 0, 0);

  const exportCSV = () => {
    const header = 'Transaction ID,Type,Amount,From,To,Timestamp,Status,Network\n';
    const rows = displayed.map(t =>
      `"${t.txId}","${t.type}","${t.amount}","${t.from}","${t.to}","${t.timestamp}","${t.status}","${t.network}"`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solaceid-transactions-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Navbar />
      <div style={{ background: 'transparent', minHeight: '100vh', color: 'var(--text)', paddingTop: '140px', paddingBottom: '60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.5rem', margin: 0 }}>Transaction History</h1>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem' }}>All marketplace transactions on Midnight Preprod</p>
            </div>
            <button onClick={exportCSV} className='button-secondary' style={{ alignSelf: 'flex-start' }}>Export CSV</button>
          </div>

          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div className='panel-card' style={{ borderColor: 'rgba(239, 68, 68, 0.18)' }}>
              <p style={{ margin: '0 0 0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Spent</p>
              <p style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#ef4444' }}>{totalSpent} tNight</p>
            </div>
            <div className='panel-card' style={{ borderColor: 'rgba(16, 185, 129, 0.18)' }}>
              <p style={{ margin: '0 0 0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Earned</p>
              <p style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#10b981' }}>{totalEarned} tNight</p>
            </div>
            <div className='panel-card' style={{ borderColor: 'rgba(6, 182, 212, 0.18)' }}>
              <p style={{ margin: '0 0 0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Net Balance</p>
              <p style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#06b6d4' }}>{totalEarned - totalSpent >= 0 ? '+' : ''}{totalEarned - totalSpent} tNight</p>
            </div>
            <div className='panel-card' style={{ borderColor: 'rgba(124, 58, 237, 0.18)' }}>
              <p style={{ margin: '0 0 0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Transactions</p>
              <p style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700 }}>{allTxs.length}</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', width: 'fit-content' }}>
            {([['all', 'All'], ['purchases', 'Purchases'], ['sales', 'Sales']] as const).map(([val, label]) => (
              <button key={val} onClick={() => setFilter(val)} style={{
                padding: '0.65rem 1.5rem',
                border: 'none',
                background: filter === val ? '#7c3aed' : 'var(--surface-3)',
                color: filter === val ? '#fff' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                {label}
              </button>
            ))}
          </div>

          {/* Transaction Table */}
          <div className='surface-card' style={{ padding: '0', borderColor: 'rgba(124, 58, 237, 0.14)', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.5fr 1.2fr 0.8fr', gap: '1rem', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
              <span>Tx ID</span>
              <span>Type</span>
              <span>Amount</span>
              <span>Counterparty</span>
              <span>Timestamp</span>
              <span>Status</span>
            </div>

            {displayed.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No transactions found. Make a purchase on the marketplace to get started.
              </div>
            ) : (
              displayed.map((tx, i) => {
                const isSale = tx._kind === 'sale';
                return (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.5fr 1.2fr 0.8fr', gap: '1rem', padding: '1rem 1.5rem', borderBottom: i < displayed.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', alignItems: 'center', transition: 'background 0.15s' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-muted)' }}>{tx.txId}</span>
                    <span>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 600, background: isSale ? 'rgba(16, 185, 129, 0.12)' : 'rgba(124, 58, 237, 0.12)', color: isSale ? '#10b981' : '#7c3aed', border: `1px solid ${isSale ? 'rgba(16, 185, 129, 0.3)' : 'rgba(124, 58, 237, 0.3)'}` }}>
                        {isSale ? 'SALE' : 'PURCHASE'}
                      </span>
                    </span>
                    <span style={{ fontWeight: 700, color: isSale ? '#10b981' : '#ef4444' }}>
                      {isSale ? '+' : '-'}{tx.amount}
                    </span>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{isSale ? tx.from : tx.to}</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{new Date(tx.timestamp).toLocaleString()}</span>
                    <span style={{ padding: '0.2rem 0.5rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 600, background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
                      {tx.status}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionHistory;
