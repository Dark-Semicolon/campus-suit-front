import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Spinner } from "@nextui-org/react";
import { IoClose } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";

import { STORAGE_LINK } from "@/utils/constants";
import CustomInput from "@/components/CustomInput";
import Fileponds from "@/components/Filepond";
import Button from "@/components/Button";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { removeEmptyValues } from "../../../../../utils/helpers";
import Separetors from "./Separetors";

function UpdateAdmin({ user }) {
    const [editImage, setEditImage] = useState(false);
    const [imagelink, setImagelink] = useState("");

    const { name, email } = user.attributes;
    const { updateUser, isUpdating, error: ApiError } = useUpdateUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
    } = useForm();

    function onSubmit({ name, email }) {
        let updatedData = { name, email, image: imagelink };
        const filteredData = removeEmptyValues(updatedData);

        updateUser(
            { ...filteredData },
            {
                onSuccess: () => {
                    setImagelink("");
                    setEditImage(false);
                },
            }
        );
    }
    function onSubmitPass({ password, passwordConfirmation }) {
        let updatedData = { password, passwordConfirmation };
        const filteredData = removeEmptyValues(updatedData);

        updateUser(
            { ...filteredData },
            {
                onSuccess: () => {
                    reset();
                },
            }
        );
    }

    function handleCancel(e) {
        e.preventDefault();
        reset();
    }
    return (
        <>
            {/* User Data */}
            <Separetors>
                <div className="flex flex-col items-center justify-center md:p-8">
                    {editImage ? (
                        <div className="w-[150px] h-[200px]  rounded-lg">
                            <Fileponds
                                inTime={true}
                                className="w-full h-[200px] text-center"
                                imageToken={setImagelink}
                                gardName={"admin"}
                            />
                        </div>
                    ) : isUpdating ? (
                        <Spinner color="primary" />
                    ) : (
                        <Image
                            width={150}
                            alt="user image"
                            radius="lg"
                            src={
                                user?.attributes?.image === null
                                    ? "/images/userPlaceholder.webp"
                                    : `${STORAGE_LINK}/${user?.attributes?.image}`
                            }
                            className="mt-3"
                        />
                    )}
                    {!editImage ? (
                        <TbEdit
                            className="relative text-3xl font-bold cursor-pointer text-blue-color-light left-24 bottom-6"
                            onClick={() => setEditImage(true)}
                        />
                    ) : (
                        <IoClose
                            className="relative text-3xl font-bold cursor-pointer text-blue-color-light left-28 bottom-2"
                            onClick={() => setEditImage(false)}
                        />
                    )}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap gap-4 ">
                        <CustomInput
                            type="text"
                            label="Admin Name"
                            size="lg"
                            isError={
                                errors?.name ||
                                ApiError?.response?.data?.errors?.name?.[0]
                            }
                            className="w-full xl:w-80 "
                            errorMessage={
                                errors?.name?.message ||
                                ApiError?.response?.data?.errors?.name?.[0]
                            }
                            isDisabled={isUpdating}
                            defaultValue={name}
                            register={register("name")}
                        />

                        <CustomInput
                            type="email"
                            label="Email"
                            size="lg"
                            isError={
                                errors?.email ||
                                ApiError?.response?.data?.errors?.email?.[0]
                            }
                            className="w-full xl:w-80 "
                            errorMessage={
                                errors?.email?.message ||
                                ApiError?.response?.data?.errors?.email?.[0]
                            }
                            defaultValue={email}
                            isDisabled={isUpdating}
                            register={register("email")}
                        />
                    </div>
                    <div className="flex flex-wrap self-end justify-end gap-4 py-8">
                        <Button type="simple" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="simple">Update</Button>
                    </div>
                </form>
            </Separetors>

            {/* User Password */}
            <Separetors>
                <form onSubmit={handleSubmit(onSubmitPass)}>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <CustomInput
                            type="password"
                            label="Password"
                            size="lg"
                            color={
                                errors?.password ||
                                ApiError?.response?.data?.errors?.password?.[0]
                            }
                            isDisabled={isUpdating}
                            className="w-full xl:w-80"
                            errorMessage={errors?.password?.message}
                            register={register("password", {
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}/,
                                    message:
                                        "Your password must be at least 8 characters long and contain both letters and numbers.",
                                },
                            })}
                        />

                        {/* password confirmation */}
                        <CustomInput
                            type="password"
                            label="Confirm password"
                            size="lg"
                            isDisabled={isUpdating}
                            isError={
                                errors?.password_confirmation ||
                                ApiError?.response?.data?.errors
                                    ?.passwordConfirmation?.[0]
                            }
                            className="w-full xl:w-80"
                            errorMessage={errors?.passwordConfirmation?.message}
                            register={register("passwordConfirmation", {
                                validate: {
                                    validate: (value) =>
                                        value !== getValues().password
                                            ? "The password and password confirmation do not match."
                                            : true,
                                },
                            })}
                        />
                    </div>
                    <div className="flex flex-wrap self-end justify-end gap-4 py-8">
                        <Button type="simple" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="simple">Update</Button>
                    </div>
                </form>
            </Separetors>
        </>
    );
}

export default UpdateAdmin;
