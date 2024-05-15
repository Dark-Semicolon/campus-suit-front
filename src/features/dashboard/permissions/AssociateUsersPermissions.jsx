import Header from "../components/Header";
import AssociateForm from "./components/AssociateForm";

function AssociateUsersPermissions() {
    let pagesLinks = [
        {
            name: "الصلاحيات",
            link: `/admin/permissions`,
        },
        { name: "الصفحة الرئيسية", link: `/` },
    ];
    return (
        <div>
            <Header pageName="الصلاحيات" pages={pagesLinks} className="text-2xl" />

            <AssociateForm />
        </div>
    );
}

export default AssociateUsersPermissions