import StatisticsCard from "@/components/StatisticsCard";

function Numbers({ studentsCount, departmentsCount, professorsCount }) {



    return (
        <section className="flex flex-wrap items-center justify-center w-full gap-8 px-5 py-20 md:px-2 ">

            <StatisticsCard
                img={"/images/campusSuit/student.svg"}
                imgClassName={"bg-gray-200"}
                title={"Students"}
                number={studentsCount}
                width={"xl:w-[392px]"}
            />

            <StatisticsCard
                img={"/images/campusSuit/faculty.svg"}
                imgClassName={"bg-gray-200"}
                title={"Departments"}
                number={departmentsCount}
                width={"w- xl:w-[392px]"}
            />



            <StatisticsCard
                img={"/images/campusSuit/professor.svg"}
                imgClassName={"bg-gray-200"}
                title={"Professors"}
                number={professorsCount}
                width={"xl:w-[392px]"}
            />
        </section>
    )
}

export default Numbers