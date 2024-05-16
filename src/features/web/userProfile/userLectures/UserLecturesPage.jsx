import { useSearchParams } from "react-router-dom";
import Pagination from "../../../../components/Pagination";
import SpinnerFullPage from "../../../../components/loadingPage/SpinnerFullPage";
import LectureItem from "../../lectures/components/LectureItem";
import { useUserLectures } from "./hooks/useUserLectures";
import { parseSearchParams } from "../../../../utils/helpers";
import { HiOutlineVideoCamera } from "react-icons/hi";
import HeroLinks from "../../../../components/HeroLinks";

function UserLecturesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const includeFields = ["videosCount", "quizzesCount", "studentsCount"];
  const include = [
    { field: "VideosDuration", value: "true" },
    { field: "IsOwned", value: "true" },
  ];
  const perPage = 5;

  const page = parseSearchParams(
    searchParams,
    "page",
    (value) => (parseInt(value, 10) < 1 ? 1 : parseInt(value, 10)),
    1
  );

  const { userLectures, isPending } = useUserLectures({
    includeFields,
    include,
    perPage,
    page,
  });
  if (isPending) return <SpinnerFullPage />;

  const totalPages = Math.ceil(
    userLectures?.meta.total / userLectures?.meta.per_page
  );

  if (!userLectures.data.length) {
    return (
      <>
        <div className="pt-3 space-y-5">
          <h2 className="text-xl md:text-3xl text-blue-color-primary">
            الحصص <span className="text-blue-color-light">الخاصة </span>
          </h2>
          <HeroLinks
            pages={[
              { name: "حصصي", link: `user/lectures` },
              { name: "الصفحة الرئيسية", link: "/" },
              { name: "الملف الشخصي", link: "/user/profile" },
            ]}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 h-dvh">
          <span>
            <HiOutlineVideoCamera className="text-4xl" />
          </span>
          <div>
            <p className="text-2xl font-bold text-blue-color-primary">
              لايوجد حصص حتي الأن
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="pt-3 pb-10 space-y-5">
        <h2 className="text-xl md:text-3xl text-blue-color-primary">
          الحصص <span className="text-blue-color-light">الخاصة </span>
        </h2>
        <HeroLinks
          pages={[
            { name: "حصصي", link: `user/lectures` },
            { name: "الصفحة الرئيسية", link: "/" },
            { name: "الملف الشخصي", link: "/user/profile" },
          ]}
        />
      </div>

      <div className="flex-grow">
        {userLectures?.data?.map((lecture, index) => {
          return <LectureItem lecture={lecture} key={index} />;
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-5">
          <Pagination
            setSearchParams={setSearchParams}
            page={page}
            total={totalPages}
            paginationKey="page"
          />
        </div>
      )}
    </div>
  );
}

export default UserLecturesPage;
