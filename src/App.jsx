import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

import AppLayout from "./layouts/web/AppLayout";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import GuestLayout from "./layouts/guest/GestLayout";
import ProfileLayout from "./layouts/profile/ProfileLayout";

import HasAnyIdentity from "./middleware/HasAnyIdentity";
import Auth from "./middleware/Auth";
import Guest from "./middleware/Guest";
import ProtectedRoute from "./middleware/ProtectedRoute";

import ErrorPage from "./components/errorPage/ErrorPage";
import LoaderPage from "./components/LoaderPage";

import Home from "./pages/web/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import EmailConfirmation from "./pages/auth/EmailConfirmation";
import MembersDB from "./pages/dashboard/MembersDB";
import MemberLecturesDB from "./pages/dashboard/MemberLecturesDB";
import MemberLectureDetailsDB from "./pages/dashboard/MemberLectureDetails";
import AssociateUsersPermissionsDB from "./pages/dashboard/AssociateUsersPermissionsDB";
import RolesDB from "./pages/dashboard/RolesDB";
import CreateRolesDB from "./pages/dashboard/CreateRolesDB";
import UpdateRolesDB from "./pages/dashboard/UpdateRolesDB";
import UserInfo from "./pages/web/UserInfo";

const Signup = lazy(() => import("./pages/auth/Signup"));
const Login = lazy(() => import("./pages/auth/Login"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const ForgetPassword = lazy(() => import("./pages/auth/ForgetPassword"));

// React Query settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const theme = createTheme({
  typography: {
    fontFamily: "Marhey",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>
            <Suspense fallback={<LoaderPage />}>
              <Routes>
                <Route
                  path="*"
                  element={
                    <ErrorPage status={404} error={"هذه الصفحة غير موجودة"} />
                  }
                />

                {/* Web pages not requierd Auth  */}
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Home />} />
                </Route>

                {/* Web pages requierd Auth  */}
                <Route
                  element={
                    <Auth>
                      <AppLayout />
                    </Auth>
                  }
                >
                  {/* Profile Layout */}
                  <Route element={<ProfileLayout />}>
                    <Route path="/user/profile" element={<UserInfo />} />
                  </Route>
                </Route>

                {/* Dashboard Routes and layout  */}
                <Route
                  element={
                    <Auth>
                      <HasAnyIdentity hasIdentities={["client"]}>
                        <DashboardLayout />
                      </HasAnyIdentity>
                    </Auth>
                  }
                >
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute
                        permissions={[
                          "read:users",
                          "read:offers",
                          "read:course:lectures",
                          "read:courses",
                        ]}
                      >
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  {/* Members */}
                  <Route
                    path="/admin/members"
                    element={
                      <ProtectedRoute permissions={["read:users"]}>
                        <MembersDB />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/admin/members/:userId/lectures"
                    element={
                      <ProtectedRoute permissions={["read:course:lectures"]}>
                        <MemberLecturesDB />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/admin/members/:userId/courses/:courseId/lectures/:lectureId"
                    element={
                      <ProtectedRoute
                        permissions={[
                          "read:course:lectures",
                          "read:course:lecture:items",
                        ]}
                        allRequired={true}
                      >
                        <MemberLectureDetailsDB />
                      </ProtectedRoute>
                    }
                  />

                  {/* Permissions  */}
                  <Route
                    path="/admin/permissions"
                    element={
                      <ProtectedRoute
                        permissions={[
                          "read:permissions",
                          "read:users:permissions",
                          "associate:users:permissions",
                          "associate:users:roles",
                          "read:roles",
                        ]}
                        allRequired={true}
                      >
                        <AssociateUsersPermissionsDB />
                      </ProtectedRoute>
                    }
                  ></Route>

                  {/* Roles  */}
                  <Route
                    path="/admin/roles"
                    element={
                      <ProtectedRoute permissions={["read:roles"]}>
                        <RolesDB />
                      </ProtectedRoute>
                    }
                  ></Route>

                  <Route
                    path="/admin/roles/create"
                    element={
                      <ProtectedRoute permissions={["create:roles"]}>
                        <CreateRolesDB />
                      </ProtectedRoute>
                    }
                  ></Route>

                  <Route
                    path="/admin/roles/:id/edit"
                    element={
                      <ProtectedRoute permissions={["update:roles"]}>
                        <UpdateRolesDB />
                      </ProtectedRoute>
                    }
                  ></Route>
                </Route>

                {/* Auth Routes and layout  */}
                <Route
                  element={
                    <Guest>
                      <GuestLayout />
                    </Guest>
                  }
                >
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgetpassword" element={<ForgetPassword />} />
                  <Route
                    path="/emailconfirmation/:email"
                    element={<EmailConfirmation />}
                  />
                  <Route
                    path="/password-reset/:token"
                    element={<ResetPassword />}
                  />
                </Route>

                <Route path="/error/:statusCode" element={<ErrorPage />} />
              </Routes>
            </Suspense>
          </BrowserRouter>

          {/* Toaster Configrations  */}
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "white",
                color: "black",
              },
            }}
          />
        </QueryClientProvider>
      </NextUIProvider>
    </ThemeProvider>
  );
}

export default App;
