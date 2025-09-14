// hooks/useCoinStore.ts
import { create } from "zustand";
import { fetchSelectedCoins } from "@/lib/coingecko";
import type { CoinMarket } from "@/types/types";

const DEFAULT_COINS = ["bitcoin", "ethereum", "polkadot", "binancecoin"];

interface CoinStore {
  selectedCoins: string[];
  coinData: CoinMarket[];
  setSelectedCoins: (coins: string[]) => void;
  fetchCoins: () => Promise<void>;
}

export const useCoinStore = create<CoinStore>((set, get) => {
  const savedCoins = localStorage.getItem("selectedCoins");
  const initialCoins = savedCoins ? JSON.parse(savedCoins) : DEFAULT_COINS;

  return {
    selectedCoins: initialCoins,
    coinData: [],
    setSelectedCoins: (coins: string[]) => {
      localStorage.setItem("selectedCoins", JSON.stringify(coins));
      set({ selectedCoins: coins });
      get().fetchCoins(); // Fetch new data whenever coins change
    },
    fetchCoins: async () => {
      const coins = get().selectedCoins;
      if (!coins.length) return;
      const data = await fetchSelectedCoins(coins);
      set({ coinData: data });
    },
  };
});
