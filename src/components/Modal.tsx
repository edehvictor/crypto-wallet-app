import { useEffect, useState } from "react";
import { ArrowDownUp, ArrowLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

interface Token {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  image: string;
}

export default function SwapPage() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selecting, setSelecting] = useState<"from" | "to" | null>(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("swap");
  const navigate = useNavigate();

  // Assume this is the user's balance (you can replace with real data)
  const fromTokenBalance = 1000; // Example: user has 1000 units

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
        );
        const data = await res.json();
        setTokens(data);
        setFromToken(data[0]);
        setToToken(data[1]);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    }
    fetchCoins();
  }, []);

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const handleSelect = (token: Token) => {
    if (selecting === "from") setFromToken(token);
    if (selecting === "to") setToToken(token);
    setIsDialogOpen(false);
  };

  // Function to set amount based on percentage
  const handleSetPercentage = (percent: number) => {
    const newAmount = (fromTokenBalance * percent) / 100;
    setAmount(newAmount);
  };

  const filteredTokens = tokens.filter(
    (t) =>
      t.symbol.toLowerCase().includes(search.toLowerCase()) ||
      t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full max-w-2xl pb-12 mx-auto text-white p-6 space-y-6 flex flex-col items-center overflow-y-scroll h-screen">
      {/* Header */}
      <div className="flex items-center justify-between w-full p-4 border-b border-[#2E2E2E] bg-[#1A1A1A] rounded-lg">
        <ArrowLeft
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-2xl font-bold">Swap</h2>
        <div className="w-6 h-6" />
      </div>

      {/* Tabs */}
      <div className="flex justify-between items-center w-full max-w-2xl mb-6">
        <div className="flex gap-6 text-gray-400">
          <button
            onClick={() => setActiveTab("swap")}
            className={`pb-1 ${
              activeTab === "swap"
                ? "border-b-2 border-[#70FF00] cursor-pointer text-white"
                : "hover:text-gray-100"
            }`}
          >
            Swap
          </button>
          <button
            onClick={() => setActiveTab("hot")}
            className={`pb-1 ${
              activeTab === "hot"
                ? "border-b-2 border-[#70FF00] cursor-pointer text-white"
                : "hover:text-gray-100"
            }`}
          >
            Hot Tokens
          </button>
        </div>
        <Settings className="w-5 h-5 cursor-pointer" />
      </div>

      {/* Tab Content */}
      {activeTab === "swap" && (
        <Card className="bg-[#1E1E1E] rounded-2xl p-4 w-full border-0 max-w-2xl space-y-3">
          {/* From */}
          <div className="bg-[#2A2A2A] rounded-xl p-3 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-[1rem]">From</p>
                <button
                  onClick={() => {
                    setIsDialogOpen(true);
                    setSelecting("from");
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {fromToken?.image && (
                    <img
                      src={fromToken.image}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div className="font-semibold text-start text-white capitalize flex flex-col">
                    <span>{fromToken?.symbol}</span>
                    <span className="text-slate-300">{fromToken?.name}</span>
                  </div>
                </button>
              </div>
              <div className="text-right">
                <Input
                  type="number"
                  placeholder="0"
                  className="bg-transparent text-right text-white outline-none text-lg w-24"
                  value={amount || ""}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
                <p className="text-xs text-slate-300 mt-2">
                  Balance: {fromTokenBalance}
                </p>
              </div>
            </div>

            {/* Percentage Buttons */}
            <div className="flex gap-2 mt-2">
              {[25, 50, 100].map((p) => (
                <Button
                  key={p}
                  onClick={() => handleSetPercentage(p)}
                  className="bg-[#303030] text-white hover:bg-[#3A3A3A] text-xs"
                >
                  {p === 100 ? "Max" : `${p}%`}
                </Button>
              ))}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-2">
            <button
              onClick={handleSwap}
              className="bg-[#303030] cursor-pointer p-2 rounded-full hover:bg-[#3A3A3A]"
            >
              <ArrowDownUp className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* To */}
          <div className="bg-[#2A2A2A] rounded-xl p-3 flex justify-between items-center">
            <div>
              <p className="text-slate-400 text-[1rem]">To</p>
              <button
                onClick={() => {
                  setIsDialogOpen(true);
                  setSelecting("to");
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                {toToken?.image && (
                  <img
                    src={toToken.image}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div className="font-semibold text-start text-white capitalize flex flex-col">
                  <span>{toToken?.symbol}</span>
                  <span className="text-slate-300">{toToken?.name}</span>
                </div>
              </button>
            </div>
            <div className="text-right">
              <Input
                type="text"
                value={
                  amount && fromToken && toToken
                    ? (
                        (amount * fromToken.current_price) /
                        toToken.current_price
                      ).toFixed(4)
                    : ""
                }
                placeholder="0"
                className="bg-transparent text-right text-white outline-none text-lg w-24"
                readOnly
              />
              <p className="text-xs text-gray-300 mt-3">
                ${toToken?.current_price?.toLocaleString() || "0.00"}
              </p>
            </div>
          </div>

          {/* Swap Action */}
          <Button className="w-full hover:text-gray-900 hover:bg-accent bg-[#70FF00] cursor-pointer text-black font-bold mt-2">
            Swap
          </Button>
        </Card>
      )}

      {/* Hot Tokens Tab */}
      {activeTab === "hot" && (
        <Card className="bg-[#1E1E1E] border-0 rounded-2xl p-4 w-full max-w-2xl mb-32 space-y-3">
          <h3 className="text-xl font-bold mb-4 text-white"> Hot Tokens</h3>
          {tokens.slice(0, 5).map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between p-2 border-b border-[#333]"
            >
              <div className="flex items-center gap-2">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-6 h-6 rounded-full"
                />
                <div>
                  <p className="font-semibold capitalize text-gray-200">
                    {t.symbol}
                  </p>
                  <p className="text-xs text-gray-400">{t.name}</p>
                </div>
              </div>
              <p className="font-semibold text-slate-100">
                ${t.current_price.toLocaleString()}
              </p>
            </div>
          ))}
        </Card>
      )}

      {/* Token Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#1E1E1E] text-white max-w-sm w-full">
          <Input
            placeholder="Search token"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3 bg-[#2A2A2A] border-none text-sm"
          />
          <ScrollArea className="h-60">
            {filteredTokens.map((t) => (
              <div
                key={t.id}
                onClick={() => handleSelect(t)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#2A2A2A] cursor-pointer"
              >
                {t.image && (
                  <img src={t.image} className="w-6 h-6 rounded-full" />
                )}
                <div>
                  <p className="font-semibold">{t.symbol}</p>
                  <p className="text-xs text-gray-400">{t.name}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
