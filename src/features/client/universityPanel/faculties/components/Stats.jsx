import { useParams } from "react-router-dom";
import { useFacultyStats } from "../hooks/useFacultyStats";
import Numbers from "./Numbers";
import GradesChart from "./GradesChart";
import { Spinner } from "@nextui-org/react";

function Stats() {
    const { universityId, facultyId } = useParams();

    const { facultyStats, isPending } = useFacultyStats({ universityId, facultyId });
    return (
        <section className="flex flex-col gap-24">
            <Numbers />
            <div>
                <h2 className="mb-5 text-xl capitalize md:text-3xl text-blue-color-light">
                    Grades <span className="text-blue-color-primary"> Analysis</span>
                </h2>
                <p className="pb-3 ps-5">Average Students Grades For The Last Semester</p>
                {!isPending ? <GradesChart AvgCourseGradesForPreviousSemester={facultyStats?.AvgCourseGradesForPreviousSemester} /> : <Spinner />}
            </div>
        </section>
    )
}

export default Stats