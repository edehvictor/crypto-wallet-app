import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SearchCryptoModal from "@/components/ui/SearchModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { nftCollections } from "@/constants/Dummy";
import { useCoinStore } from "@/hooks/useCoinStore";
// import type { CoinMarket } from "@/types/types";
import { ChevronRight, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CryptoAssets = () => {
  const [activeTab, setActiveTab] = useState<"crypto" | "nfts">("crypto");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { coinData, initializeCoins } = useCoinStore();

  const navigate = useNavigate();

  const balance = 0;
  const value = 0.0;

  const formatBalance = (balance: number): string => {
    if (balance >= 1) return balance.toFixed(2);
    return balance.toFixed(2);
  };

  useEffect(() => {
    initializeCoins();
  }, [initializeCoins]);

  return (
    <div className="w-full">
      <div className="max-w-2xl mx-auto">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "crypto" | "nfts")}
          className="w-full "
        >
          <TabsList className="grid w-full grid-cols-2 bg-[# 303030] mb-5 border-gray-100">
            <TabsTrigger
              value="crypto"
              className="data-[state=active]:border-[#70FF00] cursor-pointer data-[state=active]:border-b-1 data-[state=active]:text-slate-100 text-slate-300"
            >
              Crypto Assets
            </TabsTrigger>
            <TabsTrigger
              value="nfts"
              className="data-[state=active]:border-[#70FF00] cursor-pointer data-[state=active]:border-b-1 data-[state=active]:text-slate-100 text-slate-300"
            >
              NFT Collection
            </TabsTrigger>
          </TabsList>

          {/* Crypto Assets Tab */}
          <TabsContent value="crypto" className="mt-4 space-y-3 px-4">
            <div className="space-y-3 pb-32">
              <div className="mt-4 space-y-3 px-4 max-w-2xl mx-auto">
                {coinData.length === 0 && (
                  <p className="text-gray-400">No coin selected.</p>
                )}
              </div>
              {coinData.map((coin) => (
                <Card
                  key={coin.id}
                  className="bg-gray-800 border-gray-700 cursor-pointer"
                  onClick={() => navigate(`/coin/${coin.id}`)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-white">
                            {coin.symbol.toUpperCase()}
                          </span>
                          <Badge className="bg-gray-700 text-gray-300">
                            {coin.name}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm mt-1">
                          <span className="text-gray-400">
                            ${coin.current_price}
                          </span>
                          <div className="flex items-center space-x-1">
                            {coin.price_change_percentage_24h >= 0 ? (
                              <TrendingUp className="w-3 h-3 text-green-400" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-red-400" />
                            )}
                            <span
                              className={`text-xs ${
                                coin.price_change_percentage_24h >= 0
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {coin.price_change_percentage_24h?.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-row items-center space-x- ">
                      <div>
                        <div className="text-white font-semibold">
                          {formatBalance(balance)}
                        </div>
                        <div className="text-gray-400 text-sm">
                          $ {value.toLocaleString()}
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="text-center mt-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-[#70FF00] hover:underline cursor-pointer"
                >
                  Manage Crypto
                </button>
              </div>
              <SearchCryptoModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
              />
            </div>
          </TabsContent>

          {/* NFTs Tab */}
          <TabsContent value="nfts" className="mt-4 space-y-3 px-4">
            <div className="mt-4 space-y-3 px-4 max-w-2xl mx-auto">
              {nftCollections.length === 0 && (
                <p className="text-gray-400">No coins selected.</p>
              )}
            </div>
            {nftCollections.length > 0 ? (
              <div className="space-y-3 pb-20 ">
                {nftCollections.map((nft) => (
                  <Card
                    key={nft.id}
                    className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
                    onClick={() => navigate(`/dashboard/nft/${nft.id}`)}
                  >
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-2xl">
                          {nft.image}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-white">
                              {nft.name}
                            </span>
                            {/* {nft.rarity && (
                              <Badge className={getRarityColor(nft.rarity)}>
                                {nft.rarity}
                              </Badge>
                            )} */}
                          </div>
                          <p className="text-sm text-gray-400 mt-1">
                            {nft.collection}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        {nft.value && (
                          <>
                            <div className="text-white font-semibold">
                              {nft.value} ETH
                            </div>
                            <div className="text-gray-400 text-sm">
                              $ {(nft.value * 4290.68).toLocaleString()}
                            </div>
                          </>
                        )}
                      </div>

                      <ChevronRight className="w-4 h-4 text-gray-500 ml-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <div className="text-3xl">🖼️</div>
                </div>
                <h4 className="text-lg font-medium text-white mb-2">
                  No NFTs Found
                </h4>
                <p className="text-center text-sm mb-4">
                  Import your NFTs or browse the marketplace to get started
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                  onClick={() => navigate("/dashboard/nft/browse")}
                >
                  Browse NFTs
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CryptoAssets;
