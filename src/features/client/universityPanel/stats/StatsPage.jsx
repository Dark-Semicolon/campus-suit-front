import DashboardHeader from "@/components/DashboardHeader";
import Stats from "./components/Stats";

function StatsPage() {

    let pagesLinks = [

        { name: "University Stats", link: `/user/universities` },

        { name: "My Universities", link: `/user/universities` },
    ];

    return (
        <div>
            <DashboardHeader pageName="University Stats" pages={pagesLinks} className="text-2xl" />

            <Stats />

        </div>
    );
}

export default StatsPage;
