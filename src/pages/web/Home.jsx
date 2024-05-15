import Hero from '@/features/web/home/heroSection/Hero';
import WhyUse from '@/features/web/home/whyUseSection/WhyUse';
import Classes from '@/features/web/home/classesSection/Classes';
import About from '@/features/web/home/about/About';


function Home() {

    return (
        <div>
            <Hero />
            <WhyUse />
            <About />
            <div className='bg-mint-green-color-light'>
                <Classes />
                <div className='relative py-20 top-28 bg-mint-green-color-light'>
                </div>
            </div>
        </div>

    )
}

export default Home

// The div with the bg-mint-green-color-light and the relative div for solve the broblem of the footer background color 