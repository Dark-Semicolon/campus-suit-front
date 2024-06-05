import DashboardHeader from '@/components/DashboardHeader';
import UpdateForm from './components/UpdateForm';

function UpdateRolePage() {

    let pagesLinks = [
        {
            name: "Update Role",
            link: `/admin/roles`,
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
            <DashboardHeader pageName="Update Role" pages={pagesLinks} className="text-2xl" />
            <div className='py-16'>
                <UpdateForm />
            </div>
        </div>
    )
}

export default UpdateRolePage