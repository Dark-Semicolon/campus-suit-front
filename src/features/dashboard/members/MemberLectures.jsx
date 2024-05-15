import { useParams } from "react-router-dom";
import Header from "../components/Header";
import MemberLecturesTable from "./components/MemberLecturesTable";

function MemberLectures() {
    const { userId } = useParams()
    let pagesLinks = [
        {
            name: "حصص الطالب",
            link: `/members/${userId}/lectures`,
        },
        { name: "الصفحة الرئيسية", link: `/` },
        {
            name: "الأعضاء",
            link: `/admin/members`,
        },
    ];

    return (
        <div>
            <Header pageName="حصص الطالب" pages={pagesLinks} className="text-2xl" />

            <MemberLecturesTable />
        </div>
    );
}

export default MemberLectures