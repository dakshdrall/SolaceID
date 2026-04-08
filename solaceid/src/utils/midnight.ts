export interface MidnightWalletAPI {
  getUnshieldedAddress: () => Promise<{ unshieldedAddress: string }>;
  getShieldedAddresses: () => Promise<string[]>;
  signData: (data: Uint8Array) => Promise<{ signature: string; publicKey: string }>;
  submitTransaction: (tx: any) => Promise<{ txHash: string }>;
  getTxHistory: () => Promise<any[]>;
  getUnshieldedBalances: () => Promise<any>;
  getConfiguration: () => Promise<any>;
}

export const getMidnightWallet = async (): Promise<MidnightWalletAPI | null> => {
  const midnight = (window as any).midnight;
  if (!midnight) return null;
  const walletKey = Object.keys(midnight)[0];
  if (!walletKey) return null;
  const walletApi = midnight[walletKey];
  return await walletApi.connect('preprod');
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
