import { useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "@nextui-org/react";

import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";
import Fileponds from "@/components/Filepond";
import { useCreateFaculty } from "../hooks/useCreateFaculty";
import { useParams } from "react-router-dom";

function CreateFaculty({ onCloseModal }) {
    const { universityId } = useParams();
    const [logo, setLogo] = useState("");
    const { createFaculty, isCreating, error: ApiError } = useCreateFaculty();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({});

    function onSubmit(data) {
        if (!logo) return null;

        createFaculty(
            { ...data, logo, universityId },
            {
                onSuccess: () => {
                    reset();
                    setLogo("");
                    onCloseModal?.();
                },
            }
        );
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center w-full gap-4 "
        >
            <h4 className="py-3 text-blue-color-primary">Create new Faculty</h4>

            <CustomInput
                type="name"
                label="Faculty name"
                size="lg"
                isError={
                    errors?.name || ApiError?.response?.data?.errors?.name?.[0]
                }
                className="w-4/5 md:w-96 "
                errorMessage={
                    errors?.name?.message ||
                    ApiError?.response?.data?.errors?.name?.[0]
                }
                isDisabled={isCreating}
                register={register("name", {
                    required: "Faculty name is required",
                })}
            />

            <CustomInput
                type="description"
                label="Faculty Description"
                size="lg"
                isError={
                    errors?.description ||
                    ApiError?.response?.data?.errors?.description?.[0]
                }
                className="w-4/5 md:w-96 "
                errorMessage={
                    errors?.description?.message ||
                    ApiError?.response?.data?.errors?.description?.[0]
                }
                isDisabled={isCreating}
                register={register("description", {
                    required: "description is required",
                })}
            />

            <div className="w-full">
                <h4 className="py-3 text-blue-color-primary">Faculty Logo *</h4>
                <Fileponds imageToken={setLogo} required={true} />
            </div>

            <div>
                <Button type="primary" className="md:w-96">
                    {isCreating ? <Spinner color="white" /> : "Create"}
                </Button>
            </div>
        </form>
    );
}

export default CreateFaculty;
