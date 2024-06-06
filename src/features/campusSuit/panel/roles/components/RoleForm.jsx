import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";

import FormWizard from "react-form-wizard-component";
import 'react-form-wizard-component/dist/style.css';

import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";

import useCreateRole from "../hooks/useCreateRole";
import useUpdateRole from "../hooks/useUpdateRole";
import PermissionsForm from '../../permissions/PermissionsForm'

function RoleForm({ initialData }) {
    const [name, setName] = useState(initialData?.attributes?.name || '');

    const oldPermissions = initialData ? initialData?.relationships?.permissions?.map(ele => ele.id) : null;

    const [selectedPermissions, setSelectedPermissions] = useState(oldPermissions || []);
    const { id } = useParams();

    const navigate = useNavigate();

    const { createRole, isCreating, error: createError } = useCreateRole();
    const { updateRole, isUpdating, error: updateError } = useUpdateRole();

    const handleComplete = () => {
        if (!isEmpty(selectedPermissions) && name) {
            const roleData = { name, permissions: selectedPermissions };
            if (initialData) {
                // Update role
                updateRole({ roleId: id, ...roleData }, {
                    onSuccess: () => {
                        navigate(`/admin/roles`);
                        setName('');
                        setSelectedPermissions([]);
                    }
                });
            } else {
                // Create role
                createRole(roleData, {
                    onSuccess: () => {
                        navigate(`/admin/roles`);
                        setName('');
                        setSelectedPermissions([]);
                    }
                });
            }
        }
    };

    return (
        <section className='lg:w-[75%] mx-auto pt-10 rounded-xl'>
            <FormWizard
                shape="circle"
                color="#4E74F9"
                stepSize="sm"
                onComplete={handleComplete}
                finishButtonTemplate={(handleComplete) => (
                    <Button type='customized' className="min-h-[36px] min-w-[140px] py-[6px] px-3 bg-blue-color-light text-white font-semibold text-sm rounded-md float-right" disabled={isCreating || isUpdating} onClick={handleComplete}>
                        Finish
                    </Button>
                )}
            >
                <FormWizard.TabContent title="Role name" icon="ti-settings">
                    <div className="flex items-center justify-center py-10">
                        <CustomInput
                            type="name"
                            label="Role Name"
                            size="lg"
                            isError={createError?.response?.data?.errors?.name?.[0] || updateError?.response?.data?.errors?.name?.[0]}
                            className="w-4/5"
                            errorMessage={createError?.response?.data?.errors?.name?.[0] || updateError?.response?.data?.errors?.name?.[0]}
                            isDisabled={isCreating || isUpdating}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </FormWizard.TabContent>
                <FormWizard.TabContent title="Permissions" icon="ti-check" isValid={name}>
                    <PermissionsForm isDisabled={isCreating || isUpdating} selectedPermissions={selectedPermissions} setSelectedPermissions={setSelectedPermissions} />
                </FormWizard.TabContent>
            </FormWizard>
            <style>
                {`@import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
                
                .react-form-wizard {
                    background-color: #fff;
                    border-radius: 31px;
                    padding: 20px 0;    
                }


                `}
            </style>
        </section>
    );
}

export default RoleForm;
