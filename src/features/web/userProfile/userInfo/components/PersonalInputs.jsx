import CustomInput from "../../../../../components/CustomInput";

function PersonalInputs({
  register,
  updating,
  isPending,
  errors,
  ApiError,
  defaultValue,
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 lg:justify-center lg:items-center">
        {/* FirstName */}

        <CustomInput
          type="name"
          label="full name"
          size="lg"
          color={errors?.name ? "danger" : "y"}
          className="w-4/5 text-black"
          defaultValue={defaultValue[0]}
          errorMessage={
            errors?.name?.message || ApiError?.response?.data?.errors?.name?.[0]
          }
          disabled={isPending || updating}
          register={register("name", {
            required: "user name is required",
          })}
        />

        <CustomInput
          type="email"
          label="email"
          size="lg"
          color={errors?.email ? "danger" : ""}
          className="w-4/5 text-black"
          defaultValue={defaultValue[1]}
          errorMessage={
            errors?.email?.message ||
            ApiError?.response?.data?.errors?.email?.[0]
          }
          disabled={isPending || updating}
          register={register("email", {
            required: "email is required",
          })}
        />
      </div>
    </>
  );
}

export default PersonalInputs;
