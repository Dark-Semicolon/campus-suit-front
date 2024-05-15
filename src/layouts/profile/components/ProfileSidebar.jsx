import { Image, Spinner } from "@nextui-org/react";
import { IoClose, IoStatsChart } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { GoChecklist } from "react-icons/go";

import ProfileCard from "./ProfileCard";
import { useUser } from "../../../features/authentication/hooks/useUser";
import { STORAGE_LINK } from "../../../utils/constants";
import { TbEdit } from "react-icons/tb";
import { useEffect, useState } from "react";
import Fileponds from "./../../../components/filepond/Filepond";
import { useUpdateUserData } from "./../../../features/web/userProfile/userInfo/hooks/useUpdateUserData";

function ProfileSidebar() {
  const [editImage, setEditImage] = useState(false);
  const [imagelink, setImagelink] = useState([]);

  const { user, isPending } = useUser();

  const { updateUser, isUpdating } = useUpdateUserData();

  useEffect(
    function () {
      if (imagelink.length && imagelink) {
        // Send the image link to the API
        updateUser(
          { image: imagelink },
          {
            onSuccess: () => {
              // Reset imagelink and toggle edit mode
              setImagelink("");
              setEditImage(false);
            },
          }
        );
      }
    },
    [imagelink, updateUser]
  );

  if (isPending)
    return (
      <div className="py-5 mx-auto">
        <Spinner color="warning" />
      </div>
    );

  const grade = user?.data?.relationships?.studentData?.attributes?.grade;

  const list = [
    {
      name: "البيانات الشخصيه",
      icon: <IoPersonOutline className="text-2xl font-semibold" />,
      to: "/user/profile",
    },
    {
      name: "احصائياتي",
      icon: <IoStatsChart className="text-2xl font-semibold" />,
      to: "/user/stats",
    },
    {
      name: "حصصي",
      icon: <HiOutlineVideoCamera className="text-2xl font-semibold" />,
      to: "/user/lectures",
    },
    {
      name: "نتائج الأختبارات",
      icon: <GoChecklist className="text-2xl font-semibold" />,
      to: "/user/quizzesResults",
    },
  ];

  return (
    <div className="flex-col bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-full lg:w-[500px]">
      <p className="py-6 text-xl font-bold text-center border-b-2 text-blue-color-primary">
        الملف الشخصي
      </p>

      <div className="flex flex-col items-center justify-center md:p-8">
        {editImage ? (
          <div className="w-[150px] h-[200px]  rounded-lg">
            <Fileponds
              inTime={true}
              className="w-full h-[200px] text-center"
              imageToken={setImagelink}
            />
          </div>
        ) : isUpdating ? (
          <Spinner color="warning" />
        ) : (
          <Image
            width={150}
            alt="user image"
            radius="md"
            src={
              user?.data?.attributes?.image === null
                ? "/images/userPlaceholder.png"
                : `${STORAGE_LINK}/images/users/${user?.data?.attributes?.image}`
            }
            className="mt-3"
          />
        )}
        {!editImage ? (
          <TbEdit
            className="relative text-3xl font-bold cursor-pointer text-yellow-color-primary left-24 bottom-6"
            onClick={() => setEditImage(true)}
          />
        ) : (
          <IoClose
            className="relative text-3xl font-bold cursor-pointer text-yellow-color-primary left-28 bottom-2"
            onClick={() => setEditImage(false)}
          />
        )}
        <p className="py-4 text-xl font-bold text-center text-blue-color-primary">
          {user?.data?.attributes?.name}
        </p>

        <p className="pb-5 text-sm font-medium text-center text-gray-color-primary">
          {grade === 1
            ? "الصف الاول الثانوي"
            : grade === 2
            ? "الصف الثاني الثانوي"
            : grade === 3
            ? "الصف الثالث الثانوي"
            : "مسؤل"}
        </p>

        <ProfileCard list={list} />
      </div>
    </div>
  );
}

export default ProfileSidebar;
