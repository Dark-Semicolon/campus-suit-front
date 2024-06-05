import AdminsTable from "./components/AdminsTable";
import DashboardHeader from '@/components/DashboardHeader';

function AdminsPage() {
  let pagesLinks = [
    {
      name: "Admins",
      link: `/admin/admins`,
    },
    {
      name: "Dashboard",
      link: `/admin/dashboard`,
    },

  ];

  return (
    <section>
      <DashboardHeader pageName="Admins" pages={pagesLinks} className="text-2xl" />
      <div className="py-16">
        <AdminsTable />
      </div>
    </section>
  )
}

export default AdminsPage;
