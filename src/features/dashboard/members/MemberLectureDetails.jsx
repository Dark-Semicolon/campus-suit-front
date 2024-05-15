import { useParams, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Pagination from '@/components/Pagination';
import { parseSearchParams } from '@/utils/helpers';
import ItemsSection from "./components/ItemsSection";
import { useUserLectures } from "./hooks/useUserLectures";
import LectureItemsSkeleton from "./components/LectureItemsSkeleton";
import Alerts from "../../../components/Alerts";
import _ from "lodash";

function MemberLectureDetails() {
    const { userId, lectureId } = useParams()
    const [searchParams] = useSearchParams();

    let pagesLinks = [
        {
            name: "تفاصيل الحصة",
            link: `members/${userId}/lectures`,
        },
        { name: "الصفحة الرئيسية", link: `/` },
        {
            name: "الأعضاء",
            link: `/admin/members`,
        },
        {
            name: "حصص الطالب",
            link: `/admin/members/${userId}/lectures`,
        },
    ];

    const page = parseSearchParams(
        searchParams,
        "page",
        (value) => (parseInt(value, 10) < 1 ? 1 : parseInt(value, 10)),
        1
    );
    const perPage = 8

    const includeFields = 'items';

    const include = [
        { field: "IsAttended", value: "true" },
        { field: "IsSuccess", value: "true" },
        { field: "MyViews", value: "true" },
    ]

    const filter = { field: 'id', value: lectureId }

    const { userLectures, isPending, isSuccess } = useUserLectures({ userId, include, includeFields, page, perPage, filter })

    const totalPages = Math.ceil(userLectures?.meta?.total / userLectures?.meta?.per_page);

    return (
        <div>
            <Header pageName="تفاصيل الحصة" pages={pagesLinks} className="text-2xl" />

            {_.isEmpty(userLectures?.data) && !isPending &&
                <section className="w-1/2 pt-16 mx-auto">
                    <Alerts
                        variant={"filled"}
                        severity={"error"}
                        message={"لا يوجد محتوي بداخل الحصة"}
                    />
                </section>
            }
            {
                isSuccess && !isPending ?
                    <ItemsSection lectureItems={userLectures?.data[0]} /> :
                    <LectureItemsSkeleton />
            }
            {
                totalPages > 1 && !isPending && <Pagination total={totalPages} className='mx-auto w-fit' />
            }
        </div>
    );
}

export default MemberLectureDetails