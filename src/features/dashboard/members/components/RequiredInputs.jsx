import { BsPerson } from "react-icons/bs";
import Input from "@/components/input/Input";
// import MainDataInputs from "../../../authentication/signup/components/MainDataInputs";

function RequiredInputs({
  register,
  isPending,
  errors,
  ApiError,
  getValues,
  isRequired,
}) {
  return (
    <>
      {/* TODO:status,Image */}
      <div className="flex gap-4">
        {/* FirstName */}
        <Input
          type="text"
          id="firstName"
          name="firstName"
          disabled={isPending}
          label="الإسم الأول*"
          size="fullWidth"
          icon={
            <BsPerson className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
          }
          register={register("firstName", {
            ...(isRequired ? { required: isRequired } : {}),
          })}
          error={
            errors?.firstName?.message ||
            ApiError?.response?.data?.errors?.email?.[0]
          }
        />

        {/* SecondName */}
        <Input
          type="text"
          name="secondName"
          id="secondName"
          disabled={isPending}
          label="الإسم الثاني*"
          size="fullWidth"
          icon={
            <BsPerson className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
          }
          register={register("secondName", {
            ...(isRequired ? { required: isRequired } : {}),
          })}
          error={
            errors?.secondName?.message ||
            ApiError?.response?.data?.errors?.email?.[0]
          }
        />
      </div>

      {/* <div className="flex gap-4"> */}
      {/* LastName */}
      <Input
        type="text"
        name="lastName"
        id="lastName"
        disabled={isPending}
        label="الإسم الأخير*"
        size="fullWidth"
        icon={
          <BsPerson className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
        }
        register={register("lastName", {
          ...(isRequired ? { required: isRequired } : {}),
        })}
        error={errors?.lastName?.message}
      />

      {/* <MainDataInputs
        isRequired={isRequired}
        register={register}
        isPending={isPending}
        errors={errors}
        ApiError={ApiError}
        getValues={getValues}
      /> */}
    </>
  );
}

export default RequiredInputs;
