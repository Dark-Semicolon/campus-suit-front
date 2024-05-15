import { useForm } from "react-hook-form";
import { FormControlLabel, Switch } from "@mui/material";

import Button from "@/components/Button";
import { useCreateUser } from "../hooks/useCreateUser";
import StudentData from "./StudentData";
import RequiredInputs from "./RequiredInputs";
import { useState } from "react";

function CreateMemberForm({ onCloseModal, studentCheck, setStudentCheck }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue,
    reset,
  } = useForm();

  const { createUser, error: ApiError, isCreating } = useCreateUser();
  const [isVisible, setIsVisible] = useState(true);

  function onSubmit(data) {
    const status = isVisible ? 1 : 0;

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

    const studentData = {
      ...(gender && { gender }),
      ...(phone && { phone }),
      ...(parent_phone && { parent_phone }),
      ...(grade && { grade }),
      ...(city && { city }),
      ...(school && { school }),
    };
    //handled data for API
    const createUserData = {
      name,
      email,
      password,
      passwordConfirmation,
      status,
      ...(Object.keys(studentData).length > 0 && { studentData }),
    };

    //Send The Form Data To The API
    createUser(
      { ...createUserData },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  const handleChange = (event) => {
    setStudentCheck(event.target.checked);
  };

  const handleStatusChange = (event) => {
    setIsVisible(event.target.checked);
  };

  const isRequired = "هذه الخانة مطلوبه";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center"
    >
      <div className="flex gap-4 p-5">
        <FormControlLabel
          control={
            <Switch
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
              color="warning"
            />
          }
          label="طالب"
        />
        <FormControlLabel
          control={
            <Switch
              checked={isVisible}
              onChange={handleStatusChange}
              inputProps={{ "aria-label": "controlled" }}
              color="warning"
            />
          }
          label="مفعل"
        />
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="space-y-4">
          <RequiredInputs
            isRequired={isRequired}
            register={register}
            isPending={isCreating}
            errors={errors}
            ApiError={ApiError}
            getValues={getValues}
            watch={watch}
            setValue={setValue}
          />
        </div>
        <div className="space-y-4">
          {studentCheck && (
            <StudentData
              isRequired={isRequired}
              register={register}
              isPending={isCreating}
              errors={errors}
              ApiError={ApiError}
              watch={watch}
              setValue={setValue}
              getValues={getValues}
            />
          )}
        </div>
      </div>

      <div className="w-full py-3">
        <Button
          type="primary"
          className="w-full leading-8"
          disabled={isCreating}
        >
          إضافة عضو
        </Button>
      </div>
    </form>
  );
}

export default CreateMemberForm;
