import { useParams } from "react-router-dom"
import DashboardHeader from '@/components/DashboardHeader';
import AssignPermissionsForm from "./components/AssignPermissionsForm";
import AssignRolesForm from "./components/AssignRolesForm";
import { Tab, Tabs } from "@nextui-org/react";

function AssignPermissionsPage() {
    const { id } = useParams()

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
                        <AssignPermissionsForm />
                    </Tab>
                    <Tab key="Roles" title="Roles" className="bg-white text-white-color ">
                        <AssignRolesForm />
                    </Tab>
                </Tabs>
            </div>
        </section>
    )
}

export default AssignPermissionsPage