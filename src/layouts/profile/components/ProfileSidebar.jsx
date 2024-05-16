import { Image, Spinner } from "@nextui-org/react";
import { IoClose, IoStatsChart } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineVideoCamera } from "react-icons/hi";

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

  const list = [
    {
      name: "Profile",
      icon: <IoPersonOutline className="text-2xl font-semibold" />,
      to: "/user/profile",
    },
    {
      name: "Statistics",
      icon: <IoStatsChart className="text-2xl font-semibold" />,
      to: "/user/stats",
    },
    {
      name: "subscriptions",
      icon: <HiOutlineVideoCamera className="text-2xl font-semibold" />,
      to: "/user/subscriptions",
    },
  ];

  return (
    <div className="flex-col bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-full lg:w-[500px]">
      <p className="py-6 text-xl font-bold text-center capitalize border-b-2 text-blue-color-primary">
        My Profile
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
              user?.attributes?.image === null
                ? "/images/userPlaceholder.png"
                : `${STORAGE_LINK}/${user?.attributes?.image}`
            }
            className="mt-3"
          />
        )}
        {!editImage ? (
          <TbEdit
            className="relative text-3xl font-bold cursor-pointer text-blue-color-light left-24 bottom-6"
            onClick={() => setEditImage(true)}
          />
        ) : (
          <IoClose
            className="relative text-3xl font-bold cursor-pointer text-blue-color-light left-28 bottom-2"
            onClick={() => setEditImage(false)}
          />
        )}
        <p className="py-4 text-xl font-bold text-center text-blue-color-primary">
          {user?.attributes?.name}
        </p>

        <ProfileCard list={list} />
      </div>
    </div>
  );
}

export default ProfileSidebar;
