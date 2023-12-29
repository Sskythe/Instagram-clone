import { Outlet } from "react-router-dom";

import Topbar from "@/components/Shared/TopBar";
import Bottombar from "@/components/Shared/BottomBar";
import LeftSidebar from "@/components/Shared/LeftBar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;