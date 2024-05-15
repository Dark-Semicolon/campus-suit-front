import Header from "../components/Header";
import MembersTable from "./components/MembersTable";

function MembersPage() {
  let pagesLinks = [
    {
      name: "الأعضاء",
      link: `/members`,
    },
    { name: "الصفحة الرئيسية", link: `/` },
  ];

  return (
    <div>
      <Header pageName="الأعضاء" pages={pagesLinks} className="text-2xl" />
      <MembersTable />
    </div>
  );
}

export default MembersPage;
