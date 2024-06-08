import {
    Bar,
    BarChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    LabelList,
    ResponsiveContainer,
    Brush,
} from "recharts";
import { convertGpaToLetterGrade } from "@/utils/helpers";

const grades = [
    "F ",
    "D-",
    "D ",
    "D+",
    "C-",
    "C ",
    "C+",
    "B-",
    "B ",
    "B+",
    "A-",
    "A ",
    "A+",
    "",
];

function GradesChart({ AvgCourseGradesForPreviousSemester }) {
    const data =
        AvgCourseGradesForPreviousSemester?.map((ele) => ({
            average_GPA: convertGpaToLetterGrade(
                ele.student_grades_avg_course_grade
            ),
            GPA: ele.student_grades_avg_course_grade,
            courseName: ele.course.name,
        })) || [];

    return (
        <ResponsiveContainer width="100%" height={600}>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 100,
                }}
                barSize={50}
                barGap={10}
            >
                <XAxis
                    tickMargin={10}
                    type="category"
                    dataKey="courseName"
                    padding={{ left: 40, right: 40 }}
                />
                <YAxis
                    tickMargin={15}
                    type="category"
                    dataKey="average_GPA"
                    domain={grades}
                    interval={0}
                    tickFormatter={(tick) => tick}
                    ticks={grades}
                    tick={({ x, y, payload }) => (
                        <text
                            x={x}
                            y={y}
                            textAnchor="start"
                            fill="#666"
                            dy={0}
                            dx={-10}
                        >
                            {payload.value}
                        </text>
                    )}
                />
                <Tooltip />
                <Brush dataKey="name" height={20} stroke="#4E74F9" y={520} />
                {/* <Legend verticalAlign="bottom" height={36} /> */}
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                    dataKey="average_GPA"
                    fill="#4E74F9"
                    background={{ fill: "#eee" }}
                >
                    <LabelList dataKey="average_GPA" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default GradesChart;
