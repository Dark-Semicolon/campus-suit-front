import { Route } from "react-router-dom";

import ProfileLayout from "@/layouts/profile/ProfileLayout";
import AppLayout from "@/layouts/web/AppLayout";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";

import Auth from "@/middleware/Auth";

import { GiTeacher } from "react-icons/gi";
import { FaUniversity } from "react-icons/fa";
import { GrAnalytics } from "react-icons/gr";

import UserInfo from "./../pages/client/profile/UserInfo";
import UserUniversities from "./../pages/client/profile/UserUnviersities";

import Stats from "../pages/client/panel/Stats";
import Faculties from "../pages/client/panel/Faculties";
import Professors from "../pages/client/panel/Professors";

export default function useClientRoutes() {
  const universityId = 3;

  const sidebarLinks = [
    {
      name: "Dashboard",
      to: `${universityId}/admin/controlPanel`,
      icon: <GrAnalytics className="text-2xl" />,
    },
    {
      name: "faculties",
      to: `/${universityId}/admin/faculties`,
      icon: <FaUniversity className="text-2xl" />,
    },
    {
      name: "professors",
      to: `/${universityId}/admin/professors`,
      icon: <GiTeacher className="text-2xl" />,
    },
  ];
  return (
    <>
      {/* Client in Web*/}
      <Route
        element={
          <Auth redirect="/login">
            <AppLayout />
          </Auth>
        }
      >
        {/* Profile Layout */}
        <Route element={<ProfileLayout />}>
          <Route path="/user/profile" element={<UserInfo />} />
          <Route path="/user/universities" element={<UserUniversities />} />
        </Route>
      </Route>

      {/* Uni Panel */}
      <Route
        element={
          <Auth redirect="/login">
            <DashboardLayout sidebarLinks={sidebarLinks} />
          </Auth>
        }
      >
        <Route path="/:universityId/admin/controlPanel" element={<Stats />} />
        <Route path="/:universityId/admin/faculties" element={<Faculties />} />
        <Route path="/:universityId/admin/professors" element={<Professors />} />
      </Route>
    </>
  );
}
