import DashboardHeader from "@/components/DashboardHeader";
import Stats from "./components/Stats";

function StatsPage() {

    let pagesLinks = [

        { name: "University Stats", link: `/user/universities` },

        { name: "Home Page", link: `/` },
    ];

    return (
        <div>
            <DashboardHeader pageName="University Stats" pages={pagesLinks} className="text-2xl" />

            <Stats />

        </div>
    );
}

export default StatsPage;
