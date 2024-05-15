import { IoCallOutline } from "react-icons/io5";
import Input from "../../../../components/input/Input";

function ComunicationInputs({
  register,
  getValues,
  isPending,
  errors,
  ApiError,
  isRequired,
}) {
  return (
    <>
      <div className="flex gap-4">
        {/* Phone */}
        <Input
          type="tel"
          name="phone"
          id="phone"
          disabled={isPending}
          label="رقم الهاتف*"
          size="half"
          register={register("phone", {
            ...(isRequired ? { required: isRequired } : {}),
            pattern: {
              value: /^01[0125][0-9]{8}$/,
              message: "برجاء وضع رقم هاتف صالح",
            },
          })}
          error={
            errors?.phone?.message ||
            ApiError?.response?.data?.errors?.phone?.[0]
          }
          icon={
            <IoCallOutline className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
          }
        />

        {/* ParentPhone */}
        <Input
          type="tel"
          name="parent_phone"
          // id="parent_phone"
          disabled={isPending}
          label="هاتف ولي الأمر*"
          size="half"
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
      </div>
    </>
  );
}

export default ComunicationInputs;
