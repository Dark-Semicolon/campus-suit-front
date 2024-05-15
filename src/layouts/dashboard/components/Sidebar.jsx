import { useState } from "react";
import { Link } from "react-router-dom";

import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi2";
import { BiSolidOffer } from "react-icons/bi";
import SidebarLinks from "./SidebarLinks";
import { MdMenuOpen } from "react-icons/md";
import { GrAnalytics } from "react-icons/gr";
import { MdMenuBook } from "react-icons/md";
import { TbUserCancel } from "react-icons/tb";
import { MdOutlineWorkOutline } from "react-icons/md";

import Logo from "@/components/Logo";
import usePermission from "@/hooks/usePermission";
import _ from "lodash";

function Sidebar({ mobileNavOpen, setMobileNavOpen }) {
  const { can, canAll } = usePermission();

  const [isOpen, setIsOpen] = useState(true);

  // ToDo: add click out side feature
  //SidebarLinks

  const list = [
    {
      name: "لوحة التحكم",
      to: "/admin/dashboard",
      icon: <GrAnalytics />,
    },
    {
      name: "الأعضاء",
      to: "/admin/members",
      icon: <HiUserGroup />,
      permissions: "read:users",
    },
    {
      name: "الوحدات",
      to: "/admin/courses",
      icon: <MdMenuBook />,
      permissions: "read:courses",
    },
    {
      name: "العروض",
      to: "/admin/offers",
      icon: <BiSolidOffer />,
      permissions: "read:offers",
    },
    {
      name: "الصلاحيات",
      to: "/admin/permissions",
      icon: <TbUserCancel />,
      permissions: ["read:permissions", "associate:users:permissions"],
    },
    {
      name: "الأدوار",
      to: "/admin/roles",
      icon: <MdOutlineWorkOutline />,
      permissions: "read:roles",
    },
  ];

  const filteredList = list.filter(
    (item) =>
      !item.permissions ||
      can(item.permissions) ||
      (_.isArray(item.permissions) && canAll(item.permissions))
  );

  return (
    <>
      <aside
        className={`min-h-screen ${mobileNavOpen ? "block" : "hidden "}   ${
          isOpen ? "w-80" : "w-20"
        } md:block fixed md:relative z-50 bg-white text-gray-color-primary duration-300 flex-col shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] `}
      >
        <button
          onClick={() => setIsOpen((open) => !open)}
          className="relative"
        >
          {isOpen ? (
            <IoIosArrowDropright className="absolute z-10 text-4xl transition-all bg-white rounded-full cursor-pointer right-64 top-16 text-yellow-color-primary" />
          ) : (
            <IoIosArrowDropleft className="absolute z-10 text-4xl transition-all bg-white rounded-full cursor-pointer right-14 top-16 text-yellow-color-primary" />
          )}
        </button>

        <button
          className="absolute z-50 flex items-center p-1 rounded-full left-5 text-blue-color-primary md:hidden"
          onClick={() => setMobileNavOpen((mobileNavOpen) => !mobileNavOpen)}
        >
          {mobileNavOpen && <MdMenuOpen className="text-2xl" />}
        </button>

        <div className="relative flex flex-col justify-between w-full h-screen">
          <div className="flex flex-col items-center justify-center gap-5">
            <Link
              to="/"
              aria-description="link to the home page"
              className={`w-fit h-28 items-center justify-center ${isOpen ? " flex " : " hidden"}`}
            >
              <Logo width="80" />
            </Link>
            <SidebarLinks
              list={filteredList}
              isOpen={isOpen}
            />
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
