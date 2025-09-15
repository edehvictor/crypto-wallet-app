import { type FC, type ReactElement } from "react";
import {
  Wallet,
  Network,
  Book,
  Code,
  Link,
  Ban,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SettingItemProps {
  icon: ReactElement;
  title: string;
  subtitle?: string;
}

const SettingItem: FC<SettingItemProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="flex items-center justify-between max-w-2xl p-4 bg-[#303030] rounded-2xl cursor-pointer hover:bg-[#212121] transition">
      <div className="flex items-center gap-4">
        <div className="text-gray-300 text-xl">{icon}</div>
        <div>
          <p className="text-white font-semibold">{title}</p>
          {subtitle && <p className="text-slate-300 text-sm">{subtitle}</p>}
        </div>
      </div>
      <ChevronRight size={18} className="text-gray-500" />
    </div>
  );
};

const Settings: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full max-w-2xl pb-12 mx-auto text-white p-6 space-y-6 flex flex-col items-center overflow-y-scroll h-screen">
      {/* Header */}
      <div className="flex items-center justify-between w-full p-4 border-b border-[#2E2E2E] bg-[#1A1A1A] rounded-lg">
        <ArrowLeft
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-2xl font-bold">Setting</h2>
        <div className="w-6 h-6" />
      </div>

      <div className="w-full max-w-2xl space-y-6  ">
        <SettingItem
          icon={<Wallet size={20} />}
          title="Manage Wallets"
          subtitle="View and edit all wallets"
        />

        <div className="border-t border-gray-800 my-4"></div>

        {/* Other Settings */}
        <div className="space-y-4">
          <SettingItem icon={<Network size={20} />} title="Custom Networks" />
          <SettingItem icon={<Book size={20} />} title="Address Book" />
          <SettingItem icon={<Book size={20} />} title="Address Book" />
          <SettingItem icon={<Book size={20} />} title="Address Book" />
          <SettingItem icon={<Code size={20} />} title="Developer settings" />

          <SettingItem
            icon={<Link size={20} />}
            title="Connected dApps"
            subtitle="0"
          />
          <SettingItem icon={<Ban size={20} />} title="Blocked dApps" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
