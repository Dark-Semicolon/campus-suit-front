import { Chip, Image } from "@nextui-org/react";
import Button from "../../../../components/Button";
import usePermission from "../../../../hooks/usePermission";
import { STORAGE_LINK } from "@/utils/constants";

function ViewMemberInfo({ data }) {
  const {
    id,
    email,
    image,
    name,
    roles,
    permissions,
    status,
    phone,
    parent_phone,
    grade,
    gender,
    school,
    city,
  } = data;

  const { can } = usePermission();
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            src={
              image
                ? `${STORAGE_LINK}/images/users/${image}`
                : "images/userPlaceholder.png"
            }
            className="object-cover w-40 h-40 rounded-full"
          />

          <h4 className="text-blue-color-primary">{name}</h4>
          <span className="text-md">{email}</span>
          <span className="text-md">#{id}</span>
        </div>
        <span className="self-center block h-1 rounded-lg w-36 lg:w-1 lg:h-36 bg-blue-color-light"></span>
        <div className="flex flex-wrap justify-between min-w-[450px] p-5 gap-y-7 gap-x-3">
          {/* Gender  */}
          {gender && (
            <div>
              <span className="font-semibold me-2 text-blue-color-primary">
                النوع:
              </span>
              {gender === "male" ? "ذكر" : "أنثى"}
            </div>
          )}
          {/* Grade  */}
          {grade && (
            <div>
              <span className="font-semibold me-2 text-blue-color-primary">
                الصف:
              </span>
              {grade} الثانوي
            </div>
          )}
          {school && (
            <div>
              <span className="font-semibold me-2 text-blue-color-primary">
                المدرسة:
              </span>
              {school}
            </div>
          )}
          {phone && (
            <div>
              <span className="font-semibold me-2 text-blue-color-primary">
                رقم الهاتف:
              </span>
              {phone}
            </div>
          )}
          {status && (
            <div>
              <span className="font-semibold me-2 text-blue-color-primary">
                الحالة
              </span>
              <Chip
                className="gap-1 capitalize border-none text-default-600"
                color={status ? "success" : "warning"}
                size="sm"
                variant="dot"
              >
                {status == 1 ? "مفعل" : "غير مفعل"}
              </Chip>
            </div>
          )}
          {parent_phone && (
            <div>
              <span className="font-semibold me-2 text-blue-color-primary">
                هاتف ولي الأمر:
              </span>
              {parent_phone}
            </div>
          )}
          {city && (
            <div>
              <span className="font-semibold me-2 text-blue-color-primary">
                المدينة:
              </span>
              {city}
            </div>
          )}
          <div className="w-full">
            <span className="font-semibold me-2 text-blue-color-primary">
              الأدوار:
            </span>
            <ul className="flex flex-wrap gap-3">
              {roles.length ? (
                roles.map((role, index) => (
                  <li key={index} className="list-disc ms-5">
                    {role.attributes.name}
                  </li>
                ))
              ) : (
                <span>لا يوجد أدوار</span>
              )}
            </ul>
          </div>
          {can("read:users:permissions") && (
            <div className="w-full">
              <span className="font-semibold me-2 text-blue-color-primary">
                الصلاحيات:
              </span>
              <ul className="flex flex-wrap gap-3">
                {permissions?.length ? (
                  permissions?.map((permission, index) => (
                    <li key={index} className="list-disc ms-5">
                      {permission.attributes.name}
                    </li>
                  ))
                ) : (
                  <span>لا يوجد صلاحيات</span>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      {can("read:course:lectures") && (
        <Button type="primary" to={`/admin/members/${id}/lectures`}>
          الحصص التي تم شرائها
        </Button>
      )}
    </div>
  );
}

export default ViewMemberInfo;
