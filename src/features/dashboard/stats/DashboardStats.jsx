import { useStats } from "./hooks/useStats";
import Header from "../components/Header";
import CustomPieChart from "./components/CustomPieChart";
import StatsCard from "../../../components/StatsCard";

import { PiStudentDuotone } from "react-icons/pi";
import { BiSolidOffer } from "react-icons/bi";
import { GiTeacher } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import usePermission from "./../../../hooks/usePermission";
import { MdMenuBook } from "react-icons/md";

function DashboardStats() {
  const { can } = usePermission();

  const { stats, isPending } = useStats();

  let pagesLinks = [
    {
      name: "الأحصائيات",
      link: `/admin/dashboard`,
    },
    { name: "الصفحة الرئيسية", link: `/` },
  ];

  if (isPending) return null;

  const {
    studentCountFirstGrade,
    studentCountSecondGrade,
    studentCountThirdGrade,
    courseCountFirstGrade,
    courseCountSecondGrade,
    courseCountThirdGrade,
    lectureCountFirstGrade,
    lectureCountSecondGrade,
    lectureCountThirdGrade,
    offerCountFirstGrade,
    offerCountSecondGrade,
    offerCountThirdGrade,
    soldLecturesCount,
  } = stats;

  const studentsStats = [
    {
      name: "طلاب الصف الأول",
      data: studentCountFirstGrade,
      color: "#ffaa00",
    },
    {
      name: "طلاب الصف الثاني",
      data: studentCountSecondGrade,
      color: "#7a869a",
    },
    {
      name: "طلاب الصف الثالث",
      data: studentCountThirdGrade,
      color: "#172b4d",
    },
  ];

  const coursesStats = [
    {
      name: "وحدات الصف الأول",
      data: courseCountFirstGrade,
      color: "#FED049",
    },
    {
      name: "وحدات الصف الثاني",
      data: courseCountSecondGrade,
      color: "#007580",
    },
    {
      name: "وحدات الصف الثالث",
      data: courseCountThirdGrade,
      color: "#282846",
    },
  ];

  const lecturesStats = [
    {
      name: " حصص الصف الأول",
      data: lectureCountFirstGrade,
      color: "#1C1678",
    },
    {
      name: " حصص الصف الثاني",
      data: lectureCountSecondGrade,
      color: "#15F5BA",
    },
    {
      name: "حصص الصف الثالث",
      data: lectureCountThirdGrade,
      color: "#7BC9FF",
    },
  ];

  const offersStats = [
    {
      name: "عروض الصف الأول",
      data: offerCountFirstGrade,
      color: "#C70039",
    },
    {
      name: "عروض الصف الثاني",
      data: offerCountSecondGrade,
      color: "#141E46",
    },
    {
      name: "عروض الصف الثالث",
      data: offerCountThirdGrade,
      color: "#F79327",
    },
  ];

  const totalStudents = studentCountFirstGrade + studentCountSecondGrade + studentCountThirdGrade;
  const totalCourses = courseCountFirstGrade + courseCountSecondGrade + courseCountThirdGrade;
  const totalLectures = lectureCountFirstGrade + lectureCountSecondGrade + lectureCountThirdGrade;
  const totalOffers = offerCountFirstGrade + offerCountSecondGrade + offerCountThirdGrade;

  return (
    <div>
      <Header
        pageName="الأحصائيات"
        pages={pagesLinks}
        className="text-2xl"
      />

      <section className="flex flex-wrap justify-center gap-10 py-16">
        {can("read:users") && (
          <StatsCard
            title="مجموع الطلاب"
            icon={<PiStudentDuotone className="text-6xl" />}
            data={`${totalStudents} طلاب`}
          />
        )}

        {can("read:course:lectures") && (
          <StatsCard
            title="مجموع الحصص المباعه"
            icon={<GiTakeMyMoney className="text-6xl text-green-800" />}
            data={`${soldLecturesCount} حصة`}
          />
        )}

        {can("read:courses") && (
          <StatsCard
            title="مجموع الوحدات"
            icon={<MdMenuBook className="text-6xl text-red-600" />}
            data={`${totalCourses} وحدة`}
          />
        )}

        {can("read:course:lectures") && (
          <StatsCard
            title="مجموع الحصص"
            icon={<GiTeacher className="text-6xl text-yellow-color-primary" />}
            data={`${totalLectures} حصة`}
          />
        )}

        {can("read:offers") && (
          <StatsCard
            title="مجموع العروض"
            icon={<BiSolidOffer className="text-6xl text-green-400" />}
            data={`${totalOffers} عرض`}
          />
        )}
      </section>
      <section className="flex flex-wrap justify-around py-16 gap-x-5 gap-y-20">
        {can("read:users") && (
          <CustomPieChart
            data={studentsStats}
            title="الطلاب"
          />
        )}
        {can("read:courses") && (
          <CustomPieChart
            data={coursesStats}
            title="الوحدات"
          />
        )}
        {can("read:course:lectures") && (
          <CustomPieChart
            data={lecturesStats}
            title="الحصص"
          />
        )}
        {can("read:offers") && (
          <CustomPieChart
            data={offersStats}
            title="العروض"
          />
        )}
      </section>
    </div>
  );
}

export default DashboardStats;
