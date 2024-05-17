import CustomInput from "@/components/CustomInput";

function PersonalInputs({ register, updating, isPending, errors, ApiError, defaultValue }) {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 lg:justify-center lg:items-center">
                {/* FirstName */}

                <CustomInput
                    type="name"
                    label="Full name"
                    size="lg"
                    isError={errors?.name || ApiError?.response?.data?.errors?.name?.[0]}
                    className="w-4/5"
                    defaultValue={defaultValue[0]}
                    errorMessage={errors?.name?.message || ApiError?.response?.data?.errors?.name?.[0]}
                    isDisabled={isPending || updating}
                    register={register("name", {
                        required: "user name is required",
                    })}
                />

                <CustomInput
                    type="email"
                    label="Email"
                    size="lg"
                    isError={errors?.email || ApiError?.response?.data?.errors?.email?.[0]}
                    className="w-4/5 "
                    defaultValue={defaultValue[1]}
                    errorMessage={errors?.email?.message || ApiError?.response?.data?.errors?.email?.[0]}
                    isDisabled={isPending || updating}
                    register={register("email", {
                        required: "email is required",
                    })}
                />
            </div>
        </>
    );
}

export default PersonalInputs;
