import StatisticsCard from "@/components/StatisticsCard";

function Statistics({ dashboardStats }) {
    const {
        studentsCount,
        universitiesCount,
        professorsCount,
        facultiesCount,
        clientsCount,
    } = dashboardStats;
    return (
        <div className="flex flex-wrap items-center justify-center gap-4 px-5 py-20 md:px-2">
            <StatisticsCard
                img={"/images/campusSuit/student.svg"}
                imgClassName={"bg-gray-200"}
                title={"Students"}
                number={studentsCount}
            />
            <StatisticsCard
                img={"/images/campusSuit/university.svg"}
                title={"Universities"}
                number={universitiesCount}
            />
            <StatisticsCard
                img={"/images/campusSuit/professor.svg"}
                imgClassName={"bg-gray-200"}
                title={"Professors"}
                number={professorsCount}
            />
            <StatisticsCard
                img={"/images/campusSuit/faculty.svg"}
                imgClassName={"bg-gray-200"}
                title={"Faculties"}
                number={facultiesCount}
            />
            <StatisticsCard
                img={"/images/campusSuit/client.svg"}
                imgClassName={"bg-gray-200"}
                title={"Clients"}
                number={clientsCount}
            />
        </div>
    );
}

export default Statistics;
