import DashboardHeader from "@/components/DashboardHeader";
import FacultiesTable from "./components/FacultiesTable";
function FacultiesPage() {
  let pagesLinks = [
    {
      name: "Faculties",
      link: `/`,
    },
    { name: "My Universities", link: `/user/universities` },
  ];

  return (
    <div>
      <DashboardHeader pageName="Faculties" pages={pagesLinks} className="text-2xl" />
      <FacultiesTable />
    </div>
  );
}

export default FacultiesPage;
