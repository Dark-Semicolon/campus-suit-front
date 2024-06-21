// import Button from '@/components/Button';
import { AiOutlineCheck } from "react-icons/ai";

const PricingCard = ({ packageName, features, price }) => {
    return (
        <div className="w-[250px] md:w-[300px] p-6 mx-auto text-white bg-[#18181C] rounded-xl shadow-lg">
            <div className="flex justify-center -mt-12">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full shadow-md">
                    <img src='/images/home/pricing/Golden.png' alt={`${packageName} Icon`} />
                </div>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-center">{packageName}</h2>
            <hr className="my-4 border-gray-700" />
            <ul className="py-5 space-y-2">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <span className="mr-3 bg-[#1E2336] p-1 rounded-lg">
                            <AiOutlineCheck className='font-extrabold text-white' />
                        </span>
                        {feature}
                    </li>
                ))}
            </ul>
            <hr className="my-4 border-gray-700" />
            <div className="flex items-center justify-between mt-6">
                <div className="text-2xl font-medium">${price}<span className="text-sm font-normal text-gray-600">/mo</span></div>
                {/* <Button className='rounded-md' type='primary'>
                    Buy Now
                </Button> */}
            </div>
        </div>
    );
};

export default PricingCard;
