import { Route } from "react-router-dom"

import ProfileLayout from "@/layouts/profile/ProfileLayout"
import AppLayout from "@/layouts/web/AppLayout"
import DashboardLayout from "@/layouts/dashboard/DashboardLayout"

import Auth from "@/middleware/Auth"


import { GiTeacher } from "react-icons/gi";
import { FaUniversity } from "react-icons/fa";
import { GrAnalytics } from 'react-icons/gr';


import UserInfo from './../pages/client/profile/UserInfo';
import UserUniversities from "./../pages/client/profile/UserUnviersities"

import Stats from "../pages/client/panel/Stats"
import Faculties from "../pages/client/panel/Faculties"
import Professors from "../pages/client/panel/Professors"




export default function useClientRoutes() {
    const universityId = 2

    const sidebarLinks = [
        {
            name: "Dashboard",
            to: `${universityId}/controlPanel`,
            icon: <GrAnalytics />,
        },
        {
            name: "faculties",
            to: `/${universityId}/controlPanel/faculties`,
            icon: <FaUniversity />,
        },
        {
            name: "professors",
            to: `/${universityId}/controlPanel/professors`,
            icon: <GiTeacher />,
        }
    ];
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
                    path="/:universityId/controlPanel"
                    element={
                        <Stats />
                    }
                />
                <Route
                    path="/:universityId/controlPanel/faculties"
                    element={
                        <Faculties />
                    }
                />
                <Route
                    path="/:universityId/controlPanel/professors"
                    element={
                        <Professors />
                    }
                />
            </Route>
        </>
    )
}
