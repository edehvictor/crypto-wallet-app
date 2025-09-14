import type { NavItem } from "@/types/types";
import { Button } from "./ui/button";

const MobileHeader = ({
  isOpen,
  setIsOpen,
  navItems,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  navItems: NavItem[];
}) => {
  return (
    <div
      className={`fixed lg:hidden h-[320px] bg-white transition-all duration-300 ease-in-out w-[300px] flex justify-end z-50  right-10  top-32 ${
        isOpen ? " opacity-100 mt-4" : "max-h-0 opacity-0 overflow-hidden"
      }`}
    >
      <div className="flex-1 overflow-hidden relative">
        <div
          className={`absolute inset-0 p-4 transform transition-transform duration-300 ease-in-out
          }`}
        >
          <nav className="space-y-2">
            {navItems.map((item) => (
              <div key={item.name}>
                <a
                  href={item.href}
                  className="block text-gray-700 text-sm hover:text-[#] font-medium py-3 px-3 rounded-lg hover:bg-blue-300 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <div className="pt-3 mt-3 border-t border-blue-700/50 space-y-3">
            <Button
              asChild
              className="w-fit bg-[#3d3dff]  px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-white "
            >
              <a href="#assessment-form">Get started</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
