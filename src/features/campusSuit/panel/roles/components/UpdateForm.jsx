import { useParams } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import RoleForm from "./RoleForm";

import { useRoles } from "../hooks/useRoles";

function UpdateForm() {
    const { id } = useParams()

    const { roles, isPending } = useRoles({ filterAndSortAndPageQuery: `?filter[id]=${id}`, include: 'permissions' })


    if (isPending) return <div className='py-5 mx-auto'>
        <Spinner color='primary' />
    </div>

    return <RoleForm initialData={roles?.data[0]} />
}

export default UpdateForm