import { Route } from "react-router-dom"
import Home from "../pages/web/Home"
import AppLayout from "../layouts/web/AppLayout"

function useCampusSuiteRoutes() {
    return (
        <>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
            </Route>
        </>
    )
}

export default useCampusSuiteRoutes