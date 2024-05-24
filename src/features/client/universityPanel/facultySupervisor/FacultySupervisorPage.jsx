import { useParams } from "react-router-dom";

import DashboardHeader from "@/components/DashboardHeader";
import FacultySupervisorTable from "./components/FacultySupervisorTable";

function FacultySupervisorPage() {
  const { universityId, facultyId } = useParams();
  let pagesLinks = [
    {
      name: "Faculty Supervisor",
      link: `/`,
    },
    { name: "My Universities", link: `/user/universities` },

    { name: "Faculties", link: `/${universityId}/panel/faculties` },
    {
      name: "Faculty Details",
      link: `/${universityId}/panel/faculties/${facultyId}`,
    },
  ];

  return (
    <section>
      <DashboardHeader pageName="Faculty Supervisor" pages={pagesLinks} className="text-2xl" />
      <FacultySupervisorTable />
    </section>
  );
}

export default FacultySupervisorPage;
