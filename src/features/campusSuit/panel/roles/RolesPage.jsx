
import DashboardHeader from '@/components/DashboardHeader';
import RolesTable from './components/RolesTable';

function RolesPage() {
    let pagesLinks = [
        {
            name: "Roles",
            link: `/admin/roles`,
        },
        {
            name: "Dashboard",
            link: `/admin/dashboard`,
        },

    ];

    return (
        <div>
            <DashboardHeader pageName="Roles" pages={pagesLinks} className="text-2xl" />

            <RolesTable />
        </div>

    )
}

export default RolesPage