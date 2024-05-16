import { useSearchParams } from "react-router-dom";
import SpinnerFullPage from "../../../../components/loadingPage/SpinnerFullPage";
import { parseSearchParams } from "../../../../utils/helpers";
import QuizResultCard from "./components/QuizResultCard";
import { useUserQuizResults } from "./hooks/useUserQuizResults";
import Pagination from "../../../../components/Pagination";
import { GoChecklist } from "react-icons/go";
import HeroLinks from "../../../../components/HeroLinks";
import { Spinner } from "@nextui-org/react";

function UserQuizResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const includeFields = ["quiz", "quiz.lecture"];
  const include = [{ field: "IsSuccess", value: "true" }];
  const perPage = 6;

  const page = parseSearchParams(
    searchParams,
    "page",
    (value) => (parseInt(value, 10) < 1 ? 1 : parseInt(value, 10)),
    1
  );

  const { userQuizResults, isPending } = useUserQuizResults({
    include,
    includeFields,
    page,
    perPage,
  });

  if (isPending) return <SpinnerFullPage />;

  const totalPages = Math.ceil(
    userQuizResults?.meta.total / userQuizResults?.meta.per_page
  );

  if (!userQuizResults.data.length && !isPending) {
    return (
      <>
        <div className="pt-3 space-y-5">
          <h2 className="text-xl md:text-3xl text-blue-color-primary">
            نتائج <span className="text-blue-color-light">الأختبارات </span>
          </h2>
          <HeroLinks
            pages={[
              { name: "نتائج الأختبارات", link: `user/quizResults` },
              { name: "الصفحة الرئيسية", link: "/" },
              { name: "الملف الشخصي", link: "/user/profile" },
            ]}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 h-dvh">
          <span>
            <GoChecklist className="text-4xl" />
          </span>
          <div>
            <p className="text-2xl font-bold text-blue-color-primary">
              لايوجد نتائج امتحانات حتي الأن
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="pt-3 pb-10 space-y-5">
        <h2 className="text-xl md:text-3xl text-blue-color-primary">
          نتائج <span className="text-blue-color-light">الأختبارات </span>
        </h2>
        <HeroLinks
          pages={[
            { name: "نتائج الأختبارات", link: `user/quizResults` },
            { name: "الصفحة الرئيسية", link: "/" },
            { name: "الملف الشخصي", link: "/user/profile" },
          ]}
        />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5">
        {isPending ? (
          <div className="py-5 mx-auto">
            <Spinner color="warning" size="lg" />
          </div>
        ) : (
          userQuizResults?.data?.map((quiz) => (
            <QuizResultCard quiz={quiz} key={quiz.id} />
          ))
        )}
      </div>

      {totalPages > 1 && !isPending && (
        <div className="flex items-center justify-center mt-10">
          <Pagination
            setSearchParams={setSearchParams}
            page={page}
            total={totalPages}
            paginationKey="page"
          />
        </div>
      )}
    </>
  );
}

export default UserQuizResultsPage;
