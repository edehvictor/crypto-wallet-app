import { CheckCheck, Trash, User, Wallet } from "lucide-react";
import { Clock, XCircle, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FinancialMetricCard from "@/components/dashboard/admin/FInancialCard";
import { ProfileField, ProfileSection } from "./ProfileSection";

const profileData = {
  firstName: "Adebayo",
  lastName: "Okonkwo",
  otherName: "Emmanuel",
  dob: "1990-03-15",
  gender: "Male",
  contactEmail: "JohnDoe@email.com",
  Balance: "$300",
  address: "15 Admiralty Way, Lekki Phase 1, Lagos",
  walletAddress: "0x8a5a...5876",
  phoneNumber: "+234 9203 2340",
};

const ApplicantTabTriggers = () => {
  return (
    <TabsList className="flex w-full md:w-fit items-center bg-transparent gap-3 md:gap-5 p-0 h-auto flex-wrap">
      <TabsTrigger
        value="personal-information"
        className="group flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-3 bg-[#1a1a1a] border border-gray-200 rounded-md data-[state=active]:bg-[#212121] data-[state=active]:text-gray-300 data-[state=active]:border-[#2c2c2c] text-gray-600 hover:bg-gray-50 data-[state=active]:shadow-none text-sm md:text-base"
      >
        <User className="size-5 md:size-6" />
        <span className="font-medium">Personal Information</span>
      </TabsTrigger>
    </TabsList>
  );
};

const PersonalInformationTab = () => {
  return (
    <TabsContent value="personal-information" className="max-w-full">
      <div className="mt-6 md:mt-9 space-y-4 sm:space-y-6 md:space-y-8">
        {/* Personal Information */}
        <ProfileSection title="Personal Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-y-9 p-4">
            <ProfileField
              label="First name"
              content={<p>{profileData.firstName}</p>}
            />
            <ProfileField
              label="Last name"
              content={<p>{profileData.lastName}</p>}
            />
            <ProfileField label="Date of birth" content={<p>25-24-2025</p>} />
            <ProfileField
              label="Gender"
              content={<p>{profileData.gender}</p>}
            />
          </div>
        </ProfileSection>

        {/* Wallet Info */}
        <ProfileSection title="Wallet Info">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-y-9 p-4">
            <ProfileField
              label="Wallet Address"
              content={<p>{profileData.walletAddress}</p>}
            />
            <ProfileField
              label="Wallet Balance"
              content={<p>{profileData.Balance}</p>}
            />
          </div>
        </ProfileSection>

        {/* Contact Information */}
        <ProfileSection title="Contact Info">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-y-9 p-4">
            <ProfileField
              label="Contact Email"
              content={<p>{profileData.contactEmail}</p>}
            />
            <ProfileField
              label="Phone Number"
              content={<p>{profileData.phoneNumber}</p>}
            />
          </div>
        </ProfileSection>
      </div>
    </TabsContent>
  );
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return (
        <span className="flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-green-50 text-green-700 border border-green-400 w-fit">
          <CheckCheck className="size-4 mr-1" />
          Approved
        </span>
      );
    case "pre-approved":
      return (
        <span className="flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-green-50 text-green-700 border border-green-400 w-fit">
          <CheckCircle className="size-4 mr-1" />
          Failed
        </span>
      );
    case "in-review":
      return (
        <span className="flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-400 w-fit">
          <Clock className="size-4 mr-1" />
          Pending
        </span>
      );
    case "pending-review":
      return (
        <span className="flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-orange-50 text-orange-700 border border-orange-400 w-fit">
          <Clock className="size-4 mr-1" />
          Reverse
        </span>
      );
    case "declined":
      return (
        <span className="flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-red-50 text-red-700 border border-red-400 w-fit">
          <XCircle className="size-4 mr-1" />
          Declined
        </span>
      );
    default:
      return null;
  }
};

function ApplicantDetails() {
  return (
    <div className="p-4 md:p-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between mb-6 md:mb-12 gap-6">
        <div className="flex gap-3 items-center">
          <img
            src="/avatar.png"
            className="size-20 md:size-[7.7rem] object-top rounded-md border-4 shadow-lg border-white"
            alt=""
          />
          <div>
            <h1 className="text-xl md:text-[1.75rem] font-semibold text-gray-300 font-jakarta">
              Donald Williams
            </h1>
            <p className="font-jakarta text-gray-300 font-medium text-sm md:text-md flex items-center gap-1.5">
              Role <span className="text-xs md:text-sm text-gray-300">●</span>{" "}
              User
            </p>
            <div className="mt-2 md:mt-3">{getStatusBadge("approved")}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <button className="bg-[#70FF00]  h-10 md:h-12 px-4 md:px-6 py-2 md:py-3 rounded-lg text-gray-900 text-sm md:text-base transition-colors duration-200">
            Block User
          </button>
          <button className="bg-white flex flex-row gap-x-1 items-center justify-center  hover:bg-green-50 h-10 md:h-12 px-4 md:px-6 py-2 md:py-3 rounded-lg text-red-600 border-2 border-red-600 text-sm md:text-base transition-colors duration-200">
            <span> Delete User</span> <Trash className="size-4 md:size-5" />
          </button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <FinancialMetricCard
          value="$2,036"
          title="Total Deposits"
          subtitle="Amount owed"
          status="verified"
          iconColor="bg-green-100"
          hideInfo
          icon={<Wallet className="size-5 text-green-700" />}
        />
        <FinancialMetricCard
          value="$1,220"
          title="Total Withdrawals"
          subtitle="Ready to use"
          status="verified"
          hideInfo
          iconColor="bg-orange-100"
          icon={<Wallet className="size-5 text-orange-700" />}
        />
        <FinancialMetricCard
          value="$2,000"
          title="Inflows/Outflows"
          subtitle="Ready to use"
          status="verified"
          hideInfo
          iconColor="bg-zinc-100"
          icon={<Wallet className="size-5 text-zinc-700" />}
        />
      </div>

      {/* Tabs Section */}
      <Tabs
        defaultValue="personal-information"
        className="w-full mt-8 md:mt-16"
      >
        <ApplicantTabTriggers />
        <PersonalInformationTab />
      </Tabs>
    </div>
  );
}

export default ApplicantDetails;
