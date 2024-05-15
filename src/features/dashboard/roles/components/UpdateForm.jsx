import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { isEmpty } from "lodash";

import Input from "@/components/input/Input";
import Button from "@/components/Button";

import FormWizard from "react-form-wizard-component";
import 'react-form-wizard-component/dist/style.css';

import PermissionsForm from "../../permissions/components/PermissionsForm";

import { useRoles } from "../hooks/useRoles";
import useUpdateRole from "../hooks/useUpdateRole";

function formatPermissions(permissions = []) {
    return permissions?.map(permission => {
        return permission.id
    });
}

function UpdateForm() {
    const { id } = useParams()
    const { state } = useLocation()

    const { roles } = useRoles({ filter: { field: 'id', value: id }, includeFields: 'permissions' });

    const { updateRole, isUpdating, error: ApiError } = useUpdateRole();

    const name = roles?.data[0].attributes.name || state?.roleName
    const rolePermissions = formatPermissions(roles?.data[0]?.relationships?.permissions || state.permissions);


    const [roleName, setRoleName] = useState(name)
    const [selectedPermissions, setSelectedPermissions] = useState(rolePermissions)



    const handleComplete = () => {
        if (!isEmpty(selectedPermissions) && roleName)
            updateRole({ roleId: id, name: roleName, permissions: selectedPermissions }, {
                onSuccess: () => setRoleName('')
            })
    };

    return (

        <section className='px-10 lg:w-[80%] mx-auto pt-20'>
            <FormWizard
                shape="circle"
                color="#FFAA00"
                stepSize="sm"
                onComplete={handleComplete}
                backButtonTemplate={
                    (handelBack) => <Button type='primary' onClick={handelBack}>
                        السابق
                    </Button>
                }
                nextButtonTemplate={(handleNext) => (
                    <Button type='primary' onClick={handleNext}>
                        التالي
                    </Button>
                )}
                finishButtonTemplate={(handleComplete) => (
                    <Button type='primary' onClick={handleComplete} disabled={isUpdating}>
                        حفظ
                    </Button>
                )}
            >

                <FormWizard.TabContent title="أسم الدور" icon="ti-settings"  >


                    <Input label="أسم الدور" name='name' defaultValue={roleName} onChange={(e) => setRoleName(e.target.value)} edit={true} size='fullWidth' error={ApiError?.response?.data?.errors?.name?.[0]} disabled={isUpdating} />


                </FormWizard.TabContent>

                <FormWizard.TabContent title="الصلاحيات" icon="ti-check" isValid={roleName}>

                    <PermissionsForm selectedPermissions={selectedPermissions} setSelectedPermissions={setSelectedPermissions} />

                </FormWizard.TabContent>
            </FormWizard>

            <style>
                {`@import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
                
                .wizard-card-footer{
                    display: flex;
                    justify-content: space-between;
                    gap: 40px;
                }
                .react-form-wizard{
                    background-color: #fff;
                    border-radius: 31px;
                    padding: 20px 0;    
                }
                .wizard-progress-bar{
                    float: right !important;
                }
                `}
            </style>
        </section >
    )
}

export default UpdateForm