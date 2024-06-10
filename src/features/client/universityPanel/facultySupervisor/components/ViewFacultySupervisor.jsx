import { useParams } from "react-router-dom";
import { Spinner } from "@nextui-org/react";

import ProfileHeader from "@/components/ProfileHeader";
import { useFacultySupervisorPermissions } from "../hooks/useFacultySupervisorPermissions";
import { useFacultySupervisorRoles } from "../hooks/useFacultySupervisorRole";

function ViewFacultySupervisor({ data }) {
    const { universityId, facultyId } = useParams();

    const { avatarUrl, name, description, id, status } = data;

    const { facultySupervisorPermissions, isPending: loadingPermissions } =
        useFacultySupervisorPermissions({
            universityId,
            facultyId,
            facultySupervisorId: id,
        });

    //FacultySupervisor Permoissions
    const { facultySupervisorRoles, isPending: loadingRoles } =
        useFacultySupervisorRoles({
            universityId,
            facultyId,
            facultySupervisorId: id,
        });

    if (loadingPermissions || loadingRoles) {
        return <Spinner className="flex items-center justify-center" />;
    }

    return (
        // <Card className="pt-4 border-0 shadow-none min-w-96">
        //     <CardBody className="py-5 ">
        //         <div className="flex flex-wrap items-center gap-5">
        //             <Image
        //                 alt="Card background"
        //                 className="object-cover rounded-full h-[100px] w-[100px]"
        //                 src={
        //                     avatarUrl === null
        //                         ? "/images/userPlaceholder.webp"
        //                         : `${STORAGE_LINK}/${avatarUrl}`
        //                 }
        //             />

        //             <div>
        //                 <p className="text-xl font-bold text-blue-color-primary ">
        //                     {name}
        //                 </p>
        //                 <p className="py-3 text-default-500">{email}</p>
        //             </div>
        //         </div>
        //     </CardBody>
        //     <CardFooter>
        //     </CardFooter>
        // </Card>
        <div className="space-y-8">
            <ProfileHeader
                image={avatarUrl}
                name={name}
                email={description}
                id={id}
                status={status}
                permissions={facultySupervisorPermissions}
                roles={facultySupervisorRoles}
            />
        </div>
    );
}

export default ViewFacultySupervisor;
