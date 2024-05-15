import { IoHomeOutline } from "react-icons/io5";
import { LuSchool } from "react-icons/lu";

import Input from "../../../../components/input/Input";
import CustomSelect from "../../../../components/select/CustomSelect";

function EducationInputs({
  isRequired,
  register,
  isPending,
  errors,
  ApiError,
  watch,
  setValue,
  edit = false,
}) {
  const data = [
    { value: "1", text: "الصف الاول الثانوي" },
    { value: "2", text: "الصف الثاني الثانوي" },
    { value: "3", text: "الصف الثالث الثانوي" },
  ];
  return (
    <>
      {/* grade */}

      <CustomSelect
        name="grade"
        label={"الصف الدراسي*"}
        size="fullWidth"
        options={data}
        setValue={setValue}
        watch={watch}
        disabled={isPending}
        register={register("grade", {
          ...(isRequired ? { required: isRequired } : {}),
        })}
        error={
          errors?.grade?.message || ApiError?.response?.data?.errors?.grade?.[0]
        }
      />
      {/* City */}
      <Input
        edit={edit}
        type="text"
        name="city"
        id="city"
        label="المدينة*"
        size="fullWidth"
        disabled={isPending}
        icon={
          <IoHomeOutline className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
        }
        register={register("city", {
          ...(isRequired ? { required: isRequired } : {}),
        })}
        error={
          errors?.city?.message || ApiError?.response?.data?.errors?.city?.[0]
        }
      />
      {/* School */}
      <Input
        edit={edit}
        type="text"
        name="school"
        id="school"
        label="المدرسة*"
        size="fullWidth"
        disabled={isPending}
        icon={
          <LuSchool className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
        }
        register={register("school", {
          ...(isRequired ? { required: isRequired } : {}),
        })}
        error={errors?.school?.message}
      />
    </>
  );
}

export default EducationInputs;
