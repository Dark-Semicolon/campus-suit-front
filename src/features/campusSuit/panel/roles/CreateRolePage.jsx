import DashboardHeader from '@/components/DashboardHeader';
import RoleForm from './components/RoleForm';

function CreateRolePage() {
    let pagesLinks = [
        {
            name: "Create Role",
            link: `/admin/roles/create`,
        },
        {
            name: "Dashboard",
            link: `/admin/dashboard`,
        },
        {
            name: "Roles",
            link: `/admin/roles`,
        },

    ];

    return (
        <div>
            <DashboardHeader pageName="Create Role" pages={pagesLinks} className="text-2xl" />
            <div className='py-16'>
                <RoleForm />
            </div>
        </div>
    )
}

export default CreateRolePage