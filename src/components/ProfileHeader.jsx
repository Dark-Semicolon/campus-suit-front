import { STORAGE_LINK } from '@/utils/constants';
import { Image } from '@nextui-org/react';

function ProfileHeader({ image, name, email, id, status }) {
    return (
        <header className="flex flex-col items-center justify-center w-full gap-2">
            <div className="flex items-center justify-center w-full mb-16 bg-blue-color-light">
                <div className='relative top-16'>
                    <Image src={image === null ? "/images/userPlaceholder.png" : `${STORAGE_LINK}/${image}`} className="object-cover w-40 h-40 rounded-full" />

                </div>
                <span className={`w-5 h-5 rounded-full relative top-32 right-10 z-10 ${status ? ' bg-green-500' : 'bg-yellow-500'}`}></span>
            </div>

            <p className="font-bold text-blue-color-primary">
                <span className="pr-1 font-bold text-gray-color-primary">#{id}</span>
                {name}
            </p>
            <p className="font-semibold text-gray-color-primary">
                {email}
            </p>
        </header>
    )
}

export default ProfileHeader