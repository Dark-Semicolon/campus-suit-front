import PasswordInput from "@/components/input/PasswordInput";
import Input from "./../../../../components/input/Input";
import { MdOutlineEmail } from "react-icons/md";

function MainDataInputs({
  isRequired,
  register,
  getValues,
  isPending,
  errors,
  ApiError,
  edit = false,
}) {
  return (
    <>
      {/* Email */}
      <Input
        edit={edit}
        type="email"
        name="email"
        id="email"
        disabled={isPending}
        label="البريد الإلكتروني*"
        size="fullWidth"
        icon={
          <MdOutlineEmail className="absolute top-[24px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
        }
        register={
          register &&
          register("email", {
            ...(isRequired ? { required: isRequired } : {}),
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "يرجى كتابة عنوان بريد إلكتروني صالح",
            },
          })
        }
        error={
          errors?.email?.message || ApiError?.response?.data?.errors?.email?.[0]
        }
      />

      {/* Password */}
      <PasswordInput
        label="كلمة السر*"
        name="password"
        disabled={isPending}
        error={
          errors?.password?.message ||
          ApiError?.response?.data?.errors?.password?.[0]
        }
        size="fullWidth"
        register={
          register &&
          register("password", {
            ...(isRequired ? { required: isRequired } : {}),
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، بما في ذلك حرف كبير وحرف صغير ورقم واحد وحرف خاص واحد.",
            },
          })
        }
      />

      {/* PasswordConfirmaion */}
      <PasswordInput
        label="تأكيد كلمة السر*"
        disabled={isPending}
        name="passwordConfirmation"
        error={
          errors?.passwordConfirmation?.message ||
          ApiError?.response?.data?.errors?.password_confirmation?.[0]
        }
        size="fullWidth"
        register={
          register &&
          register("passwordConfirmation", {
            ...(isRequired ? { required: isRequired } : {}),
            validate: {
              validate: (value) =>
                value !== getValues().password
                  ? "كلمة المرور وتأكيد كلمة المرور غير متطابقين."
                  : true,
            },
          })
        }
      />
    </>
  );
}

export default MainDataInputs;
