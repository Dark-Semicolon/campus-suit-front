import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FormControlLabel, Switch } from "@mui/material";
import { Spinner, Tab, Tabs } from "@nextui-org/react";

import { useCreateFacultySupervisor } from "../hooks/useCreateFacultySupervisor";
import { useUpdateFacultySupervisorRole } from "../hooks/useUpdateFacultySupervisorRole";
import { useUpdateFacultySupervisor } from "../hooks/useUpdateFacultySupervisor";
import { useUpdateFacultySupervisorPermissions } from "../hooks/useUpdateFacultySupervisorPermissions";

import { removeEmptyValues } from "@/utils/helpers";
import Fileponds from "@/components/Filepond";
import Button from "@/components/Button";
import RolesForm from "./RolesForm";
import PermissionsForm from "./PermissionsForm";
import Inputs from "./Inputs";

function CreateFacultySupervisorForm({ facultySupervisorData = {} }) {
    const navigate = useNavigate();
    // get old data
    const oldRoles = facultySupervisorData
        ? facultySupervisorData?.facultySupervisorRoles?.data?.map(
              (ele) => ele.id
          )
        : null;

    const oldPermissions = facultySupervisorData
        ? facultySupervisorData?.facultySupervisorPermissions?.data?.map(
              (ele) => ele.id
          )
        : null;

    const { name, email, status } =
        facultySupervisorData?.facultySupervisor?.data?.attributes || {};
    const { id } = facultySupervisorData?.facultySupervisor?.data || {};

    // get data from params
    const { universityId, facultyId } = useParams();

    // states
    const [image, setImage] = useState("");

    const [selectedRoles, setSelectedRoles] = useState(oldRoles || []);
    const [selectedPermissions, setSelectedPermissions] = useState(
        oldPermissions || []
    );
    const [isVisible, setIsVisible] = useState(
        Boolean(status) === false ? false : true
    );
    // API
    const {
        createFacultySupervisor,
        isCreating,
        error: ApiError,
    } = useCreateFacultySupervisor();

    const { updateFacultySupervisor, isUpdating } =
        useUpdateFacultySupervisor();

    const { updateFacultySupervisorRole } = useUpdateFacultySupervisorRole();

    const { updateFacultySupervisorPermissions } =
        useUpdateFacultySupervisorPermissions();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        },
    });

    function onSubmit(data) {
        if (!image) setImage(null);

        const supervisorData = {
            universityId,
            facultyId,
            facultySupervisorId: id,
            ...data,
            permissions: selectedPermissions,
            roles: selectedRoles,
            status: isVisible,
            avatar_url: image,
        };

        const filteredData = removeEmptyValues(supervisorData);
        if (Object.keys(facultySupervisorData).length) {
            updateFacultySupervisor(
                { ...filteredData },
                {
                    onSuccess: () => {
                        updateFacultySupervisorRole({
                            universityId,
                            facultyId,
                            facultySupervisorId: id,
                            roles: selectedRoles,
                        });
                        updateFacultySupervisorPermissions({
                            universityId,
                            facultyId,
                            facultySupervisorId: id,
                            permissions: selectedPermissions,
                        });

                        navigate(
                            `/${universityId}/panel/faculties/${facultyId}/facultySupervisors`
                        );
                    },
                }
            );
        } else {
            //createFacultySupervisor
            createFacultySupervisor(
                { ...filteredData },
                {
                    onSuccess: (data) => {
                        updateFacultySupervisorRole({
                            universityId,
                            facultyId,
                            facultySupervisorId: data?.data?.id,
                            roles: selectedRoles,
                        });
                        updateFacultySupervisorPermissions({
                            universityId,
                            facultyId,
                            facultySupervisorId: data?.data?.id,
                            permissions: selectedPermissions,
                        });

                        navigate(
                            `/${universityId}/panel/faculties/${facultyId}/facultySupervisors`
                        );
                    },
                }
            );
        }
    }

    const handleChange = (event) => {
        setIsVisible(event.target.checked);
    };

    console.log(Object.keys(facultySupervisorData).length);

    return (
        <div className="lg:w-[90%] mx-auto py-10">
            <div className="flex items-center gap-4 py-10 mx-auto bg-white rounded-lg justify-evenly">
                <div className="flex flex-col w-1/3">
                    <div className="flex items-center justify-start gap-10">
                        <h4 className="py-3 text-gray-600 h-100 text-start">
                            Status :
                        </h4>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isVisible}
                                    onChange={handleChange}
                                    inputProps={{ "aria-label": "controlled" }}
                                    color="primary"
                                />
                            }
                            label={isVisible ? "Active" : "Disabled"}
                        />
                    </div>
                    <h4 className="py-3 text-gray-600 h-100 text-start">
                        Faculty Supervisor Image *
                    </h4>
                    <Fileponds imageToken={setImage} />
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center justify-center gap-4 py-8"
                >
                    <Inputs
                        isCreating={isCreating}
                        isUpdating={isUpdating}
                        errors={errors}
                        ApiError={ApiError}
                        register={register}
                        facultySupervisorData={facultySupervisorData}
                        getValues={getValues}
                        email={email}
                        name={name}
                    />
                </form>
            </div>
            <div className="py-16 mx-auto">
                <Tabs
                    aria-label="Options"
                    color="primary"
                    size="lg"
                    radius="sm"
                    classNames={{
                        tabList: "rounded-md p-0",
                        tab: "p-6 rounded-md",
                    }}
                >
                    {/* change user info form */}
                    <Tab
                        key="Roles"
                        title="Roles"
                        className="bg-white text-white-color "
                    >
                        <RolesForm
                            selectedRoles={selectedRoles}
                            setSelectedRoles={setSelectedRoles}
                        />
                    </Tab>
                    <Tab
                        key="Permissions"
                        title="Permissions"
                        className="bg-white text-white-color "
                    >
                        <PermissionsForm
                            selectedPermissions={selectedPermissions}
                            setSelectedPermissions={setSelectedPermissions}
                        />
                    </Tab>
                </Tabs>
            </div>
            <Button
                type="simple"
                onClick={handleSubmit(onSubmit)}
                className="w-full h-12"
            >
                {Object.keys(facultySupervisorData).length !== 0 ? (
                    isUpdating ? (
                        <Spinner color="white" />
                    ) : (
                        "Update Faculty Supervisor"
                    )
                ) : isCreating ? (
                    <Spinner color="white" />
                ) : (
                    "Create Faculty Supervisor"
                )}
            </Button>
        </div>
    );
}

export default CreateFacultySupervisorForm;
