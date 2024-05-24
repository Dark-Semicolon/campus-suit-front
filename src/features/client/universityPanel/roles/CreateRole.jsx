import { useParams } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import RoleForm from "./components/RoleForm";

function CreateRole() {
  const { universityId, facultyId } = useParams();

  let pagesLinks = [
    {
      name: "Create Role",
      link: `/${universityId}/panel/faculties/${facultyId}/roles/create`,
    },
    { name: "My Universities", link: `/user/universities` },

    { name: "Roles", link: `/${universityId}/panel/faculties/${facultyId}/roles` },
    { name: "Faculty", link: `/${universityId}/panel/faculties/${facultyId}` },
  ];

  return (
    <div>
      <DashboardHeader pageName="Create Role" pages={pagesLinks} className="text-2xl" />
      <RoleForm />
    </div>
  );
}

export default CreateRole;
