import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Checkbox } from "@nextui-org/react";
import { MdOutlineEmail } from "react-icons/md";

import { useLogin } from "../hooks/useLogin";

import AuthLayout from "@/layouts/Auth/AuthLayout";

import Input from "@/components/input/Input";
import PasswordInput from "@/components/input/PasswordInput";
import Button from "@/components/Button";

function LoginForm() {
  const [remember, setRemember] = useState(false)
  const { login, isPending } = useLogin();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  function onSubmit(data) {
    const { email, password } = data;
    if (!email && !password) return;

    login(
      { email, password, remember },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  }

  return (
    <AuthLayout
      image="bg-login"
      title="تسجيل الدخول"
      description="ادخل علي حسابك بإدخال رقم الهاتف و كلمة المرور المسجل بهم من قبل"
      className="py-7"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
      >
        {/* Email */}
        <Input
          className="py-2"
          type="email"
          name="email"
          id="email"
          disable={"false"}
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
          error={errors?.email?.message}
        />

        {/* Password */}
        <PasswordInput
          className="py-2"
          label="كلمة السر"
          name="password"
          error={errors?.password?.message}
          size="full"
          register={register("password", {
            required: "هذه الخانة مطلوبه",
          })}
        />

        <Checkbox color="success" className="py-3" onChange={() => setRemember((remember) => !remember)}>
          <span className="px-3 text-blue-color-primary">
            تذكرني
          </span>
        </Checkbox>

        <div className="w-full py-3">
          <Button
            type="primary"
            disabled={isPending}
            className="w-full leading-7"
          >
            {!isPending ? "تسجيل" : "...جاري التسجيل"}
          </Button>
        </div>
      </form>

      <div className="pt-5 text-center text-blue-color-primary">
        <div className="py-2">
          <span>ليس لديك حساب؟</span>
          <Link to="/signup" className="px-2 text-mint-green-color-primary">
            إنشاء حساب
          </Link>
        </div>
        <div className="py-2 text-blue-color-primary">
          <span>هل نسيت كلمة السر؟</span>
          <Link to="/forgetpassword" className="px-2 text-mint-green-color-primary">
            إنشاء كلمة سر جديدة
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default LoginForm;
