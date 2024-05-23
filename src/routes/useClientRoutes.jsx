import { Route } from "react-router-dom";

import ProfileLayout from "@/layouts/profile/ProfileLayout";
import AppLayout from "@/layouts/web/AppLayout";
import DashboardLayout from "@/layouts/client/DashboardLayout";

import Auth from "@/middleware/Auth";

import UserInfo from "./../pages/client/profile/UserInfo";
import UserUniversities from "./../pages/client/profile/UserUnviersities";

import Stats from "../pages/client/panel/Stats";
import Faculties from "../pages/client/panel/Faculties";
import Professors from "../pages/client/panel/Professors";
import FacultyDetails from "../pages/client/panel/FacultyDetails";
import FacultyRoles from "../pages/client/panel/FacultyRoles";
import CreateFacultyRoles from "../pages/client/panel/CreateFacultyRoles";
import UpdateFacultyRoles from "../pages/client/panel/UpdateFacultyRoles";

export default function useClientRoutes() {

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
            <DashboardLayout />
          </Auth>
        }
      >
        <Route path="/:universityId/panel/stats" element={<Stats />} />
        <Route path="/:universityId/panel/professors" element={<Professors />} />
        <Route path="/:universityId/panel/faculties" element={<Faculties />} />
        <Route path="/:universityId/panel/faculties/:facultyId" element={<FacultyDetails />} />
        <Route path="/:universityId/panel/faculties/:facultyId/roles" element={<FacultyRoles />} />
        <Route path="/:universityId/panel/faculties/:facultyId/roles/create" element={<CreateFacultyRoles />} />
        <Route path="/:universityId/panel/faculties/:facultyId/roles/:roleId" element={<UpdateFacultyRoles />} />

      </Route>
    </>
  );
}
