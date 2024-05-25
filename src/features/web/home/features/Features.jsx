import Button from '@/components/Button';
function Features() {

    const features = [
        { id: 1, icon: '🛠️', title: 'Fully Customizable', description: 'A good design is not only aesthetically pleasing, but also functional. It should be able to solve the problem' },
        { id: 2, icon: '📦', title: 'Fully Customizable', description: 'A good design is not only aesthetically pleasing, but also functional. It should be able to solve the problem' },
        { id: 3, icon: '🔍', title: 'Fully Customizable', description: 'A good design is not only aesthetically pleasing, but also functional. It should be able to solve the problem' },
        { id: 4, icon: '🔧', title: 'Fully Customizable', description: 'A good design is not only aesthetically pleasing, but also functional. It should be able to solve the problem' },
    ];

    return (
        <>
            <section className="min-h-[700px] py-32 md:px-10 px-2">
                <div className="container mx-auto">
                    <div className="w-fit">
                        <h3 className="text-4xl font-bold text-blue-color-primary">Feature Boxes</h3>
                        <p className="md:w-[500px] text-gray-color-primary mt-4">
                            A good design is not only aesthetically pleasing, but also functional. It should be able to solve the problem
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-10 mt-10 w-fit">
                        {features.map(feature => (
                            <div key={feature.id} className="flex flex-col justify-center gap-8 items-center p-6 text-white bg-[#1E2336] rounded-xl shadow-md h-[370px] w-[250px] md:w-[320px]">
                                <div className="p-6 rounded-3xl text-4xl bg-[#162255] ">
                                    <span className="text-white">{feature.icon}</span>
                                </div>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                                <p className="text-center text-gray-color-light w-[80%]">{feature.description}</p>
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
                        A good design is not only aesthetically pleasing, but also functional. It should be able to solve the problem
                    </p>
                    <Button type="primary" className='rounded-md w-fit'>Start</Button>
                </div>
            </section>
        </>
    )
}

export default Features
