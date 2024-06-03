import { Route } from "react-router-dom"

import Guest from "@/middleware/Guest"

import GuestLayout from "@/layouts/guest/GestLayout"

import Login from '@/pages/client/auth/Login';
import Signup from '@/pages/client/auth/Signup';
import ForgetPassword from '@/pages/client/auth/ForgetPassword';
import EmailConfirmation from '@/pages/client/auth/EmailConfirmation';
import ResetPassword from '@/pages/client/auth/ResetPassword';


function useClientAuthRoutes() {
    return (
        <>
            {/* Auth Routes and layout  */}
            <Route
                element={
                    <Guest gardName='client' redirect='/admin/dashboard'>
                        <GuestLayout />
                    </Guest>
                }
            >
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgetpassword" element={<ForgetPassword />} />
                <Route path="/emailconfirmation/:email" element={<EmailConfirmation />} />
                <Route path="/password-reset/:token" element={<ResetPassword />} />
            </Route>
        </>
    )
}

export default useClientAuthRoutes