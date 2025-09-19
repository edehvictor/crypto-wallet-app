import { Outlet } from "react-router";
import { useState } from "react";
import SideBar from "@/components/dashboard/admin/SideBar";
import Header from "../shared/Header";

function AdminDashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen bg-gray-50">
        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-white opacity-60 z-40"
            onClick={closeSidebar}
          />
        )}

        {/* Mobile Sidebar */}
        <SideBar
          className={`
						fixed top-0 left-0 z-50 h-full transition-transform duration-300 ease-in-out
						${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
					`}
          onNavigate={closeSidebar}
        />

        {/* Mobile Content */}
        <div className="min-h-screen flex flex-col">
          <Header
            className="sticky top-0 z-30 first:max-w-7xl"
            onMenuClick={toggleSidebar}
            showMenuButton={true}
          />
          <main className="flex-1 bg-[#1a1a1a] overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-screen">
        <div className="min-h-screen grid grid-cols-[256px_1fr] grid-rows-[auto_1fr] h-screen">
          {/* Desktop Sidebar - spans full height */}
          <SideBar className="row-span-2" />

          {/* Desktop Header - spans remaining width */}
          <Header className="col-start-2" showMenuButton={false} />

          {/* Desktop Main content area */}
          <main className="col-start-2 bg-[#1a1a1a] overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default AdminDashboardLayout;
