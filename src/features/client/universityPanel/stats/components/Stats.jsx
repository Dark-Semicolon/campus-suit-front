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
    const widthOfBarChart = `${barChartLength * 300}px`;

    return (
        <div className="py-8">
            <section className="flex flex-wrap items-center justify-center w-full gap-8 px-5 pb-20 md:px-2 ">
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

            <section className="w-full h-full py-10 m-auto bg-white rounded-lg md:w-9/12">
                <div className="p-5">
                    <h2 className="mb-5 text-xl capitalize md:text-3xl text-blue-color-light">
                        Faculty{" "}
                        <span className="text-blue-color-primary">
                            Analysis
                        </span>
                    </h2>
                    <p className="pb-3 ps-5">
                        Average Students Number Per Faculty
                    </p>
                </div>
                <div className="overflow-x-scroll">
                    <div
                        className="m-auto"
                        style={{
                            width:
                                barChartLength < 7 ? "100%" : widthOfBarChart,
                        }}
                    >
                        <CustomBarChart
                            data={departmentsPerFacultyCount}
                            xDataKey="name"
                            barDataKey="departments_count"
                            xLable={"Faculties"}
                            yLable={"Students Count"}
                            barColor={"#4E74F9"}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Stats;
