import StatsCard from "@/components/StatsCard"
import { PiUsersThreeFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { MdOutlineMenuBook } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
function Stats() {
    return (
        <div className="flex justify-around">
            <StatsCard title='Students number' data='2000 Student' icon={<PiUsersThreeFill />} />
            <StatsCard title='Departments' data='3 departments' icon={<FcDepartment />} />
            <StatsCard title='Professors' data='15 Professor' icon={<GiTeacher />} />
            <StatsCard title='Courses' data='30 Courses' icon={<MdOutlineMenuBook />} />
        </div>
    )
}

export default Stats