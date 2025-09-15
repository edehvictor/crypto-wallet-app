import React from "react";
import { Home, Gift, Settings, ArrowLeftRight, FileClock } from "lucide-react";
import { NavLink } from "react-router";

interface NavigationItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  id: string;
  link: string;
}

const navigationData: NavigationItem[] = [
  { icon: Home, label: "Home", id: "dashboard", link: "/dashboard" },
  { icon: Gift, label: "Earn", id: "earn", link: "/earn" },
  { icon: ArrowLeftRight, label: "Swap", id: "swap", link: "/swap" },
  {
    icon: FileClock,
    label: "History",
    id: "history",
    link: "/history",
  },
  {
    icon: Settings,
    label: "Setting",
    id: "setting",
    link: "/setting",
  },
];

interface NavBottomItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  link: string;
  onNavigate?: () => void;
}

const NavBottomItem: React.FC<NavBottomItemProps> = ({
  icon: Icon,
  label,
  link,
  onNavigate,
}) => (
  <NavLink
    to={link}
    end
    onClick={onNavigate}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center flex-1 px-3 py-2 transition-all duration-200 
       rounded-lg group ${
         isActive
           ? "text-[#70FF00] bg-[#1F1F1F] shadow-md shadow-[#70FF00]/20"
           : "text-gray-400 hover:text-white hover:bg-[#222]"
       }`
    }
  >
    {({ isActive }) => (
      <>
        <Icon
          className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-200 ${
            isActive ? "text-[#70FF00] " : "text-gray-400 "
          }`}
        />
        <span
          className={`mt-1 text-xs sm:text-sm font-medium transition-colors ${
            isActive ? "text-[#70FF00]" : "text-gray-300 group-hover:text-white"
          }`}
        >
          {label}
        </span>
      </>
    )}
  </NavLink>
);

interface NavBottomProps {
  className?: string;
  onNavigate?: () => void;
}

const NavBottom: React.FC<NavBottomProps> = ({ onNavigate }) => {
  return (
    <aside className="w-full fixed bottom-0 left-1/2 -translate-x-1/2 bg-[#181818] border-t border-[#424242] z-50">
      <nav className="flex flex-row justify-between items-center max-w-2xl mx-auto px-4 py-2">
        {navigationData.map((item) => (
          <NavBottomItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            link={item.link}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </aside>
  );
};

export default NavBottom;
