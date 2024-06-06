import DashboardHeader from '@/components/DashboardHeader';

function Dashboard() {
    let pagesLinks = [
        {
            name: "Dashboard",
            link: `/admin/dashboard`,
        },
        {
            name: "Home",
            link: `/`,
        },

    ];

    return (
        <section>
            <DashboardHeader pageName="Dashboard" pages={pagesLinks} className="text-2xl" />
        </section>
    )
}

export default Dashboard