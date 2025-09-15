import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Coins,
  EthernetPort,
  Filter,
  Search,
  History,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrustWalletHistoryPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full max-w-2xl mx-auto p-4 sm:p-6 text-white flex flex-col h-screen overflow-y-auto items-center">
      {/* Header */}
      <div className="flex items-center justify-between w-full p-4 border-b border-[#2E2E2E] bg-[#1A1A1A] rounded-lg">
        <ArrowLeft
          className="w-5 h-5 cursor-pointer text-gray-300 hover:text-white"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-lg font-semibold">Transaction History</h2>
        <div className="w-5 h-5" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full mt-4">
        <TabsList className="grid grid-cols-3 bg-[#2A2A2A] rounded-lg p-1">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-[#3A3A3A] data-[state=active]:text-white text-gray-300"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="sent"
            className="data-[state=active]:bg-[#3A3A3A] data-[state=active]:text-white text-gray-300"
          >
            Sent
          </TabsTrigger>
          <TabsTrigger
            value="received"
            className="data-[state=active]:bg-[#3A3A3A] data-[state=active]:text-white text-gray-300"
          >
            Received
          </TabsTrigger>
        </TabsList>

        {/* All Transactions */}
        <TabsContent value="all" className="bg-[#1A1A1A] rounded-lg mt-4 p-4">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="pl-10 pr-4 py-2 w-full bg-[#2E2E2E] border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-[#2E2E2E] border-none text-sm"
                  >
                    <Filter className="h-4 w-4 mr-1" /> Token
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#2A2A2A] border-none text-white">
                  <DropdownMenuItem>
                    <EthernetPort className="mr-2" /> Ethereum (ETH)
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Coins className="mr-2" /> Bitcoin (BTC)
                  </DropdownMenuItem>
                  <DropdownMenuItem>All Tokens</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-[#2E2E2E] border-none text-sm"
                  >
                    Date <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#2A2A2A] border-none text-white">
                  <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                  <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                  <DropdownMenuItem>All Time</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Transaction List or Empty State */}
          <Card className="mt-4 border-none bg-[#2A2A2A]">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-100">
                Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <div className="p-4 rounded-full bg-[#3A3A3A] mb-3">
                  <History className="w-8 h-8 text-gray-200" />
                </div>
                <p className="text-base font-medium text-slate-200">
                  No transactions yet
                </p>
                <p className="text-xs text-gray-200 mt-1">
                  Your transaction history will appear here after your first
                  transaction.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sent Tab */}
        <TabsContent value="sent">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-base font-medium text-slate-100">
              No sent transactions.
            </p>
            <p className="text-xs text-gray-200">
              Your sent transactions will appear here.
            </p>
          </div>
        </TabsContent>

        {/* Received Tab */}
        <TabsContent value="received">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-base font-medium text-slate-200">
              No received transactions.
            </p>
            <p className="text-xs text-gray-200">
              Your received transactions will appear here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrustWalletHistoryPage;
