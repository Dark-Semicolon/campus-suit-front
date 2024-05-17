import { useState } from "react";
import { useForm } from "react-hook-form";
import { Tab, Tabs } from "@nextui-org/react";

import { useUpdateUserData } from "./hooks/useUpdateUserData";
import { useUser } from '@/features/client/auth/hooks/useUser';

import HeroLinks from "@/components/HeroLinks";
import Button from "@/components/Button";
import PersonalInputs from "./components/PersonalInputs";
import CustomInput from "@/components/CustomInput";

function UserInfoPage() {
    const [isUpdateInputs, setIsUpdateInputs] = useState(true);
    const { user } = useUser();
    const { name, email } = user.attributes;

    const { updateUser, error: ApiError, isUpdating } = useUpdateUserData();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        reset,
    } = useForm({});

    function onSubmit(data) {
        const { name, email, password, passwordConfirmation } = data;
        console.log(data);
        const updateUserData = {
            name,
            email,
            password,
            passwordConfirmation,
        };
        //Send The Form Data To The API
        updateUser(updateUserData, {
            onSuccess: () => {
                setIsUpdateInputs(true);
                reset();
            },
        });
    }

    return (
        <section>
            <div className="pt-3 pb-10 space-y-5">
                <h2 className="text-xl md:text-3xl text-blue-color-primary">
                    Personal<span className="text-blue-color-light"> Informations</span>
                </h2>
                <HeroLinks
                    pages={[
                        { name: "Profie", link: "/user/profile" },
                        { name: "Home", link: "/" },
                    ]}
                />
            </div>

            <div className="flex flex-col w-full">
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
                    <Tab key="personal" title="personal info" className="bg-white text-white-color ">
                        <div className="flex flex-col items-center justify-center gap-5 py-5 md:p-10 ">
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4">
                                <PersonalInputs
                                    register={register}
                                    setValue={setValue}
                                    isPending={isUpdating}
                                    updating={isUpdateInputs}
                                    defaultValue={[name, email]}
                                    errors={errors}
                                    ApiError={ApiError}
                                />

                                <div className="flex items-center justify-center w-full gap-8 py-8">
                                    {isUpdateInputs ? (
                                        <Button
                                            type="primary"
                                            className="w-4/5 h-12 leading-8 text-md "
                                            disabled={isUpdating}
                                            onClick={(e) => {
                                                setIsUpdateInputs((isUpdateInputs) => !isUpdateInputs);
                                                e.preventDefault();
                                            }}
                                        >
                                            Edit Personal Info
                                        </Button>
                                    ) : (
                                        <Button type="primary" className="w-4/5 h-12 text-sm leading-8 " disabled={isUpdating}>
                                            {isUpdating ? "Editing" : "Save Edits"}
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </Tab>

                    {/* change Password form */}
                    <Tab key="password" title="password" className="bg-white text-white-color">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-5 py-5 md:p-10">
                            {/* Password */}
                            <CustomInput
                                type="password"
                                label="New password"
                                size="lg"
                                color={errors?.password || ApiError?.response?.data?.errors?.password?.[0]}
                                isDisabled={isUpdating}
                                className="w-4/5"
                                errorMessage={errors?.password?.message}
                                register={register("password", {
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message: "The password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character.",
                                    },
                                })}
                            />

                            {/* password confirmation */}
                            <CustomInput
                                type="password"
                                label="Confirm password"
                                size="lg"
                                isDisabled={isUpdating}
                                isError={errors?.password_confirmation || ApiError?.response?.data?.errors?.passwordConfirmation?.[0]}
                                className="w-4/5"
                                errorMessage={errors?.passwordConfirmation?.message}
                                register={register("passwordConfirmation", {
                                    validate: {
                                        validate: (value) => (value !== getValues().password ? "The password and password confirmation do not match." : true),
                                    },
                                })}
                            />

                            <div className="flex items-center justify-center w-full gap-8 py-8">
                                <Button type="primary" className="w-4/5 h-12 text-sm leading-8" disabled={isUpdating}>
                                    {isUpdating ? "Editing" : "Edit Password"}
                                </Button>
                            </div>
                        </form>
                    </Tab>
                </Tabs>
            </div>
        </section>
    );
}

export default UserInfoPage;
