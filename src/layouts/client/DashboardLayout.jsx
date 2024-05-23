import { Outlet, useParams } from "react-router-dom";
import Layout from "./components/Layout";

import { GiTeacher } from "react-icons/gi";
import { FaUniversity } from "react-icons/fa";
import { GrAnalytics } from "react-icons/gr";

function DashboardLayout() {
  const { universityId } = useParams()

  const sidebarLinks = [
    {
      name: "Dashboard",
      to: `${universityId}/panel/stats`,
      icon: <GrAnalytics className="text-2xl" />,
    },
    {
      name: "faculties",
      to: `/${universityId}/panel/faculties`,
      icon: <FaUniversity className="text-2xl" />,
    },
    {
      name: "professors",
      to: `/${universityId}/panel/professors`,
      icon: <GiTeacher className="text-2xl" />,
    },
  ];

  return (
    <Layout sidebarLinks={sidebarLinks} >
      <Outlet />
    </Layout>
  );
}

export default DashboardLayout;
