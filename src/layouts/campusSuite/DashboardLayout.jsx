import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";

function DashboardLayout({ sidebarLinks }) {

  return (
    <Layout sidebarLinks={sidebarLinks} >
      <Outlet />
    </Layout>
  );
}

export default DashboardLayout;
