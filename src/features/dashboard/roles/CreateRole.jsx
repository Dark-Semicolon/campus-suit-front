import Header from "../components/Header";
import CreateForm from "./components/CreateForm";

function CreateRole() {
    let pagesLinks = [
        {
            name: "انشاء دور جديد",
            link: `/admin/roles`,
        },
        { name: "الصفحة الرئيسية", link: `/` },
        { name: "الأدوار", link: `/admin/roles` },
    ];

    return (
        <div>
            <Header pageName="انشاء دور جديد" pages={pagesLinks} className="text-2xl" />
            <CreateForm />
        </div>
    )
}

export default CreateRole