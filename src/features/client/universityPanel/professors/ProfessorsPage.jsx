import DashboardHeader from "@/components/DashboardHeader";
import ProfessorsTable from "./components/ProfessorsTable";

function ProfessorsPage() {
  let pagesLinks = [
    {
      name: "Faculties",
      link: `/`,
    },
    { name: "Home Page", link: `/` },
  ];

  return (
    <div>
      <DashboardHeader pageName="Professors" pages={pagesLinks} className="text-2xl" />
      <ProfessorsTable />
    </div>
  );
}

export default ProfessorsPage;
