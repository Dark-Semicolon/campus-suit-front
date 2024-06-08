import { Spinner } from "@nextui-org/react";
import Fileponds from "../../../../../components/Filepond";
import Button from "../../../../../components/Button";
import CustomInput from "../../../../../components/CustomInput";
import { FormControlLabel, Switch } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useUpdateProfessor from "../hooks/useUpdateProfesssor";
import { removeEmptyValues } from "../../../../../utils/helpers";

function UpdateProfessor({ onCloseModal, oldValues }) {
  const { universityId } = useParams();
  const [image, setImage] = useState("");

  const { updateProfessor, isUpdating, error: ApiError } = useUpdateProfessor();

  const { id: professorId, name, email, status } = oldValues;

  const [isVisible, setIsVisible] = useState(status);
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
    let updatedData = { ...data, image };
    const filteredData = removeEmptyValues(updatedData);

    updateProfessor(
      { ...filteredData, status: isVisible, universityId, professorId },
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
      <h4 className="py-3 text-blue-color-primary">Create new Professor</h4>

      <FormControlLabel control={<Switch checked={isVisible} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} color="primary" />} label={isVisible ? "Active" : "Disabled"} />

      <CustomInput
        type="name"
        label="professor name"
        size="lg"
        defaultValue={name}
        isError={errors?.name || ApiError?.response?.data?.errors?.name?.[0]}
        className="w-4/5 md:w-96 "
        errorMessage={errors?.name?.message || ApiError?.response?.data?.errors?.name?.[0]}
        isDisabled={isUpdating}
        register={register("name")}
      />

      <CustomInput
        type="email"
        label="Email"
        defaultValue={email}
        size="lg"
        isError={errors?.email || ApiError?.response?.data?.errors?.email?.[0]}
        className="w-4/5 md:w-96 "
        errorMessage={errors?.email?.message || ApiError?.response?.data?.errors?.email?.[0]}
        isDisabled={isUpdating}
        register={register("email")}
      />

      <CustomInput
        type="password"
        label="Password"
        size="lg"
        color={errors?.password || ApiError?.response?.data?.errors?.password?.[0]}
        isDisabled={isUpdating}
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
        isDisabled={isUpdating}
        isError={errors?.password_confirmation || ApiError?.response?.data?.errors?.passwordConfirmation?.[0]}
        className="w-4/5 md:w-96"
        errorMessage={errors?.password_confirmation?.message}
        register={register("password_confirmation", {
          validate: {
            validate: (value) => (value !== getValues().password ? "The password and password confirmation do not match." : true),
          },
        })}
      />

      <div className="w-full">
        <h4 className="py-3 text-blue-color-primary">Professor Image *</h4>
        <Fileponds imageToken={setImage} />
      </div>

      <div>
        <Button type="primary" className="md:w-96">
          {isUpdating ? <Spinner color="white" /> : "Create"}
        </Button>
      </div>
    </form>
  );
}

export default UpdateProfessor;
