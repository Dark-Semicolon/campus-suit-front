import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Spinner } from "@nextui-org/react";

import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";
import Fileponds from "@/components/Filepond";

import { useUpdateFaculty } from "../hooks/useUpdateFaculty";


function UpdateFaculty({ onCloseModal, data }) {
    const { universityId } = useParams()
    const [logo, setLogo] = useState('')

    const { updateFaculty, isupdating, error: ApiError } = useUpdateFaculty();

    const { id, name, description } = data
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ defaultValues: { name, description } });


    function onSubmit({ name, description }) {
        const payLoad = logo ? { name, description, logo, universityId, facultyId: id } : { facultyId: id, name, description, universityId }

        updateFaculty(payLoad, {
            onSuccess: () => {
                reset();
                setLogo('')
                onCloseModal?.()
            }
        });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-full gap-4 ">
            <h4 className="py-3 text-blue-color-primary">Update new Faculty</h4>

            <CustomInput
                type="name"
                label="Faculty name"
                size="lg"
                defaultValue={name}
                isError={errors?.name || ApiError?.response?.data?.errors?.name?.[0]}
                className="w-4/5 md:w-96 "
                errorMessage={errors?.name?.message || ApiError?.response?.data?.errors?.name?.[0]}
                isDisabled={isupdating}
                register={register("name", {
                    required: "Faculty name is required",
                })}
            />

            <CustomInput
                type="description"
                label="Faculty Description"
                size="lg"
                defaultValue={description}
                isError={errors?.description || ApiError?.response?.data?.errors?.description?.[0]}
                className="w-4/5 md:w-96 "
                errorMessage={errors?.description?.message || ApiError?.response?.data?.errors?.description?.[0]}
                isDisabled={isupdating}
                register={register("description", {
                    required: "description is required",
                })}
            />


            <div className="w-full">
                <h4 className="py-3 text-blue-color-primary">Faculty Logo</h4>
                <Fileponds imageToken={setLogo} />
            </div>

            <div>
                <Button type="primary" className="md:w-96">
                    {isupdating ? <Spinner color="white" /> : "update"}
                </Button>
            </div>
        </form>
    );
}

export default UpdateFaculty;
