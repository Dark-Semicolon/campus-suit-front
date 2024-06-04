import { Route } from "react-router-dom"

import Guest from "@/middleware/Guest"

import GuestLayout from "@/layouts/guest/GestLayout"
import Login from '@/pages/campusSuit/auth/Login';
import ForgetPassword from "@/pages/campusSuit/auth/ForgetPassword";
import EmailConfirmation from "@/pages/campusSuit/auth/EmailConfirmation";
import ResetPassword from "@/pages/campusSuit/auth/ResetPassword";


function useCampusSuitAuthRoutes() {
    return (
        <>
            {/* Auth Routes and layout  */}
            <Route
                element={
                    <Guest gardName='admin' redirect='/admin/dashboard'>
                        <GuestLayout />
                    </Guest>
                }
            >
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/forgetpassword" element={<ForgetPassword />} />
                <Route path="/admin/emailconfirmation/:email" element={<EmailConfirmation />} />
                <Route path="/admin/password-reset/:token" element={<ResetPassword />} />
            </Route>
        </>
    )
}

export default useCampusSuitAuthRoutes