import { useParams } from "react-router-dom";
import { Spinner } from "@nextui-org/react";

import CreateFacultySupervisorForm from "./CreateFacultySupervisorForm";

import { useFacultySupervisorRoles } from "../hooks/useFacultySupervisorRole";
import { useFindFacultySupervisor } from "../hooks/useFindFacultySupervisor";
import { useFacultySupervisorPermissions } from "../hooks/useFacultySupervisorPermissions";

function UpdateFacultySupervisor() {
    const { universityId, facultyId, facultySupervisorId } = useParams();

    const { facultySupervisor, isPending: facultySupervisorLoading } =
        useFindFacultySupervisor({
            universityId,
            facultyId,
            facultySupervisorId,
        });

    const { facultySupervisorRoles, isPending: facultySupervisorRolesLoading } =
        useFacultySupervisorRoles({
            universityId,
            facultyId,
            facultySupervisorId,
        });

    const {
        facultySupervisorPermissions,
        isPending: facultySupervisorPermissionsLoading,
    } = useFacultySupervisorPermissions({
        universityId,
        facultyId,
        facultySupervisorId,
    });

    if (
        facultySupervisorLoading ||
        facultySupervisorRolesLoading ||
        facultySupervisorPermissionsLoading
    )
        return (
            <Spinner className="flex items-center justify-center h-screen" />
        );

    const facultySupervisorData = {
        facultySupervisor,
        facultySupervisorPermissions,
        facultySupervisorRoles,
    };

    return (
        <CreateFacultySupervisorForm
            facultySupervisorData={facultySupervisorData}
        />
    );
}

export default UpdateFacultySupervisor;
