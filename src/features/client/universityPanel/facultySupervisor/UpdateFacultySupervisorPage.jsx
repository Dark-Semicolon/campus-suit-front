import { useParams } from "react-router-dom";

import DashboardHeader from "@/components/DashboardHeader";
import UpdateFacultySupervisor from "./components/UpdateFacultySupervisor";

function UpdateFacultySupervisorPage() {
  const { universityId, facultyId, facultySupervisorId } = useParams();

  let pagesLinks = [
    {
      name: "Update Faculty Supervisor",
      link: `/${universityId}/panel/faculties/${facultyId}/facultySupervisors/${facultySupervisorId}`,
    },
    { name: "Home Page", link: `/` },

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
      <DashboardHeader pageName="Faculty Supervisor" pages={pagesLinks} className="text-2xl" />
      <UpdateFacultySupervisor />
    </div>
  );
}

export default UpdateFacultySupervisorPage;
