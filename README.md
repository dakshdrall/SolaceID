🌐 Live Demo: https://solace-id.vercel.app/
# SolaceID — Prove your health, not your history.

## Overview
SolaceID is a privacy-preserving patient identity and health record exchange product built natively on Midnight Network. Patients generate a ZK-Patient ID — a cryptographic commitment of their identity stored on Midnight's blockchain — and can prove eligibility at any hospital without exposing their full medical history. When records need to be transferred between hospitals, patients sign a consent transaction on-chain, and the exchange is verified with a zero-knowledge proof receipt — all without raw medical data ever touching the blockchain.

## Problem
Cross-hospital EHR data exchange is broken — paper-based, insecure, and patient data is shared without consent. Patients have zero control over who sees their medical history.

## Solution
Two-layer ZK system on Midnight Network:
1. ZK-Patient ID: Patient generates identity commitment on-chain. Proves eligibility without revealing full EHR.
2. Confidential EHR Exchange: Hospital-to-hospital record transfer with ZK proof receipt. Only hashes on-chain, never raw data.

## Why Midnight Network
Midnight's public/private state separation makes this impossible on any other chain. The blockchain holds only proofs and hashes — never medical data.

## Tech Stack
- Midnight Network (Preprod)
- Compact 0.28.0 (smart contracts)
- midnight-js 3.0.0
- React + TypeScript + Vite
- React Router DOM

## Smart Contracts
- identity.compact — Patient identity commitment
- consent.compact — Patient consent management
- exchange.compact — EHR exchange receipt verification

## Demo Flow
1. Patient onboards at /wallet — generates ZK identity
2. Patient signs consent at /consent — authorises specific hospital exchange
3. Hospital verifies at /hospital — ZK proof verified, health record displayed

## Setup
npm install
npm run dev

## Hackathon Track
Healthcare — Midnight Network Hackathon 2026
Prize Pool: $1,200
