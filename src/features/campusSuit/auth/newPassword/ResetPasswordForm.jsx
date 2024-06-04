import { useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import AuthLayout from "@/layouts/Auth/AuthLayout";

import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";

import { useAuth } from "@/hooks/auth/useAuth";

function ResetPasswordForm() {
  const { register, formState, handleSubmit, getValues } = useForm();
  const { errors } = formState;

  const { useResetPassword } = useAuth({ gardName: 'admin' })

  const { isPending, resetPassword, error: ApiError } = useResetPassword();

  const { token } = useParams();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");


  function onSubmit(data) {
    const { email, password, password_confirmation } = data;

    resetPassword({ token, email, password, password_confirmation });
  }

  return (
    <AuthLayout image='bg-forgotPassword' title="change Password" description="Enter the new password">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-5">
        {/* Email */}
        <CustomInput
          type="email"
          label="Email"
          name="email"
          size="lg"
          className="w-4/5"
          defaultValue={email}
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



        <CustomInput
          type="password"
          label="New password"
          size="lg"
          color={errors?.password || ApiError?.response?.data?.errors?.password?.[0]}
          isDisabled={isPending}
          className="w-4/5"
          errorMessage={errors?.password?.message}
          register={register("password", {
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}/,
              message:
                "Your password must be at least 8 characters long and contain both letters and numbers.",
            },
          })}
        />
        {/* password confirmation */}
        <CustomInput
          type="password"
          label="Confirm password"
          size="lg"
          isDisabled={isPending}
          isError={errors?.password_confirmation || ApiError?.response?.data?.errors?.password_confirmation?.[0]}
          className="w-4/5"
          errorMessage={errors?.password_confirmation?.message}
          register={register("password_confirmation", {
            validate: {
              validate: (value) =>
                value !== getValues().password
                  ? "The password and password confirmation do not match."
                  : true,
            },
          })}
        />
        <div className="w-4/5 py-3">
          <Button
            type="primary"
            className="w-full leading-8"
            disabled={isPending}
          >
            Change
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default ResetPasswordForm;
