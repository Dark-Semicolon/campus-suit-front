import { Route } from "react-router-dom"
import Home from "@/pages/web/Home"
import AppLayout from "@/layouts/web/AppLayout"
import DashboardLayout from '@/layouts/campusSuit/DashboardLayout';
import Auth from '@/middleware/Auth';
import Dashboard from "@/features/campusSuit/panel/dashboard/Dashboard";

function useCampusSuitRoutes() {
    return (
        <>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
            </Route>
            <Route element={
                <Auth gardName='admin' redirect='/admin/login'>
                    <DashboardLayout />
                </Auth>
            }>
                <Route path="/admin/dashboard" element={<Dashboard />} />
            </Route>
        </>
    )
}

export default useCampusSuitRoutes