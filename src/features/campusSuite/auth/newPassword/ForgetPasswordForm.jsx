import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import AuthLayout from "@/layouts/Auth/AuthLayout";
import Button from "@/components/Button";
import { useForgetPassword } from "../hooks/useForgetPassword";
import CustomInput from "@/components/CustomInput";

function ForgetPasswordForm() {
  const navigate = useNavigate();

  const { register, formState: { errors }, handleSubmit } = useForm();

  const { isPending, forgetPassword, error: ApiError } = useForgetPassword();

  function onSubmit(data) {
    const { email } = data;
    forgetPassword({ email });
  }

  return (
    <AuthLayout
      image="bg-forgotPassword"
      title="Forgot your password"
      description="Enter your email address and we will send you a link to reset your password"
      className="py-14"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-[70%]">

        <CustomInput
          type="email"
          label="Email"
          name="email"
          size="lg"
          disabled={isPending}
          isError={errors?.email || ApiError?.response?.data?.errors?.email?.[0]}
          errorMessage={
            errors?.email?.message || ApiError?.response?.data?.errors?.email?.[0]
          }
          register={
            register("email", {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please write a valid email address",
              },
            })
          }
        />


        <div className="flex w-full gap-5 py-5">
          <Button type="primary" className="w-1/2" disabled={isPending}>
            Next
          </Button>

          <Button
            type="bordered"
            className="w-1/2 rounded-full border-blue-color-light text-blue-color-light"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1, { replace: true });
            }}
          >
            Back
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default ForgetPasswordForm;
