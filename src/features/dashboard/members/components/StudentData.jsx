import { IoCallOutline } from "react-icons/io5";
import EducationInputs from "../../../authentication/signup/components/EducationInputs";
import Input from "../../../../components/input/Input";
import CustomSelect from "../../../../components/select/CustomSelect";

function StudentData({
  edit,
  isPending,
  errors,
  ApiError,
  watch,
  setValue,
  getValues,
  register,
  isRequired,
}) {
  return (
    <>
      {/* Phone */}
      <Input
        edit={edit}
        type="tel"
        name="phone"
        id="phone"
        disabled={isPending}
        label="رقم الهاتف*"
        size="fullWidth"
        register={register("phone", {
          ...(isRequired ? { required: isRequired } : {}),
          pattern: {
            value: /^01[0125][0-9]{8}$/,
            message: "برجاء وضع رقم هاتف صالح",
          },
        })}
        error={
          errors?.phone?.message || ApiError?.response?.data?.errors?.phone?.[0]
        }
        icon={
          <IoCallOutline className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
        }
      />

      {/* ParentPhone */}
      <Input
        edit={edit}
        type="tel"
        name="parent_phone"
        disabled={isPending}
        label="هاتف ولي الأمر*"
        size="fullWidth"
        register={register("parent_phone", {
          ...(isRequired ? { required: isRequired } : {}),
          pattern: {
            value: /^01[0125][0-9]{8}$/,
            message: "برجاء وضع رقم هاتف صالح",
          },
          validate: (value) =>
            value !== getValues().phone || "قم بكتابة رقم اخر",
        })}
        error={
          errors?.parent_phone?.message ||
          ApiError?.response?.data?.errors?.parent_phone?.[0]
        }
        icon={
          <IoCallOutline className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
        }
      />

      {/* Gender */}
      <CustomSelect
        name="gender"
        label="النوع*"
        size="fullWidth"
        disabled={isPending}
        setValue={setValue}
        watch={watch}
        register={register("gender", {
          ...(isRequired ? { required: isRequired } : {}),
        })}
        error={ApiError?.response?.data?.errors?.gender?.[0]}
        options={[
          { value: "male", text: "ذكر" },
          { value: "female", text: "انثي" },
        ]}
      />
      <EducationInputs
        isRequired={isRequired}
        watch={watch}
        edit={edit}
        setValue={setValue}
        isPending={isPending}
        errors={errors}
        ApiError={ApiError}
        register={register}
      />
    </>
  );
}

export default StudentData;
