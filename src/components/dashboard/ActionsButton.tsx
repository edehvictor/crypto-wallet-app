import {
  ArrowLeftRight,
  Eye,
  EyeOff,
  Landmark,
  MoveUpRight,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ActionButton {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  route: string;
  isActive?: boolean;
  onClick?: () => void;
}

const ActionButton = () => {
  const totalBalance = 1234.56;
  const [showBalance, setShowBalance] = useState(true);
  const navigate = useNavigate();

  const actionButtons: ActionButton[] = [
    { icon: MoveUpRight, label: "Send", route: "#" },
    { icon: ArrowLeftRight, label: "Swap", route: "/swap" },
    { icon: Zap, label: "Fund", route: "/dashboard/fund", isActive: true },
    { icon: Landmark, label: "Sell", route: "/dashboard/sell" },
  ];

  const handleActionClick = (action: ActionButton) => {
    if (action.onClick) {
      action.onClick();
    } else {
      navigate(action.route);
    }
  };

  return (
    <div className="bg-[#181818] border-b border-[#2c2c2c] py-6 px-4 flex flex-col space-y-6">
      <div className="flex items-center justify-center space-x-3">
        <span className="text-3xl font-bold text-white">
          {showBalance ? `$ ${totalBalance.toLocaleString()}` : "$ ••••••"}
        </span>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {showBalance ? (
            <Eye className="w-5 h-5" />
          ) : (
            <EyeOff className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-4 md:gap-32 sm:gap-20 gap-4 max-w-md mx-auto">
        {actionButtons.map((action) => (
          <button
            key={action.label}
            onClick={() => handleActionClick(action)}
            className="flex flex-col items-center space-y-2 hover:opacity-90 transition-opacity"
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center cursor-pointer justify-center transition-all duration-200 ${
                action.isActive
                  ? "bg-[#70FF00] shadow-lg shadow-green-500/30"
                  : "bg-[#303030] hover:bg-gray-600"
              }`}
            >
              <action.icon
                className={`w-5 h-5 ${
                  action.isActive ? "text-black" : " text-white"
                }`}
              />
            </div>
            <span
              className={`text-sm font-medium text-white
              }`}
            >
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionButton;
