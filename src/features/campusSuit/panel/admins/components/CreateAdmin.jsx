import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/CustomInput";
import Fileponds from "@/components/Filepond";
import Button from "@/components/Button";
import { Spinner } from "@nextui-org/react";
import { FormControlLabel, Switch } from "@mui/material";
import { useCreateAdmin } from "../hooks/useCreateAdmin";

function CreateAdmin({ onCloseModal }) {
  const { universityId } = useParams();
  const [image, setImage] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const { createAdmin, isCreating, error: ApiError } = useCreateAdmin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const handleChange = (event) => {
    setIsVisible(event.target.checked);
  };

  function onSubmit(data) {
    if (!image) return null;

    createAdmin(
      { ...data, image, universityId, status: isVisible },
      {
        onSuccess: () => {
          reset();
          setImage("");
          onCloseModal?.();
        },
      }
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-full gap-4 ">
      <h4 className="py-3 text-blue-color-primary">Create New Admin</h4>

      <FormControlLabel control={<Switch checked={isVisible} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} color="primary" />} label={isVisible ? "Active" : "Disabled"} />

      <CustomInput
        type="text"
        label="Admin Name"
        size="lg"
        isError={errors?.name || ApiError?.response?.data?.errors?.name?.[0]}
        className="w-4/5 md:w-96 "
        errorMessage={errors?.name?.message || ApiError?.response?.data?.errors?.name?.[0]}
        isDisabled={isCreating}
        register={register("name", {
          required: "Name is required",
        })}
      />

      <CustomInput
        type="email"
        label="Email"
        size="lg"
        isError={errors?.email || ApiError?.response?.data?.errors?.email?.[0]}
        className="w-4/5 md:w-96 "
        errorMessage={errors?.email?.message || ApiError?.response?.data?.errors?.email?.[0]}
        isDisabled={isCreating}
        register={register("email", {
          required: "Email is required",
        })}
      />

      <CustomInput
        type="password"
        label="Password"
        size="lg"
        color={errors?.password || ApiError?.response?.data?.errors?.password?.[0]}
        isDisabled={isCreating}
        className="w-4/5 md:w-96"
        errorMessage={errors?.password?.message}
        register={register("password", {
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}/,
            message: "Your password must be at least 8 characters long and contain both letters and numbers.",
          },
        })}
      />

      {/* password confirmation */}
      <CustomInput
        type="password"
        label="Confirm password"
        size="lg"
        isDisabled={isCreating}
        isError={errors?.password_confirmation || ApiError?.response?.data?.errors?.passwordConfirmation?.[0]}
        className="w-4/5 md:w-96"
        errorMessage={errors?.passwordConfirmation?.message}
        register={register("passwordConfirmation", {
          validate: {
            validate: (value) => (value !== getValues().password ? "The password and password confirmation do not match." : true),
          },
        })}
      />
      <div className="w-full">
        <h4 className="py-3 text-blue-color-primary">Admin Image</h4>
        <Fileponds imageToken={setImage} gardName='admin' />
      </div>

      <div>
        <Button type="primary" className="md:w-96">
          {isCreating ? <Spinner color="white" /> : "Create"}
        </Button>
      </div>
    </form>
  );
}

export default CreateAdmin;
