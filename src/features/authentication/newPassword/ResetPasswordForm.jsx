import { useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdOutlineEmail } from "react-icons/md";

import AuthLayout from "@/layouts/Auth/AuthLayout";
import Input from "@/components/input/Input";
import PasswordInput from "@/components/input/PasswordInput";
import Button from "@/components/Button";
import { useResetPassword } from "../hooks/useResetPassword";

function ResetPasswordForm() {
  const { register, formState, handleSubmit, getValues } = useForm();
  const { errors } = formState;

  const { isPending, resetPassword, error: ApiError } = useResetPassword();

  const { token } = useParams();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");


  function onSubmit(data) {
    const { email, password, password_confirmation } = data;

    resetPassword({ token, email, password, password_confirmation });
  }

  return (
    <AuthLayout title="تغيير كلمه السر" description="ادخل كلمة السر الجديده">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <Input
          className="py-2"
          type="email"
          name="email"
          // disabled={email}
          label="البريد الإلكتروني*"
          defaultValue={email}
          size="full"
          icon={
            <MdOutlineEmail className="absolute top-[24px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
          }
          register={register("email", {
            required: "هذه الخانة مطلوبه",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "يرجى كتابة عنوان بريد إلكتروني صالح",
            },
          })}
          error={
            errors?.email?.message ||
            ApiError?.response?.data?.errors?.email?.[0]
          }
        />

        {/* Password */}
        <PasswordInput
          className="py-2"
          label="كلمة السر"
          name="password"
          disabled={isPending}
          error={
            errors?.password?.message ||
            ApiError?.response?.data?.errors?.password?.[0]
          }
          size="full"
          register={register("password", {
            required: "هذه الخانة مطلوبه",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، بما في ذلك حرف كبير وحرف صغير ورقم واحد وحرف خاص واحد.",
            },
          })}
        />

        {/* PasswordConfirmaion */}
        <PasswordInput
          className="py-2"
          label="تأكيد كلمة السر"
          disabled={isPending}
          name="password_confirmation"
          error={
            errors?.password_confirmation?.message ||
            ApiError?.response?.data?.errors?.password_confirmation?.[0]
          }
          size="full"
          register={register("password_confirmation", {
            required: "هذه الخانة مطلوبه",
            validate: {
              validate: (value) =>
                value !== getValues().password
                  ? "كلمة المرور وتأكيد كلمة المرور غير متطابقين."
                  : true,
            },
          })}
        />
        <div className="w-full py-3">
          <Button
            type="primary"
            className="w-full leading-8"
            disabled={isPending}
          >
            تسجيل
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default ResetPasswordForm;
