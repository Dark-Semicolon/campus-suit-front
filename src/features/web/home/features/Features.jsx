import Button from '@/components/Button';
import { GiTeacher } from 'react-icons/gi';
import { GrUserAdmin } from 'react-icons/gr';
import { LiaUniversitySolid } from 'react-icons/lia';
import { PiStudentFill } from 'react-icons/pi';
function Features() {

    const features = [
        {
            id: 1, icon: <LiaUniversitySolid className='text-4xl text-white' />, title: 'University',
            description: ' Can register and manage universities, faculties, and faculty roles, ensuring comprehensive oversight and effective role assignment.'
        },
        {
            id: 2, icon: <GrUserAdmin className='text-4xl text-white' />, title: 'Faculty supervisors',
            description: 'Manage the faculty student data, and courses, and handle the academic calendar, course instances, student grades, and course selections.'
        },
        {
            id: 3, icon: <GiTeacher className='text-4xl text-white' />, title: 'Professors', description: 'Are provided with tools to manage course instances, access student lists, and review and manage course assignments.'
        },
        {
            id: 4, icon: <PiStudentFill className='text-4xl text-white' />, title: 'students', description: 'The system allows the viewing of grades, registration for courses, and the submission and review of course assignments'
        },
    ];

    return (
        <>
            <section className="min-h-[700px] py-32 md:px-10 px-2">
                <div className="container mx-auto">
                    <div className="w-fit">
                        <h3 className="text-4xl font-bold text-blue-color-primary">Feature Boxes</h3>
                        <p className="md:w-[500px] text-gray-color-primary mt-4">
                            CampusSuit aims to streamline university operations, enhance
                            communication, and improve the overall educational experience for all
                            stakeholders with this main features.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center w-full gap-10 mt-10">
                        {features.map(feature => (
                            <div key={feature.id} className="flex flex-col justify-center gap-8 items-center p-6 text-white bg-[#1E2336] rounded-xl shadow-md h-[400px] w-[250px] md:w-[320px]">
                                <div className="p-6 rounded-3xl text-4xl bg-[#162255] ">
                                    <span className="text-white">{feature.icon}</span>
                                </div>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                                <p className="text-center text-gray-color-light w-[95%]">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="flex flex-col items-center justify-center gap-20 px-0 py-10 lg:px-20 lg:flex-row">
                <img src='images/home/features/ToolsCircle.svg' className='md:w-[400px] w-[250px]' />
                <div className="flex flex-col items-center space-y-6 w-fit lg:items-start">
                    <h3 className="w-56 mx-auto text-lg font-bold text-center lg:text-left lg:m-0 md:text-4xl text-blue-color-primary lg:w-80">
                        We are here to guide and help you at all times
                    </h3>
                    <p className="w-[80%] lg:w-[500px] text-gray-color-primary mt-4 mx-auto text-lg text-center md:text-left md:m-0">
                        with a team of professionals to support your universities in any time
                    </p>
                    <Button type="primary" className='rounded-md w-fit' to='/user/universities'>Start</Button>
                </div>
            </section>
        </>
    )
}

export default Features
