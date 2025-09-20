import { useState } from "react";
import UserManagementTable from "@/components/dashboard/admin/UserManagementTable";
import FinancialMetricCard from "@/components/dashboard/admin/FInancialCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Users, Wallet } from "lucide-react";
import AddUserModal from "@/components/dashboard/admin/AddUserModal";

const UserManagementTabTriggers = () => {
  return (
    <TabsList className="flex w-fit items-center bg-transparent gap-5 p-0 h-auto">
      <TabsTrigger
        value="users"
        className="group flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 rounded-md data-[state=active]:bg-[#212121] data-[state=active]:text-green-700 data-[state=active]:border-[#2c2c2c] text-gray-600 hover:bg-gray-50 data-[state=active]:shadow-none"
      >
        <Users className="size-6 text-slate-200" />
        <span className="font-medium text-slate-100">All Users</span>
        <span className="flex items-center justify-center border-[#2c2c2c] font-medium text-gray-500 group-data-[state=active]:text-slate-900 p-1 px-3 rounded-full bg-gray-200 group-data-[state=active]:bg-gray-200">
          238
        </span>
      </TabsTrigger>
    </TabsList>
  );
};

function UserManagement() {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-7xl bg-[#181818] mx-auto p-6 pt-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-slate-100 font-bold font-jakarta">
          All Users
        </h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-[#70FF00] hover:bg-green-700 active:bg-green-800 text-gray-900 font-medium px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 justify-center"
        >
          <Plus />
          Add User
        </button>
      </div>

      <div className="grid grid-col-1 md:grid-cols-4 gap-6">
        <FinancialMetricCard
          value="238"
          title="Total Users"
          status="verified"
          iconColor="bg-green-100"
          hideInfo
          className="rounded-md"
          icon={<Wallet className="size-5 text-gray-700" />}
        />

        <FinancialMetricCard
          value="92"
          title="Active Users"
          subtitle="Amount currently owed"
          status="verified"
          iconColor="bg-green-100"
          hideInfo
          className="rounded-md"
          icon={<Wallet className="size-5 text-gray-700" />}
        />
      </div>

      <Tabs defaultValue="users" className="w-full mt-8">
        <UserManagementTabTriggers />
        <UserManagementTable />
      </Tabs>

      {/* Add User Modal */}
      <AddUserModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default UserManagement;
