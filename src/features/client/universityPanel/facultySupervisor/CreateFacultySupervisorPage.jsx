import { useParams } from "react-router-dom";

import DashboardHeader from "@/components/DashboardHeader";
import CreateFacultySupervisorForm from "./components/CreateFacultySupervisorForm";

function CreateFacultySupervisorPage() {
    const { universityId, facultyId } = useParams();

    let pagesLinks = [
        {
            name: "Create Faculty Supervisor",
            link: `/${universityId}/panel/faculties/${facultyId}/facultySupervisors`,
        },
        { name: "My Universities", link: `/user/universities` },

        { name: "Faculties", link: `/${universityId}/panel/faculties` },
        {
            name: "Faculty Details",
            link: `/${universityId}/panel/faculties/${facultyId}`,
        },
        {
            name: "Faculty Supervisor",
            link: `/${universityId}/panel/faculties/${facultyId}/facultySupervisors`,
        },
    ];
    return (
        <div>
            <DashboardHeader
                pageName="Create Faculty Supervisor"
                pages={pagesLinks}
                className="pb-10 text-2xl"
            />
            <CreateFacultySupervisorForm />;
        </div>
    );
}

export default CreateFacultySupervisorPage;
