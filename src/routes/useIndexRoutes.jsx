import { Route } from "react-router-dom"
import ErrorPage from "../components/errorPage/ErrorPage"

function useIndexRoutes() {
    return (
        <>
            <Route path="*" element={<ErrorPage status={404} error={"Page Not Found"} />} />
            <Route path="/error/:statusCode" element={<ErrorPage />} />
        </>
    )
}

export default useIndexRoutes