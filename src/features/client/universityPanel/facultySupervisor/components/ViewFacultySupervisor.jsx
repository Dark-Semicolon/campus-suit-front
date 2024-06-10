import { useParams } from "react-router-dom";
import { Spinner } from "@nextui-org/react";

import ProfileHeader from "@/components/ProfileHeader";
import { useFacultySupervisorPermissions } from "../hooks/useFacultySupervisorPermissions";
import { useFacultySupervisorRoles } from "../hooks/useFacultySupervisorRole";

function ViewFacultySupervisor({ data }) {
    const { universityId, facultyId } = useParams();

    const { avatarUrl, name, email, id, status } = data;

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
        <div className="space-y-8">
            <ProfileHeader
                image={avatarUrl}
                name={name}
                email={email}
                id={id}
                status={status}
                permissions={facultySupervisorPermissions}
                roles={facultySupervisorRoles}
            />
        </div>
    );
}

export default ViewFacultySupervisor;
