import Header from "../components/Header";
import RolesTable from "./components/RolesTable";

function Roles() {
    let pagesLinks = [
        {
            name: "الأدوار",
            link: `/admin/roles`,
        },
        { name: "الصفحة الرئيسية", link: `/` },
    ];

    return (
        <div>
            <Header pageName="الأدوار" pages={pagesLinks} className="text-2xl" />

            <RolesTable />
        </div>
    );
}

export default Roles