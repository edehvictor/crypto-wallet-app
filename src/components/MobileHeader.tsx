import type { NavItem } from "@/types/types";

import { useEffect, useState } from "react";
import { firebaseAuthService } from "@/services/authservice";
import { LayoutPanelTop, LogOut } from "lucide-react";

const MobileHeader = ({
  isOpen,
  setIsOpen,
  navItems,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  navItems: NavItem[];
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIsAuthenticated = async () => {
      setIsLoading(true);
      try {
        const profile = await firebaseAuthService.getCurrentUser();
        console.log(profile.authenticated, "authenticated");
        if (profile.authenticated) {
          setIsAuthenticated(profile.authenticated);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkIsAuthenticated();
  }, [isAuthenticated]);
  return (
    <div
      className={`fixed lg:hidden h-[320px] bg-[#303030] transition-all duration-300 ease-in-out w-[300px] flex justify-end z-50  right-10  top-32 ${
        isOpen ? " opacity-100 mt-4" : "max-h-0 opacity-0 overflow-hidden"
      }`}
    >
      <div className="flex-1 overflow-hidden relative">
        <div
          className={`absolute rounded-md inset-0 p-4 transform transition-transform duration-300 ease-in-out
          }`}
        >
          <nav className="space-y-">
            {navItems.map((item) => (
              <div key={item.name}>
                <a
                  href={item.href}
                  className="block text-gray-200 text-sm hover:text-slate-50 font-medium py-3 px-3 rounded-lg hover:bg-[#181818] transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <div className="lg:hidden  items-center space-x-4">
            {isAuthenticated && !isLoading ? (
              <a
                href="/dashboard"
                className="bg-[#70FF00] text-gray-900 font-sora rounded-lg px-3 py-2 md:px-5 md:py-2 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base font-medium transition-all hover:shadow-xl"
              >
                <LayoutPanelTop className="w-5" />
                <span className="inline">Connect wallet</span>
              </a>
            ) : (
              <a
                href="/auth/signup"
                className="bg-[#70FF00] text-[#181818] font-marlin rounded-lg px-3 py-2 md:px-6 md:py-2 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base font-medium transition-all hover:shadow-xl"
              >
                <span className="inline">Connect wallet</span>
                <LogOut className="w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
