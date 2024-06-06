import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/CustomInput";
import Fileponds from "@/components/Filepond";
import Button from "@/components/Button";
import { Spinner } from "@nextui-org/react";
import { FormControlLabel, Switch } from "@mui/material";
import { useUpdateClient } from "../hooks/useUpdateClient";
import { removeEmptyValues } from "@/utils/helpers";

function UpdateClient({ onCloseModal, data }) {
  const [image, setImage] = useState("");

  const { updateClient, isUpdating, error: ApiError } = useUpdateClient();

  const { id: clientId, name, email, status } = data;

  const [isVisible, setIsVisible] = useState(status);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({ defaultValues: { data } });

  const handleChange = (event) => {
    setIsVisible(event.target.checked);
  };

  function onSubmit(data) {
    let updatedData = { ...data, image };

    const filteredData = removeEmptyValues(updatedData);

    updateClient(
      { ...filteredData, clientId, status: isVisible },
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
      <h4 className="py-3 text-blue-color-primary">Update Client</h4>

      <FormControlLabel control={<Switch checked={isVisible} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} color="primary" />} label={isVisible ? "Active" : "Disabled"} />

      <CustomInput
        type="text"
        label="Client Name"
        size="lg"
        isError={errors?.name || ApiError?.response?.data?.errors?.name?.[0]}
        className="w-4/5 md:w-96 "
        defaultValue={name}
        errorMessage={errors?.name?.message || ApiError?.response?.data?.errors?.name?.[0]}
        isDisabled={isUpdating}
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
        defaultValue={email}
        errorMessage={errors?.email?.message || ApiError?.response?.data?.errors?.email?.[0]}
        isDisabled={isUpdating}
        register={register("email", {
          required: "Email is required",
        })}
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
        errorMessage={errors?.passwordConfirmation?.message}
        register={register("passwordConfirmation", {
          validate: {
            validate: (value) => (value !== getValues().password ? "The password and password confirmation do not match." : true),
          },
        })}
      />
      <div className="w-full">
        <h4 className="py-3 text-blue-color-primary">Client Image</h4>
        <Fileponds imageToken={setImage} gardName='admin' />
      </div>

      <div>
        <Button type="primary" className="md:w-96">
          {isUpdating ? <Spinner color="white" /> : "Update"}
        </Button>
      </div>
    </form>
  );
}

export default UpdateClient;
