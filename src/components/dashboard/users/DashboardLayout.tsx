import { Outlet, useLoaderData } from "react-router";
import { useEffect } from "react";
import { useAuthStore, type Profile } from "@/hooks/useProfile";
import type { User } from "firebase/auth";
import NavBottom from "./NavBottom";

import WalletHeader from "./WalletHeader";

export type FirebaseUser = User;

export interface LoaderData {
  user: FirebaseUser | null;
  profile: Profile | null;
}
function DashboardLayout() {
  const loaderData = useLoaderData() as LoaderData;
  const { profile, setProfile } = useAuthStore();

  useEffect(() => {
    if (!loaderData.user) {
      // console.log(profile, "profile please");
    }
  }, [profile, loaderData, setProfile]);

  return (
    loaderData.user && (
      <>
        <div className="lg:hidden min-h-screen">
          {/* Mobile Sidebar */}
          <NavBottom
            className={`
						fixed top-0 left-0 z-50 h-full transition-transform duration-300 ease-in-out
					`}
          />
          {/* Mobile Content */}
          <div className="min-h-screen w-screen">
            <WalletHeader className="sticky top-0 z-30" />
            <main className="flex-1 ">
              <Outlet />
            </main>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block min-h-screen bg-[#181818] ">
          <div className="min-h-screen w-screen h-screen overflow-x-hidden ">
            <NavBottom className="row-span-1 w-full" />

            <WalletHeader className="col-start-1 sticky top-0" />

            {/* Desktop Main content area */}
            <main className="col-start-1 overflow-x-hidden">
              <Outlet />
            </main>
          </div>
        </div>
      </>
    )
  );
}

export default DashboardLayout;
