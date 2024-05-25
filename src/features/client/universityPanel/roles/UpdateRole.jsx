import DashboardHeader from "@/components/DashboardHeader";
import UpdateForm from "./components/UpdateForm";
import { useParams } from "react-router-dom";

function UpdateRole() {
  const { universityId, facultyId } = useParams();

  let pagesLinks = [
    {
      name: "Edit Role",
      link: `/admin/roles`,
    },
    { name: "My Universities", link: `/user/universities` },

    { name: "Faculties", link: `/${universityId}/panel/faculties` },
    { name: "Faculty Detail", link: `/${universityId}/panel/faculties/${facultyId}` },
    { name: "Roles", link: `/${universityId}/panel/faculties/${facultyId}/roles` },
  ];

  return (
    <div>
      <DashboardHeader pageName="Roles" pages={pagesLinks} className="text-2xl" />
      <UpdateForm />
    </div>
  );
}

export default UpdateRole;
