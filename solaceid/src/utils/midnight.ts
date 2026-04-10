export interface MidnightWalletAPI {
  getUnshieldedAddress: () => Promise<{ unshieldedAddress: string }>;
  getShieldedAddresses: () => Promise<string[]>;
  signData: (data: Uint8Array) => Promise<{ signature: string; publicKey: string }>;
  submitTransaction: (tx: any) => Promise<{ txHash: string }>;
  getTxHistory: () => Promise<any[]>;
  getUnshieldedBalances: () => Promise<any>;
  getConfiguration: () => Promise<any>;
}

export const getMidnightWallet = async (): Promise<MidnightWalletAPI> => {
  const midnight = (window as any).midnight;
  if (!midnight) throw new Error('Midnight wallet not found. Install Lace wallet.');
  const walletKey = Object.keys(midnight)[0];
  if (!walletKey) throw new Error('No Midnight-compatible wallet available.');
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
  if (!connectedApi) throw new Error('Failed to connect to Midnight wallet on preprod.');
  return connectedApi;
};

export const isWalletConnected = async (): Promise<boolean> => {
  try {
    await getMidnightWallet();
    return true;
  } catch {
    return false;
  }
};

export const signAction = async (
  actionType: string,
  payload: object
): Promise<{ txHash: string; signature: string; timestamp: string }> => {
  const wallet = await getMidnightWallet();
  const timestamp = new Date().toISOString();
  const data = JSON.stringify({ actionType, payload, timestamp, network: 'midnight-preprod' });
  const encoded = new TextEncoder().encode(data);
  const result = await wallet.signData(encoded);
  const txHash = btoa(result.signature).slice(0, 64);
  return { txHash, signature: result.signature, timestamp };
};

const formatBalanceValue = (raw: any): string => {
  if (raw === null || raw === undefined) return '0.000000 tDUST';
  if (typeof raw === 'number') return (raw / 1_000_000).toFixed(6) + ' tDUST';
  if (typeof raw === 'string') {
    const n = Number(raw);
    return isNaN(n) ? raw : (n / 1_000_000).toFixed(6) + ' tDUST';
  }
  if (typeof raw === 'object') {
    const key = Object.keys(raw).find(k => k.toLowerCase().includes('dust'));
    const val = key ? raw[key] : Object.values(raw)[0];
    if (typeof val === 'number') return (val / 1_000_000).toFixed(6) + ' tDUST';
    if (typeof val === 'string') {
      const n = Number(val);
      return isNaN(n) ? String(val) : (n / 1_000_000).toFixed(6) + ' tDUST';
    }
  }
  return '0.000000 tDUST';
};

export const getWalletBalance = async (): Promise<string> => {
  const wallet = await getMidnightWallet();
  const raw = await wallet.getUnshieldedBalances();
  return formatBalanceValue(raw);
};

export const signIdentityData = async (
  patientId: string,
  ehrData: object,
  salt: string
): Promise<{ hash: string; signature: string } | null> => {
  try {
    const wallet = await getMidnightWallet();
    if (!wallet) return null;

    const payload = JSON.stringify({ patientId, ehrData, salt, network: 'midnight-preprod' });
    const encoded = new TextEncoder().encode(payload);
    const result = await wallet.signData(encoded);

    // Deterministic commitment hash derived from signature
    const sigBytes = new TextEncoder().encode(result.signature + patientId);
    const hash = '0x' + Array.from(sigBytes)
      .slice(0, 32)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return { hash, signature: result.signature };
  } catch (err) {
    console.error('Identity sign error:', err);
    return null;
  }
};

export const signConsentData = async (
  patientHash: string,
  hospital: string,
  fields: string[],
  timestamp: string
): Promise<{ signature: string; txHash: string } | null> => {
  try {
    const wallet = await getMidnightWallet();
    if (!wallet) return null;

    const payload = JSON.stringify({
      patientHash,
      hospital,
      fields,
      timestamp,
      network: 'midnight-preprod',
    });

    const encoded = new TextEncoder().encode(payload);
    const result = await wallet.signData(encoded);

    // Deterministic tx hash derived from signature
    const sigBytes = new TextEncoder().encode(result.signature);
    const txHash = '0x' + Array.from(sigBytes)
      .slice(0, 32)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return { signature: result.signature, txHash };
  } catch (err) {
    console.error('Consent sign error:', err);
    return null;
  }
};

export const getWalletBalances = async (): Promise<any | null> => {
  try {
    const wallet = await getMidnightWallet();
    if (!wallet) return null;
    return await wallet.getUnshieldedBalances();
  } catch (err) {
    console.error('Balance fetch error:', err);
    return null;
  }
};

export const getWalletTxHistory = async (): Promise<any[] | null> => {
  try {
    const wallet = await getMidnightWallet();
    if (!wallet) return null;
    return await wallet.getTxHistory();
  } catch (err) {
    console.error('Tx history error:', err);
    return null;
  }
};
