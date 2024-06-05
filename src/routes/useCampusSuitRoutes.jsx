import { Route } from "react-router-dom";

import Home from "@/pages/web/Home";
import AppLayout from "@/layouts/web/AppLayout";
import DashboardLayout from "@/layouts/campusSuit/DashboardLayout";
import Auth from "@/middleware/Auth";
import Dashboard from "@/features/campusSuit/panel/dashboard/Dashboard";
import Roles from "@/pages/campusSuit/panel/roles/Roles";
import CreateRole from "@/pages/campusSuit/panel/roles/CreateRole";
import UpdateRole from "@/pages/campusSuit/panel/roles/UpdateRole";
import AssignPermissions from "@/pages/campusSuit/panel/assignPermissions/AssignPermissions";
import Admins from "../pages/campusSuit/panel/Admins";
import ProtectedRoute from './../middleware/ProtectedRoute';

function useCampusSuitRoutes() {
  return (
    <>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route
        element={
          <Auth gardName="admin" redirect="/admin/login">
            <DashboardLayout />
          </Auth>
        }
      >
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* Roles Routes  */}
        <Route
          path="/admin/roles"
          element={
            <ProtectedRoute permissions={['view_any_role']}>
              <Roles />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/roles/create" element={
          <ProtectedRoute permissions={['create_role']}>
            <CreateRole />
          </ProtectedRoute>
        } />
        <Route path="/admin/roles/:id" element={
          <ProtectedRoute permissions={['update_role']}>
            <UpdateRole />
          </ProtectedRoute>
        } />

        <Route path="/admin/permissions" element={<AssignPermissions />} />
        <Route path="/admin/admins" element={<Admins />} />
      </Route>
    </>
  );
}

export default useCampusSuitRoutes;
