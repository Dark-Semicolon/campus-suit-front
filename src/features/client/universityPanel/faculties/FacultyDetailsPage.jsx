import DashboardHeader from "@/components/DashboardHeader";
import { useParams } from "react-router-dom";
import Stats from "./components/Stats";
import Operations from "./Operations";

function FacultyDetailsPage() {
    const { universityId } = useParams();
    let pagesLinks = [
        {
            name: "Faculty Details",
            link: `/`,
        },
        { name: "My Universities", link: `/user/universities` },

        { name: "Faculties", link: `/${universityId}/panel/faculties` },
    ];

    return (
        <section>
            <div className="flex items-center justify-between">

                <DashboardHeader
                    pageName="Faculty Details"
                    pages={pagesLinks}
                    className="text-2xl"
                />

                <Operations />
            </div>

            {/* Stats And Data visualization component  */}
            <section className="lg:px-16">

                <Stats />

            </section>
        </section>
    );
}

export default FacultyDetailsPage;
