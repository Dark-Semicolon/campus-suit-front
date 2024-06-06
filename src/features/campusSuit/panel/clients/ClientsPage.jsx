import DashboardHeader from '@/components/DashboardHeader';
import ClientsTable from './components/ClientsTable'
function ClientsPage() {
    let pagesLinks = [
        {
            name: "Clients",
            link: `/admin/clients`,
        },
        {
            name: "Dashboard",
            link: `/admin/dashboard`,
        },

    ];

    return (
        <section>
            <DashboardHeader pageName="Clients" pages={pagesLinks} className="text-2xl" />
            <div className="py-16">
                <ClientsTable />
            </div>
        </section>
    )
}

export default ClientsPage