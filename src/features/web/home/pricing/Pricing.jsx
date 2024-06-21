import Button from "@/components/Button";
import PricingCard from "./PricingCard";

const Pricing = () => {
    const packages = [
        {
            packageName: 'Silver Package',
            features: [
                '1 university',
                '10000 Student',
                'Priority Support',
                'Premium Features',
            ],
            price: 200
        },
        {
            packageName: 'Gold Package',
            features: [
                '3 universities',
                '30000 Student',
                'Priority Support',
                'Advanced Features',
            ],
            price: 600
        },
        {
            packageName: 'Platinum Package',
            features: [
                'Unlimited universities',
                'Unlimited Students number',
                '24/7 Support',
                'All Features',
            ],
            price: 1000
        }
    ];

    return (
        <section>
            <div className="hidden sm:flex relative top-[200px] w-[90%] lg:w-[60%] rounded-3xl bg-gradient-to-l from-blue-color-light to-blue-color-dark py-8 justify-between items-center mx-auto shadow-lg">
                <div className="ps-10 lg:ps-24">
                    <h3 className="text-lg font-bold text-white md:text-4xl">Feel Free to Join our <br /> 15 Days Free Trial</h3>
                    <p className="py-3 text-gray-color-light">Love our Tool?</p>
                    <Button type='primary' className='bg-black rounded-md' to='/user/universities'>Start</Button>
                </div>
                <div>
                    <img src="images/home/pricing/map.svg" alt="Pricing Map" />
                </div>
            </div>

            <section className="pb-12 text-white pt-80 bg-blue-color-dark">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-3xl font-bold">Pricing</h2>
                    <div className="flex flex-wrap justify-between gap-10 py-10">
                        {packages.map((pkg, index) => (
                            <PricingCard
                                key={index}
                                packageName={pkg.packageName}
                                features={pkg.features}
                                price={pkg.price}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Pricing;
