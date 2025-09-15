// hooks/useCoinStore.ts
import { create } from "zustand";
import { fetchSelectedCoins } from "@/lib/coingecko";
import type { CoinMarket } from "@/types/types";

const DEFAULT_COINS = ["bitcoin", "ethereum", "polkadot", "binancecoin"];
let fetchTimeout: NodeJS.Timeout;

interface CoinStore {
  selectedCoins: string[];
  coinData: CoinMarket[];
  setSelectedCoins: (coins: string[]) => void;
  fetchCoins: () => Promise<void>;
  initializeCoins: () => void;
}

export const useCoinStore = create<CoinStore>((set, get) => ({
  selectedCoins: [],
  coinData: [],

  initializeCoins: () => {
    const savedCoins = localStorage.getItem("selectedCoins");
    const initialCoins = savedCoins ? JSON.parse(savedCoins) : DEFAULT_COINS;
    set({ selectedCoins: initialCoins });
    // After setting initial coins, immediately fetch their data
    get().fetchCoins();
  },

  setSelectedCoins: (coins: string[]) => {
    localStorage.setItem("selectedCoins", JSON.stringify(coins));
    set({ selectedCoins: coins });

    clearTimeout(fetchTimeout);
    fetchTimeout = setTimeout(() => {
      get().fetchCoins();
    }, 500);
  },

  fetchCoins: async () => {
    const coins = get().selectedCoins;
    if (!coins.length) {
      set({ coinData: [] });
      return;
    }
    try {
      const data = await fetchSelectedCoins(coins);
      set({ coinData: data });
    } catch (error) {
      console.error("Error fetching selected coin data:", error);
      set({ coinData: [] });
    }
  },
}));
