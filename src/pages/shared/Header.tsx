import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { LogOut, ChevronDown, Menu, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbWithCustomSeparator() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <p>/</p>
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/components">Components</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <p>/</p>
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

interface HeaderProps {
  className?: string;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  className,
  onMenuClick,
  showMenuButton = false,
}) => {
  // Mock notification count (you can replace with actual data)
  const notificationCount = 3;

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "Received 0.05 BTC from Alice",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Price Alert: ETH crossed $3,200",
      time: "15 min ago",
      unread: true,
    },
    {
      id: 3,
      title: "Swap Completed: 100 USDT → 0.0025 BTC",
      time: "1 hour ago",
      unread: false,
    },
  ];

  const handleLogout = async () => {
    console.log("Logging out...");
  };

  // const getInitials = (name: string) => {
  //   if (!name) return "";
  //   return name
  //     .split(" ")
  //     .map((part) => part.charAt(0))
  //     .join("")
  //     .toUpperCase()
  //     .slice(0, 2);
  // };

  return (
    <TooltipProvider>
      <header
        className={cn(
          "h-16 bg-[#181818] border-b border-[#2c2c2c]  flex justify-center  ",
          className
        )}
      >
        <div className="flex items-center justify-between w-full h-full .max-w-7xl px-4">
          {/* Left Section - Mobile Menu + Search */}
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Button */}
            {showMenuButton && (
              <div
                className="lg:hidden p-2 cursor-pointer rounded-md hover:bg-gray-100 transition-colors"
                onClick={onMenuClick}
              >
                <Menu className="h-5 w-5 text-white" />
              </div>
            )}

            {/* Search */}
            <div className="flex-1 text-slate-100 max-w-lg hidden md:block">
              <h1>
                Dashboard / <span className="font-semibold">Overview</span>
              </h1>
            </div>
          </div>

          {/* Right Section - Actions + User */}
          <div className="flex items-center gap-2 ml-4">
            {/* Notifications Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="relative w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center cursor-pointer transition-colors">
                      <Bell className="w-5 h-5 text-white" />
                      {notificationCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-[#70FF00] text-gray-600 hover:bg-[#70FF00] rounded-full">
                          {notificationCount}
                        </Badge>
                      )}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-80 bg-[#1a1a1a]/95 backdrop-blur-md shadow-xl ring-1 ring-black/5 border-0 rounded-xl p-2"
                  >
                    <div className="px-3 py-2 border-b border-[#2c2c2c]">
                      <h3 className="font-semibold text-gray-200">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <DropdownMenuItem
                          key={notification.id}
                          className="flex items-start gap-3 px-3 py-3 cursor-pointer  focus:bg-[#303030] rounded-lg transition-colors"
                        >
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              notification.unread
                                ? "bg-[#70FF00]"
                                : "bg-gray-300"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm ${
                                notification.unread
                                  ? "font-semibold text-gray-300"
                                  : "text-gray-200"
                              }`}
                            >
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-200 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-center text-sm text-[#70FF00] hover:text-green-800 cursor-pointer">
                      View all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 px-2 sm:px-3 py-2 h-auto bg-[#1a1a1a] border border-[#2c2c2c] rounded-full  transition-all duration-200 cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#70FF00] text-gray-600 text-sm">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-slate-300 hidden sm:block">
                    {/* {profile?.username.split(' ')[0]} */ `${"  John Doe"}`}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-64 bg-[#1a1a1a]/95 backdrop-blur-md shadow-xl ring-1 ring-black/5 border-0 rounded-xl p-2"
              >
                {/* User Info Section with Centered Avatar */}
                <div className=" flex flex-col items-center py-4 px-2  bg-gradient-to-br rounded-lg mb-2">
                  <Avatar className="w-16 h-16 mb-3 ring-2 ring-white shadow-md">
                    <AvatarFallback className="bg-green-500 text-slate-100 text-lg font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-100 mb-1">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-200">john.doe@gmial.com</p>
                  </div>
                </div>

                <DropdownMenuSeparator className="my-2" />

                <DropdownMenuItem
                  className="cursor-pointer flex items-center g-gray-900 px-3 py-2.5 text-sm text-gray-100   rounded-lg transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
};

export default Header;
