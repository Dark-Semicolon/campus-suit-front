import { useParams } from "react-router-dom";
import { Spinner } from "@nextui-org/react";

import StatisticsCard from "@/components/StatisticsCard";
import CustomBarChart from "@/components/CustomBarChart";
import { useUniversityStats } from "../hooks/useUniversityStats";

function Stats() {
    const { universityId } = useParams();
    const { universityStats, isPending } = useUniversityStats({ universityId });
    if (isPending)
        return (
            <Spinner className="flex items-center justify-center h-screen" />
        );

    const {
        studentsCount,
        facultiesCount,
        professorsCount,
        departmentsPerFacultyCount,
    } = universityStats;

    const barChartLength = departmentsPerFacultyCount.length;
    const widthOfBarChart = `w-[${barChartLength * 100}px]`;

    return (
        <>
            <section className="flex flex-wrap items-center justify-center w-full gap-8 px-5 py-20 md:px-2 ">
                <StatisticsCard
                    img={"/images/campusSuit/student.svg"}
                    imgClassName={"bg-gray-200"}
                    title={"Students"}
                    number={studentsCount || 0}
                    width={"xl:w-[392px]"}
                />

                <StatisticsCard
                    img={"/images/campusSuit/faculty.svg"}
                    imgClassName={"bg-gray-200"}
                    title={"Faculties"}
                    number={facultiesCount || 0}
                    width={"w- xl:w-[392px]"}
                />

                <StatisticsCard
                    img={"/images/campusSuit/professor.svg"}
                    imgClassName={"bg-gray-200"}
                    title={"Professors"}
                    number={professorsCount || 0}
                    width={"xl:w-[392px]"}
                />
            </section>

            <section className="w-full h-full py-10 m-auto bg-white rounded-lg md:w-10/12">
                <div className="overflow-x-scroll">
                    <div
                        className={`${
                            barChartLength < 7 ? "w-full" : widthOfBarChart
                        }`}
                    >
                        <CustomBarChart
                            data={departmentsPerFacultyCount}
                            xDataKey="name"
                            barDataKey="departments_count"
                            xLable={"Departments"}
                            yLable={"Students Count"}
                            barColor={"#4E74F9"}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Stats;
