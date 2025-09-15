import type { NFT } from "@/pages/WalletDashboard";
import type { Account, CryptoToken, Network } from "@/types/types";
export const navItems = [
  { name: "Features", href: "/#features" },
  { name: "Staking", href: "/#staking" },
  { name: "Reviews", href: "/#reviews" },
];

export const cryptoTokens: CryptoToken[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    icon: "₿",
    price: 111434.21,
    change: 0.54,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: "⧫",
    price: 4290.68,
    change: 0.07,
  },
  {
    symbol: "BNB",
    name: "BNB",
    icon: "🔶",
    price: 874.27,
    change: -1.07,
  },
  {
    symbol: "ADA",
    name: "Cardano",
    icon: "◉",
    price: 1.23,
    change: 2.15,
  },
  {
    symbol: "SOL",
    name: "Solana",
    icon: "◎",
    price: 234.56,
    change: -0.45,
  },
  {
    symbol: "DOT",
    name: "Polkadot",
    icon: "●",
    price: 12.34,
    change: 1.25,
  },
];

export const accounts: Account[] = [
  {
    id: "1",
    name: "Account 1",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    balance: 0.0,
  },
  {
    id: "2",
    name: "Account 2",
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    balance: 1.25,
  },
  {
    id: "3",
    name: "Trading Account",
    address: "0x9876543210fedcba9876543210fedcba98765432",
    balance: 5.67,
  },
];

export const networks: Network[] = [
  {
    id: "ethereum",
    name: "Ethereum Mainnet",
    chainId: 1,
    icon: "⧫",
    color: "#627EEA",
  },
  {
    id: "bsc",
    name: "BNB Smart Chain",
    chainId: 56,
    icon: "🔶",
    color: "#F3BA2F",
  },
  {
    id: "polygon",
    name: "Polygon",
    chainId: 137,
    icon: "⬟",
    color: "#8247E5",
  },
  {
    id: "arbitrum",
    name: "Arbitrum One",
    chainId: 42161,
    icon: "🔵",
    color: "#28A0F0",
  },
  {
    id: "optimism",
    name: "Optimism",
    chainId: 10,
    icon: "🔴",
    color: "#FF0420",
  },
];

export const nftCollections: NFT[] = [
  {
    id: "1",
    name: "Cool Cat #1234",
    collection: "Cool Cats NFT",
    image: "🐱",
    value: 2.5,
    rarity: "Rare",
  },
  {
    id: "2",
    name: "Bored Ape #5678",
    collection: "Bored Ape Yacht Club",
    image: "🐵",
    value: 15.2,
    rarity: "Legendary",
  },
  {
    id: "3",
    name: "Punk #9999",
    collection: "CryptoPunks",
    image: "🎭",
    value: 45.8,
    rarity: "Epic",
  },
];
