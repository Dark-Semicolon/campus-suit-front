import Header from "../components/Header";
import UpdateForm from "./components/UpdateForm";

function UpdateRole() {
    let pagesLinks = [
        {
            name: "تعديل الدور",
            link: `/admin/roles`,
        },
        { name: "الصفحة الرئيسية", link: `/` },
        { name: "الأدوار", link: `/admin/roles` },
    ];

    return (
        <div>
            <Header pageName="تعديل الدور" pages={pagesLinks} className="text-2xl" />
            <UpdateForm />
        </div>
    )
}

export default UpdateRole