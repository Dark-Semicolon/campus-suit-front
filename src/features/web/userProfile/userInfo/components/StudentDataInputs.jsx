import { IoCallOutline, IoHomeOutline } from "react-icons/io5";
import Input from "../../../../../components/input/Input";
import CustomSelect from "../../../../../components/select/CustomSelect";
import { LuSchool } from "react-icons/lu";

function StudentDataInputs({
  register,
  updating,
  isPending,
  ApiError,
  watch,
  setValue,
  getValues,
}) {
  const data = [
    { value: "", text: "الصف الدراسي" },
    { value: "1", text: "الصف الاول الثانوي" },
    { value: "2", text: "الصف الثاني الثانوي" },
    { value: "3", text: "الصف الثالث الثانوي" },
  ];
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:flex lg:justify-center lg:items-center">
        <CustomSelect
          edit={true}
          name="grade"
          label={"الصف الدراسي*"}
          size="halfWidth"
          options={data}
          setValue={setValue}
          watch={watch}
          disabled={isPending || updating}
          register={register("grade")}
          error={ApiError?.response?.data?.errors?.grade?.[0]}
        />
        {/* City */}
        <Input
          edit={true}
          type="text"
          name="city"
          id="city"
          label="المدينة*"
          size="halfWidth"
          disabled={isPending || updating}
          icon={
            <IoHomeOutline className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
          }
          register={register("city")}
          error={ApiError?.response?.data?.errors?.city?.[0]}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:flex lg:justify-center lg:items-center">
        {/* School */}
        <Input
          edit={true}
          type="text"
          name="school"
          id="school"
          label="المدرسة*"
          size="halfWidth"
          disabled={isPending || updating}
          icon={
            <LuSchool className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
          }
          register={register("school")}
          error={ApiError?.response?.data?.errors?.school?.[0]}
        />
        {/* Phone */}
        <Input
          edit={true}
          type="tel"
          name="phone"
          id="phone"
          disabled={isPending || updating}
          label="رقم الهاتف*"
          size="halfWidth"
          register={register("phone", {
            pattern: {
              value: /^01[0125][0-9]{8}$/,
              message: "برجاء وضع رقم هاتف صالح",
            },
          })}
          error={ApiError?.response?.data?.errors?.phone?.[0]}
          icon={
            <IoCallOutline className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
          }
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:flex lg:justify-center lg:items-center">
        {/* Gender */}
        <CustomSelect
          edit={true}
          name="gender"
          label="النوع*"
          size="halfWidth"
          disabled={isPending || updating}
          setValue={setValue}
          watch={watch}
          register={register("gender")}
          error={ApiError?.response?.data?.errors?.gender?.[0]}
          options={[
            { value: "", text: "النوع" },
            { value: "male", text: "ذكر" },
            { value: "female", text: "انثي" },
          ]}
        />
        {/* ParentPhone */}
        <Input
          edit={true}
          type="tel"
          name="parent_phone"
          // id="parent_phone"
          disabled={isPending || updating}
          label="هاتف ولي الأمر*"
          size="halfWidth"
          register={register("parent_phone", {
            pattern: {
              value: /^01[0125][0-9]{8}$/,
              message: "برجاء وضع رقم هاتف صالح",
            },
            validate: (value) => {
              const phone = getValues().phone;
              (value.trim() !== "" && value !== phone) || "قم بكتابة رقم اخر";
            },
          })}
          error={ApiError?.response?.data?.errors?.parent_phone?.[0]}
          icon={
            <IoCallOutline className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
          }
        />
      </div>
    </>
  );
}

export default StudentDataInputs;
