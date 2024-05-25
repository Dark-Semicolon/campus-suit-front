import Button from "@/components/Button";
import PricingCard from "./PricingCard";

// const packages = [
//     {
//         name: 'Silver Package',
//         price: '$40/mo',
//         features: ['100 + Free Template', '10 Team Members', 'Priority Support', 'Premium Features', '50 Integrations'],
//     },
//     {
//         name: 'Golden Package',
//         price: '$70/mo',
//         features: ['100 + Free Template', '10 Team Members', 'Priority Support', 'Premium Features', '50 Integrations'],
//     },
//     {
//         name: 'Premium Package',
//         price: '$120/mo',
//         features: ['100 + Free Template', '10 Team Members', 'Priority Support', 'Premium Features', '50 Integrations'],
//     },
// ];

const Pricing = () => {
    return (
        <section>
            <div className="hidden sm:flex relative top-[200px] w-[90%] lg:w-[60%] rounded-3xl bg-gradient-to-l from-blue-color-light to-blue-color-dark py-8  justify-between items-center mx-auto shadow-lg">
                <div className="ps-10 lg:ps-24">
                    <h3 className="text-lg font-bold text-white md:text-4xl">Fell Free to Join our <br /> 15 Days Free Trial</h3>
                    <p className="py-3 text-gray-color-light">Love our Tool?</p>
                    <Button type='primary' className='bg-black rounded-md'>Start</Button>
                </div>
                <div>
                    <img src="/public/images/home/pricing/map.svg" />
                </div>
            </div>

            <section className="pb-12 text-white pt-80 bg-blue-color-dark">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-3xl font-bold">Pricing</h2>
                    <div className="flex flex-wrap justify-between gap-10 py-10">
                        <PricingCard />
                        <PricingCard />
                        <PricingCard />
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Pricing;
