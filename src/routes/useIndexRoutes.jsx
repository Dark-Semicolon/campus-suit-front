import { Route } from "react-router-dom"
import ErrorPage from "../components/errorPage/ErrorPage"

function useIndexRoutes() {
    return (
        <>
            <Route path="*" element={<ErrorPage status={404} error={"هذه الصفحة غير موجودة"} />} />
            <Route path="/error/:statusCode" element={<ErrorPage />} />
        </>
    )
}

export default useIndexRoutes