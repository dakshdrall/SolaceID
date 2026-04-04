# SolaceID — Prove your health, not your history.

🌐 **Live Demo:** https://solace-id.vercel.app/
📦 **Track:** Healthcare — Midnight Network Hackathon 2026
💰 **Prize Pool:** $1,200

## Overview
SolaceID is a privacy-preserving patient identity and health record exchange product built natively on Midnight Network. Patients generate a ZK-Patient ID — a cryptographic commitment stored on Midnight's blockchain — and can prove eligibility at any hospital without exposing their full medical history. When records need to be transferred between hospitals, patients sign a consent transaction on-chain, and the exchange is verified with a zero-knowledge proof receipt. Raw medical data never touches the blockchain.

## Problem
- Cross-hospital EHR data is siloed, paper-based, and insecure
- Patients have zero control over who sees their medical history  
- Every hospital visit requires sharing your entire medical record
- No cryptographic proof of consent exists in current systems

## Solution
SolaceID solves this with a two-layer ZK system:

**Layer 1 — ZK-Patient ID**
Patient generates a cryptographic identity commitment on Midnight. They can prove eligibility (blood type, vaccination status, allergies) without revealing their full EHR.

**Layer 2 — Confidential EHR Exchange**
Hospital-to-hospital record transfer with ZK proof receipt. Only hashes and proofs go on-chain. Raw data never leaves the patient's control.

**Layer 3 — Patient-Controlled Consent**
Every exchange requires a patient-signed on-chain consent transaction with selective field disclosure. Patients choose exactly what to share.

## Why Only Midnight Network
Midnight's public/private state separation makes this impossible on any other chain:
- Ethereum: no native shielded computation
- Solana: no private state
- Cardano: no ZK proof verification built in
- Midnight: all three are native primitives

## Smart Contracts (Compact 0.28.0)

### identity.compact
Stores patient identity commitment using persistentHash of (patientId + ehrRoot + salt).
Circuits: commitIdentity, verifyIdentity

### consent.compact  
Manages patient consent for specific hospital-to-hospital exchanges.
Circuits: grantConsent, checkConsent, revokeConsent

### exchange.compact
Records and verifies EHR exchange receipts with ZK proofs.
Circuits: recordExchange, verifyExchange, getReceipt

## Product Pages
| Page | Route | Description |
|------|-------|-------------|
| Landing | / | Product overview and onboarding |
| Patient Portal | /wallet | Generate ZK identity commitment |
| Consent | /consent | Sign cryptographic consent on-chain |
| Dashboard | /dashboard | Manage identities, consents, QR code |
| Hospital Dashboard | /hospital | Verify patient records with ZK proof |

## Tech Stack
- **Blockchain:** Midnight Network (Preprod)
- **Smart Contracts:** Compact 0.28.0
- **Frontend:** React + TypeScript + Vite
- **Routing:** React Router DOM
- **QR Identity:** qrcode.react
- **Deployment:** Vercel

## Demo Flow
1. Patient visits /wallet → fills health profile → clicks "Generate ZK Identity"
2. Commitment hash generated and stored on Midnight blockchain
3. Patient visits /consent → selects fields to share → clicks "Sign Consent on Midnight"
4. Consent transaction recorded on-chain with transaction hash
5. Patient visits /dashboard → sees QR code → shares with hospital
6. Hospital visits /hospital → enters patient hash → clicks "Verify on Midnight"
7. ZK Proof Verified — health record displayed, audit trail shown

## Setup & Run
npm install
npm run dev

Open http://localhost:5173

## Security Model
- No raw medical data ever stored on-chain
- Only cryptographic hashes and ZK proofs on Midnight public state
- Patient consent is cryptographically enforced, not just policy
- Consent can be revoked at any time by the patient

## Roadmap (Post-Hackathon)
- Full Lace wallet integration with real on-chain transactions
- Cross-border emergency access protocol
- Insurance eligibility ZK proofs
- Clinical trial enrollment with selective disclosure
- Mobile app for patients

## Team
Built for Midnight Network Hackathon 2026 — Healthcare Track
