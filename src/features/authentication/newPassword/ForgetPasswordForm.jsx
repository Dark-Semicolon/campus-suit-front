import { useForm } from "react-hook-form";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import AuthLayout from "@/layouts/Auth/AuthLayout";
import Input from "@/components/input/Input";
import Button from "@/components/Button";
import { useForgetPassword } from "../hooks/useForgetPassword";

function ForgetPasswordForm() {
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();

  const { isPending, forgetPassword, error: ApiError } = useForgetPassword();

  function onSubmit(data) {
    const { email } = data;
    if (!email) return;

    forgetPassword({ email });
  }

  return (
    <AuthLayout
      image="bg-login"
      title="نسيت كلمة السر"
      description="أدخل عنوان بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور الخاصة بك"
      className="py-14"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <Input
          className="py-2"
          type="email"
          name="email"
          id="email"
          disabled={isPending}
          label="البريد الإلكتروني*"
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

        <div className="flex w-full gap-5 py-4">
          <Button type="primary" className="w-1/2" disabled={isPending}>
            التالي
          </Button>

          <Button
            type="bordered"
            className="w-1/2 rounded-full border-blue-color-light text-blue-color-light hover:text-yellow-600 hover:border-yellow-600"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1, { replace: true });
            }}
          >
            عودة
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default ForgetPasswordForm;
