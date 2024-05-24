import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import FormWizard from "react-form-wizard-component";
import toast from "react-hot-toast";
import "react-form-wizard-component/dist/style.css";

import CustomInput from "@/components/CustomInput";
import RolesForm from "./RolesForm";

import { useCreateFacultySupervisor } from "../hooks/useCreateFacultySupervisor";
import PermissionsForm from "../../roles/components/PermissionsForm";
import { useUpdateFacultySupervisorRole } from "../hooks/useUpdateFacultySupervisorRole";
import { useUpdateFacultySupervisorPermissions } from "../hooks/useUpdateFacultySupervisorPermissions";

function CreateFacultySupervisorForm() {
  const navigate = useNavigate();
  const { universityId, facultyId } = useParams();

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [stepError, setStepError] = useState(false);

  const { createFacultySupervisor, isCreating, error: ApiError } = useCreateFacultySupervisor();

  const { updateFacultySupervisorRole } = useUpdateFacultySupervisorRole();

  const { updateFacultySupervisorPermissions } = useUpdateFacultySupervisorPermissions();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  function handleComplete(data) {
    createFacultySupervisor(
      { ...data, universityId, facultyId },
      {
        onSuccess: (data) => {
          reset();
          updateFacultySupervisorRole({ universityId, facultyId, facultySupervisorId: data?.data?.id, roles: selectedRoles });
          updateFacultySupervisorPermissions({ universityId, facultyId, facultySupervisorId: data?.data?.id, permissions: selectedPermissions });

          navigate(`/${universityId}/panel/faculties/${facultyId}/facultySupervisors`);
        },
        onError: () => {
          setStepError(true);
        },
      }
    );
  }
  return (
    <section className="lg:w-[75%] mx-auto pt-20">
      <FormWizard shape="circle" color={stepError ? "#FF0000" : "#4E74F9"} stepSize="sm" onComplete={handleSubmit(handleComplete)}>
        <FormWizard.TabContent title="Create Faculty Supervisor" icon="ti-settings">
          <div className="flex flex-col items-center justify-center gap-4">
            <CustomInput
              type="name"
              label="Supervisor name"
              size="lg"
              isError={errors?.name || ApiError?.response?.data?.errors?.name?.[0]}
              className="w-4/5 md:w-96 "
              errorMessage={errors?.name?.message || ApiError?.response?.data?.errors?.name?.[0]}
              isDisabled={isCreating}
              register={register("name", {
                required: "Supervisor name is required",
              })}
            />

            <CustomInput
              type="email"
              label="Email"
              size="lg"
              isError={errors?.email || ApiError?.response?.data?.errors?.email?.[0]}
              className="w-4/5 md:w-96 "
              errorMessage={errors?.email?.message || ApiError?.response?.data?.errors?.email?.[0]}
              isDisabled={isCreating}
              register={register("email", {
                required: "email is required",
              })}
            />

            <CustomInput
              type="password"
              label="Password"
              size="lg"
              color={errors?.password || ApiError?.response?.data?.errors?.password?.[0]}
              isDisabled={isCreating}
              className="w-4/5 md:w-96"
              errorMessage={errors?.password?.message}
              register={register("password", {
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "The password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character.",
                },
              })}
            />

            <CustomInput
              type="password"
              label="Confirm password"
              size="lg"
              isDisabled={isCreating}
              isError={errors?.passwordConfirmation || ApiError?.response?.data?.errors?.passwordConfirmation?.[0]}
              className="w-4/5 md:w-96"
              errorMessage={errors?.passwordConfirmation?.message}
              register={register("passwordConfirmation", {
                validate: {
                  validate: (value) => (value !== getValues().password ? "The password and password confirmation do not match." : true),
                },
              })}
            />
          </div>
        </FormWizard.TabContent>

        <FormWizard.TabContent title="Roles" icon="ti-settings" validationError={() => toast.error("Please Finish User Data First")}>
          <RolesForm selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
        </FormWizard.TabContent>

        <FormWizard.TabContent title="Permissions" icon="ti-check">
          <PermissionsForm selectedPermissions={selectedPermissions} setSelectedPermissions={setSelectedPermissions} />
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

export default CreateFacultySupervisorForm;
