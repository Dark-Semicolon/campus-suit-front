import { BsPerson } from "react-icons/bs";
import Input from "@/components/input/Input";

function PersonalInputs({ register, updating, isPending, errors, ApiError }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:flex lg:justify-center lg:items-center">
        {/* FirstName */}
        <Input
          edit={true}
          type="text"
          id="firstName"
          name="firstName"
          disabled={isPending || updating}
          label="الإسم الأول*"
          size="halfWidth"
          icon={
            <BsPerson className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
          }
          register={register("firstName", {
            required: "برجاء إدخال الأسم الأول ",
          })}
          error={errors?.firstName?.message}
        />

        {/* SecondName */}
        <Input
          edit={true}
          type="text"
          name="secondName"
          id="secondName"
          disabled={isPending || updating}
          label="الإسم الثاني*"
          size="halfWidth"
          icon={
            <BsPerson className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
          }
          register={register("secondName", {
            required: "برجاء إدخال الأسم الثاني ",
          })}
          error={errors?.secondName?.message}
        />
      </div>

      {/* LastName */}
      <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:flex lg:justify-center lg:items-center">
        <Input
          edit={true}
          type="text"
          name="lastName"
          id="lastName"
          disabled={isPending || updating}
          label="الإسم الأخير*"
          size="halfWidth"
          icon={
            <BsPerson className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
          }
          register={register("lastName", {
            required: "برجاء إدخال الأسم الأخير ",
          })}
          error={errors?.lastName?.message}
        />
        <Input
          edit={true}
          type="text"
          name="email"
          id="email"
          disabled={isPending || updating}
          label="الأيميل*"
          size="halfWidth"
          icon={
            <BsPerson className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] text-gray-color-primary" />
          }
          register={register("email", {
            required: "برجاء إدخال الإيميل ",
          })}
          error={
            errors?.email?.message ||
            ApiError?.response?.data?.errors?.email?.[0]
          }
        />
      </div>
    </>
  );
}

export default PersonalInputs;
