import { Route } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { HiUserGroup } from "react-icons/hi";

import AppLayout from "../layouts/web/AppLayout";
import DashboardLayout from "./../layouts/campusSuit/DashboardLayout";

import Auth from "../middleware/Auth";

import Home from "../pages/web/Home";
import Admins from "../pages/campusSuit/panel/Admins";

function useCampusSuitRoutes() {
  const sidebarLinks = [
    {
      name: "Dashboard",
      to: `admin/panel/stats`,
      icon: <RxDashboard className="text-2xl" />,
    },
    {
      name: "admins",
      to: `/admin/panel/admins`,
      icon: <HiUserGroup className="text-2xl" />,
    },
  ];
  return (
    <>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route
        element={
          <Auth gardName="admin" redirect="/admin/login">
            <DashboardLayout sidebarLinks={sidebarLinks} />
          </Auth>
        }
      >
        <Route path="/admin/panel/stats" element={<p>Admin dashboard</p>} />
        <Route path="/admin/panel/admins" element={<Admins />} />
      </Route>
    </>
  );
}

export default useCampusSuitRoutes;
