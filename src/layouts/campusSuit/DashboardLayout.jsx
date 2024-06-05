import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";

import { GrUserAdmin } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { MdAdminPanelSettings } from "react-icons/md";

function DashboardLayout() {
  const sidebarLinks = [
    {
      name: "Dashboard",
      to: `/admin/dashboard`,
      icon: <RxDashboard className="text-2xl" />,
    },
    {
      name: "Clients",
      to: `/admin/clients`,
      icon: <FaUsers className="text-2xl" />,
    },
    {
      name: "Admins",
      to: `/admin/admins`,
      icon: <GrUserAdmin className="text-2xl" />,
    },
    {
      name: "Roles",
      to: `/admin/roles`,
      icon: <MdAdminPanelSettings className="text-2xl" />,
    },
  ];

  return (
    <Layout sidebarLinks={sidebarLinks}>
      <Outlet />
    </Layout>
  );
}

export default DashboardLayout;
