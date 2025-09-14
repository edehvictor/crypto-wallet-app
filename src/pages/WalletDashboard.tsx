import React, { useState } from "react";
import { Plus, TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { nftCollections } from "@/constants/Dummy";

interface CryptoAsset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  balance: number;
  value: number;
  icon: string;
  color: string;
}

export interface NFT {
  id: string;
  name: string;
  collection: string;
  image: string;
  value?: number;
  rarity?: string;
}

const WalletDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"crypto" | "nfts">("crypto");
  const navigate = useNavigate();

  const cryptoAssets: CryptoAsset[] = [
    {
      symbol: "BNB",
      name: "BNB Smart Chain",
      price: 874.27,
      change: -1.07,
      balance: 2.5,
      value: 2185.68,
      icon: "🔶",
      color: "#F3BA2F",
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 111434.21,
      change: 0.54,
      balance: 0.0123,
      value: 1370.64,
      icon: "₿",
      color: "#F7931A",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 4290.68,
      change: 0.07,
      balance: 0.85,
      value: 3647.08,
      icon: "⧫",
      color: "#627EEA",
    },
    {
      symbol: "POL",
      name: "Polygon",
      price: 0.27,
      change: -1.0,
      balance: 1000,
      value: 270.0,
      icon: "⬟",
      color: "#8247E5",
    },
  ];

  const formatPrice = (price: number): string => {
    return price >= 1 ? `$ ${price.toLocaleString()}` : `$ ${price.toFixed(4)}`;
  };

  const formatChange = (change: number): string => {
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(2)}%`;
  };

  const formatBalance = (balance: number): string => {
    if (balance >= 1) return balance.toFixed(4);
    return balance.toFixed(8);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity?.toLowerCase()) {
      case "common":
        return "bg-gray-100 text-gray-800";
      case "rare":
        return "bg-blue-100 text-blue-800";
      case "epic":
        return "bg-purple-100 text-purple-800";
      case "legendary":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className=" bg-[#212121]   w-full">
      <div className="max-w-2xl mx-auto">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "crypto" | "nfts")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 bg-[# 303030] border-gray-100">
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Your Assets</h3>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                onClick={() => navigate("/dashboard/add-token")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Token
              </Button>
            </div>

            <div className="space-y-3 pb-20">
              {cryptoAssets.map((asset) => (
                <Card
                  key={asset.symbol}
                  className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
                  onClick={() =>
                    navigate(`/dashboard/token/${asset.symbol.toLowerCase()}`)
                  }
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                        style={{
                          backgroundColor: asset.color + "20",
                          color: asset.color,
                        }}
                      >
                        {asset.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-white">
                            {asset.symbol}
                          </span>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-gray-700 text-gray-300"
                          >
                            {asset.name}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm mt-1">
                          <span className="text-gray-400">
                            {formatPrice(asset.price)}
                          </span>
                          <div className="flex items-center space-x-1">
                            {asset.change >= 0 ? (
                              <TrendingUp className="w-3 h-3 text-green-400" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-red-400" />
                            )}
                            <span
                              className={`text-xs font-medium ${
                                asset.change >= 0
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {formatChange(asset.change)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-white font-semibold">
                        {formatBalance(asset.balance)}
                      </div>
                      <div className="text-gray-400 text-sm">
                        $ {asset.value.toLocaleString()}
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-gray-500 ml-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* NFTs Tab */}
          <TabsContent value="nfts" className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                NFT Collection
              </h3>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                onClick={() => navigate("/dashboard/nft/import")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Import NFT
              </Button>
            </div>

            {nftCollections.length > 0 ? (
              <div className="space-y-3 pb-20">
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
                            {nft.rarity && (
                              <Badge className={getRarityColor(nft.rarity)}>
                                {nft.rarity}
                              </Badge>
                            )}
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

export default WalletDashboard;
