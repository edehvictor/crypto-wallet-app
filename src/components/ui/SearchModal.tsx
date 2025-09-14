import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { fetchCoinList } from "@/lib/coingecko";
import { useCoinStore } from "@/hooks/useCoinStore";
import type { CoinList } from "@/types/types";

type SearchCryptoModalProps = {
  isOpen: boolean;
  onClose: (open: boolean) => void;
};

const SearchCryptoModal = ({ isOpen, onClose }: SearchCryptoModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [coinList, setCoinList] = useState<CoinList[]>([]);
  const { selectedCoins, setSelectedCoins } = useCoinStore();

  useEffect(() => {
    const loadCoins = async () => {
      const data = await fetchCoinList();
      setCoinList(data);
    };
    loadCoins();
  }, []);

  const toggleCoin = (id: string) => {
    if (selectedCoins.includes(id)) {
      setSelectedCoins(selectedCoins.filter((coin) => coin !== id));
    } else {
      setSelectedCoins([...selectedCoins, id]); // Appends new coin
    }
  };

  const filteredTokens = coinList.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTokens = [...filteredTokens].sort((a, b) => {
    const aSelected = selectedCoins.includes(a.id);
    const bSelected = selectedCoins.includes(b.id);

    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    return 0;
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#181818] border-gray-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">
            Search Cryptocurrencies
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Select or remove coins from your list.
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Search for coins..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#212121] border-gray-800 text-white placeholder:text-gray-400"
        />

        <div className="max-h-64 overflow-y-auto space-y-2 mt-3">
          {sortedTokens.slice(0, 50).map((token) => (
            <div
              key={token.id}
              className="flex items-center justify-between p-3 hover:bg-[#303030] rounded-lg"
            >
              <div>
                <p className="text-white font-medium">
                  {token.symbol.toUpperCase()}
                </p>
                <p className="text-gray-400 text-sm">{token.name}</p>
              </div>

              <Switch
                checked={selectedCoins.includes(token.id)}
                onCheckedChange={() => toggleCoin(token.id)}
                className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-[#303030]"
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchCryptoModal;
