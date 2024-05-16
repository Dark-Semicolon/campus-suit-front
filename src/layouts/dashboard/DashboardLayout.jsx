import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";

function DashboardLayout() {

  return (
    <Layout >
      <Outlet />
    </Layout>
  );
}

export default DashboardLayout;
