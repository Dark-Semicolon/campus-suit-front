import { useParams } from "react-router-dom";
import { useFacultyStats } from "../hooks/useFacultyStats";
import Numbers from "./Numbers";
import GradesChart from "./GradesChart";
import { Spinner } from "@nextui-org/react";
import CustomPieChart from "../../../../../components/CustomPieChart";

function Stats() {
    const { universityId, facultyId } = useParams();

    const { facultyStats, isPending } = useFacultyStats({
        universityId,
        facultyId,
    });

    const colors = [
        "#2f4b7c",
        "#003f5c",
        "#a05195",
        "#665191",
        "#f95d6a",
        "#d45087",
        "#ffa600",
        "#ff7c43",
    ];

    if (isPending)
        return (
            <Spinner className="flex items-center justify-center h-screen" />
        );

    const PipChartData = facultyStats?.studentsPerGrade.map((ele, index) => {
        return {
            data: ele.student_count,
            name: `year ${ele.grade}`,
            color: colors[index] || "blue",
        };
    });

    const barChartLength =
        facultyStats?.AvgCourseGradesForPreviousSemester.length;
    const widthOfBarChart = `${barChartLength * 250}px`;

    return (
        <section>
            {!isPending ? (
                <Numbers
                    studentsCount={facultyStats?.studentsCount || 0}
                    professorsCount={
                        facultyStats?.professorsForLatestSemesterCount || 0
                    }
                    departmentsCount={facultyStats?.departmentsCount || 0}
                />
            ) : (
                <Spinner />
            )}

            <div className="flex flex-col flex-wrap items-center justify-around gap-4">
                <div className="w-full p-10 bg-white rounded-lg">
                    <CustomPieChart title="Students" data={PipChartData} />
                </div>
                <div className="w-full p-10 bg-white rounded-lg">
                    <h2 className="mb-5 text-xl capitalize md:text-3xl text-blue-color-light">
                        Grades{" "}
                        <span className="text-blue-color-primary">
                            {" "}
                            Analysis
                        </span>
                    </h2>
                    <p className="pb-3 ps-5">
                        Average Students Grades For The Last Semester
                    </p>
                    <div className="overflow-x-scroll">
                        <div
                            style={{
                                width:
                                    barChartLength < 7
                                        ? "100%"
                                        : widthOfBarChart,
                            }}
                        >
                            {!isPending ? (
                                <GradesChart
                                    AvgCourseGradesForPreviousSemester={
                                        facultyStats?.AvgCourseGradesForPreviousSemester
                                    }
                                />
                            ) : (
                                <Spinner />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Stats;
