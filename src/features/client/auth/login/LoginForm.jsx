import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Checkbox } from "@nextui-org/react";


import AuthLayout from "@/layouts/Auth/AuthLayout";

import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import { useAuth } from '@/hooks/auth/useAuth';

function LoginForm() {
  const [remember, setRemember] = useState(false);

  const { useLogin } = useAuth({ gardName: 'client' })

  const { login, isPending, error: ApiError } = useLogin()
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
      title="Log in"
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
            to="/forgetpassword"
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

      <div className="pt-5 text-center text-blue-color-primary">
        <div className="py-2">
          <span>New to CampusSuit ?</span>
          <Link to="/signup" className="px-2 text-mint-green-color-primary">
            Sign up now
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default LoginForm;
