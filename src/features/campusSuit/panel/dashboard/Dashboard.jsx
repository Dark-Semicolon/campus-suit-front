import DashboardHeader from "@/components/DashboardHeader";
import Statistics from "./components/Statistics";
import { useDashboard } from "./hooks/useDashboard";
import LoaderPage from "../../../../components/LoaderPage";

function Dashboard() {
    let pagesLinks = [
        {
            name: "Dashboard",
            link: `/admin/dashboard`,
        },
        {
            name: "Home",
            link: `/`,
        },
    ];

    const { dashboardStats, isPending } = useDashboard();

    if (isPending) return <LoaderPage />;
    return (
        <section className="">
            <DashboardHeader
                pageName="Dashboard"
                pages={pagesLinks}
                className="text-2xl"
            />
            <Statistics dashboardStats={dashboardStats} />
        </section>
    );
}

export default Dashboard;
