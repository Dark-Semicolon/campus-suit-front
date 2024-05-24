import DashboardHeader from "@/components/DashboardHeader";
import FucultiesTable from "./components/FucultiesTable";
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
      <FucultiesTable />
    </div>
  );
}

export default FacultiesPage;
