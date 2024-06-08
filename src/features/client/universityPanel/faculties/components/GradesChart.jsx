
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, LabelList, ResponsiveContainer, Legend, Brush } from "recharts";
import { convertGpaToLetterGrade } from '@/utils/helpers';



const grades = ['F ', 'D-', 'D ', 'D+', 'C-', 'C ', 'C+', 'B-', 'B ', 'B+', 'A-', 'A ', 'A+', '']

function GradesChart({ AvgCourseGradesForPreviousSemester }) {



    const data = AvgCourseGradesForPreviousSemester?.map(ele => ({
        'average_GPA': convertGpaToLetterGrade(ele.student_grades_avg_course_grade),
        'GPA': ele.student_grades_avg_course_grade,
        'courseName': ele.course.name
    })) || [];


    return (
        <ResponsiveContainer width='100%' height={600}>


            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 100
                }}
                barSize={50}
                barGap={10}
            >
                <XAxis tickMargin={10} type="category" dataKey="courseName" padding={{ left: 40, right: 40 }} />
                <YAxis
                    tickMargin={15}
                    type="category"
                    dataKey="average_GPA"
                    domain={grades}
                    interval={0}
                    tickFormatter={tick => tick}
                    ticks={grades}

                />
                <Tooltip />
                {data.length > 6 && <Brush dataKey="name" height={20} stroke="#8884d8" />}
                {/* <Legend verticalAlign="bottom" height={36} /> */}
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="average_GPA" fill="#8884d8" background={{ fill: '#eee' }}>
                    <LabelList dataKey="average_GPA" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default GradesChart;
