import { Route } from "react-router-dom"

import ProfileLayout from "@/layouts/profile/ProfileLayout"
import AppLayout from "@/layouts/web/AppLayout"
import DashboardLayout from "@/layouts/dashboard/DashboardLayout"

import Auth from "@/middleware/Auth"


import Stats from "../pages/client/panel/Stats"

import UserInfo from './../pages/client/profile/UserInfo';
import UserUniversities from "./../pages/client/profile/UserUnviersities"

import { GrAnalytics } from "react-icons/gr"
import { HiUserGroup } from "react-icons/hi2"
import { MdMenuBook } from "react-icons/md"


const sidebarLinks = [
    {
        name: "Dashboard",
        to: "/admin/dashboard",
        icon: <GrAnalytics />,
    },
    {
        name: "Colleges",
        to: "/admin/members",
        icon: <HiUserGroup />,
    },
    {
        name: "teachers",
        to: "/admin/courses",
        icon: <MdMenuBook />,
    }
];

export default function useClientRoutes() {
    return (
        <>
            {/* Client in Web*/}
            <Route element={
                <Auth redirect='/login'>
                    <AppLayout />
                </Auth>}>
                {/* Profile Layout */}
                <Route element={<ProfileLayout />}>
                    <Route path="/user/profile" element={<UserInfo />} />
                    <Route path="/user/universities" element={<UserUniversities />} />
                </Route>

            </Route>

            {/* Uni Panel */}
            <Route
                element={
                    <Auth redirect='/login'>
                        <DashboardLayout sidebarLinks={sidebarLinks} />
                    </Auth>
                }
            >
                <Route
                    path="/client/universities/:id"
                    element={
                        <Stats />
                    }
                />
            </Route>
        </>
    )
}
