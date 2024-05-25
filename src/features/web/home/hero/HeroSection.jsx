import Button from '@/components/Button';

function HeroSection() {
    return (
        <section className="w-full min-h-screen">
            <div className="relative flex flex-col justify-center mx-auto bg-transparent">
                <div className="absolute top-0 items-center justify-between hidden w-full min-h-screen px-5 pt-10 md:flex md:p-10">
                    <img src="images/home/hero/Ellipse4.svg" className='mb-10' />
                    <img src="images/home/hero/Ellipse2.svg" className="self-start" />
                    <img src="images/home/hero/Ellipse3.svg" className="mb-24" />
                </div>

                <main className="relative z-10 flex justify-center pt-44">
                    <div className="flex flex-col items-center gap-5">
                        <h2 className="text-lg lg:text-3xl text-center text-blue-color-primary lg:w-[500px]">Your Complete Campus Management Solution</h2>
                        <p className="w-[80%] md:w-[70%] text-center text-gray-color-primary">
                            A good design is not only aesthetically pleasing, but also functional. It should be able to solve the problem
                        </p>
                        <Button type='primary' className='z-30 rounded-md'>Start Now</Button>
                    </div>
                    <div className='absolute top-[105%] md:top-[90%] lg:top-[75%] w-[270px] md:w-[400px] lg:w-full justify-center flex'>
                        <img src='images/home/hero/App.svg' />
                    </div>
                </main>
            </div>
            <img src='images/home/hero/Wave.svg' className='w-full mt-36' />
        </section>
    )
}

export default HeroSection