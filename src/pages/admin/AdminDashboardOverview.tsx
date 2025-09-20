import { Wallet } from "lucide-react";

import FinancialMetricCard from "@/components/dashboard/admin/FInancialCard";
import ApplicationPieChart, {
  type ChartData,
} from "@/components/dashboard/shared/ApplicationPieChart";

function AdminDashboardOverview() {
  const exampleChartData: ChartData = [
    { id: "deposits", value: 45, label: "Deposits", fill: "#6366F1" },
    { id: "withdrawals", value: 30, label: "Withdrawals", fill: "#A5B4FC" },
    { id: "transfers", value: 25, label: "Transfers", fill: "#C7F59B" },
    { id: "swaps", value: 20, label: "Swaps", fill: "#84CC16" },
    { id: "failed", value: 10, label: "Failed", fill: "#FB923C" },
  ];

  return (
    <div className="max-w-7xl bg-[#181818] mx-auto p-6 pt-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-jakarta text-slate-100">
          Welcome back, David
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <FinancialMetricCard
          value="$3,248"
          title="Total Wallet Balance"
          status="verified"
          iconColor="bg-gray-100"
          hideInfo
          className="flex-1 rounded-md"
          icon={<Wallet className="size-5 text-gray-700" />}
        />

        {/* Outstanding Loan Balance */}
        <FinancialMetricCard
          value="$2,036"
          title="Total Deposits"
          subtitle="Amount currently owed"
          status="verified"
          iconColor="bg-gray-100"
          hideInfo
          className="flex-1 rounded-md"
          icon={<Wallet className="size-5 text-gray-700" />}
        />

        {/* Available to Borrow */}
        <FinancialMetricCard
          value="$1,220"
          title="Total Withdrawals"
          subtitle="Ready to use amount"
          status="verified"
          hideInfo
          className="flex-1 rounded-md"
          iconColor="bg-gray-100"
          icon={<Wallet className="size-5 text-gray-700" />}
        />
        <FinancialMetricCard
          value="$2,000"
          title="Inflows/Outflows"
          subtitle="Ready to use amount"
          status="verified"
          hideInfo
          className="flex-1 rounded-md"
          iconColor="bg-slate-100"
          icon={<Wallet className="size-5 text-gray-700" />}
        />
      </div>

      <div className="mt-7 flex gap-4 w-full  flex-col ">
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2c2a2a] pb-3">
          <div className="p-6 border-b border-[#2c2a2a] text-slate-100 text-xl font-jakarta font-medium w-[100%]">
            Transaction Status
          </div>
          <ApplicationPieChart
            className=" w-full flex flex-row justify-center "
            chartData={exampleChartData}
          ></ApplicationPieChart>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardOverview;
