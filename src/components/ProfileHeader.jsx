import { STORAGE_LINK } from "@/utils/constants";
import { Image } from "@nextui-org/react";
import { FaCrown } from "react-icons/fa";

function ProfileHeader({ image, name, email, id, status, permissions, roles }) {
    return (
        <header className="flex flex-col items-center justify-center gap-2 min-w-80">
            <div className="flex items-center justify-center w-full mb-16 bg-blue-color-light">
                <div className="relative top-16">
                    <Image
                        src={
                            image === null
                                ? "/images/userPlaceholder.webp"
                                : `${STORAGE_LINK}/${image}`
                        }
                        className="object-contain w-40 h-40 rounded-full"
                    />
                    {email && (
                        <span
                            className={`w-5 h-5 rounded-full absolute top-32 left-36 z-10 ${
                                status ? " bg-green-500" : "bg-yellow-500"
                            }`}
                        ></span>
                    )}
                </div>
            </div>
            <p className="font-bold text-blue-color-primary">
                <span className="pr-1 font-bold text-gray-color-primary">
                    #{id}
                </span>
                {name}
            </p>
            <p className="font-semibold text-gray-color-primary">{email}</p>

            <div className="self-start">
                {roles?.data.length > 0 && (
                    <div>
                        <div>
                            <p className="py-3 text-lg font-bold text-blue-color-primary">
                                Roles :
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {roles.data.map((role, index) => {
                                return (
                                    <div
                                        className="flex items-start justify-start gap-2 px-4 py-2 font-bold border-2 rounded-xl bg-yellow-color-light"
                                        key={index}
                                    >
                                        <span>
                                            <FaCrown className="text-xl text-yellow-color-primary" />
                                        </span>
                                        {role.attributes.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {permissions?.data.length > 0 && (
                    <div>
                        <div>
                            <p className="py-3 text-lg font-bold text-blue-color-primary">
                                Permissions :
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {permissions.data.map((permission, index) => {
                                return (
                                    <div
                                        className="flex items-start justify-start gap-2 px-4 py-2 font-bold border-2 rounded-xl bg-yellow-color-light"
                                        key={index}
                                    >
                                        <span>
                                            <FaCrown className="text-xl text-yellow-color-primary" />
                                        </span>
                                        {permission.attributes.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default ProfileHeader;
