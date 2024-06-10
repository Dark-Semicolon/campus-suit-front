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

const gradeMap = [
    "F",  // F
    "D-", // DM
    "D",  // D
    "D+", // DP
    "C-", // CM
    "C",  // C
    "C+", // CP
    "B-", // BM
    "B",  // B
    "B+", // BP
    "A-", // AM
    "A",  // A
    "A+"  // AP
];


function GradesChart({ AvgCourseGradesForPreviousSemester }) {
    const data =
        AvgCourseGradesForPreviousSemester?.map((ele) => ({
            average_GPA: Math.round(ele.student_grades_avg_course_grade), // Numeric value
            GPA: ele.student_grades_avg_course_grade,
            courseName: ele.course.name,
        })) || [];

    return (
        <ResponsiveContainer width="100%" height={620}>
            <BarChart
                data={data}
                margin={{
                    top: 20,
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
                    label={{
                        value: 'Course Name',
                        position: "insideBottomLeft",
                        offset: -70,
                    }}
                    padding={{ left: 40, right: 40 }}
                />
                <YAxis
                    tickMargin={15}
                    type="number"
                    domain={[0, gradeMap.length - 1]}
                    interval={0}
                    tickFormatter={(tick) => gradeMap[tick]}
                    label={{
                        value: 'GPA',
                        position: "insideTopLeft",
                        offset: -20,
                    }}
                    ticks={Array.from({ length: gradeMap.length }, (_, i) => i)}
                    tick={({ x, y, payload }) => (
                        <text
                            x={x}
                            y={y}
                            textAnchor="start"
                            fill="#666"
                            dy={0}
                            dx={-10}
                        >
                            {gradeMap[payload.value]}
                        </text>
                    )}
                />
                <Tooltip
                    formatter={(value) => gradeMap[value]}
                    labelFormatter={(label) => `Course: ${label}`}
                />
                <Brush dataKey="courseName" height={20} stroke="#4E74F9" y={520} />

                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                    dataKey="average_GPA"
                    fill="#4E74F9"
                    background={{ fill: "#eee" }}
                >
                    <LabelList
                        dataKey="average_GPA"
                        position="top"
                        formatter={(value) => gradeMap[value]}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default GradesChart;
