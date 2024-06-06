import { useState } from "react"
import { useParams } from "react-router-dom"

import PermissionsForm from "../../permissions/PermissionsForm"
import Button from '@/components/Button';
import { useAssignPermissions } from "../hooks/useAssignPermissions";

function AssignPermissionsForm() {

    const { id } = useParams()
    const [permissions, setPermissions] = useState([])


    const { assignPermissions, isLoading } = useAssignPermissions()

    function handelSubmit() {

        if (!permissions.length) return null

        assignPermissions({ adminId: id, permissions }, {
            onSuccess: () => {
                setPermissions([])
            }
        })
    }

    return (
        <div className="px-16 py-10 bg-white rounded-lg">
            <h4 className="py-6 text-xl text-blue-color-primary">Assign Permissions</h4>
            <PermissionsForm isDisabled={isLoading} selectedPermissions={permissions} setSelectedPermissions={setPermissions} />
            <div className="flex justify-end w-full">
                <Button type='primary' name='submitPermission' disabled={isLoading} className='w-40 rounded-md hover:bg-blue-600' onClick={handelSubmit}>Assign</Button>
            </div>
        </div>
    )
}

export default AssignPermissionsForm