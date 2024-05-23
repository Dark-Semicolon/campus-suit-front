import Input from "../../../../components/input/Input";
import useCreateRole from "../hooks/useCreateRole"

import FormWizard from "react-form-wizard-component";
import 'react-form-wizard-component/dist/style.css';

import Button from "@/components/Button";
import PermissionsForm from "../../permissions/components/PermissionsForm";
import { useState } from "react";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

function CreateForm() {
    const [selectedPermissions, setSelectedPermissions] = useState([])
    const [name, setName] = useState('')

    const navigate = useNavigate()

    const { createRole, isCreating, error } = useCreateRole();



    const handleComplete = () => {
        if (!isEmpty(selectedPermissions) && name)
            createRole({ name, permissions: selectedPermissions }, {
                onSuccess: () => {
                    setName('')
                    navigate('/admin/roles')
                    setSelectedPermissions([])
                }
            })
    };

    return (

        <section className='lg:w-[75%] mx-auto pt-20'>
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
                    <Button type='primary' onClick={handleComplete} disabled={isCreating}>
                        حفظ
                    </Button>
                )}
            >

                <FormWizard.TabContent title="أسم الدور" icon="ti-settings">


                    <Input label="أسم الدور" name='name' defaultValue={name} onChange={(e) => setName(e.target.value)} edit={true} size='fullWidth' error={error?.response?.data?.errors?.name?.[0]} disabled={isCreating} />


                </FormWizard.TabContent>

                <FormWizard.TabContent title="الصلاحيات" icon="ti-check" isValid={name}>

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
                }import { FormWizard } from 'react-form-wizard-component';

                
                `}
            </style>
        </section >
    )
}

export default CreateForm