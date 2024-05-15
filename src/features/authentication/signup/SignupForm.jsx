import { useForm } from "react-hook-form";
import { useSignup } from "./../hooks/useSignup";

import Button from "@/components/Button";
import MainDataInputs from "./components/MainDataInputs";
import InformationInputs from "./components/InformationInputs";
import EducationInputs from "./components/EducationInputs";
import ComunicationInputs from "./components/ComunicationInputs";

function SignupForm({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue,
    reset,
  } = useForm();

  const { signup, error: ApiError, isPending } = useSignup();

  function onSubmit(data) {
    const {
      firstName,
      secondName,
      lastName,
      email,
      password,
      passwordConfirmation,
      gender,
      phone,
      parent_phone,
      school,
      city,
      grade,
    } = data;
    const name = `${firstName} ${secondName} ${lastName}`.trim();

    //handled data for API
    const signupData = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      studentData: {
        gender,
        phone,
        parent_phone,
        grade,
        city,
        school,
      },
    };
    //Send The Form Data To The API
    signup(
      { ...signupData },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  const isRequired = "هذه الخانة مطلوبه";
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center space-y-4"
    >
      <InformationInputs
        isRequired={isRequired}
        register={register}
        watch={watch}
        setValue={setValue}
        isPending={isPending}
        errors={errors}
        ApiError={ApiError}
      />

      <ComunicationInputs
        isRequired={isRequired}
        register={register}
        isPending={isPending}
        errors={errors}
        ApiError={ApiError}
        getValues={getValues}
      />

      <EducationInputs
        isRequired={isRequired}
        register={register}
        watch={watch}
        setValue={setValue}
        isPending={isPending}
        errors={errors}
        ApiError={ApiError}
      />

      <MainDataInputs
        isRequired={isRequired}
        register={register}
        isPending={isPending}
        errors={errors}
        ApiError={ApiError}
        getValues={getValues}
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
  );
}

export default SignupForm;
