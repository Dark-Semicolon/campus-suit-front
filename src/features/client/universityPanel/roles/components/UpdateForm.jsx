import { useParams } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import RoleForm from "./RoleForm";

import { useRoles } from "../hooks/useRoles";

function UpdateForm() {
    const { universityId, facultyId, roleId } = useParams()

    const { roles, isPending } = useRoles({ universityId, facultyId, filterAndSortAndPageQuery: `?filter[id]=${roleId}`, include: 'permissions' })

    if (isPending) return <div className='py-5 mx-auto'>
        <Spinner color='primary' />
    </div>

    return <RoleForm initialData={roles?.data[0]} />
}

export default UpdateForm