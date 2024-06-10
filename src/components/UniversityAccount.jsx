import { Avatar, Spinner } from "@nextui-org/react";
import { STORAGE_LINK } from "@/utils/constants";
import { useParams } from "react-router-dom";
import { useUniversity } from "../features/client/universityPanel/university/hooks/useUniversity";

function UniversityAccount() {
    const { universityId } = useParams();

    const { university, isPending } = useUniversity({ universityId });

    if (isPending) return <Spinner />;

    return (
        <div className="flex items-center justify-start w-30">
            <Avatar
                isBordered
                color="default"
                src={
                    university?.data?.attributes?.logo === null
                        ? "/images/userPlaceholder.webp"
                        : `${STORAGE_LINK}/${university?.data?.attributes?.logo}`
                }
                classNames={{ base: "w-12 h-12 ", img: "object-contain" }}
            />
            <h2 className="text-sm font-bold capitalize truncate text-blue-color-primary w-30 ps-2 w ">
                {university?.data?.attributes?.name}
            </h2>
        </div>
    );
}

export default UniversityAccount;
