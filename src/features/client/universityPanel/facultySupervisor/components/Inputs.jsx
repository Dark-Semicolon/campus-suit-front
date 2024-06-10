import CustomInput from "@/components/CustomInput";

function Inputs({
    isCreating,
    isUpdating,
    errors,
    ApiError,
    register,
    facultySupervisorData,
    getValues,
    email,
    name,
}) {
    console.log(Object.keys(facultySupervisorData).length);

    return (
        <>
            <CustomInput
                type="name"
                label="Supervisor name"
                isDisabled={isCreating || isUpdating}
                defaultValue={getValues().name || name}
                size="lg"
                isError={
                    errors?.name || ApiError?.response?.data?.errors?.name?.[0]
                }
                className="w-4/5 md:w-96 "
                errorMessage={
                    errors?.name?.message ||
                    ApiError?.response?.data?.errors?.name?.[0]
                }
                register={register("name", {
                    required: !Object.keys(facultySupervisorData).length
                        ? "Supervisor Name Is Required"
                        : false,
                })}
            />

            <CustomInput
                type="email"
                label="Email"
                size="lg"
                defaultValue={getValues().email || email}
                isError={
                    errors?.email ||
                    ApiError?.response?.data?.errors?.email?.[0]
                }
                className="w-4/5 md:w-96 "
                errorMessage={
                    errors?.email?.message ||
                    ApiError?.response?.data?.errors?.email?.[0]
                }
                isDisabled={isCreating || isUpdating}
                register={register("email", {
                    required: !Object.keys(facultySupervisorData).length
                        ? "Supervisor Email Is Required"
                        : false,
                })}
            />

            <CustomInput
                type="password"
                label="Password"
                defaultValue={getValues().password}
                size="lg"
                color={
                    errors?.password ||
                    ApiError?.response?.data?.errors?.password?.[0]
                }
                isDisabled={isCreating || isUpdating}
                className="w-4/5 md:w-96"
                errorMessage={errors?.password?.message}
                register={register("password", {
                    required: !Object.keys(facultySupervisorData).length
                        ? "Password is required"
                        : false,
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}/,
                        message:
                            "Your Password Must Be At Least 8 Characters Long And Contain Both Letters And Numbers.",
                    },
                })}
            />

            <CustomInput
                type="password"
                label="Confirm password"
                defaultValue={getValues().passwordConfirmation}
                size="lg"
                isDisabled={isCreating || isUpdating}
                isError={
                    errors?.passwordConfirmation ||
                    ApiError?.response?.data?.errors?.passwordConfirmation?.[0]
                }
                className="w-4/5 md:w-96"
                errorMessage={errors?.passwordConfirmation?.message}
                register={register("passwordConfirmation", {
                    required: !Object.keys(facultySupervisorData).length
                        ? "Confirm Password is required"
                        : false,
                    validate: {
                        validate: (value) =>
                            value !== getValues().password
                                ? "The password And Password Confirmation Don't Match."
                                : true,
                    },
                })}
            />
        </>
    );
}

export default Inputs;
