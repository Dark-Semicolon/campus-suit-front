import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { FormControlLabel, Switch } from "@mui/material";
import { BsPerson } from "react-icons/bs";

import Button from "@/components/Button";
import Input from "@/components/input/Input";
import StudentData from "./StudentData";
import { useUpdateUser } from "../hooks/useUpdateUser";
// import MainDataInputs from "../../../authentication/signup/components/MainDataInputs";

function EditMemberForm({ onCloseModal, rowData }) {
  const [editStudentCheck, setEditStudentCheck] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue,
  } = useForm({ defaultValues: rowData });
  const { updateUser, error: ApiError, isUpdating } = useUpdateUser();
  const [isVisible, setIsVisible] = useState(rowData?.status ? true : false);

  const { id } = rowData;

  useEffect(() => {
    const currentValues = getValues();
    const studentDataKeys = [
      "gender",
      "phone",
      "parent_phone",
      "grade",
      "city",
      "school",
    ];

    const hasChanged = studentDataKeys.some((key) => currentValues[key]);
    setEditStudentCheck(hasChanged);
  }, [getValues, rowData]);

  function onSubmit(data) {
    const status = isVisible ? 1 : 0;
    const {
      name,
      email,
      gender,
      phone,
      parent_phone,
      school,
      city,
      grade,
      password,
      passwordConfirmation,
    } = data;
    //handled data for API

    const studentData = {
      ...(gender && { gender }),
      ...(phone && { phone }),
      ...(parent_phone && { parent_phone }),
      ...(grade && { grade }),
      ...(city && { city }),
      ...(school && { school }),
    };
    //handled data for API
    const updateUserData = {
      name,
      email,
      status,
      ...(password && { password }),
      ...(passwordConfirmation && { passwordConfirmation }),
      ...(Object.keys(studentData).length > 0 && { studentData }),
    };
    //Send The Form Data To The API
    updateUser(
      { userId: id, ...updateUserData },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      }
    );
  }

  const handleChange = (event) => {
    setEditStudentCheck(event.target.checked);
  };
  const handleStatusChange = (event) => {
    setIsVisible(event.target.checked);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center"
    >
      <div className="flex gap-4 p-5">
        <FormControlLabel
          control={
            <Switch
              checked={editStudentCheck}
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
      <div className="flex justify-center gap-4">
        <div className="flex-col space-y-4">
          <Input
            // className="py-2"
            edit={true}
            type="text"
            id="name"
            name="name"
            disabled={isUpdating}
            label="الإسم*"
            size="full"
            icon={
              <BsPerson className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
            }
            register={register("name", {})}
            error={
              errors?.firstName?.message ||
              ApiError?.response?.data?.errors?.email?.[0]
            }
          />

          {/* <MainDataInputs
            edit={true}
            register={register}
            isPending={isUpdating}
            errors={errors}
            ApiError={ApiError}
            getValues={getValues}
          /> */}
        </div>

        <div className="flex-col space-y-4">
          {editStudentCheck && (
            <StudentData
              edit={true}
              isPending={isUpdating}
              errors={errors}
              ApiError={ApiError}
              watch={watch}
              setValue={setValue}
              getValues={getValues}
              register={register}
            />
          )}
        </div>
      </div>

      <div className="w-full py-3">
        <Button
          type="primary"
          className="w-full leading-8"
          disabled={isUpdating}
        >
          تعديل عضو
        </Button>
      </div>
    </form>
  );
}

export default EditMemberForm;
