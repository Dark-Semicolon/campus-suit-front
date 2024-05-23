import DashboardHeader from "@/components/DashboardHeader";
import FucultiesTable from "./components/FucultiesTable";
function FacultiesPage() {
  let pagesLinks = [
    {
      name: "Faculties",
      link: `/members`,
    },
    { name: "Home Page", link: `/` },
  ];

  return (
    <div>
      <DashboardHeader pageName="Faculties" pages={pagesLinks} className="text-2xl" />
      <FucultiesTable />
    </div>
  );
}

export default FacultiesPage;
