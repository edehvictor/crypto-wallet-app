import React from "react";
import { LogOut, LayoutGrid, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink, useNavigate } from "react-router";
import showToast from "@/utils/toast.utils";
import { useProfileStore } from "@/hooks/useProfile";
import { firebaseAuthService } from "@/services/auth.service";

interface NavigationItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  id: string;
  link: string;
  isNew?: boolean;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

const navigationData: NavigationSection[] = [
  {
    title: "Dashboard",
    items: [
      {
        icon: LayoutGrid,
        label: "Dashboard",
        id: "dashboard",
        link: "/admin/dashboard",
      },
    ],
  },
  {
    title: "Users",
    items: [
      {
        icon: User,
        label: "Users Management",
        id: "dashboard",
        link: "/admin/dashboard/users",
      },
    ],
  },
];

interface SideBarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  link: string;
  onNavigate?: () => void;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  icon: Icon,
  label,
  link,

  onNavigate,
}) => {
  return (
    <NavLink
      end
      to={link}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${
          isActive ? "bg-[#303030] text-[#70FF00]" : " hover:bg-[#212121]"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={`w-4 h-4 ${
              isActive
                ? "text-[#70FF00]"
                : "text-gray-300 group-hover:text-slate-400"
            }`}
          />
          <span
            className={`text-sm font-medium ${
              isActive
                ? "text-[#70FF00]"
                : "text-slate-400 group-hover:text-slate-400"
            }`}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  if (!title) return null;

  return (
    <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3 px-3">
      {title}
    </h3>
  );
};

interface SideBarProps {
  className?: string;
  onNavigate?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ className, onNavigate }) => {
  const { clearProfile } = useProfileStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    showToast.loading("Logging out...");
    await firebaseAuthService.signOut();
    clearProfile();
    navigate("/auth/login");
    showToast.success("Logged Out");
  };

  return (
    <aside
      className={cn(
        "w-64  h-screen bg-black border-[#2c2c2c] flex flex-col z-10 shadow-lg lg:shadow-none",
        className
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-4 border-b border-[#2c2c2c]">
        <div className=" rounded-full text-white font-bold">Crypto Wallet</div>
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto py-4 px-2 border-r border-[#2c2c2c]">
        <nav className="space-y-6">
          {navigationData.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <SectionHeader title={section.title} />
              <div className="space-y-1">
                {section.items.map((item) => (
                  <SideBarItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    link={item.link}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-r border-[#2c2c2c]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group text-gray-700 hover:bg-[#212121] w-full"
        >
          <LogOut className="w-4 h-4 text-slate-300 group-hover:text-slate-300" />
          <span className="text-sm font-medium text-slate-300 group-hover:text-slate-300">
            Log Out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
