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
        <div>
            <DashboardHeader
                pageName="Faculty Details"
                pages={pagesLinks}
                className="text-2xl"
            />
            <section className="lg:px-16">


                {/* Stats And Data visualization component  */}
                <Stats />

                <h2 className="mt-20 text-xl text-center md:text-3xl text-blue-color-primary">
                    Faculty{" "}
                    <span className="text-blue-color-light">Settings</span>
                </h2>
                <Operations />
            </section>
        </div>
    );
}

export default FacultyDetailsPage;
