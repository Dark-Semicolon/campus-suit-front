import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";

import _ from "lodash";

import { GrUserAdmin } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { MdAdminPanelSettings } from "react-icons/md";

import usePermission from '@/hooks/usePermission';

function DashboardLayout() {

  const { can, canAll } = usePermission()

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
      permissions: "view_any_role",
    },
  ];

  const filteredList = sidebarLinks.filter(
    (item) =>
      !item.permissions ||
      can(item.permissions) ||
      (_.isArray(item.permissions) && canAll(item.permissions))
  );

  return (
    <Layout sidebarLinks={filteredList}>
      <Outlet />
    </Layout>
  );
}

export default DashboardLayout;
