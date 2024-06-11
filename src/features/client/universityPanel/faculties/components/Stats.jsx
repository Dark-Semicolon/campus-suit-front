import { useParams } from "react-router-dom";
import { useFacultyStats } from "../hooks/useFacultyStats";
import Numbers from "./Numbers";
import GradesChart from "./GradesChart";
import { Spinner } from "@nextui-org/react";
import CustomPieChart from "@/components/CustomPieChart";

function Stats() {
    const { universityId, facultyId } = useParams();

    const { facultyStats, isPending } = useFacultyStats({
        universityId,
        facultyId,
    });

    // For Students Per Departments
    const colorsPalette1 =
        ["#b30000", "#7c1158", "#4421af", "#1a53ff", "#0d88e6", "#00b7c7", "#5ad45a", "#8be04e", "#ebdc78"]


    // For Students Per Grades
    const colorsPalette2 = [
        "#003f5c",
        "#2f4b7c",
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

    const studentsPerGradeData = facultyStats?.studentsPerGrade.map((ele, index) => {
        return {
            data: ele.student_count,
            name: `Year ${ele.grade}`,
            color: colorsPalette2[index] || "blue",
        };
    });
    const studentsPerDepartmentData = facultyStats?.studentsPerDepartment?.map((ele, index) => {
        return {
            data: ele.students_count,
            name: ele.name,
            color: colorsPalette1[index] || "blue",
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

                <div className="flex flex-wrap justify-around w-full p-10 bg-white rounded-lg">
                    <CustomPieChart title="Students per Years " data={studentsPerGradeData} key={1} />
                    <CustomPieChart title="Students per Departments" data={studentsPerDepartmentData} key={2} />
                </div>

                <div className="w-full bg-white rounded-lg md:p-10">
                    <h2 className="mb-5 text-xl capitalize md:text-3xl text-blue-color-light">
                        Grades{" "}
                        <span className="text-blue-color-primary">
                            {" "}
                            Analysis
                        </span>
                    </h2>
                    <p className="pb-5 ps-5">
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
