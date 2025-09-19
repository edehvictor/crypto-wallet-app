import React, { useEffect, useState } from "react";
import { LayoutPanelTop, LogOut, Menu, Wallet, X } from "lucide-react";
import MobileHeader from "./MobileHeader";
import { firebaseConfig } from "@/lib/firebase";
import { firebaseAuthService } from "@/services/auth.service";
import { navItems } from "@/constants/Dummy";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
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
    console.log("Firebase app name:", firebaseConfig.apiKey);
    checkIsAuthenticated();
  }, [isAuthenticated]);

  return (
    <main className="">
      <nav
        className={` px-4 top-2 z-50 transition-all duration-300  py-4 max-w-7xl mx-auto 
       ${className}`}
      >
        <div>
          <div className=" px- sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <a
                href="/"
                className="flex items-center space-x-3 font-bold  text-[#70FF00]"
              >
                <Wallet />
                <span>CWA</span>
              </a>

              <div className="hidden lg:flex items-center space-x-8">
                {navItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <a
                      href={item.href}
                      className="text-white/90 hover:text-green-600 font-sm transition-all duration-200 flex items-center space-x-1 py-2 hover:scale-105 relative group/nav"
                    >
                      <span className="text-slate-100 text-sm font-medium inline-flex items-center justify-center gap-x-1 align-middle">
                        {item.name}{" "}
                      </span>

                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover/nav:w-full"></span>
                    </a>
                  </div>
                ))}
              </div>

              <div className="hidden lg:flex items-center space-x-4">
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

              <div className="lg:hidden">
                {isOpen ? (
                  <X className="h-8 w-8" onClick={toggleMenu} />
                ) : (
                  <Menu className="h-8 w-8" onClick={toggleMenu} />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className=" ">
        <MobileHeader
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          navItems={navItems}
        />
      </div>
      {/* Mobile Navigation */}
    </main>
  );
};

export default Navbar;
