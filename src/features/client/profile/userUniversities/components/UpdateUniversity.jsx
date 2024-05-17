import { useState } from "react";
import { useForm } from "react-hook-form";

import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";
import { Spinner } from "@nextui-org/react";
import Fileponds from "@/components/Filepond";

import useUpdateUniversity from "../hooks/useUpdateUniversity";

function UpdateUniversity({ oldValues, universityId, onCloseModal }) {
    const [newLogo, setNewLogo] = useState('')

    const { updateUniversity, isUpdating, error: ApiError } = useUpdateUniversity();
    const { name, description } = oldValues;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: { name, description } });

    function onSubmit({ name, description }) {
        if (newLogo)
            updateUniversity({ name, description, logo: newLogo ? newLogo : null, universityId }, {
                onSuccess: () => {
                    setNewLogo('')
                    onCloseModal?.()
                }
            });
        else
            updateUniversity({ name, description, universityId }, {
                onSuccess: () => {
                    setNewLogo('')
                    onCloseModal?.()
                }
            });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-full gap-4 ">

            <CustomInput
                type="name"
                label="University name"
                size="lg"
                isError={errors?.name || ApiError?.response?.data?.errors?.name?.[0]}
                className="w-4/5 md:w-96 "
                errorMessage={errors?.name?.message || ApiError?.response?.data?.errors?.name?.[0]}
                isDisabled={isUpdating}
                register={register("name", {
                    required: "user name is required",
                })}
            />

            <CustomInput
                type="description"
                label="description"
                size="lg"
                isError={errors?.description || ApiError?.response?.data?.errors?.description?.[0]}
                className="w-4/5 md:w-96 "
                errorMessage={errors?.description?.message || ApiError?.response?.data?.errors?.description?.[0]}
                isDisabled={isUpdating}
                register={register("description", {
                    required: "description is required",
                })}
            />

            <div className="w-full">
                <Fileponds imageToken={setNewLogo} />
            </div>
            <div>
                <Button type="primary" className="md:w-96">
                    {isUpdating ? <Spinner color="white" /> : "Update University"}
                </Button>
            </div>
        </form>
    );
}

export default UpdateUniversity;
