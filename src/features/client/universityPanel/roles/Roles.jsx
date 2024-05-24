import { useParams } from "react-router-dom";
import RolesTable from "./components/RolesTable";
import DashboardHeader from "@/components/DashboardHeader";

function Roles() {
  const { universityId, facultyId } = useParams();

  let pagesLinks = [
    {
      name: "Roles",
      link: `/${universityId}/panel/faculties/${facultyId}/roles`,
    },
    { name: "My Universities", link: `/user/universities` },

    { name: "Faculties", link: `/${universityId}/panel/faculties` },
    { name: "Faculty Detail", link: `/${universityId}/panel/faculties/${facultyId}` },
  ];

  return (
    <div>
      <DashboardHeader pageName="Roles" pages={pagesLinks} className="text-2xl" />

      <RolesTable />
    </div>
  );
}

export default Roles;
