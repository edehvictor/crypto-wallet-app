import { Outlet } from "react-router";
import NavBottom from "./NavBottom";
function ActionButtonLayout() {
  return (
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
          <main className="">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-screen bg-[#181818] ">
        <div className="min-h-screen w-screen h-screen overflow-hidden  ">
          <NavBottom className=" w-full" />

          {/* Desktop Main content area */}
          <main className="col-start-1 overflow-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default ActionButtonLayout;
