import { useParams } from "react-router-dom";
import { useFacultyStats } from "../hooks/useFacultyStats";
import Numbers from "./Numbers";
import GradesChart from "./GradesChart";
import { Spinner } from "@nextui-org/react";
import CustomPieChart from "../../../../../components/CustomPieChart";

function Stats() {
    const { universityId, facultyId } = useParams();

    const { facultyStats, isPending } = useFacultyStats({ universityId, facultyId });
    const colors = [
        "#2f4b7c",
        "#003f5c",
        "#a05195",
        "#665191",
        "#f95d6a",
        "#d45087",
        "#ffa600",
        "#ff7c43",
    ]

    const PipChartData = facultyStats.studentsPerGrade.map((ele, index) => {
        return {
            'data': ele.student_count,
            'name': `year ${ele.grade}`,
            'color': colors[index] || 'blue'
        }
    })
    return (
        <section>
            {!isPending ? <Numbers studentsCount={facultyStats.studentsCount} professorsCount={facultyStats.professorsForLatestSemesterCount} departmentsCount={facultyStats.departmentsCount} /> : <Spinner />}

            <div className="flex justify-between">
                <CustomPieChart title='Students' data={PipChartData} />
                <div>
                    <h2 className="mb-5 text-xl capitalize md:text-3xl text-blue-color-light">
                        Grades <span className="text-blue-color-primary"> Analysis</span>
                    </h2>
                    <p className="pb-3 ps-5">Average Students Grades For The Last Semester</p>
                    {!isPending ? <GradesChart AvgCourseGradesForPreviousSemester={facultyStats?.AvgCourseGradesForPreviousSemester} /> : <Spinner />}
                </div>
            </div>
        </section>
    )
}

export default Stats