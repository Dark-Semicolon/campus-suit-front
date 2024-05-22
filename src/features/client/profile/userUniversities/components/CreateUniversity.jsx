import { useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "@nextui-org/react";
import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";
import Fileponds from "@/components/Filepond";

import useCreateUniversity from "../hooks/useCreateUniversity";

function CreateUniversity({ onCloseModal }) {
    const [logo, setLogo] = useState('')
    const { createUniversity, isCreating, error: ApiError } = useCreateUniversity();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({});

    function onSubmit(data) {
        if (!logo) return null

        createUniversity({ ...data, logo }, {
            onSuccess: () => {
                reset();
                setLogo('')
                onCloseModal?.()
            }
        });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-full gap-4 ">

            <h4 className="py-3 text-blue-color-primary">Create new university</h4>

            <CustomInput
                type="name"
                label="University name"
                size="lg"
                isError={errors?.name || ApiError?.response?.data?.errors?.name?.[0]}
                className="w-4/5 md:w-96 "
                errorMessage={errors?.name?.message || ApiError?.response?.data?.errors?.name?.[0]}
                isDisabled={isCreating}
                register={register("name", {
                    required: "University name is required",
                })}
            />

            <CustomInput
                type="description"
                label="Description"
                size="lg"
                isError={errors?.description || ApiError?.response?.data?.errors?.description?.[0]}
                className="w-4/5 md:w-96 "
                errorMessage={errors?.description?.message || ApiError?.response?.data?.errors?.description?.[0]}
                isDisabled={isCreating}
                register={register("description", {
                    required: "description is required",
                })}
            />

            <div className="w-full">
                <Fileponds imageToken={setLogo} />
            </div>

            <div>
                <Button type="primary" className="md:w-96">
                    {isCreating ? <Spinner color="white" /> : "Create University"}
                </Button>
            </div>
        </form>
    );
}

export default CreateUniversity;
