import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        setMobileNavOpen={setMobileNavOpen}
        mobileNavOpen={mobileNavOpen}
      />
      <div className="flex flex-col w-full ">
        <Header
          setMobileNavOpen={setMobileNavOpen}
          mobileNavOpen={mobileNavOpen}
        />
        <main className="flex-grow px-4 py-10 bg-gray-100 lg:px-10 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
