import { Route } from "react-router-dom"
import Home from "../pages/web/Home"
import AppLayout from "../layouts/web/AppLayout"
import DashboardLayout from './../layouts/campusSuite/DashboardLayout';
import Auth from '../middleware/Auth';

function useCampusSuiteRoutes() {
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
                <Route path="/admin/dashboard" element={<p>Admin dashboard</p>} />
            </Route>
        </>
    )
}

export default useCampusSuiteRoutes