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

    return (
        <>
            <section className="flex flex-wrap items-center justify-center w-full gap-8 px-5 py-20 md:px-2 ">
                <StatisticsCard
                    img={"/images/campusSuit/student.svg"}
                    imgClassName={"bg-gray-200"}
                    title={"Students"}
                    number={studentsCount}
                    width={"xl:w-[392px]"}
                />

                <StatisticsCard
                    img={"/images/campusSuit/faculty.svg"}
                    imgClassName={"bg-gray-200"}
                    title={"Faculties"}
                    number={facultiesCount}
                    width={"w- xl:w-[392px]"}
                />

                <StatisticsCard
                    img={"/images/campusSuit/professor.svg"}
                    imgClassName={"bg-gray-200"}
                    title={"Professors"}
                    number={professorsCount}
                    width={"xl:w-[392px]"}
                />
            </section>

            <section className="w-full py-10 m-auto bg-white rounded-lg md:w-10/12 h-96">
                <CustomBarChart
                    data={departmentsPerFacultyCount}
                    xDataKey="name"
                    barDataKey="departments_count"
                    xLable={"Departments"}
                    yLable={"Students Count"}
                    barColor={"#4E74F9"}
                />
            </section>
        </>
    );
}

export default Stats;
