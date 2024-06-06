import { useState } from "react"
import { useParams } from "react-router-dom"
import { useAssignRoles } from './../hooks/useAssignRoles';
import Button from '@/components/Button';
import RolesForm from "./RolesForm";


function AssignRolesForm() {

    const { id } = useParams()

    const [roles, setRoles] = useState([])

    const { assignRoles, isLoading } = useAssignRoles()

    function handelSubmit() {

        if (!roles.length) return null

        assignRoles({ adminId: id, roles }, {
            onSuccess: () => {
                setRoles([])
            }
        })
    }
    return (
        <section className="px-16 py-10 bg-white rounded-lg">
            <h4 className="py-6 text-xl text-blue-color-primary">Assign Roles</h4>


            <RolesForm isDisabled={isLoading} selectedRoles={roles} setSelectedRoles={setRoles} />

            <div className="flex justify-end w-full">
                <Button type='primary' name='submitPermission' disabled={isLoading} className='w-40 rounded-md hover:bg-blue-600' onClick={handelSubmit}>Assign</Button>
            </div>


        </section>
    )
}

export default AssignRolesForm