import { useParams } from "react-router-dom"
import DashboardHeader from '@/components/DashboardHeader';
import AssignPermissionsForm from "./components/AssignPermissionsForm";
import AssignRolesForm from "./components/AssignRolesForm";
import { Tab, Tabs } from "@nextui-org/react";
import { useAdmin } from "../admins/hooks/useAdmin";
import LoaderPage from '@/components/LoaderPage';

function AssignPermissionsPage() {
    const { id } = useParams()

    const { admin, isPending } = useAdmin({ adminId: id, include: ['roles', 'permissions'] })

    let pagesLinks = [
        {
            name: "Associate Permissions",
            link: `/admin/admins/${id}/permissions`,
        },
        {
            name: "Dashboard",
            link: `/admin/dashboard`,
        },
        {
            name: "Admins",
            link: `/admin/admins`,
        },

    ];

    if (isPending) return <LoaderPage />


    const roles = admin?.data?.relationships?.roles?.map(role => role.id)
    const permissions = admin?.data?.relationships?.permissions?.map(permission => permission.id)

    return (
        <section>
            <DashboardHeader pageName='Associate Permissions' pages={pagesLinks} className='text-2xl' />

            <div className="py-16 lg:w-[90%] mx-auto">
                <Tabs
                    aria-label="Options"
                    color="primary"
                    size="lg"
                    radius="sm"
                    classNames={{
                        tabList: "rounded-md p-0",
                        tab: "p-6 rounded-md",
                    }}
                >
                    {/* change user info form */}
                    <Tab key="Permissions" title="Permissions" className="bg-white text-white-color ">
                        <AssignPermissionsForm userPermissions={permissions} />
                    </Tab>
                    <Tab key="Roles" title="Roles" className="bg-white text-white-color ">
                        <AssignRolesForm userRoles={roles} />
                    </Tab>
                </Tabs>
            </div>
        </section>
    )
}

export default AssignPermissionsPage