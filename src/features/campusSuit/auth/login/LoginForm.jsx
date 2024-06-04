import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Checkbox } from "@nextui-org/react";


import AuthLayout from "@/layouts/Auth/AuthLayout";

import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import { useAuth } from "@/hooks/auth/useAuth";


function LoginForm() {
  const [remember, setRemember] = useState(false);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const { useLogin } = useAuth({ gardName: 'admin', loginRedirect: '/admin/dashboard', logoutRedirect: '/admin/login' })

  const { login, isPending, error: ApiError } = useLogin()


  function onSubmit(data) {
    const { email, password } = data;
    if (!email && !password) return;

    login(
      { gardName: 'admin', email, password, remember },
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
      title="Admin Login"
      description="Log in with your registered email and password."
      className="py-7"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-4 w4/5 md:w-1/2"
      >
        {/* Email */}

        <CustomInput
          type="email"
          label="email"
          size="lg"
          color={errors?.email ? "danger" : ""}
          className="w-full text-black"
          errorMessage={
            errors?.email?.message ||
            ApiError?.response?.data?.errors?.email?.[0]
          }
          disabled={isPending}
          register={register("email", {
            required: "email is required",
          })}
        />

        {/* Password */}
        <CustomInput
          type="password"
          label="password"
          size="lg"
          color={errors?.password ? "danger" : ""}
          className="w-full text-black "
          errorMessage={
            errors?.password?.message ||
            ApiError?.response?.data?.errors?.password?.[0]
          }
          register={register("password", {
            required: "password is required",
          })}
        />

        <div className="flex flex-wrap items-center justify-between">


          <Checkbox
            color="primary"
            className="py-3"
            onChange={() => setRemember((remember) => !remember)}
          >
            <span className="px-3 text-blue-color-primary">Remember me</span>
          </Checkbox>

          <Link
            to="/admin/forgetpassword"
            className="px-2 text-mint-green-color-primary"
          >
            Forget password?
          </Link>
        </div>

        <div className="py-3 ">
          <Button
            type="primary"
            disabled={isPending}
            className="w-full leading-7"
          >
            {!isPending ? "Login" : "Login..."}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default LoginForm;
