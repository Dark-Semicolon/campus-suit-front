import { useForm } from "react-hook-form";
import { useSignup } from "./../hooks/useSignup";

import Button from "@/components/Button";
import CustomInput from "../../../components/CustomInput";

function SignupForm({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { signup, error: ApiError, isPending } = useSignup();

  function onSubmit({ name, email, password, passwordConfirmation, }) {

    //Send The Form Data To The API
    signup(
      { name, email, password, password_confirmation: passwordConfirmation },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center w-[80%] lg:w-[60%] space-y-4"
    >

      <CustomInput
        type="name"
        label="Full name"
        size="lg"
        isError={errors?.name}
        isDisabled={isPending}
        errorMessage={
          errors?.name?.message || ApiError?.response?.data?.errors?.name?.[0]
        }
        register={register("name", {
          required: "user name is required",
        })}
      />


      <CustomInput
        type="email"
        label="Email"
        name="email"
        size="lg"
        disabled={isPending}
        isError={errors?.email}
        errorMessage={
          errors?.email?.message || ApiError?.response?.data?.errors?.email?.[0]
        }
        register={
          register("email", {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please write a valid email address",
            },
          })
        }
      />


      {/* Password */}
      <CustomInput
        type="password"
        label="New password"
        size="lg"
        isError={errors?.password}
        isDisabled={isPending}
        errorMessage={errors?.password?.message}
        register={register("password", {
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              "The password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character.",
          },
        })}
      />

      {/* password confirmation */}
      <CustomInput
        type="password"
        label="Confirm password"
        size="lg"
        isDisabled={isPending}
        isError={errors?.passwordConfirmation}
        errorMessage={errors?.passwordConfirmation?.message}
        register={register("passwordConfirmation", {
          validate: {
            validate: (value) =>
              value !== getValues().password
                ? "The password and password confirmation do not match."
                : true,
          },
        })}
      />

      <div className="w-full mt-6">
        <Button
          type="primary"
          className="w-full leading-8"
          disabled={isPending}
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
}

export default SignupForm;
