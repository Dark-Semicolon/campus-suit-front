import { useState } from "react";
import { useForm } from "react-hook-form";
import { Tab, Tabs } from "@nextui-org/react";

import { useUpdateUserData } from "./hooks/useUpdateUserData";
import { useUser } from "../../../authentication/hooks/useUser";

import HeroLinks from "@/components/HeroLinks";
import PasswordInput from "@/components/input/PasswordInput";
import Button from "@/components/Button";
import PersonalInputs from "./components/PersonalInputs";
import StudentDataInputs from "./components/StudentDataInputs";

function UserInfoPage() {
  const [isUpdateInputs, setIsUpdateInputs] = useState(true);

  const { user, identities, isSuperAdmin } = useUser();
  const { city, gender, grade, parent_phone, phone, school } = user.data.relationships.studentData
    ? user.data.relationships.studentData.attributes
    : {};
  const { name, email } = user.data.attributes;

  const fullName = name;
  const [firstName, secondName, lastName] = fullName.split(" ");

  const { updateUser, error: ApiError, isUpdating } = useUpdateUserData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      firstName,
      secondName,
      lastName,
      email,
      city,
      gender,
      grade,
      parent_phone,
      phone,
      school,
    },
  });
  function onSubmit(data) {
    const {
      firstName,
      secondName,
      lastName,
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
    const name = `${firstName} ${secondName} ${lastName}`.trim();
    //handled data for API

    const studentData = {
      ...(gender && { gender }),
      ...(phone && { phone }),
      ...(parent_phone && { parent_phone }),
      ...(grade && { grade }),
      ...(city && { city }),
      ...(school && { school }),
    };
    console.log(studentData);
    //handled data for API
    const updateUserData = {
      ...(name.trim() !== "" && { name }),
      ...(email.trim() !== "" && { email }),
      ...(password && { password }),
      ...(passwordConfirmation && { passwordConfirmation }),
      ...(Object.keys(studentData).length > 0 && { studentData }),
    };
    //Send The Form Data To The API
    updateUser(
      { ...updateUserData },
      {
        onSuccess: () => {
          setIsUpdateInputs(true);
          reset();
        },
      }
    );
  }

  return (
    <section>
      <div className="pt-3 pb-10 space-y-5">
        <h2 className="text-xl md:text-3xl text-blue-color-primary">
          المعلومات <span className="text-yellow-color-primary">الشخصيه</span>
        </h2>
        <HeroLinks
          pages={[
            { name: "الملف الشخصي", link: "/user/profile" },
            { name: "الصفحة الرئيسية", link: "/" },
          ]}
        />
      </div>
      <div className="flex flex-col w-full">
        <Tabs
          aria-label="Options"
          color="warning"
          size="lg"
          radius="sm"
          classNames={{
            tabList: " rounded-md p-0 ",
            tab: "p-6 rounded-md ",
          }}
        >
          <Tab
            key="photos"
            title="معلوماتي"
            className="bg-white text-white-color "
          >
            <div className="flex flex-col items-center justify-center gap-5 py-5 md:p-10 ">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <PersonalInputs
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  isPending={isUpdating}
                  updating={isUpdateInputs}
                  errors={errors}
                  ApiError={ApiError}
                />

                {!identities?.includes("admin") && !isSuperAdmin && (
                  <StudentDataInputs
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    isPending={isUpdating}
                    updating={isUpdateInputs}
                    errors={errors}
                    ApiError={ApiError}
                    getValues={getValues}
                  />
                )}

                <div className="flex items-center justify-center w-full gap-8 py-8">
                  {isUpdateInputs ? (
                    <Button
                      type="primary"
                      className="w-4/5 h-12 text-sm leading-8 "
                      disabled={isUpdating}
                      onClick={(e) => {
                        setIsUpdateInputs((isUpdateInputs) => !isUpdateInputs);
                        e.preventDefault();
                      }}
                    >
                      تعديل البيانات الشخصية
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      className="w-4/5 h-12 text-sm leading-8 "
                      disabled={isUpdating}
                    >
                      {isUpdating ? "جاري حفظ التعديل..." : "حفظ التعديل"}
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </Tab>
          <Tab
            key="music"
            title="كلمة السر"
            className="bg-white text-white-color"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-center gap-5 py-5 md:p-10"
            >
              {/* Password */}
              <PasswordInput
                label=" كلمة السر الجديدة*"
                name="password"
                disabled={isUpdating}
                error={errors?.password?.message || ApiError?.response?.data?.errors?.password?.[0]}
                size="halfWidth"
                register={
                  register &&
                  register("password", {
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، بما في ذلك حرف كبير وحرف صغير ورقم واحد وحرف خاص واحد.",
                    },
                  })
                }
              />

              {/* PasswordConfirmaion */}
              <PasswordInput
                label="تأكيد كلمة السر *"
                disabled={isUpdating}
                name="passwordConfirmation"
                error={
                  errors?.passwordConfirmation?.message ||
                  ApiError?.response?.data?.errors?.password_confirmation?.[0]
                }
                size="halfWidth"
                register={
                  register &&
                  register("passwordConfirmation", {
                    validate: {
                      validate: (value) =>
                        value !== getValues().password
                          ? "كلمة المرور وتأكيد كلمة المرور غير متطابقين."
                          : true,
                    },
                  })
                }
              />
              <div className="flex items-center justify-center w-full gap-8 py-8">
                <Button
                  type="primary"
                  className="w-4/5 h-12 text-sm leading-8 lg:w-2/5"
                  disabled={isUpdating}
                >
                  {isUpdating ? "جاري تعديل كلمة السر..." : "تعديل كلمة السر"}
                </Button>
              </div>
            </form>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}

export default UserInfoPage;
