import { useState } from "react";
import {
  Search,
  ChevronDown,
  MoreVertical,
  Eye,
  Edit,
  UserX,
  User,
  ListFilter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router";
import EmptyState from "../shared/EmptyState";

export interface UserItem {
  userId: string;
  fullName: string;
  email: string;
  balance: string;
  walletAddress: string;
  status: "active" | "Blocked" | "Suspended";
  joinDate: string;
  profileImage?: string; // URL to profile image
}

const getUserStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-green-50 text-green-700 border border-green-400">
          <User className="size-3 mr-1" />
          Active
        </span>
      );
    case "Blocked":
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-red-50 text-red-700 border border-red-400">
          <UserX className="size-3 mr-1" />
          Blocked
        </span>
      );
    case "Suspended":
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-gray-50 text-gray-700 border border-gray-400">
          <User className="size-3 mr-1" />
          Suspended
        </span>
      );
    default:
      return null;
  }
};

// Helper function to get random avatar
const getRandomAvatar = () => {
  const avatarNumber = Math.floor(Math.random() * 30);
  return `/avatars/avatar-${avatarNumber}.png`;
};

function getRandomWalletAddress() {
  const chars = "a56789";
  return (
    "0x" +
    Array.from(
      { length: 10 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("")
  );
}

function shortenAddress(address: string, showFull = false) {
  return showFull ? address : `${address.slice(0, 6)}...${address.slice(-4)}`;
}
// Sample users data
const usersData: UserItem[] = [
  {
    userId: "USR-001",
    fullName: "Adebayo Folake",
    email: "folake.adebayo@email.com",
    balance: "$100",
    walletAddress: shortenAddress(
      getRandomWalletAddress(),
      Math.random() > 0.5
    ),
    status: "active",
    joinDate: "Jan 10, 2024",
    profileImage: "/avatars/avatar-1.png",
  },
  {
    userId: "USR-002",
    fullName: "Chinedu Okoro",
    email: "chinedu.okoro@business.com",
    balance: "$100",
    walletAddress: shortenAddress(
      getRandomWalletAddress(),
      Math.random() > 0.5
    ),
    status: "active",
    joinDate: "Jan 8, 2024",
    profileImage: "/avatars/avatar-2.png",
  },
  {
    userId: "USR-003",
    fullName: "Fatima Ibrahim",
    email: "fatima.ibrahim@gmail.com",
    balance: "$100",
    walletAddress: shortenAddress(
      getRandomWalletAddress(),
      Math.random() > 0.5
    ),
    status: "Blocked",
    joinDate: "Dec 20, 2023",
    profileImage: "/avatars/avatar-3.png",
  },
  {
    userId: "USR-004",
    fullName: "Emeka Nwosu",
    email: "emeka.nwosu@yahoo.com",
    balance: "$100",
    walletAddress: shortenAddress(
      getRandomWalletAddress(),
      Math.random() > 0.5
    ),
    status: "active",
    joinDate: "Nov 15, 2023",
    profileImage: "/avatars/avatar-4.png",
  },
  {
    userId: "USR-005",
    fullName: "Aisha Mohammed",
    email: "aisha.mohammed@hotmail.com",
    balance: "$100",
    walletAddress: shortenAddress(
      getRandomWalletAddress(),
      Math.random() > 0.5
    ),
    status: "Suspended",
    joinDate: "Jan 5, 2024",
    profileImage: "/avatars/avatar-5.png",
  },
  // Add more sample data dynamically
  ...Array.from({ length: 15 }, (_, i) => ({
    userId: `USR-${String(i + 6).padStart(3, "0")}`,
    fullName: [
      "Kemi Adeoye",
      "Tunde Bakare",
      "Ngozi Okafor",
      "Yusuf Garba",
      "Blessing Eze",
      "Olumide Ajayi",
      "Hadiza Bello",
      "Chioma Uche",
      "Abdullahi Sani",
      "Grace Okon",
      "Segun Oyedepo",
      "Zainab Abubakar",
      "Victor Ehigiator",
      "Funmi Odunsi",
      "Ahmed Yakubu",
    ][i],
    email: [
      "kemi.adeoye@email.com",
      "tunde.bakare@business.com",
      "ngozi.okafor@gmail.com",
      "yusuf.garba@yahoo.com",
      "blessing.eze@hotmail.com",
      "olumide.ajayi@email.com",
      "hadiza.bello@business.com",
      "chioma.uche@gmail.com",
      "abdullahi.sani@yahoo.com",
      "grace.okon@hotmail.com",
      "segun.oyedepo@email.com",
      "zainab.abubakar@business.com",
      "victor.ehigiator@gmail.com",
      "funmi.odunsi@yahoo.com",
      "ahmed.yakubu@hotmail.com",
    ][i],
    balance: "$100",
    walletAddress: shortenAddress(
      getRandomWalletAddress(),
      Math.random() > 0.5
    ),
    status: ["active", "Blocked", "Suspended"][
      Math.floor(Math.random() * 3)
    ] as "active" | "Blocked" | "Suspended",
    joinDate: `${["Dec", "Jan"][Math.floor(Math.random() * 2)]} ${
      Math.floor(Math.random() * 28) + 1
    }, ${Math.random() > 0.5 ? "2023" : "2024"}`,
    ...(Math.random() > 0.3 ? { profileImage: getRandomAvatar() } : {}),
  })),
];

const UserManagementTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Get display text for current filter
  const getFilterDisplayText = () => {
    switch (statusFilter) {
      case "active":
        return "Active";
      case "Blocked":
        return "Blocked";
      case "Suspended":
        return "Suspended";
      default:
        return "All status";
    }
  };

  // Filter logic
  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.balance.includes(searchQuery);

    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  // User actions
  const handleViewUser = (user: UserItem) => {
    navigate(`/admin/dashboard/users/${user.userId}`);
    console.log("View user:", user.userId);
    // Implement view logic - navigate to user details page
  };

  const handleEditUser = (user: UserItem) => {
    navigate(`/admin/dashboard/users/${user.userId}`);
    // Implement edit logic - open edit modal or navigate to edit page
  };

  const handleSuspendUser = (user: UserItem) => {
    navigate(`/admin/dashboard/users/${user.userId}`);
    // Implement suspend logic - show confirmation dialog and update user status
  };

  const getActionButtons = (user: UserItem) => {
    return (
      <div className="flex flex-col gap-1">
        <button
          onClick={() => handleViewUser(user)}
          className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] text-sm text-gray-100 hover:bg-[#30303030] rounded-md w-full text-left"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
        <button
          onClick={() => handleEditUser(user)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-100 hover:bg-[#303030] rounded-md w-full text-left"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => handleSuspendUser(user)}
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md w-full text-left ${
            user.status === "Blocked"
              ? "text-gray-200 hover:bg-[#303030]"
              : "text-gray-100 hover:bg-[#303030]"
          }`}
        >
          <UserX className="w-4 h-4" />
          {user.status === "Blocked" ? "Reactivate" : "Suspend"}
        </button>
      </div>
    );
  };

  const renderUserAvatar = (user: UserItem) => {
    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((n) => n.charAt(0))
        .join("")
        .toUpperCase()
        .substring(0, 2);
    };

    return (
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.profileImage} alt={user.fullName} />
        <AvatarFallback className="bg-green-100 text-green-600 text-sm font-medium">
          {getInitials(user.fullName)}
        </AvatarFallback>
      </Avatar>
    );
  };

  const emptyComponentToRender = () => {
    if (filteredUsers.length === 0 && searchQuery) {
      return (
        <EmptyState
          image="/icons/search.svg"
          title="No users matched your search"
          description="Try adjusting your search criteria."
          className="rounded-none py-12 border-0"
        />
      );
    }

    if (filteredUsers.length === 0) {
      return (
        <EmptyState
          image="/icons/no-users.svg"
          title="No users found"
          description="User accounts will appear here once they register."
          className="rounded-none py-12 border-0"
        />
      );
    }
  };

  return (
    <TabsContent
      value="users"
      className="mt-6 bg-[#181818] rounded-xl border border-slate-600"
    >
      {/* Filters */}
      <div className="p-4 border-b border-[#2c2c2c]">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative w-[25rem]">
              <div className="absolute inset-y-0 left-0 flex border-[#2c2c2c] items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-[#1a1a1a] border border- text-gray-100 text-sm rounded-sm focus:ring-green-500 focus:border-[#2c2c2c] block w-full pl-10 p-2.5"
                placeholder="Search users by name, email, phone, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex bg-[#1a1a1a] items-center px-4 py-2.5 text-sm font-medium text-center text-gray-300 border-0 focus:outline-0 border-[#2c2c2c] rounded-sm .hover:bg-[#303030] focus:ring-1 focus:outline-none ">
                  <ListFilter className="w-4 h-4 mr-2 -ml-1 text-gray-100" />
                  {getFilterDisplayText()}
                  <ChevronDown className="w-4 h-4 ml-2 text-gray-300" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel className="text-xs font-medium text-gray-200 uppercase">
                  Status
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleStatusFilterChange("all")}
                  className={`cursor-pointer ${
                    statusFilter === "all"
                      ? "bg-[#1a1a1a] text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  All
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusFilterChange("active")}
                  className={`cursor-pointer ${
                    statusFilter === "active"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusFilterChange("Blocked")}
                  className={`cursor-pointer ${
                    statusFilter === "Blocked"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  Blocked
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusFilterChange("Suspended")}
                  className={`cursor-pointer ${
                    statusFilter === "Suspended"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  Suspended
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#181818] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#2c2c2c] border-[#2c2c2c]">
            <thead className="bg-[#181818]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 bg-[#181818] text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                >
                  <div className="flex items-center bg-[#181818]">User</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                >
                  <div className="flex items-center">Email</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                >
                  <div className="flex items-center">Balance</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                >
                  <div className="flex items-center">Wallet Address</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  <div className="flex items-center">Status</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-100 uppercase tracking-wider text-center"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#181818] divide-y divide-[#2c2c2c]">
              {paginatedUsers.map((user) => (
                <tr
                  key={user.userId}
                  className="hover:bg-[#303030] transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {renderUserAvatar(user)}
                      <div className="ml-3">
                        <div className="text-sm font-medium font-jakarta text-gray-100">
                          {user.fullName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-100">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-100">{user.balance}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-100">
                      {user.walletAddress}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getUserStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="text-gray-100 bg-[#1a1a1a] hover:text-gray-300 flex items-center justify-center border rounded-md px-2 py-1 border-[#2c2c2c] shadow-md mx-auto">
                          <MoreVertical className="h-4 w-4 stroke-3 text-gray-100" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48 p-2">
                        {getActionButtons(user)}
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {emptyComponentToRender()}

        {/* Pagination */}
        <div className="bg-[#181818] px-6 py-3 border-t border-[#2c2c2c] flex items-center justify-between">
          <div className="text-sm text-gray-300">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(startIndex + itemsPerPage, filteredUsers.length)}
            </span>{" "}
            of <span className="font-medium">{filteredUsers.length}</span>{" "}
            user(s)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-[#2c2c2c] rounded-md text-sm ${
                currentPage === 1
                  ? "text-gray-600 bg-gray-50 cursor-not-allowed"
                  : "text-gray-700 bg-white hover:bg-[#303030]"
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border border-[#2c2c2c] rounded-md text-sm ${
                currentPage === totalPages
                  ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                  : "text-gray-300 bg-[#181818] hover:bg-[#303030]"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default UserManagementTable;
