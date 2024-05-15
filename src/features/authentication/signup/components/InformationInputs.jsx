import { BsPerson } from "react-icons/bs";
import Input from "@/components/input/Input";
import CustomSelect from "@/components/select/CustomSelect";

function InformationInputs({
  isRequired,
  register,
  isPending,
  errors,
  ApiError,
  watch,
  setValue,
}) {
  return (
    <>
      <div className="flex gap-4">
        {/* FirstName */}
        <Input
          type="text"
          id="firstName"
          name="firstName"
          disabled={isPending}
          label="الإسم الأول*"
          size="half"
          icon={
            <BsPerson className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
          }
          register={register("firstName", {
            ...(isRequired ? { required: isRequired } : {}),
          })}
          error={errors?.firstName?.message}
        />

        {/* SecondName */}
        <Input
          type="text"
          name="secondName"
          id="secondName"
          disabled={isPending}
          label="الإسم الثاني*"
          size="half"
          icon={
            <BsPerson className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
          }
          register={register("secondName", {
            ...(isRequired ? { required: isRequired } : {}),
          })}
          error={errors?.secondName?.message}
        />
      </div>

      <div className="flex gap-4">
        {/* LastName */}
        <Input
          type="text"
          name="lastName"
          id="lastName"
          disabled={isPending}
          label="الإسم الأخير*"
          size="half"
          icon={
            <BsPerson className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
          }
          register={register("lastName", {
            ...(isRequired ? { required: isRequired } : {}),
          })}
          error={errors?.lastName?.message}
        />

        {/* Gender */}

        <CustomSelect
          name="gender"
          label="النوع*"
          size="half"
          disabled={isPending}
          setValue={setValue}
          watch={watch}
          register={register("gender", {
            ...(isRequired ? { required: isRequired } : {}),
          })}
          error={
            errors?.gender?.message ||
            ApiError?.response?.data?.errors?.gender?.[0]
          }
          options={[
            { value: "male", text: "ذكر" },
            { value: "female", text: "انثي" },
          ]}
        />
      </div>
    </>
  );
}

export default InformationInputs;
