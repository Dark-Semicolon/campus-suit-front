import StatsCard from "@/components/StatsCard"
import { PiUsersThreeFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { MdOutlineMenuBook } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import CustomPieChart from "../../../../../components/CustomPieChart";

const studentsStats = [
    {
        name: "Computer Science",
        data: 50,
        color: "#01204E",
    },
    {
        name: "business",
        data: 20,
        color: "#028391",
    },
    {
        name: "engineering",
        data: 35,
        color: "#FEAE6F",
    },
];

const professorsStats = [
    {
        name: "Computer Science",
        data: 10,
        color: "#211951",
    },
    {
        name: "business",
        data: 5,
        color: "#836FFF",
    },
    {
        name: "engineering",
        data: 20,
        color: "#15F5BA",
    },
];
const departmentsStats = [
    {
        name: "Computer Science",
        data: 10,
        color: "#387ADF",
    },
    {
        name: "engineering",
        data: 5,
        color: "#333A73",
    },
    {
        name: "business",
        data: 20,
        color: "#FBA834",
    },
];
function Stats() {
    return (
        <>
            <section className="flex justify-around py-16">
                <StatsCard title='Students number' data='2000 Student' icon={<PiUsersThreeFill className="text-[#01204E]" />} />
                <StatsCard title='Departments' data='3 departments' icon={<FcDepartment />} />
                <StatsCard title='Professors' data='15 Professor' icon={<GiTeacher className="text-[#836FFF]" />} />
                <StatsCard title='Faculties' data='5 Faculty' icon={<MdOutlineMenuBook />} />
            </section>
            <section className="flex justify-around pt-16">
                <CustomPieChart title={'Students'} data={studentsStats} />
                <CustomPieChart title={'Departments'} data={departmentsStats} />
                <CustomPieChart title={'Professors'} data={professorsStats} />
            </section>
        </>
    )
}

export default Stats