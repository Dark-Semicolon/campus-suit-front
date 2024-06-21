import { Outlet, useParams } from "react-router-dom";
import Layout from "./components/Layout";

import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

function DashboardLayout() {
    const { universityId } = useParams();

    const sidebarLinks = [
        {
            name: "Dashboard",
            to: `${universityId}/panel/stats`,
            icon: <RxDashboard className="text-2xl" />,
        },
        {
            name: "professors",
            to: `/${universityId}/panel/professors`,
            icon: <FaChalkboardTeacher className="text-2xl" />,
        },
        {
            name: "faculties",
            to: `/${universityId}/panel/faculties`,
            icon: <FaUniversity className="text-2xl" />,
        },
    ];

    return (
        <div className="bg-blue-color-primary">

            <Layout sidebarLinks={sidebarLinks}>
                <Outlet />
            </Layout>
        </div>
    );
}

export default DashboardLayout;
