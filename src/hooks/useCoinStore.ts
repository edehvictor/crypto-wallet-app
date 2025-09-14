import { create } from "zustand";

const DEFAULT_COINS = ["bitcoin", "ethereum", "polkadot", "binancecoin"];

interface CoinStore {
  selectedCoins: string[];
  setSelectedCoins: (coins: string[]) => void;
}

export const useCoinStore = create<CoinStore>((set) => {
  const savedCoins = localStorage.getItem("selectedCoins");
  const initialCoins = savedCoins ? JSON.parse(savedCoins) : DEFAULT_COINS;

  return {
    selectedCoins: initialCoins,
    setSelectedCoins: (coins: string[]) => {
      localStorage.setItem("selectedCoins", JSON.stringify(coins));
      set({ selectedCoins: coins });
    },
  };
});
