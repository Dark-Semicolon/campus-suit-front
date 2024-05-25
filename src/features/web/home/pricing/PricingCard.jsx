
import Button from '@/components/Button';
import { AiOutlineCheck } from "react-icons/ai";
const PricingCard = () => {
    return (
        <div className="w-[250px] md:w-[300px] p-6 mx-auto text-white bg-[#18181C] rounded-xl shadow-lg">
            <div className="flex justify-center -mt-12">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full shadow-md">
                    <img src='/images/home/pricing/Golden.png' />
                </div>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-center">Silver Package</h2>
            <hr className="my-4 border-gray-700" />
            <ul className="py-5 space-y-2">
                <li className="flex items-center">
                    <span className="mr-3 bg-[#1E2336] p-1 rounded-lg"><AiOutlineCheck className='font-extrabold text-white' /></span> 100 + Free Template
                </li>
                <li className="flex items-center">
                    <span className="mr-3 bg-[#1E2336] p-1 rounded-lg"><AiOutlineCheck className='font-extrabold text-white' /></span> 10 Team Members
                </li>
                <li className="flex items-center">
                    <span className="mr-3 bg-[#1E2336] p-1 rounded-lg"><AiOutlineCheck className='font-extrabold text-white' /></span> Priority Support
                </li>
                <li className="flex items-center">
                    <span className="mr-3 bg-[#1E2336] p-1 rounded-lg"><AiOutlineCheck className='font-extrabold text-white' /></span> Premium Features
                </li>
                <li className="flex items-center">
                    <span className="mr-3 bg-[#1E2336] p-1 rounded-lg"><AiOutlineCheck className='font-extrabold text-white' /></span> 50 Integrations
                </li>
            </ul>
            <hr className="my-4 border-gray-700" />
            <div className="flex items-center justify-between mt-6">
                <div className="text-2xl font-medium">$40<span className="text-sm font-normal text-gray-600">/mo</span></div>
                <Button className='rounded-md' type='primary' >
                    Signup Now
                </Button>
            </div>
        </div>
    );
};

export default PricingCard;
