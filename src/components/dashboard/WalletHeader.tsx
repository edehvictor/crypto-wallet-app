import { useState } from "react";
import {
  ChevronDown,
  Globe,
  Search,
  MoreHorizontal,
  Plus,
  Check,
  User,
  Copy,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import showToast from "@/utils/toast.utils";
import { accounts, networks } from "@/constants/Dummy";
import type { Account, Network } from "@/types/types";
import AccountDetails from "./ActionsButton";
import SearchCryptoModal from "../ui/SearchModal";

type WalletHeaderProps = {
  className?: string;
  isSearchOpen?: boolean;
  setIsSearchOpen?: (open: boolean) => void;
};

const WalletHeader = ({
  className,
  isSearchOpen,
  setIsSearchOpen,
}: WalletHeaderProps) => {
  const [selectedAccount, setSelectedAccount] = useState<Account>({
    id: "1",
    name: "Main wallet",
    address: "0x1234...5678",
    balance: 0.0,
  });

  const [selectedNetwork, setSelectedNetwork] = useState<Network>({
    id: "ethereum",
    name: "Ethereum Mainnet",
    chainId: 1,
    icon: "⧫",
    color: "#627EEA",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast.success("Address copied to clipboard!");
    } catch {
      showToast.error("Failed to copy address");
    }
  };

  const truncateAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div
      className={`bg-[#181818] w-full border-b border-[#2c2c2c] ${className}`}
    >
      <div className="flex items-center justify-between max-w-2xl mx-auto px-6 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 cursor-pointer rounded-lg px-3 py-1 hover:bg-[#212121] transition-colors">
              <span className="text-white font-medium md:text-lg">
                {selectedAccount.name}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-300" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 bg-[#303030] border-[#424242]">
            <DropdownMenuLabel className="text-white">
              Select Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />

            {accounts.map((account) => (
              <DropdownMenuItem
                key={account.id}
                onClick={() => setSelectedAccount(account)}
                className="flex items-center justify-between p-3 hover:bg-[#212121] focus:bg-[#212121]"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#70FF00] to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{account.name}</p>
                    <p className="text-gray-400 text-sm">
                      {truncateAddress(account.address)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-white font-medium">
                    ${account.balance.toFixed(2)}
                  </p>
                  {selectedAccount.id === account.id && (
                    <Check className="w-5 h-5 text-green-400 ml-2" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator className="bg-[#303030]" />
            <DropdownMenuItem className="hover:bg-[#212121] focus:bg-[#212121]">
              <Plus className="w-5 h-5 mr-2 text-white" />
              <span className="text-white">Add Account</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center space-x-2">
          {/* Network Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className=" bg-[#303030] rounded-full p-2 transition-colors">
                {" "}
                <Globe className="w-5 h-5 text-slate-300 hover:text-white " />{" "}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-[#303030] border-gray-700">
              <DropdownMenuLabel className="text-gray-300">
                Select Network
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              {networks.map((network) => (
                <DropdownMenuItem
                  key={network.id}
                  onClick={() => setSelectedNetwork(network)}
                  className="flex items-center justify-between p-3 focus:bg-[#212121]"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                      style={{
                        backgroundColor: network.color + "20",
                        color: network.color,
                      }}
                    >
                      {network.icon}
                    </div>
                    <span className="text-white">{network.name}</span>
                  </div>
                  {selectedNetwork.id === network.id && (
                    <Check className="w-4 h-4 text-green-400" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            className=" bg-[#303030] rounded-full p-2 transition-colors"
            onClick={() => copyToClipboard(selectedAccount.address)}
          >
            {" "}
            <Copy className="w-5 h-5 text-slate-300 hover:text-white " />{" "}
          </button>

          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <button
                className=" bg-[#303030] rounded-full p-2 transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                <Search className="w-5 h-5 text-slate-300 hover:text-white " />{" "}
              </button>
            </DialogTrigger>

            <SearchCryptoModal isOpen={isModalOpen} onClose={setIsModalOpen} />
          </Dialog>

          {/* More Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className=" bg-[#303030] rounded-full p-2 transition-colors">
                {" "}
                <MoreHorizontal className="w-5 h-5 text-slate-300 hover:text-white " />{" "}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#303030]  border-[#212121]">
              <DropdownMenuItem className=" focus:bg-[#212121]">
                <span className="text-gray-300">Help</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#303030]  focus:bg-[#212121]">
                <span className="text-gray-300">Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#303030]  focus:bg-[#212121]">
                <span className="text-gray-300">About</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AccountDetails />
    </div>
  );
};

export default WalletHeader;
