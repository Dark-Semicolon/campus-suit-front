import HeroSection from '@/features/web/home/hero/HeroSection';
import Features from '@/features/web/home/features/Features';
// import ClientsSection from '../../features/web/home/clients/ClientsSection';
import Pricing from '../../features/web/home/pricing/Pricing';


function Home() {

    return (
        <div>
            <HeroSection />
            <Features />
            {/* <ClientsSection /> */}
            <Pricing />
        </div>

    )
}

export default Home
