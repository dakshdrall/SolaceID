import Navbar from '../components/Navbar';

function ContractsPage() {
  const highlightCode = (code: string) => {
    return code
      .replace(/\b(export|circuit|ledger|witness|import|pragma|language_version)\b/g, '<span style="color: #7c3aed">$1</span>')
      .replace(/\b(Field|Boolean|Cell|Map|Option|List)\b/g, '<span style="color: #06b6d4">$1</span>')
      .replace(/\b(commitIdentity|verifyIdentity|grantConsent|checkConsent|revokeConsent|recordExchange|verifyExchange|getReceipt|persistentHash|unwrap_or|contains_key|values|find|set|get)\b/g, '<span style="color: #e2e8f0">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span style="color: #94a3b8">$1</span>');
  };

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      alert('Contract code copied to clipboard!');
    } catch (err) {
      console.error('Copy failed', err);
      alert('Failed to copy code');
    }
  };

  const contracts = [
    {
      name: 'identity.compact',
      code: `pragma compact 0.28.0;
language_version >= 0.14.0;

import CompactStandardLibrary;

ledger state {
  identityCommitment: Cell<Field>,
  isVerified: Cell<Boolean>
}

witness functions {
  commitIdentity(data: Field) -> Field {
    let commitment = persistentHash(data);
    identityCommitment.set(commitment);
    return commitment;
  }

  verifyIdentity(proof: Field, data: Field) -> Boolean {
    let commitment = persistentHash(data);
    let verified = commitment == proof;
    isVerified.set(verified);
    return verified;
  }
}

export circuits {
  commitIdentity,
  verifyIdentity
}`,
      circuits: [
        { name: 'commitIdentity', description: 'Stores ZK commitment of patient identity data' },
        { name: 'verifyIdentity', description: 'Checks if provided proof matches stored commitment' }
      ]
    },
    {
      name: 'consent.compact',
      code: `pragma compact 0.28.0;
language_version >= 0.14.0;

import CompactStandardLibrary;

ledger state {
  consents: Cell<Map<Field, Boolean>>
}

witness functions {
  grantConsent(patientHash: Field, fields: List<Field>) -> Field {
    let consentId = persistentHash(patientHash + fields);
    consents.get().set(consentId, true);
    return consentId;
  }

  checkConsent(consentId: Field) -> Boolean {
    return consents.get().get(consentId).unwrap_or(false);
  }

  revokeConsent(consentId: Field) -> Boolean {
    consents.get().set(consentId, false);
    return true;
  }
}

export circuits {
  grantConsent,
  checkConsent,
  revokeConsent
}`,
      circuits: [
        { name: 'grantConsent', description: 'Records patient consent for specific data fields' },
        { name: 'checkConsent', description: 'Verifies if a consent exists and is active' },
        { name: 'revokeConsent', description: 'Cancels a previously granted consent' }
      ]
    },
    {
      name: 'exchange.compact',
      code: `pragma compact 0.28.0;
language_version >= 0.14.0;

import CompactStandardLibrary;

ledger state {
  exchanges: Cell<Map<Field, Field>>
}

witness functions {
  recordExchange(patientHash: Field, hospital: Field, purpose: Field) -> Field {
    let receipt = persistentHash(patientHash + hospital + purpose);
    exchanges.get().set(receipt, patientHash);
    return receipt;
  }

  verifyExchange(receipt: Field) -> Boolean {
    return exchanges.get().contains_key(receipt);
  }

  getReceipt(patientHash: Field) -> Option<Field> {
    // Simplified, in real would search or use index
    return exchanges.get().values().find(|v| v == patientHash);
  }
}

export circuits {
  recordExchange,
  verifyExchange,
  getReceipt
}`,
      circuits: [
        { name: 'recordExchange', description: 'Stores receipt of data exchange between patient and hospital' },
        { name: 'verifyExchange', description: 'Confirms a data exchange receipt is valid' },
        { name: 'getReceipt', description: 'Retrieves receipt hash for a patient\'s exchange' }
      ]
    }
  ];

  return (
    <>
    <Navbar />
    <div style={{ backgroundColor: '#0a0f1e', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', paddingTop: "120px" }}>
      <div style={{ padding: '40px 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '3rem',
            background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0'
          }}>
            Smart Contracts
          </h1>
          <p style={{ fontSize: '18px', color: '#ccc', marginTop: '10px' }}>Deployed on Midnight Network Preprod</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
          {contracts.map((contract) => (
            <div key={contract.name} style={{
              background: '#11182e',
              border: '1px solid #444a70',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.15)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: '0', color: '#7c3aed', fontSize: '1.2rem' }}>{contract.name}</h3>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button
                    onClick={() => copyToClipboard(contract.code)}
                    style={{
                      background: '#06b6d4',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    Copy Code
                  </button>
                  <span style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    Preprod
                  </span>
                </div>
              </div>

              <div style={{
                background: '#0a0f1e',
                border: '1px solid #444a70',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                whiteSpace: 'pre-wrap',
                maxHeight: '200px',
                overflowY: 'auto'
              }}
              dangerouslySetInnerHTML={{ __html: highlightCode(contract.code) }}
              ></div>

              <div>
                <h4 style={{ margin: '0 0 10px', color: '#06b6d4', fontSize: '1rem' }}>Circuits</h4>
                {contract.circuits.map((circuit, index) => (
                  <div key={index} style={{ marginBottom: '8px', padding: '8px', background: 'rgba(124, 58, 237, 0.05)', borderRadius: '6px' }}>
                    <div style={{ fontFamily: 'monospace', color: '#7c3aed', fontWeight: 'bold', fontSize: '0.9rem' }}>
                      {circuit.name}
                    </div>
                    <div style={{ color: '#ccc', fontSize: '0.85rem', marginTop: '2px' }}>
                      {circuit.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
  );
}

export default ContractsPage;