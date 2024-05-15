import { Outlet } from "react-router-dom";
import ProfileSidebar from "./components/ProfileSidebar";

function ProfileLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen gap-8 px-8 py-20 bg-gray-100 lg:px-20 md:flex md:flex-row ">
        <ProfileSidebar />
        <div className="flex flex-col w-full ">
          <main className="flex-grow rounded-lg ">
            <Outlet />
          </main>
        </div>
      </div>
      <div className="relative py-20 bg-gray-100 -mt-[7.5rem] top-28"></div>
    </>
  );
}

export default ProfileLayout;
