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
import Fileponds from "../../../../../components/Filepond";
import { useUpdateFacultySupervisor } from "../hooks/useUpdateFacultySupervisor";
import { removeEmptyValues } from "../../../../../utils/helpers";
import { FormControlLabel, Switch } from "@mui/material";

function CreateFacultySupervisorForm({ facultySupervisorData }) {
  const navigate = useNavigate();

  // get old data
  const oldRoles = facultySupervisorData ? facultySupervisorData?.facultySupervisorRoles?.data?.map((ele) => ele.id) : null;

  const oldPermissions = facultySupervisorData ? facultySupervisorData?.facultySupervisorPermissions?.data?.map((ele) => ele.id) : null;

  const { name, email, status } = facultySupervisorData?.facultySupervisor?.data?.attributes || {};
  const { id } = facultySupervisorData?.facultySupervisor?.data || {};

  // get data from params
  const { universityId, facultyId } = useParams();

  // states
  const [image, setImage] = useState("");

  const [selectedRoles, setSelectedRoles] = useState(oldRoles || []);
  const [selectedPermissions, setSelectedPermissions] = useState(oldPermissions || []);

  const [stepError, setStepError] = useState(false);
  const [isVisibile, setIsVisibile] = useState(status || true);

  // API
  const { createFacultySupervisor, isCreating, error: ApiError } = useCreateFacultySupervisor();

  const { updateFacultySupervisor, isUpdating } = useUpdateFacultySupervisor();

  const { updateFacultySupervisorRole } = useUpdateFacultySupervisorRole();

  const { updateFacultySupervisorPermissions } = useUpdateFacultySupervisorPermissions();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  function handleComplete(data) {
    if (!image) setImage("");
    const supervisorData = { universityId, facultyId, facultySupervisorId: id, ...data, permissions: selectedPermissions, roles: selectedRoles, status: isVisibile, avatar_url: image };

    if (facultySupervisorData) {
      const filteredData = removeEmptyValues(supervisorData);
      updateFacultySupervisor(
        { ...filteredData },
        {
          onSuccess: () => {
            updateFacultySupervisorRole({ universityId, facultyId, facultySupervisorId: id, roles: selectedRoles });
            updateFacultySupervisorPermissions({ universityId, facultyId, facultySupervisorId: id, permissions: selectedPermissions });

            navigate(`/${universityId}/panel/faculties/${facultyId}/facultySupervisors`);
          },
          onError: () => {
            setStepError(true);
          },
        }
      );
    } else {
      //createFacultySupervisor
      createFacultySupervisor(
        { ...supervisorData },
        {
          onSuccess: (data) => {
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
  }

  const handleChange = (event) => {
    setIsVisibile(event.target.checked);
  };

  return (
    <section className="lg:w-[75%] mx-auto pt-20">
      <FormWizard shape="circle" color={stepError ? "#FF0000" : "#4E74F9"} stepSize="sm" onComplete={handleSubmit(handleComplete)}>
        <FormWizard.TabContent title="Create Faculty Supervisor" icon="ti-settings">
          <FormControlLabel control={<Switch checked={isVisibile} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} color="primary" />} label={isVisibile ? "Active" : "Disabled"} />

          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-1/3">
              <h4 className="py-3 text-gray-600 text-start">Faculty Supervisor Image *</h4>
              <Fileponds imageToken={setImage} />
            </div>
            <CustomInput
              type="name"
              label="Supervisor name"
              size="lg"
              defaultValue={name || ""}
              isError={errors?.name || ApiError?.response?.data?.errors?.name?.[0]}
              className="w-4/5 md:w-96 "
              errorMessage={errors?.name?.message || ApiError?.response?.data?.errors?.name?.[0]}
              isDisabled={isCreating || isUpdating}
              register={register("name", {
                required: "Supervisor name is required",
              })}
            />

            <CustomInput
              type="email"
              label="Email"
              size="lg"
              defaultValue={email || ""}
              isError={errors?.email || ApiError?.response?.data?.errors?.email?.[0]}
              className="w-4/5 md:w-96 "
              errorMessage={errors?.email?.message || ApiError?.response?.data?.errors?.email?.[0]}
              isDisabled={isCreating || isUpdating}
              register={register("email", {
                required: "email is required",
              })}
            />

            <CustomInput
              type="password"
              label="Password"
              size="lg"
              color={errors?.password || ApiError?.response?.data?.errors?.password?.[0]}
              isDisabled={isCreating || isUpdating}
              className="w-4/5 md:w-96"
              errorMessage={errors?.password?.message}
              register={register("password", {
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}/,
                  message: "Your password must be at least 8 characters long and contain both letters and numbers.",
                },
              })}
            />

            <CustomInput
              type="password"
              label="Confirm password"
              size="lg"
              isDisabled={isCreating || isUpdating}
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
