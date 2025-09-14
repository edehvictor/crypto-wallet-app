import { type FC, type ReactElement } from "react";
import {
  Wallet,
  Network,
  Book,
  Code,
  Link,
  Ban,
  ChevronRight,
} from "lucide-react";

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
  return (
    <div className="min-h-screen w-full max-w-2xl mx-auto  text-white p-6 space-y-6 flex flex-col items-center overflow-y-scroll h-screen">
      <h2 className="text-2xl font-bold">Settings</h2>

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
          <SettingItem icon={<Code size={20} />} title="Help and Support" />
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
